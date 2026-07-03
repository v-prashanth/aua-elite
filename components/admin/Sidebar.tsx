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
  ChevronRight,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/website', icon: Globe, label: 'Website' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/brands', icon: Award, label: 'Brands' },
  { href: '/admin/customers', icon: Heart, label: 'Happy Customers' },
  { href: '/admin/leads', icon: Users, label: 'Leads' },
  { href: '/admin/faq', icon: MessageSquare, label: 'FAQ' },
  { href: '/admin/media', icon: Image, label: 'Media Library' },
  { href: '/admin/seo', icon: Search, label: 'SEO' },
] as const

const BOTTOM_NAV = [
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
  { href: '/admin/integrations', icon: Zap, label: 'Integrations' },
  { href: '/admin/account', icon: User, label: 'Account' },
] as const

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium transition-all duration-150 relative',
        isActive
          ? 'bg-navy-primary/8 text-navy-primary'
          : 'text-navy-primary/45 hover:text-navy-primary hover:bg-navy-primary/4'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold-primary rounded-full" />
      )}
      <Icon
        size={16}
        strokeWidth={isActive ? 2 : 1.75}
        className={cn(
          'shrink-0 transition-colors duration-150',
          isActive ? 'text-navy-primary' : 'text-navy-primary/40 group-hover:text-navy-primary/70'
        )}
      />
      <span>{label}</span>
    </Link>
  )
}

// Desktop sidebar (always visible on lg+)
export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[224px] shrink-0 border-r border-navy-primary/8 bg-white h-screen sticky top-0 overflow-y-auto">
      <SidebarContent />
    </aside>
  )
}

// Mobile sidebar (drawer overlay)
export function MobileSidebar({ mobileOpen, onMobileClose }: SidebarProps) {
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
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-y-0 left-0 z-50 w-[224px] bg-white border-r border-navy-primary/8 flex flex-col lg:hidden overflow-y-auto"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/40 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
            <SidebarContent onLinkClick={onMobileClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-3 mb-6">
        <div className="relative w-8 h-8 rounded-lg border border-navy-primary/10 overflow-hidden bg-white shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <NextImage
            src="/images/logo.png"
            alt="Aqua Elite Logo"
            fill
            className="object-contain p-0.5"
          />
        </div>
        <div>
          <p className="text-[11px] font-bold text-navy-primary font-sans leading-tight">
            Aqua Elite
          </p>
          <p className="text-[9px] text-navy-primary/35 font-sans uppercase tracking-wider">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Main navigation */}
      <nav aria-label="Main navigation" className="flex-1 space-y-0.5">
        <p className="text-[9px] uppercase tracking-[0.15em] text-navy-primary/25 font-bold px-3 mb-2 font-sans">
          Main
        </p>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      {/* Bottom navigation */}
      <div className="mt-4 pt-4 border-t border-navy-primary/8 space-y-0.5">
        <p className="text-[9px] uppercase tracking-[0.15em] text-navy-primary/25 font-bold px-3 mb-2 font-sans">
          System
        </p>
        {BOTTOM_NAV.map(item => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            onClick={onLinkClick}
          />
        ))}

        {/* View website link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium text-navy-primary/35 hover:text-navy-primary/60 transition-colors mt-1"
        >
          <ChevronRight size={14} className="rotate-180 opacity-50" />
          <span>View Website</span>
        </Link>
      </div>
    </div>
  )
}
