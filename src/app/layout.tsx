import type { Metadata } from 'next';
import Script from "next/script";
import { Poppins } from "next/font/google"
import "./globals.css";
import NavBar from '@/components/NavBar';
import { ToastProvider } from '@/components/Toast';
import { ConfirmProvider } from '@/components/Modals/ConfirmModal';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins"
})

export const metadata: Metadata = {
    title: "Lab View",
    description: "Visualize your HomeLab with Lab View!",

    openGraph: {
        title: "Lab View",
        description: "Visualize your HomeLab with Lab View!",
        url: "https://lab.sander.tf/",
        siteName: "LabView",
        images: [
            {
                url: "https://lab.sander.tf/banner.png",
                width: 1200,
                height: 630,
                alt: "Lab View Banner"
            },
        ],
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "Lab View",
        description: "Visualize your HomeLab with Lab View!",
        images: [
            "https://lab.sander.tf/banner.png"
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <NavBar />

                <ToastProvider>
                    <ConfirmProvider>{children}</ConfirmProvider>
                </ToastProvider>

                <Script
                    async
                    src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
                    data-website-id={
                        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
                    }
                />

            </body>
        </html>
    );
}