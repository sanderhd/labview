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

                    <Link 
                        href="https://lab.sander.tf/build?share=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"
                        className="group flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                        View my example
                    </Link>
                </div>
            </div>
        </footer>
    )
}