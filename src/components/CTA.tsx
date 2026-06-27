import Link from "next/link"
import { ArrowRight } from "lucide-react"

type CTASectionProps = {
    title: string
    description?: string
    primaryHref: string
    primaryLabel: string
    secondaryHref?: string
    secondaryLabel?: string
}

export default function CTASection({
    title,
    description,
    primaryHref,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
}: CTASectionProps) {
    return (
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="text-3xl font-semibold text-neutral-100 sm:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mx-auto mt-3 max-w-md text-neutral-400">
                    {description}
                </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                    href={primaryHref}
                    className="group flex items-center gap-1.5 rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90"
                >
                    {primaryLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {secondaryHref && secondaryLabel && (
                    <Link
                        href={secondaryHref}
                        className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
                    >
                        {secondaryLabel}
                    </Link>
                )}
            </div>
        </section>
    )
}