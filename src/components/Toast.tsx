"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "info"

type ToastItem = {
    id: string
    message: string
    type: ToastType
}

type ToastContextValue = {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS: Record<ToastType, any> = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
}

const COLORS: Record<ToastType, string> = {
    success: "text-emerald-400 border-emerald-400/20",
    error: "text-red-400 border-red-400/20",
    info: "text-blue-400 border-blue-400/20",
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2)
        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3500)
    }, [])

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <AnimatePresence initial={false}>
                    {toasts.map((toast) => {
                        const Icon = ICONS[toast.type]
                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={`pointer-events-auto flex w-80 items-start gap-2.5 rounded-xl border bg-neutral-900/95 px-4 py-3 shadow-lg backdrop-blur-sm ${COLORS[toast.type]}`}
                            >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                                <span className="flex-1 text-sm text-neutral-200">
                                    {toast.message}
                                </span>
                                <button
                                    onClick={() => dismissToast(toast.id)}
                                    className="text-neutral-500 transition-colors hover:text-neutral-300"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return ctx
}