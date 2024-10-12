import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"
import { PageSectionArticle } from "@/components/page-section-article"

import { getPage, getPagesByGroup } from "@/network/database"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Fragment } from "react"

export default async function Page() {
    const page = await getPage("/blog")

    if (page === null) {
        notFound()
    }

    const blogPages = await getPagesByGroup("blog")
    const blogNodes = blogPages.map((record) => {
        return (
            <PageSectionArticle
                key={record.id}
                heading={record.title}
                headingLink={record.path}
                tags={record.keywords.split(",").map((value) => value.trim())}
            >
                <p>{record.description}</p>
            </PageSectionArticle>
        )
    })

    return (
        <Fragment>
            <PageHeader heading={page.title} />
            <PageContents>{blogNodes}</PageContents>
        </Fragment>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage("/blog")

    if (page === null) {
        notFound()
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords,
    }
}
