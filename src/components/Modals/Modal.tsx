"use client"

import { AnimatePresence, motion } from "framer-motion"
import { type ReactNode } from "react"
import { X } from "lucide-react"

type ModalProps = {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    width?: string
}

export default function Modal({ open, onClose, title, children, width = "w-96" }: ModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        className="aboslute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15}}
                        onClick={onClose}
                    />
                    
                    <motion.div
                        className={`relative ${width} rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-2xl`}
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    >
                        {title && (
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium text-neutral-100">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-neutral-500 transition-colors hover:text-neutral-300"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}