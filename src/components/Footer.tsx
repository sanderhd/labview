import Link from "next/link"
import { GitBranch } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-white/10 px-6 py-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
                <span className="font-mono text-xs text-neutral-600">
                    labview — self-hosted homelab visualizer
                </span>
                <div className="flex items-center gap-5">
                    <Link
                        href="https://github.com/jouw-gebruikersnaam/labview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                        <GitBranch className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-6" />
                        GitHub
                    </Link>
                    <Link
                        href="/build"
                        className="group flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                        Open editor
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}