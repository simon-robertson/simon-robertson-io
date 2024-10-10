import { PageFooter } from "@/components/page-footer"
import { PageNavigation } from "@/components/page-navigation"
import { PageNavigationExternal } from "@/components/page-navigation-external"

import { Metadata, Viewport } from "next"

import { Inter } from "next/font/google"

import Script from "next/script"

import { ReactNode } from "react"

import "@/globals.css"

export const metadata: Metadata = {}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
}

type Props = {
    readonly children?: ReactNode
}

const fontMain = Inter({
    variable: "--font-main",
    weight: ["300", "400", "500"],
    subsets: ["latin-ext"],
})

export default function Layout({ children }: Props) {
    return (
        <html lang="en" className={fontMain.variable}>
            <body>
                <PageNavigation />
                {children}
                <PageNavigationExternal />
                <PageFooter />
                <Script src="/modules/header.js" type="module" crossOrigin="anonymous" />
                <Script src="/modules/shadows.js" type="module" crossOrigin="anonymous" />
            </body>
        </html>
    )
}
