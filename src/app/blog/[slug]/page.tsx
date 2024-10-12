import { Content } from "@/components/content"
import { PageContents } from "@/components/page-contents"
import { PageHeader } from "@/components/page-header"
import { PageSectionArticle } from "@/components/page-section-article"

import { getArticle, getPage } from "@/network/database"

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

    const page = await getPage(path)
    const article = await getArticle(path)

    if (page === null || article === null) {
        notFound()
    }

    return (
        <Fragment>
            <PageHeader heading={page.title} />
            <PageContents>
                <PageSectionArticle tags={page.keywords.split(",").map((value) => value.trim())}>
                    <Content content={article.content} />
                </PageSectionArticle>
            </PageContents>
        </Fragment>
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getPage("/blog/" + params.slug)

    if (page === null) {
        notFound()
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords,
    }
}
