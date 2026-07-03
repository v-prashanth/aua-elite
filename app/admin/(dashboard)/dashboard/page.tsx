import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatCard } from '@/components/admin/ui/AdminCard'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import {
  Users,
  Package,
  Award,
  Heart,
  MessageSquare,
  CalendarCheck,
  Clock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

async function getDashboardStats() {
  const supabase = await createClient()

  const [
    { count: newLeads },
    { count: consultationRequests },
    { count: products },
    { count: brands },
    { count: galleryImages },
    { data: recentLeads },
  ] = await Promise.all([
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('source', 'consultation')
      .eq('status', 'new'),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('brands')
      .select('*', { count: 'exact', head: true })
      .eq('visible', true),
    supabase
      .from('gallery_images')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('leads')
      .select('id, name, phone, source, status, created_at')
      .order('created_at', { ascending: false })
      .limit(6),
  ])

  return {
    newLeads: newLeads ?? 0,
    consultationRequests: consultationRequests ?? 0,
    products: products ?? 0,
    brands: brands ?? 0,
    galleryImages: galleryImages ?? 0,
    recentLeads: recentLeads ?? [],
  }
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays}d ago`
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Page header */}
      <div>
        <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
          Overview
        </h2>
        <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
          Real-time summary of your business activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          label="New Leads"
          value={stats.newLeads}
          icon={<Users size={18} strokeWidth={1.75} />}
          color="blue"
          href="/admin/leads"
        />
        <StatCard
          label="Consultations"
          value={stats.consultationRequests}
          icon={<CalendarCheck size={18} strokeWidth={1.75} />}
          color="purple"
          href="/admin/leads"
        />
        <StatCard
          label="Products"
          value={stats.products}
          icon={<Package size={18} strokeWidth={1.75} />}
          color="gold"
          href="/admin/products"
        />
        <StatCard
          label="Brands"
          value={stats.brands}
          icon={<Award size={18} strokeWidth={1.75} />}
          color="green"
          href="/admin/brands"
        />
        <StatCard
          label="Gallery Images"
          value={stats.galleryImages}
          icon={<Heart size={18} strokeWidth={1.75} />}
          color="red"
          href="/admin/customers"
        />
      </div>

      {/* Recent Activity */}
      <AdminCard>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-navy-primary/40" strokeWidth={1.75} />
            <h3 className="text-[14px] font-sans font-semibold text-navy-primary">
              Recent Leads
            </h3>
          </div>
          <Link
            href="/admin/leads"
            className="text-[11px] font-sans font-semibold text-navy-primary/40 hover:text-gold-primary transition-colors uppercase tracking-wider"
          >
            View All →
          </Link>
        </div>

        {stats.recentLeads.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare size={32} className="text-navy-primary/15 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-[13px] text-navy-primary/35 font-sans">
              No leads yet. They&apos;ll appear here when contact forms are submitted.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-navy-primary/6">
            {stats.recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between py-3.5 gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-navy-primary/8 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-navy-primary/50">
                      {lead.name?.charAt(0)?.toUpperCase() ?? '?'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-sans font-semibold text-navy-primary truncate">
                      {lead.name}
                    </p>
                    <p className="text-[11px] text-navy-primary/40 font-sans">
                      {lead.phone ?? 'No phone'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:block text-[10px] text-navy-primary/30 font-sans capitalize">
                    {lead.source}
                  </span>
                  <AdminBadge variant={lead.status as string} />
                  <span className="text-[10px] text-navy-primary/30 font-sans whitespace-nowrap">
                    {formatRelativeTime(lead.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/products/new', icon: Package, label: 'Add Product', desc: 'Add a new product to the catalog' },
          { href: '/admin/faq', icon: MessageSquare, label: 'Edit FAQs', desc: 'Update frequently asked questions' },
          { href: '/admin/website', icon: Users, label: 'Edit Website', desc: 'Update hero content and sections' },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-2xl border border-navy-primary/6 p-5 hover:border-gold-primary/30 hover:shadow-[0_4px_24px_-4px_rgba(11,35,65,0.1)] transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-xl bg-navy-primary/5 group-hover:bg-gold-primary/10 flex items-center justify-center mb-3 transition-colors">
              <item.icon size={16} className="text-navy-primary/40 group-hover:text-gold-primary transition-colors" strokeWidth={1.75} />
            </div>
            <p className="text-[13px] font-sans font-semibold text-navy-primary mb-0.5">
              {item.label}
            </p>
            <p className="text-[11px] font-sans text-navy-primary/40">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
