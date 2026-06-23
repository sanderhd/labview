"use client";

import { useState } from "react";
import * as Icons from "simple-icons"
import { Command } from "cmdk"

const ICONS = Object.values(Icons)
    .filter((i: any) => i?.slug)

type Props = {
    value?: string
    onChange: (slug: string) => void
}

export default function IconPicker({ value, onChange }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-2 py-1 text-sm"
                onClick={() => setOpen((v) => !v)}
            >
                {value ?? "Select icon"}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-72 rounded-lg border border-white/10 bg-neutral-900">
                    <Command>
                        <Command.Input
                            placeholder="Search icons..."
                            className="w-full bg-transparent p-2 text-sm outline-none"
                        />

                        <Command.List className="max-h-60 overflow-auto p-2">
                            {ICONS.map((icon: any) => (
                                <Command.Item
                                    key={icon.slug}
                                    value={icon.slug}
                                    onSelect={() => {
                                        onChange(icon.slug)
                                        setOpen(false)
                                    }}
                                    className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-white/10"
                                >
                                    {icon.title}
                                </Command.Item>
                            ))}
                        </Command.List>
                    </Command>
                </div>
            )}
        </div>
    )
}