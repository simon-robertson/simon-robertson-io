import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"

import { ShowcaseSection } from "@/components/sections/showcase-section"

import { fetchShowcaseArticles } from "@/network/actions/showcase"

import { getMetadataForPath } from "@/routes"

import { Fragment } from "react"

export const metadata = getMetadataForPath("/showcase")

export default async function Page() {
    const showcaseArticles = await fetchShowcaseArticles()

    const sectionNodes = showcaseArticles.map((showcase) => {
        return <ShowcaseSection key={showcase.slug} showcase={showcase} />
    })

    return (
        <Fragment>
            <PageHeader heading="Showcase" />
            <PageContents>{sectionNodes}</PageContents>
        </Fragment>
    )
}
