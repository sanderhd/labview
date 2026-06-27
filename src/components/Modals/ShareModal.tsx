"use client"

import { useState } from "react"
import Modal from "@/components/Modals/Modal"

export type ShareMeta = {
    title: string
    author: string
}

type ShareModalProps = {
    open: boolean
    onClose: () => void
    onConfirm: (meta: ShareMeta) => void
}

export function ShareModal({ open, onClose, onConfirm }: ShareModalProps) {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const handleConfirm = () => {
        onConfirm({ title: title.trim() || "Untitled lab", author: author.trim() })
        setTitle("")
        setAuthor("")
    }

    return (
        <Modal open={open} onClose={onClose} title="Share Topology">
            <div className="mb-2 text-xs text-neutral-500">
                Give your topology a name before sharing.
            </div>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Homelab V2"
                className="mb-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-400/40"
            />

            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                placeholder="Your Name (optional)"
                className="mb-3 w-full rounded-lg border border-white/10 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-400/40"
            />

            <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirm}
                    className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Generate link
                </button>
            </div>
        </Modal>
    )
}

type LoadSharedModalProps = {
    open: boolean
    meta: ShareMeta
    nodeCount: number
    onLoad: () => void
    onCancel: () => void
}

export function LoadSharedModal({ open, meta, nodeCount, onLoad, onCancel }: LoadSharedModalProps) {
    return (
        <Modal open={open} onClose={onCancel} title="Shared Topology">
            <div className="mb-4 rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5">
                <div className="text-sm font-medium text-neutral-100">{meta.title}</div>
                {meta.author && (
                    <div className="mt-0.5 text-xs text-neutral-500">by {meta.author}</div>
                )}
                <div className="mt-1.5 font-mono text-[11px] text-neutral-600">
                    {nodeCount} node{nodeCount !== 1 ? "s" : ""}
                </div>
            </div>

            <p className="mb-4 text-sm text-neutral-400">
                Do you want to load this topology? Your current canvas will get replaced.
            </p>

            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
                >
                    Cancel
                </button>
                <button
                    onClick={onLoad}
                    className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Load
                </button>
            </div>
        </Modal>
    )
}