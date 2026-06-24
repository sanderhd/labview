"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "simple-icons"
import { Command } from "cmdk"
import { ChevronDown, Search, Check } from "lucide-react";

const ICONS = Object.values(Icons)
    .filter((i: any) => i?.slug)

type Props = {
    value?: string
    onChange: (slug: string) => void
}

function IconGlyph({ icon }: { icon: any }) {
    if (!icon?.svg) return null
    const svg = icon.svg.replace(/<svg/, '<svg width="14" height="14" fill="currentColor"')
    return (
        <span
            className="flex h-5 w-5 shrink-0 items-center justify-center text-neutral-400"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}

export default function IconPicker({ value, onChange }: Props) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedIcon = ICONS.find((i: any) => i.slug === value)

    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    return (
        <div ref={containerRef} className="relative mb-3">
            <button
                onClick={() => setOpen((v) => !v)}
                className={`flex w-full items-center justify-between rounded-lg border bg-neutral-950 px-2.5 py-1.5 text-sm outline-none transition-colors ${
                    open
                        ? "border-emerald-400/40"
                        : "border-white/10 hover:border-white/20"
                }`}
            >
                <span className="flex items-center gap-2 truncate">
                    {selectedIcon ? (
                        <>
                            <IconGlyph icon={selectedIcon} />
                            <span className="truncate text-neutral-100">
                                {selectedIcon.title}
                            </span>
                        </>
                    ) : (
                        <span className="text-neutral-500">Select Icon</span>
                    )}
                </span>
                <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 text-neutral-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-950 shadow-xl shadow-black/40">
                    <Command>
                        <div className="flex items-center gap-2 border-b border-white/10 px-2.5">
                            <Search className="h-3.5 w.3-5 shrink-0 text-neutral-500" />
                            <Command.Input
                                placeholder="Search icons..."
                                className="w-full bg-transparent p-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-600"
                            />
                        </div>

                        <Command.List className="max-h-56 overflow-auto p-1.5">
                            <Command.Empty className="px-2.5 py-4 text-center text-xs  text-neutral-600">
                                No icons found.
                            </Command.Empty>

                            {ICONS.map((icon: any) => {
                                const isSelected = icon.slug === value
                                return (
                                    <Command.Item
                                        key={icon.slug}
                                        value={icon.slug}
                                        onSelect={() => {
                                            onChange(icon.slug)
                                            setOpen(false)
                                        }}
                                        className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors data-[selected=true]:bg-white/10 ${
                                            isSelected
                                                ? "text-emerald-300"
                                                : "text-neutral-300"
                                        }`}
                                    >
                                        <IconGlyph icon={icon} />
                                        <span className="flex-1 truncate">{icon.title}</span>
                                        {isSelected && (
                                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                        )}
                                    </Command.Item>
                                )
                            })}
                        </Command.List>
                    </Command>
                </div>
            )}
        </div>
    )
}