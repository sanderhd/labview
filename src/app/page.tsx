import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UsedByBar from "@/components/UsedByBar";
import LabPreview from "@/components/LabPreview";
import { GitBranch, Star, Download, Network } from "lucide-react"
import CTASection from "@/components/CTA";

export default function Home() {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />

            <Hero />

            <UsedByBar
                items={[
                    { label: "Open source", icon: <GitBranch className="h-4 w-4" /> },
                    { label: "No account needed", icon: <Star className="h-4 w-4" /> },
                    { label: "Export to JSON", icon: <Download className="h-4 w-4" /> },
                    { label: "Unlimited nodes", icon: <Network className="h-4 w-4" /> },
                ]}
            />

            <section className="mx-auto max-w-5xl px-6 py-16">
                <h2 className="mb-3 text-center text-2xl font-semibold text-neutral-100">
                    Try it now!
                </h2>
                <p className="mb-8 text-center text-neutral-400">
                    Drag, connect, and play - this is a live mini version of our editor!
                </p>
                <div className="h-105">
                    <LabPreview />
                </div>
            </section>

            <Features />
            <HowItWorks />

            <CTASection
                title="Build your own topology"
                description="Start with a blank canvas or begin with an example to get up and running quickly."
                primaryHref="/build"
                primaryLabel="Start building"
                secondaryHref="/build?example=true"
                secondaryLabel="View example"
            />

            <Footer />
        </div>
    )
}