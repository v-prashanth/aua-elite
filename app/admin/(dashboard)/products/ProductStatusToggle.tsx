'use client'

import React from 'react'
import { updateProductStatus } from '@/app/admin/actions/products'
import toast from 'react-hot-toast'

interface ProductStatusToggleProps {
  id: string
  currentStatus: string
}

export function ProductStatusToggle({ id, currentStatus }: ProductStatusToggleProps) {
  const [status, setStatus] = React.useState(currentStatus)
  const [loading, setLoading] = React.useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.stopPropagation()
    const newStatus = e.target.value as 'available' | 'coming-soon'
    setLoading(true)
    setStatus(newStatus)
    const result = await updateProductStatus(id, newStatus)
    if (result?.error) {
      toast.error(result.error)
      setStatus(currentStatus)
    }
    setLoading(false)
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      onClick={e => e.stopPropagation()}
      className="text-[11px] font-sans bg-transparent border border-navy-primary/12 rounded-lg px-2 py-1 text-navy-primary/60 focus:outline-none focus:border-gold-primary cursor-pointer disabled:opacity-50"
    >
      <option value="available">Available</option>
      <option value="coming-soon">Coming Soon</option>
    </select>
  )
}
