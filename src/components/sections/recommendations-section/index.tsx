import { PageSection } from "@/components/page-section"

import { fetchRecommendations } from "@/network/actions/recommendations"

export async function RecommendationsSection() {
    const recommendations = await fetchRecommendations()

    const recommendationNodes = recommendations.map((info) => {
        const lineNodes = info.contents
            .trim()
            .split(/\r?\n/)
            .map((line, index) => {
                return <p key={index}>{line.trim()}</p>
            })

        return (
            <blockquote key={info.source} cite={info.source}>
                {lineNodes}
                <nav>
                    <a href={info.source} target="linkedin">
                        {info.author}
                    </a>
                </nav>
            </blockquote>
        )
    })

    return (
        <PageSection heading="Recommendations">
            <p>
                The following quotes are a few recommendations from LinkedIn that I have received
                from people I have had the pleasure to work with.
            </p>
            {recommendationNodes}
        </PageSection>
    )
}
