import { IS_PRODUCTION } from "@/environment"

import nodeFs from "node:fs"

import nodePath from "node:path"

type ChangeData = {
    readonly date: string
    readonly content: readonly string[]
}

type ChangeDataCollection = readonly ChangeData[]

type PageData = {
    readonly path: string
    readonly group: string
    readonly title: string
    readonly description: string
    readonly keywords: readonly string[]
}

type PageDataCollection = readonly PageData[]

type RecommandationData = {
    readonly author: string
    readonly source: string
    readonly content: readonly string[]
}

type RecommendationDataCollection = readonly RecommandationData[]

const cache = new Map<string, unknown>()

/**
 * Loads a file from the root `data` directory.
 */
async function fetchData<T>(path: string): Promise<T> {
    if (IS_PRODUCTION && cache.has(path)) {
        return cache.get(path) as T
    }

    const filePath = nodePath.join(process.cwd(), "data", path)
    const fileContents = nodeFs.readFileSync(filePath)

    const data = JSON.parse(fileContents.toString())

    cache.set(path, data)

    return data
}

export async function fetchChanges(): Promise<ChangeDataCollection> {
    return fetchData("changes.json")
}

export async function fetchPages(): Promise<PageDataCollection> {
    return fetchData("pages.json")
}

export async function fetchPagesByGroup(group: string): Promise<PageDataCollection> {
    const pages = await fetchPages()

    return pages.filter((page) => {
        return page.group === group
    })
}

export async function fetchPageByPath(path: string): Promise<PageData | null> {
    const pages = await fetchPages()

    return (
        pages.find((page) => {
            return page.path === path
        }) ?? null
    )
}

export async function fetchRecommendations(): Promise<RecommendationDataCollection> {
    return fetchData("recommendations.json")
}
