"use client";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-xs text-neutral-400">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                </span>
                3 nodes online
            </div>

            <h1 className="max-w-3xl text-center text-5xl font-medium leading-[1.1] tracking-tight text-neutral-50 sm:text-6xl">
                Your homelab,
                <br />
                <span className="text-neutral-500">visualized.</span>
            </h1>

            <p className="mt-6 max-w-md text-center text-base leading-relaxed text-neutral-400">
                Add nodes and services, establish connections, and export 
                a topology that matches what's actually in your rack.
            </p>

            <div className="mt-9 flex items-center gap-3">
                <button className="rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90">
                    Open Editor
                </button>
                <button className="rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/6">
                    View Example
                </button>
            </div>
        </section>
    )
}