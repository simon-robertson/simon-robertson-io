import { Stars } from "@/components/icons/stars"

import { PageSection } from "@/components/page-section"

import { getRecommendations } from "@/network/database"

export async function RecommendationsSection() {
    const recommendations = await getRecommendations()

    const recommendationNodes = recommendations.map((record) => {
        return (
            <blockquote key={record.source} cite={record.source}>
                <div dangerouslySetInnerHTML={{ __html: record.content }} />
                <nav>
                    <a href={record.source}>{record.author}</a>
                </nav>
            </blockquote>
        )
    })

    return (
        <PageSection heading="Recommendations" edge={<Stars />}>
            <p>
                The following quotes are a few recommendations from LinkedIn that I have received
                from people I have had the pleasure of working with.
            </p>
            {recommendationNodes}
        </PageSection>
    )
}
