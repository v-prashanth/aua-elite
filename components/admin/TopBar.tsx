'use client'

import React from 'react'
import { Menu, LogOut, Bell } from 'lucide-react'
import { logout } from '@/app/admin/actions/auth'

interface TopBarProps {
  pageTitle: string
  onMobileMenuToggle: () => void
  userEmail?: string
}

export function TopBar({ pageTitle, onMobileMenuToggle, userEmail }: TopBarProps) {
  const [loggingOut, setLoggingOut] = React.useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await logout()
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-navy-primary/8 px-4 lg:px-6 h-14 flex items-center justify-between shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-navy-primary/40 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-[15px] font-sans font-semibold text-navy-primary">
          {pageTitle}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notification bell (future) */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
          aria-label="Notifications"
          title="Notifications (coming soon)"
        >
          <Bell size={16} />
        </button>

        {/* User info */}
        {userEmail && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-primary/4">
            <div className="w-6 h-6 rounded-full bg-navy-primary flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-white">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] font-sans text-navy-primary/60 max-w-[140px] truncate">
              {userEmail}
            </span>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-navy-primary/30 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          aria-label="Sign out"
          title="Sign out"
        >
          {loggingOut ? (
            <span className="w-4 h-4 border-2 border-navy-primary/20 border-t-navy-primary/60 rounded-full animate-spin" />
          ) : (
            <LogOut size={16} />
          )}
        </button>
      </div>
    </header>
  )
}
