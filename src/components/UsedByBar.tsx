type UsedByItem = {
    label: string
    icon?: React.ReactNode
}

type UsedByBarProps = {
    heading?: string
    items: UsedByItem[]
}

export default function UsedByBar({ heading = "Trusted by homelabbers from all over the world", items}: UsedByBarProps) {
    return (
        <section className="mx-auto max-w-4xl px-6 py-10">
            <p className="mb-5 text-center font-mono text-xs uppercase tracking-wide text-neutral-500">
                {heading}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                        {item.icon}
                        {item.label}
                    </div>
                ))}
            </div>
        </section>
    )
}