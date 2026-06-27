"use client"

import { useCallback, useState } from "react"
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    type Connection,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import LabNode, { type LabNodeData } from "./LabNode"

const nodeTypes = { lab: LabNode }

type LabFlowNode = Node<LabNodeData>

const previewNodes: LabFlowNode[] = [
    { id: "router", type: "lab", position: { x: 0, y: 100 },
        data: { label: "router", type: "router", ip: "10.0.0.1", active: true, icon: "router" } },
    { id: "proxmox", type: "lab", position: { x: 260, y: 100 },
        data: { label: "proxmox", type: "server", ip: "10.0.0.10", active: true, icon: "proxmox" } },
    { id: "vm-01", type: "lab", position: { x: 520, y: 0 },
        data: { label: "vm-01", type: "vm", ip: "10.0.0.11", active: true, icon: "virtualbox" } },
    { id: "vm-02", type: "lab", position: { x: 520, y: 180 },
        data: { label: "pihole", type: "service", ip: "10.0.0.12", active: true, icon: "pihole" } },
]

const previewEdges: Edge[] = [
    { id: "pe1", source: "router", sourceHandle: "source", target: "proxmox", targetHandle: "target" },
    { id: "pe2", source: "proxmox", sourceHandle: "source", target: "vm-01", targetHandle: "target" },
    { id: "pe3", source: "proxmox", sourceHandle: "source", target: "vm-02", targetHandle: "target" },
]

type LabPreviewProps = {
    interactive?: boolean
    className?: string
}

export default function LabPreview({ interactive = true, className = ""}: LabPreviewProps) {
    const [nodes, setNodes] = useState<LabFlowNode[]>(previewNodes)
    const [edges, setEdges] = useState<Edge[]>(previewEdges)

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds) as LabFlowNode[]),
        []
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    )

    return (
        <div className={`relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 ${className}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={interactive ? onNodesChange : undefined}
                onEdgesChange={interactive ? onEdgesChange : undefined}
                onConnect={interactive ? onConnect : undefined}
                nodeTypes={nodeTypes}
                nodesDraggable={interactive}
                nodesConnectable={interactive}
                elementsSelectable={interactive}
                panOnDrag={interactive}
                zoomOnScroll={interactive}
                zoomOnPinch={interactive}
                fitView
                proOptions={{ hideAttribution: true }}
                defaultEdgeOptions={{ style: { stroke: "#525252", strokeWidth: 1.5 } }}
            >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#262626" />
            </ReactFlow>

            {!interactive && (
                <div className="absolute inset-0 cursor-default" />
            )}
        </div>
    )
}