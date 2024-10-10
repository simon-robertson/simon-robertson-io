import { PageSectionArticle } from "@/components/page-section-article"

import { Showcase } from "@/network/actions/showcase"

type Props = {
    readonly showcase: Showcase
}

export async function ShowcaseSection({ showcase }: Props) {
    return (
        <PageSectionArticle heading={showcase.title}>
            <p>
                The following quotes are a few recommendations from LinkedIn that I have received
                from people I have had the pleasure of working with.
            </p>
        </PageSectionArticle>
    )
}
