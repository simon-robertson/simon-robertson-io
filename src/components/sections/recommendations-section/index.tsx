import { Stars } from "@/components/icons/stars"

import { PageSection } from "@/components/page-section"

import { fetchRecommendations } from "@/system/data"

export async function RecommendationsSection() {
    const recommendations = await fetchRecommendations()

    const recommendationNodes = recommendations.map((record) => {
        const paragraphNodes = record.content.map((content, index) => {
            return <p key={index}>{content}</p>
        })

        return (
            <blockquote key={record.source} cite={record.source}>
                <div className="content">{paragraphNodes}</div>
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
