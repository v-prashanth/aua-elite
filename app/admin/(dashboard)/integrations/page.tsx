import type { Metadata } from 'next'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { Zap, CheckCircle, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Integrations' }

const INTEGRATIONS = [
  {
    id: 'karkhana',
    name: 'Karkhana',
    description: 'Business management platform integration for syncing orders, leads, and service records.',
    status: 'not_connected' as const,
    category: 'CRM',
    available: true,
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track website visitors, page views, and conversion events.',
    status: 'coming_soon' as const,
    category: 'Analytics',
    available: false,
  },
  {
    id: 'meta-pixel',
    name: 'Meta Pixel',
    description: 'Track Facebook and Instagram ad conversions and retarget visitors.',
    status: 'coming_soon' as const,
    category: 'Advertising',
    available: false,
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business API',
    description: 'Send automated consultation confirmations and follow-up messages via WhatsApp.',
    status: 'coming_soon' as const,
    category: 'Messaging',
    available: false,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Automatically create calendar events when consultations are booked.',
    status: 'coming_soon' as const,
    category: 'Scheduling',
    available: false,
  },
]

const statusConfig = {
  connected: {
    label: 'Connected',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    icon: CheckCircle,
  },
  not_connected: {
    label: 'Not Connected',
    className: 'bg-amber-50 text-amber-600 border-amber-100',
    icon: Zap,
  },
  coming_soon: {
    label: 'Coming Soon',
    className: 'bg-navy-primary/5 text-navy-primary/40 border-navy-primary/10',
    icon: Clock,
  },
}

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h2 className="text-[20px] font-sans font-semibold text-navy-primary">Integrations</h2>
        <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
          Connect external tools and services to extend your business platform.
        </p>
      </div>

      {/* Info */}
      <div className="bg-navy-primary/4 rounded-xl px-5 py-4">
        <p className="text-[12px] font-sans text-navy-primary/60 leading-relaxed">
          The integration architecture is prepared and ready. Contact your developer to activate any integration listed as &quot;Not Connected&quot;. 
          &quot;Coming Soon&quot; integrations will be available in a future update.
        </p>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INTEGRATIONS.map(integration => {
          const status = statusConfig[integration.status]
          const StatusIcon = status.icon

          return (
            <AdminCard key={integration.id} className="relative">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14px] font-sans font-semibold text-navy-primary">
                      {integration.name}
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-navy-primary/6 text-navy-primary/35 px-2 py-0.5 rounded-full font-sans">
                      {integration.category}
                    </span>
                  </div>
                  <p className="text-[12px] font-sans text-navy-primary/45 mt-1.5 leading-relaxed">
                    {integration.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-primary/6">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border font-sans ${status.className}`}>
                  <StatusIcon size={11} />
                  {status.label}
                </span>

                {integration.available && integration.status === 'not_connected' ? (
                  <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-navy-primary/50 hover:text-navy-primary transition-colors font-sans">
                    Configure <ArrowRight size={12} />
                  </button>
                ) : (
                  <span className="text-[11px] font-sans text-navy-primary/25">
                    {integration.status === 'coming_soon' ? 'Roadmap Q3 2025' : ''}
                  </span>
                )}
              </div>
            </AdminCard>
          )
        })}
      </div>
    </div>
  )
}
