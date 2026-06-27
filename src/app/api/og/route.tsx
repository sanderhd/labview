import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title")?.slice(0, 80) || "Untitled lab"
    const author = searchParams.get("author")?.slice(0, 40) || ""
    const nodeCount = searchParams.get("nodes") || ""

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#0a0a0a",
                    backgroundImage:
                        "radial-gradient(circle at 25px 25px, #262626 2%, transparent 0%), radial-gradient(circle at 75px 75px, #262626 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                    padding: "80px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 28,
                    }}
                >
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#34d399",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 22,
                            color: "#737373",
                            fontFamily: "monospace",
                            textTransform: "uppercase",
                            letterSpacing: 2,
                        }}
                    >
                        LabView Topology
                    </span>
                </div>

                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 600,
                        color: "#f5f5f5",
                        lineHeight: 1.15,
                        marginBottom: 20,
                    }}
                >
                    {title}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {author && (
                        <span style={{ fontSize: 28, color: "#a3a3a3" }}>
                            door {author}
                        </span>
                    )}
                    {author && nodeCount && (
                        <span style={{ fontSize: 28, color: "#525252" }}>•</span>
                    )}
                    {nodeCount && (
                        <span
                            style={{
                                fontSize: 28,
                                color: "#a3a3a3",
                                fontFamily: "monospace",
                            }}
                        >
                            {nodeCount} nodes
                        </span>
                    )}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}