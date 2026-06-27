import LabCanvas from "@/components/LabCanvas"
import { Suspense } from "react"

export default function EditorPage() {
    return (
        <Suspense fallback={null}>
            <LabCanvas />
        </Suspense>
    )
}