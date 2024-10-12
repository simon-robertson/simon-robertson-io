import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"

import { IntroductionSection } from "@/components/sections/introduction-section"
import { PreferencesSection } from "@/components/sections/preferences-section"
import { RecommendationsSection } from "@/components/sections/recommendations-section"

import { getMetadataForPage } from "@/network/database"

import { Fragment } from "react"

export const metadata = getMetadataForPage("/")

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
