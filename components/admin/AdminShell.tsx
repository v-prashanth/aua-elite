'use client'

import React from 'react'
import { DesktopSidebar, MobileSidebar } from '@/components/admin/Sidebar'
import { TopBar } from '@/components/admin/TopBar'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

// Map routes to page titles
function getPageTitle(pathname: string): string {
  const map: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/website': 'Website',
    '/admin/products': 'Products',
    '/admin/brands': 'Brands',
    '/admin/customers': 'Happy Customers',
    '/admin/leads': 'Leads',
    '/admin/faq': 'FAQ',
    '/admin/media': 'Media Library',
    '/admin/seo': 'SEO',
    '/admin/settings': 'Settings',
    '/admin/integrations': 'Integrations',
    '/admin/account': 'Account',
  }

  // Handle dynamic routes
  for (const [key, value] of Object.entries(map)) {
    if (pathname === key || pathname.startsWith(key + '/')) {
      return value
    }
  }
  return 'Admin'
}

interface AdminShellProps {
  children: React.ReactNode
  userEmail?: string
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pageTitle = getPageTitle(pathname)

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Mobile sidebar */}
      <MobileSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar
          pageTitle={pageTitle}
          onMobileMenuToggle={() => setMobileOpen(true)}
          userEmail={userEmail}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <div className="max-w-[1000px] w-full mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#fff',
            color: '#0B2341',
            borderRadius: '12px',
            border: '1px solid rgba(11,35,65,0.08)',
            boxShadow: '0 8px 32px -4px rgba(11,35,65,0.12)',
            fontSize: '13px',
            fontFamily: 'var(--font-inter), sans-serif',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
    </div>
  )
}
