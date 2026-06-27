"use client";

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
}

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-xs text-neutral-400"
            >
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Built for self hosters
            </motion.div>

            <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-3xl text-center text-5xl font-medium leading-[1.1] tracking-tight text-neutral-50 sm:text-6xl"
            >
                Your homelab,
                <br />
                <span className="text-neutral-500">visualized.</span>
            </motion.h1>

            <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 max-w-md text-center text-base leading-relaxed text-neutral-400"
            >
                Add nodes and services, establish connections and export
                a topology that matches what's actually in your rack.
            </motion.p>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-9 flex items-center gap-3"
            >
                <Link
                    href="/build"
                    className="group flex items-center gap-1.5 rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90"
                >
                    Open Editor
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                    href="/build?example=true"
                    className="rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/6"
                >
                    View Example
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-8 flex flex-col items-center gap-1.5 text-neutral-600"
            >
                <span className="font-mono text-[10px] uppercase tracking-wide">Scroll</span>
                <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-4 w-px bg-neutral-700"
                />
            </motion.div>
        </section>
    )
}