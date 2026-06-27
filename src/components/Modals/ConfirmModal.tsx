"use client"

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import Modal from "./Modal"
import { AlertTriangle } from "lucide-react"

type ConfirmOptions = {
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    variant?: "danger" | "default"
}

type ConfirmContextValue = {
    confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null)

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<ConfirmOptions>({})
    const resolveRef = useRef<(value: boolean) => void>(undefined)

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions(opts)
        setOpen(true)
        return new Promise<boolean>((resolve) => {
            resolveRef.current = resolve
        })
    }, [])

    const handleClose = (result: boolean) => {
        setOpen(false)
        resolveRef.current?.(result)
    }

    const isDanger = options.variant !== "default"

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            <Modal open={open} onClose={() => handleClose(false)}>
                <div className="mb-3 flex items-start gap-3">
                    {isDanger && (
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                        </div>
                    )}
                    <div>
                        <h2 className="text-sm font-medium text-neutral-100">
                            {options.title ?? "Ben je zeker?"}
                        </h2>
                        {options.description && (
                            <p className="mt-1 text-sm text-neutral-400">{options.description}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={() => handleClose(false)}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
                    >
                        {options.cancelText ?? "Cancel"}
                    </button>
                    <button
                        onClick={() => handleClose(true)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 ${
                            isDanger ? "bg-red-500/90" : "bg-emerald-500/90"
                        }`}
                    >
                        {options.confirmText ?? "Bevestigen"}
                    </button>
                </div>
            </Modal>
        </ConfirmContext.Provider>
    )
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext)
    if (!ctx) {
        throw new Error("useConfirm must be used within a ConfirmProvider")
    }
    return ctx.confirm
}