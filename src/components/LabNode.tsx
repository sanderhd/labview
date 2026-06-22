import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Box, Circle, HardDrive, LucideIcon, Router, Server } from "lucide-react"

export type LabNodeType = "router" | "server" | "vm" | "service" | "nas"

export type LabNodeData = {
    label: string
    type: LabNodeType
    ip?: string
    active?: boolean
}

const ICONS: Record<LabNodeType, LucideIcon> = {
    router: Router,
    server: Server,
    vm: Box,
    service: Circle,
    nas: HardDrive,
}

export default function LabNode({
    data,
    selected,
}: NodeProps & { data: LabNodeData }) {
    const { label, type = "server", ip, active = true } = data
    const Icon = ICONS[type] ?? Circle

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
                    <Icon className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.75}/>
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