'use client'

import React from 'react'
import { updateContactInfo } from '@/app/admin/actions/content'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import toast from 'react-hot-toast'
import { Phone, MapPin, Clock, Globe } from 'lucide-react'

interface SettingsClientProps {
  initialContact: Record<string, string>
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  )
}

const DEFAULT_SETTINGS = {
  phone_primary: "+91 85559 98216",
  phone_secondary: "",
  whatsapp: "918555998216",
  email: "aquaelitesolution@gmail.com",
  address_line1: "Hema Nagar, Boduppal",
  address_line2: "Hyderabad, Telangana 500039",
  google_maps_url: "https://maps.app.goo.gl/ZyP87vtqo5odNARb8?g_st=aw",
  business_hours: "Mon - Sat: 9:00 AM - 7:00 PM",
  instagram_url: "https://instagram.com/aquaelitesolution",
  linkedin_url: "https://linkedin.com/company/aquaelite",
}

export function SettingsClient({ initialContact }: SettingsClientProps) {
  const [saving, setSaving] = React.useState(false)
  const [contact, setContact] = React.useState<Record<string, string>>({
    phone_primary: initialContact.phone_primary || '',
    phone_secondary: initialContact.phone_secondary || '',
    whatsapp: initialContact.whatsapp || '',
    email: initialContact.email || '',
    address_line1: initialContact.address_line1 || '',
    address_line2: initialContact.address_line2 || '',
    google_maps_url: initialContact.google_maps_url || '',
    business_hours: initialContact.business_hours || '',
    instagram_url: initialContact.instagram_url || '',
    linkedin_url: initialContact.linkedin_url || '',
  })

  function update(key: string, value: string) {
    setContact(c => ({ ...c, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    const entries = Object.entries(contact).map(([key, value]) => ({ key, value }))
    const result = await updateContactInfo(entries)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Settings saved. Website updated.')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[20px] font-sans font-semibold text-navy-primary">Settings</h2>
          <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
            Business information displayed across the website. Leave any field blank to use its default value.
          </p>
        </div>
        <AdminButton loading={saving} onClick={handleSave}>Save All</AdminButton>
      </div>

      {/* Contact */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <Phone size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Phone & Contact</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Primary Phone" value={contact.phone_primary} onChange={v => update('phone_primary', v)} placeholder={DEFAULT_SETTINGS.phone_primary} />
          <Field label="Secondary Phone" value={contact.phone_secondary} onChange={v => update('phone_secondary', v)} placeholder={DEFAULT_SETTINGS.phone_secondary || 'e.g. +91 98491 00000'} />
          <Field label="WhatsApp Number" value={contact.whatsapp} onChange={v => update('whatsapp', v)} placeholder={DEFAULT_SETTINGS.whatsapp} />
          <Field label="Email Address" value={contact.email} onChange={v => update('email', v)} placeholder={DEFAULT_SETTINGS.email} type="email" />
        </div>
      </AdminCard>

      {/* Address */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <MapPin size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Office Address</h3>
        </div>
        <div className="space-y-4">
          <Field label="Address Line 1" value={contact.address_line1} onChange={v => update('address_line1', v)} placeholder={DEFAULT_SETTINGS.address_line1} />
          <Field label="Address Line 2" value={contact.address_line2} onChange={v => update('address_line2', v)} placeholder={DEFAULT_SETTINGS.address_line2} />
          <Field label="Google Maps URL" value={contact.google_maps_url} onChange={v => update('google_maps_url', v)} placeholder={DEFAULT_SETTINGS.google_maps_url} type="url" />
        </div>
      </AdminCard>

      {/* Hours */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <Clock size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Business Hours</h3>
        </div>
        <Field label="Business Hours" value={contact.business_hours} onChange={v => update('business_hours', v)} placeholder={DEFAULT_SETTINGS.business_hours} />
      </AdminCard>

      {/* Social */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <Globe size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Social Links</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Instagram URL" value={contact.instagram_url} onChange={v => update('instagram_url', v)} placeholder={DEFAULT_SETTINGS.instagram_url} type="url" />
          <Field label="LinkedIn URL" value={contact.linkedin_url} onChange={v => update('linkedin_url', v)} placeholder={DEFAULT_SETTINGS.linkedin_url} type="url" />
        </div>
      </AdminCard>
    </div>
  )
}
