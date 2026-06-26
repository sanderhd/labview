"use client"

import { motion } from "framer-motion"
import { Network, Download, Layers, MousePointerClick } from "lucide-react"

const features = [
    {
        icon: MousePointerClick,
        title: "Drag & drop nodes",
        description: "Add routers, servers, VMs, services and NAS devices straight onto the canvas.",
    },
    {
        icon: Network,
        title: "Connect everything",
        description: "Draw connections between nodes to map out exactly how your network is wired.",
    },
    {
        icon: Layers,
        title: "Real service icons",
        description: "Pick from hundreds of recognizable icons so your diagram actually looks like your stack.",
    },
    {
        icon: Download,
        title: "Export and share",
        description: "Save your topology as JSON, version it, or hand it off to someone else to import."
    }
]

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
}

export default function Features() {
    return (
        <section className="relative px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                        Features
                    </span>
                    <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-50">
                        Everything you need to map it out
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={container}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={item}
                            transition={{ duration: 0.4 }}
                            className="rounded-xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-white/20"
                        >
                            <f.icon className="h-5 w-5 text-emerald-400" />
                            <h3 className="mt-3 text-sm font-medium text-neutral-100">
                                {f.title}
                            </h3>
                            <p  className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                                {f.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}