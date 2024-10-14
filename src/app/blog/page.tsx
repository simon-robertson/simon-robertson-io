import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"
import { PageSectionArticle } from "@/components/page-section-article"

import { fetchPageByPath, fetchPagesByGroup } from "@/system/data"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Fragment } from "react"

export default async function Page() {
    const page = await fetchPageByPath("/blog")

    if (page === null) {
        notFound()
    }

    const blogPages = await fetchPagesByGroup("blog")
    const blogNodes = blogPages
        .map((record) => {
            return (
                <PageSectionArticle
                    key={record.path}
                    heading={record.title}
                    headingLink={record.path}
                    tags={record.keywords}
                >
                    <p>{record.description}</p>
                </PageSectionArticle>
            )
        })
        .reverse()

    return (
        <Fragment>
            <PageHeader heading={page.title} />
            <PageContents>{blogNodes}</PageContents>
        </Fragment>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await fetchPageByPath("/blog")

    if (page === null) {
        notFound()
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords.join(","),
    }
}
