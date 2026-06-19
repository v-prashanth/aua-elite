import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// ── In-memory rate limiter ─────────────────────────────────────────────────
// Keeps a sliding window of submissions per IP.
// Replace with a Supabase/Redis store for production.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per hour per IP
const ipWindowMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSecs: number } {
  const now = Date.now();
  const existing = ipWindowMap.get(ip);

  if (!existing || now > existing.resetAt) {
    ipWindowMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSecs: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    const retryAfterSecs = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, retryAfterSecs };
  }

  existing.count++;
  return { allowed: true, retryAfterSecs: 0 };
}

// ── Input Schema (server-side validation with Zod) ─────────────────────────
const ContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long.")
    .regex(/^[a-zA-Z\u00C0-\u024F\s''-]+$/, "Name contains invalid characters."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please provide a valid 10-digit Indian mobile number."),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(254),

  propertyType: z.enum(["villa", "apartment", "commercial", "builder", "other"]),

  bathrooms: z
    .string()
    .trim()
    .max(20)
    .optional()
    .default(""),

  message: z
    .string()
    .trim()
    .min(10, "Please describe your requirement in at least 10 characters.")
    .max(2000, "Message is too long (max 2000 characters)."),

  isConsultation: z.boolean().optional().default(false),
});

type ContactPayload = z.infer<typeof ContactSchema>;

// ── HTML sanitiser (strip tags to prevent XSS in email body) ──────────────
function sanitiseHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Email template ─────────────────────────────────────────────────────────
function buildEmailHtml(data: ContactPayload): string {
  const label = data.isConsultation ? "Consultation Request" : "Contact Enquiry";
  const name = sanitiseHtml(data.fullName);
  const email = sanitiseHtml(data.email);
  const phone = sanitiseHtml(data.phone);
  const property = sanitiseHtml(data.propertyType);
  const bathrooms = sanitiseHtml(data.bathrooms ?? "Not specified");
  const message = sanitiseHtml(data.message).replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New ${label} — Aqua Elite Solutions</title>
</head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(11,35,65,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0B2341;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A54C;font-weight:700;">Aqua Elite Solutions</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">${label}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#8A94A6;line-height:1.6;">
                A new ${data.isConsultation ? "consultation request has" : "enquiry has"} been submitted via the website. 
                Respond within 4 hours to meet your service commitment.
              </p>

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;width:40%;">
                    <span style="font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Full Name</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:14px;color:#0B2341;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Phone</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <a href="tel:+91${phone}" style="font-size:14px;color:#2E6F95;font-weight:600;text-decoration:none;">+91 ${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Email</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <a href="mailto:${email}" style="font-size:14px;color:#2E6F95;font-weight:600;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Property Type</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:14px;color:#0B2341;text-transform:capitalize;">${property}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Bathrooms / Scale</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #F0F2F5;">
                    <span style="font-size:14px;color:#0B2341;">${bathrooms}</span>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:24px;background:#F7F8FA;border-left:3px solid #C9A54C;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0 0 8px;font-size:11px;color:#8A94A6;text-transform:uppercase;letter-spacing:1px;">Requirement Details</p>
                <p style="margin:0;font-size:14px;color:#0B2341;line-height:1.7;">${message}</p>
              </div>

              <!-- CTA Button -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${email}?subject=Re: Your Enquiry — Aqua Elite Solutions" 
                   style="display:inline-block;background:#0B2341;color:#ffffff;text-decoration:none;
                          padding:12px 28px;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:0.5px;">
                  Reply to ${name}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F7F8FA;border-top:1px solid #F0F2F5;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#8A94A6;">
                This message was sent automatically from the Aqua Elite Solutions website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function buildAutoReplyHtml(name: string, isConsultation: boolean): string {
  const safeN = sanitiseHtml(name);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank you — Aqua Elite Solutions</title>
</head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(11,35,65,0.08);">
          <tr>
            <td style="background:#0B2341;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A54C;font-weight:700;">Aqua Elite Solutions</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">We have received your ${isConsultation ? "consultation request" : "enquiry"}.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="font-size:15px;color:#0B2341;line-height:1.7;">Dear ${safeN},</p>
              <p style="font-size:14px;color:#8A94A6;line-height:1.8;margin:0 0 20px;">
                Thank you for reaching out to Aqua Elite Solutions. Our hydraulic design engineers 
                will review your requirements and respond within <strong style="color:#0B2341;">4 business hours</strong>.
              </p>
              <p style="font-size:14px;color:#8A94A6;line-height:1.8;margin:0 0 20px;">
                If your requirement is urgent, you can also reach us directly at our Jubilee Hills office.
              </p>
              <p style="font-size:14px;color:#0B2341;line-height:1.8;font-weight:600;">
                — Aqua Elite Solutions Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#F7F8FA;border-top:1px solid #F0F2F5;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#8A94A6;">
                Please do not reply to this automated email. Our team will contact you directly.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── 1. Rate limiting ────────────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfterSecs } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: `Too many submissions. Please try again in ${Math.ceil(retryAfterSecs / 60)} minute(s).` },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSecs) },
      }
    );
  }

  // ── 2. Parse & validate body ────────────────────────────────────────────
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors)[0]?.[0] ?? "Validation failed.";
    return NextResponse.json({ error: firstError, fieldErrors }, { status: 422 });
  }

  const data = parsed.data;

  // ── 3. Verify environment credentials ──────────────────────────────────
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const recipientEmail = process.env.CONTACT_EMAIL_TO ?? gmailUser;

  if (!gmailUser || !gmailPass) {
    console.error("[contact/api] GMAIL_USER or GMAIL_APP_PASSWORD env vars are not set.");
    return NextResponse.json(
      { error: "Mail service is currently unavailable. Please call us directly." },
      { status: 503 }
    );
  }

  // ── 4. Create transporter ───────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const subjectLine = data.isConsultation
    ? `New Consultation Request — ${data.fullName}`
    : `New Website Enquiry — ${data.fullName}`;

  // ── 5. Send notification email to Aqua Elite ───────────────────────────
  try {
    await transporter.sendMail({
      from: `"Aqua Elite Website" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: subjectLine,
      html: buildEmailHtml(data),
    });
  } catch (err) {
    console.error("[contact/api] Failed to send notification email:", err);
    return NextResponse.json(
      { error: "Failed to deliver your message. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  // ── 6. Send auto-reply to customer ─────────────────────────────────────
  try {
    await transporter.sendMail({
      from: `"Aqua Elite Solutions" <${gmailUser}>`,
      to: data.email,
      subject: "We received your enquiry — Aqua Elite Solutions",
      html: buildAutoReplyHtml(data.fullName, data.isConsultation ?? false),
    });
  } catch (err) {
    // Non-fatal: log but don't fail the response
    console.warn("[contact/api] Auto-reply failed (non-fatal):", err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
