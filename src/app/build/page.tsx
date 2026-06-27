import type { Metadata } from "next";
import LabCanvas from "@/components/LabCanvas";
import { decompressFromEncodedURIComponent } from "lz-string";
import { Suspense } from "react";

type Props = {
    searchParams: Promise<{ share?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { share } = await searchParams

    if (!share) {
        return {
            title: "LabView — Homelab Topology Builder",
            description: "Build and share your homelab's topology.",
        }
    }

    let title = "Shared topology"
    let author = ""
    let nodeCount = 0

    try {
        const json = decompressFromEncodedURIComponent(share)
        if (json) {
            const parsed = JSON.parse(json)
            title = parsed.meta?.title || title
            author = parsed.meta?.author || author
            nodeCount = Array.isArray(parsed.nodes) ? parsed.nodes.length : 0
        }
    } catch {

    }

    const ogParams = new URLSearchParams({
        title,
        author,
        nodes: nodeCount.toString(),
    })

    return {
        title: `${title} — LabView`,
        description: author ? `Topology shared by ${author}` : "View this shared topology",
        openGraph: {
            title,
            description: author ? `by ${author}` : undefined,
            images: [`/api/og?${ogParams.toString()}`],
        },
        twitter: {
            card: "summary_large_image",
            title,
            images: [`/api/og?${ogParams.toString()}`],
        },
    }
}

export default function BuildPage() {
    return (
        <Suspense fallback={null}>
            <LabCanvas />
        </Suspense>
    )
}