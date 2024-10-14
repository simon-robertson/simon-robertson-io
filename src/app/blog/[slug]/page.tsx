import { Markdown } from "@/components/markdown"
import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"
import { PageSectionArticle } from "@/components/page-section-article"

import { getPagesByGroup } from "@/network/database"

import { fetchPageByPath } from "@/system/data"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Fragment } from "react"

type Props = {
    readonly params: {
        readonly slug: string
    }
}

export default async function Page({ params }: Props) {
    const path = "/blog/" + params.slug

    const page = await fetchPageByPath(path)

    if (page === null) {
        notFound()
    }

    return (
        <Fragment>
            <PageHeader heading={page.title} />
            <PageContents>
                <PageSectionArticle tags={page.keywords}>
                    <Markdown source={path} />
                </PageSectionArticle>
            </PageContents>
        </Fragment>
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await fetchPageByPath("/blog/" + params.slug)

    if (page === null) {
        notFound()
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords.join(","),
    }
}

export async function generateStaticParams(): Promise<Props["params"][]> {
    const pages = await getPagesByGroup("blog")

    return pages.map((page) => {
        return {
            slug: page.path.substring(6),
        }
    })
}
