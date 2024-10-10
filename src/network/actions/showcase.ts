export type Showcase = {
    readonly slug: string
    readonly title: string
    readonly details: string
    readonly images: string[]
}

export async function fetchShowcaseArticles(): Promise<Showcase[]> {
    // TODO: Move these over to Turso
    return []
}
