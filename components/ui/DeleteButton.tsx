'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  label?: string
  confirmMessage: string
  onDelete: () => Promise<void>
  className?: string
}

export default function DeleteButton({ label = 'Delete', confirmMessage, onDelete, className }: Props) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleConfirm() {
    setOpen(false)
    setBusy(true)
    try {
      await onDelete()
    } catch (err: any) {
      toast.error(err?.message ?? 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={busy}
        className={className ?? 'font-comic text-xs px-3 py-1.5 border-2 border-red-300 text-red-500 rounded hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50'}
      >
        {busy ? '…' : label}
      </button>

      <ConfirmDialog
        open={open}
        message={confirmMessage}
        confirmLabel={label}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
