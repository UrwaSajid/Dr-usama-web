'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfirmDialogProps {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmLabel?: string
}

export default function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Delete',
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ background: 'rgba(44,44,42,0.55)' }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1,   opacity: 1, y: 0  }}
            exit={{   scale: 0.9, opacity: 0, y: 16  }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#F7F5EE] border-[3px] border-ink-900 rounded shadow-[6px_6px_0_#2C2C2A] max-w-sm w-full p-7"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded border-2 border-ink-900 bg-red-50 flex items-center justify-center shadow-[2px_2px_0_#2C2C2A]">
                <span className="font-comic text-red-500 text-base font-bold">!</span>
              </div>
              <span className="font-comic text-ink-900 text-lg leading-tight">
                Are you sure?
              </span>
            </div>

            {/* Message */}
            <p className="font-body text-sm text-ink-600 leading-relaxed mb-7 pl-1">
              {message}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onCancel}
                className="font-comic text-sm px-4 py-1.5 border-2 border-ink-300 text-ink-600 rounded hover:border-ink-500 hover:text-ink-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="font-comic text-sm px-4 py-1.5 border-2 border-red-500 bg-red-500 text-white rounded shadow-[2px_2px_0_#991b1b] hover:bg-red-600 hover:border-red-600 hover:shadow-[1px_1px_0_#991b1b] hover:translate-x-px hover:translate-y-px transition-all"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
