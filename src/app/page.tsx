export default function Home() {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />

            <div className="text-center text-[clamp(3rem,12vw,10rem)] font-extrabold leading-none tracking-tighter text-white">
                Comming
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-neutral-500">
                    Soon
                </span>
            </div>
        </div>
    )
}