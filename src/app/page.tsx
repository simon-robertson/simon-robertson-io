import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"

import { IntroductionSection } from "@/components/sections/introduction-section"
import { PreferencesSection } from "@/components/sections/preferences-section"
import { RecommendationsSection } from "@/components/sections/recommendations-section"

import { getPage } from "@/network/database"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Fragment } from "react"

export default function Page() {
    return (
        <Fragment>
            <PageHeader heading="A creator of web-based applications" />
            <PageContents>
                <IntroductionSection />
                <PreferencesSection />
                <RecommendationsSection />
            </PageContents>
        </Fragment>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage("/")

    if (page === null) {
        notFound()
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords,
    }
}
