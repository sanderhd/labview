"use client"

import { motion } from "framer-motion"

const steps = [
    { number: "01", title: "Add your nodes", description: "Drop in your router, hypervisor, VMs and services with a label and IP." },
    { number: "02", title: "Wire it up", description: "Drag between handles to connect nodes the way they're actually networked." },
    { number: "03", title: "Export the topology", description: "Download as JSON to back up, version, or share your homelab layout." },
]

export default function HowItWorks() {
    return (
        <section className="relative px-6 py-24">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-14 text-center"
                >
                    <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                        How it works
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.4, delay: i * 0.12 }}
                            className="relative"
                        >
                            <span className="font-mono text-3xl font-medium text-white/10">
                                {step.number}
                            </span>
                            <h3 className="mt-2 text-base font-medium text-neutral-100">
                                {step.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}