"use client"

import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Router, Server, Box, Circle, HardDrive } from "lucide-react"
import * as SimpleIcons from "simple-icons"

export type LabNodeType = "router" | "server" | "vm" | "service" | "nas"

export type LabNodeData = {
    label: string
    type: LabNodeType
    icon?: string
    ip?: string
    active?: boolean
}

const ICON_MAP: Record<LabNodeType, any> = {
    router: Router,
    server: Server,
    vm: Box,
    service: Circle,
    nas: HardDrive,
}

const SIMPLE_ICON_MAP: Record<string, any> = Object.fromEntries(
    Object.values(SimpleIcons)
        .filter((i: any) => i?.slug)
        .map((i: any) => [i.slug, i])
)

const getSimpleIcon = (slug?: string) => {
    if (!slug) return null
    return SIMPLE_ICON_MAP[slug] ?? null
}

export default function LabNode({
    data,
    selected,
}: NodeProps & { data: LabNodeData }) {
    const { label, type = "server", ip, active = true } = data

    const simpleIcon = getSimpleIcon(data.icon)
    const LucideIcon = ICON_MAP[type] ?? Circle

    const renderIcon = () => {
        if (simpleIcon?.svg) {
            const svg = simpleIcon.svg
                .replace(/<svg/, '<svg width="16" height="16" fill="currentColor"')

            return (
                <span
                    className="flex h-4 w-4 items-center justify-center text-neutral-400"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            )
        }

        if (LucideIcon) {
            return <LucideIcon className="h-4 w-4 text-neutral-400" />
        }

        return <Circle className="h-4 w-4 text-neutral-400" />
    }

    return (
        <div
            className={`min-w-40 rounded-xl border bg-neutral-900/90 px-3 py-2.5 backdrop-blur-sm transition-colors ${
                selected
                    ? "border-emerald-400/60 shadow-[0_0_0_1px_rgba(52,211,153,0.3)]"
                    : "border-white/10 hover:border-white/20"
            }`}
        >
            <Handle
                id="target"
                type="target"
                position={Position.Left}
                className="h-2! w-2! border-none! bg-neutral-600!"
            />
            <Handle
                id="source"
                type="source"
                position={Position.Right}
                className="h-2! w-2! border-none! bg-neutral-600!"
            />

            <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-500">
                    {renderIcon()}
                </span>

                <span className="flex-1 truncate text-sm font-medium text-neutral-100">
                    {label}
                </span>

                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-emerald-400" : "bg-neutral-600"
                    }`}
                />
            </div>

            {ip && (
                <div className="mt-1 font-mono text-[11px] text-neutral-500">
                    {ip}
                </div>
            )}

            <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-neutral-600">
                {type}
            </div>
        </div>
    )
}