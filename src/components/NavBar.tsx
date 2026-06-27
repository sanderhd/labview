"use client"

import { Server } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const links = [
    { href: "/", label: "Home" },
    { href: "/build", label: "Build" },
]

export default function NavBar() {
    const pathname = usePathname()

    return (
        <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
            <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/70 px-2 py-1.5 shadow-lg shadow-black/30 backdrop-blur-md">
                <Link
                    href="/"
                    className="mr-1 flex items-center justify-center rounded-full p-1.5 text-neutral-400 transition-colors hover:text-emerald-400"
                >
                    <Server className="h-4 w-4" />
                </Link>

                <div className="h-4 w-px bg-white/10" />

                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? "text-neutral-100"
                                    : "text-neutral-400 hover:text-neutral-200"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 rounded-full bg-white/10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative">{link.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}