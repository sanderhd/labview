"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
                <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-xs next-neutral-400">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                    </span>
                    node unreachable
                </div>

                <h1 className="text-center font-mono text-7xl font-medium tracking-tight text-neutral-50 sm:text-8xl">
                    404
                </h1>

                <p className="mt-5 max-w-sm text-center text-base leading-relaxed text-neutral-400">
                    This route doesn't resolve to anything in the topology.
                    It may have been removed, renamed or never deployed.
                </p>

                <div className="mt-9 flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90"
                        >
                            Back to Home
                        </Link>
                </div>

                            <div className="mt-20 w-full max-w-md">
                    <svg
                        viewBox="0 0 400 160"
                        className="w-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* broken connection */}
                        <g stroke="#404040" strokeWidth="1.5">
                            <line x1="80" y1="80" x2="170" y2="80" />
                        </g>
                        <g stroke="#404040" strokeWidth="1.5" strokeDasharray="2 6" opacity="0.6">
                            <line x1="230" y1="80" x2="320" y2="80" />
                        </g>
    
                        {/* break marker */}
                        <g stroke="#737373" strokeWidth="1.5">
                            <line x1="195" y1="70" x2="205" y2="90" />
                            <line x1="205" y1="70" x2="195" y2="90" />
                        </g>
    
                        {/* nodes */}
                        <g>
                            <circle cx="80" cy="80" r="5" fill="#34d399" />
                            <text
                                x="80"
                                y="106"
                                textAnchor="middle"
                                className="font-mono"
                                fontSize="10"
                                fill="#a3a3a3"
                            >
                                you
                            </text>
                        </g>
                        <g>
                            <circle cx="320" cy="80" r="5" fill="#525252" />
                            <text
                                x="320"
                                y="106"
                                textAnchor="middle"
                                className="font-mono"
                                fontSize="10"
                                fill="#737373"
                            >
                                ???
                            </text>
                        </g>
                    </svg>
                </div>
            </section>
        </div>
    )
}