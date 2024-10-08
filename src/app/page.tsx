import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"

import { IntroductionSection } from "@/components/sections/introduction-section"
import { PreferencesSection } from "@/components/sections/preferences-section"
import { RecommendationsSection } from "@/components/sections/recommendations-section"

import { Metadata } from "next"

import { Fragment } from "react"

export const metadata: Metadata = {
    title: "Simon Robertson",
    description:
        "I am a senior software developer (web) with a passion for creating interesting or innovative web-based applications.",
}

export default function Page() {
    return (
        <Fragment>
            <PageHeader heading="A creator of web-based things" />
            <PageContents>
                <IntroductionSection />
                <PreferencesSection />
                <RecommendationsSection />
            </PageContents>
        </Fragment>
    )
}
