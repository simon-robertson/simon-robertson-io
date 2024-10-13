import { IS_DEVELOPMENT, TURSO_DATABASE, TURSO_TOKEN } from "@/environment"

import { Client, ResultSet, createClient } from "@libsql/client"

type ArticleRecord = {
    readonly id: number
    readonly path: string
    readonly content: string
}

type ChangeRecord = {
    readonly id: number
    readonly date: string
    readonly content: string
}

type PageRecord = {
    readonly id: number
    readonly group: string
    readonly path: string
    readonly title: string
    readonly description: string
    readonly keywords: string
    readonly published: number
}

type RecommendationRecord = {
    readonly id: number
    readonly author: string
    readonly source: string
    readonly content: string
}

let client: Client | undefined

function getClientInstance(): Client {
    if (client === undefined) {
        client = createClient({
            url: TURSO_DATABASE,
            authToken: TURSO_TOKEN,
        })
    }

    return client
}

function normalizeResults<T>({ columns, rows }: ResultSet): T[] {
    const output: T[] = []

    for (let r = 0; r < rows.length; r++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const record = {} as any

        for (let c = 0; c < columns.length; c++) {
            record[columns[c]] = rows[r][c]
        }

        output[r] = record
    }

    return output
}

export async function getArticle(path: string): Promise<ArticleRecord | null> {
    const statement = `SELECT * FROM "articles" WHERE "path" = ? LIMIT 1`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [path],
    })

    const normalized = await normalizeResults<ArticleRecord>(results)

    return normalized[0] ?? null
}

export async function getChanges(): Promise<ChangeRecord[]> {
    const statement = `SELECT * FROM "changes" ORDER BY "id" DESC`

    const results = await getClientInstance().execute(statement)

    return normalizeResults(results)
}

export async function getPage(path: string): Promise<PageRecord | null> {
    const statement = `SELECT * FROM "pages" WHERE "path" = ? AND "published" > ? LIMIT 1`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [path, IS_DEVELOPMENT ? -1 : 0],
    })

    const normalized = await normalizeResults<PageRecord>(results)

    return normalized[0] ?? null
}

export async function getPages(): Promise<PageRecord[]> {
    const statement = `SELECT * FROM "pages" WHERE "published" > ? ORDER BY "id" ASC`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [IS_DEVELOPMENT ? -1 : 0],
    })

    return normalizeResults(results)
}

export async function getPagesByGroup(
    group: string,
    descending: boolean = false,
): Promise<PageRecord[]> {
    const statement = `SELECT * FROM "pages" WHERE "group" = ? AND "published" > ? ORDER BY "id" ${descending ? "DESC" : "ASC"}`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [group, IS_DEVELOPMENT ? -1 : 0],
    })

    return normalizeResults(results)
}

export async function getRecommendations(): Promise<RecommendationRecord[]> {
    const statement = `SELECT * FROM "recommendations" ORDER BY "id" ASC`

    const results = await getClientInstance().execute(statement)

    return normalizeResults(results)
}
