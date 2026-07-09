'use client'

import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Globe,
  Package,
  Award,
  Heart,
  Users,
  MessageSquare,
  Image,
  Search,
  Settings,
  Zap,
  User,
  X,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Simplified 2-group structure to maximize vertical space and clarity
const NAV_GROUPS = [
  {
    title: 'Content & Leads',
    items: [
      { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/admin/leads', icon: Users, label: 'Leads & Inquiries', badge: 'Inbox' },
      { href: '/admin/products', icon: Package, label: 'Products & Catalog' },
      { href: '/admin/brands', icon: Award, label: 'Brands & Partners' },
      { href: '/admin/customers', icon: Heart, label: 'Customer Gallery' },
      { href: '/admin/faq', icon: MessageSquare, label: 'FAQs' },
      { href: '/admin/media', icon: Image, label: 'Media Library' },
    ]
  },
  {
    title: 'Site Settings',
    items: [
      { href: '/admin/website', icon: Globe, label: 'Page Content', badge: 'Live' },
      { href: '/admin/seo', icon: Search, label: 'Google & SEO' },
      { href: '/admin/settings', icon: Settings, label: 'System Settings' },
      { href: '/admin/integrations', icon: Zap, label: 'Integrations' },
      { href: '/admin/account', icon: User, label: 'Account Profile' },
    ]
  }
] as const

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
  userEmail?: string
}

function NavLink({
  href,
  icon: Icon,
  label,
  badge,
  onClick,
}: {
  href: string
  icon: LucideIcon
  label: string
  badge?: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between px-2.5 py-2 rounded-lg text-[12px] font-sans font-medium transition-all duration-150 relative outline-none',
        isActive
          ? 'bg-navy-primary/5 text-navy-primary font-semibold'
          : 'text-navy-primary/45 hover:text-navy-primary hover:bg-navy-primary/[0.02]'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active Gold Line Indicator */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4.5 bg-gold-primary rounded-full" />
      )}
      
      <div className="flex items-center gap-2.5">
        <Icon
          size={15}
          strokeWidth={isActive ? 2.25 : 1.75}
          className={cn(
            'shrink-0 transition-transform duration-150 group-hover:scale-105',
            isActive ? 'text-navy-primary' : 'text-navy-primary/40'
          )}
        />
        <span className="truncate">{label}</span>
      </div>

      {badge && (
        <span
          className={cn(
            'text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 scale-90',
            isActive 
              ? 'bg-gold-primary/15 text-navy-brand' 
              : 'bg-navy-primary/6 text-navy-primary/40'
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}

export function DesktopSidebar({ userEmail }: { userEmail?: string }) {
  return (
    <aside className="hidden lg:flex flex-col w-[248px] shrink-0 border-r border-navy-primary/6 bg-white h-screen sticky top-0 overflow-x-hidden overflow-y-auto z-30">
      <SidebarContent userEmail={userEmail} />
    </aside>
  )
}

export function MobileSidebar({ mobileOpen, onMobileClose, userEmail }: SidebarProps) {
  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-primary/20 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-y-0 left-0 z-50 w-[248px] bg-white border-r border-navy-primary/6 flex flex-col lg:hidden overflow-x-hidden overflow-y-auto"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-3.5 right-3.5 w-7.5 h-7.5 flex items-center justify-center rounded-lg text-navy-primary/40 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={15} />
            </button>
            <SidebarContent onLinkClick={onMobileClose} userEmail={userEmail} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function SidebarContent({ onLinkClick, userEmail }: { onLinkClick?: () => void; userEmail?: string }) {
  const userInitials = userEmail ? userEmail.charAt(0).toUpperCase() : 'A'
  const displayEmail = userEmail || 'admin@aqua-elite.co'

  return (
    <div className="flex flex-col h-full p-3 font-sans select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-2 py-2 mb-3.5 shrink-0 relative">
        <div className="relative w-8 h-8 rounded-lg border border-navy-primary/8 overflow-hidden bg-white shrink-0 flex items-center justify-center">
          <NextImage
            src="/images/logo.png"
            alt="Aqua Elite Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-[11.5px] font-bold text-navy-primary leading-none">
              Aqua Elite
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="System online" />
          </div>
          <p className="text-[8.5px] text-navy-primary/30 font-semibold uppercase tracking-wider mt-1 leading-none">
            Control Center
          </p>
        </div>
      </div>

      {/* Navigation Panels */}
      <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden pr-0.5 -mr-0.5 scrollbar-thin scrollbar-thumb-navy-primary/10">
        {NAV_GROUPS.map((group, index) => (
          <nav key={index} aria-label={group.title} className="space-y-0.5">
            <p className="text-[8.5px] uppercase tracking-[0.15em] text-navy-primary/25 font-bold px-2.5 mb-1.5">
              {group.title}
            </p>
            {group.items.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={'badge' in item ? item.badge : undefined}
                onClick={onLinkClick}
              />
            ))}
          </nav>
        ))}
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-auto pt-3 border-t border-navy-primary/6 space-y-2 shrink-0 bg-white">
        {/* Compact User profile card */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-navy-primary/[0.015] border border-navy-primary/5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-navy-primary to-navy-dark text-white text-[11px] font-bold flex items-center justify-center shrink-0">
            {userInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-semibold text-navy-primary truncate leading-tight">
              {displayEmail.split('@')[0]}
            </p>
            <p className="text-[8px] font-mono text-navy-primary/30 truncate leading-none mt-0.5">
              {displayEmail}
            </p>
          </div>
        </div>

        {/* Compact View website link */}
        <Link
          href="/"
          target="_blank"
          className="group flex items-center justify-between px-2.5 py-2 rounded-lg border border-navy-primary/8 text-navy-primary/50 bg-white hover:text-navy-primary hover:border-gold-primary/20 hover:bg-gold-primary/[0.01] transition-all duration-150 outline-none"
        >
          <div className="flex items-center gap-2">
            <Globe size={12} className="text-navy-primary/30 group-hover:text-gold-primary transition-colors" />
            <span className="text-[10px] font-semibold tracking-wide">View Public Site</span>
          </div>
          <ArrowUpRight size={11} className="opacity-30 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>
      </div>
    </div>
  )
}
