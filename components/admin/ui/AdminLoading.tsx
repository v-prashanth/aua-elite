import React from 'react'

export function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse max-w-[1100px]">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-navy-primary/10 rounded-lg" />
        <div className="h-4 w-72 bg-navy-primary/5 rounded-lg" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-navy-primary/6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-navy-primary/5" />
            <div className="h-7 w-12 bg-navy-primary/10 rounded-lg" />
            <div className="h-3.5 w-16 bg-navy-primary/5 rounded-md" />
          </div>
        ))}
      </div>

      {/* Large Content Block Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-navy-primary/6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-navy-primary/6">
          <div className="h-5 w-32 bg-navy-primary/10 rounded-lg" />
          <div className="h-4 w-16 bg-navy-primary/5 rounded-lg" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy-primary/5" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-navy-primary/10 rounded-md" />
                  <div className="h-3 w-16 bg-navy-primary/5 rounded-md" />
                </div>
              </div>
              <div className="h-4 w-12 bg-navy-primary/5 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
