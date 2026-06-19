"use client"

import { useCallback, useState } from "react"
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    BackgroundVariant,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    type Connection,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import LabNode, { type LabNodeData, type LabNodeType } from "./LabNode"

const nodeTypes = {
    lab: LabNode,
}

type LabFlowNode = Node<LabNodeData>

const initialNodes: LabFlowNode[] = [
    {
        id: "router",
        type: "lab",
        position: { x: 0, y: 100 },
        data: { label: "router", type: "router", ip: "10.0.0.1", active: true },
    },
    {
        id: "proxmox",
        type: "lab",
        position: { x: 260, y: 100 },
        data: { label: "proxmox", type: "server", ip: "10.0.0.10", active: true },
    },
    {
        id: "vm-01",
        type: "lab",
        position: { x: 520, y: 0 },
        data: { label: "vm-01", type: "vm", ip: "10.0.0.11", active: true },
    },
    {
        id: "vm-02",
        type: "lab",
        position: { x: 520, y: 180 },
        data: { label: "vm-02", type: "vm", ip: "10.0.0.12", active: false },
    },
]

const initialEdges: Edge[] = [
    { id: "e1", source: "router", target: "proxmox" },
    { id: "e2", source: "proxmox", target: "vm-01" },
    { id: "e3", source: "proxmox", target: "vm-02" },
]

const NODE_TYPES: LabNodeType[] = ["router", "server", "vm", "service", "nas"]

export default function LabCanvas() {
    const [nodes, setNodes] = useState<LabFlowNode[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)

    // add-node form state
    const [label, setLabel] = useState("")
    const [type, setType] = useState<LabNodeType>("server")
    const [ip, setIp] = useState("")

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds) as LabFlowNode[]),
        []
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    )

    const addNode = () => {
        if (!label.trim()) return

        const id = `${label.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()
            .toString()
            .slice(-4)}`

        const newNode: LabFlowNode = {
            id,
            type: "lab",
            // spawn near the middle of the current viewport-ish area,
            // with a bit of randomness so nodes don't stack exactly
            position: {
                x: 200 + Math.random() * 200,
                y: 80 + Math.random() * 200,
            },
            data: {
                label: label.trim(),
                type,
                ip: ip.trim() || undefined,
                active: true,
            },
        }

        setNodes((nds) => [...nds, newNode])
        setLabel("")
        setIp("")
    }

    const exportJson = () => {
        const data = JSON.stringify({ nodes, edges }, null, 2)
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "topology.json"
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="relative h-screen w-full bg-neutral-950">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                defaultEdgeOptions={{
                    style: { stroke: "#525252", strokeWidth: 1.5 },
                }}
                proOptions={{ hideAttribution: true }}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={24}
                    size={1}
                    color="#262626"
                />
                <Controls
                    className="border! border-white/10! bg-neutral-900/80! shadow-none! [&>button]:border-white/10! [&>button]:bg-transparent! [&>button]:text-neutral-400! [&>button:hover]:bg-white/5!"
                    showInteractive={false}
                />
                <MiniMap
                    className="border! border-white/10! bg-neutral-900/80!"
                    maskColor="rgba(0,0,0,0.6)"
                    nodeColor="#525252"
                />
            </ReactFlow>

            {/* add-node panel */}
            <div className="absolute left-4 top-4 z-10 w-64 rounded-xl border border-white/10 bg-neutral-900/90 p-3 backdrop-blur-sm">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                    Add node
                </div>

                <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNode()}
                    placeholder="Label, e.g. pihole"
                    className="mb-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-400/40"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as LabNodeType)}
                    className="mb-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-100 outline-none focus:border-emerald-400/40"
                >
                    {NODE_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                <input
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNode()}
                    placeholder="IP (optional)"
                    className="mb-3 w-full rounded-lg border border-white/10 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-400/40"
                />

                <button
                    onClick={addNode}
                    disabled={!label.trim()}
                    className="w-full rounded-lg bg-neutral-50 py-1.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Add to canvas
                </button>
            </div>

            <button
                onClick={exportJson}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-neutral-900/80 px-4 py-2 text-sm font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:bg-white/5"
            >
                Export JSON
            </button>
        </div>
    )
}