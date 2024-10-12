import { TURSO_DATABASE, TURSO_TOKEN } from "@/environment"

import { Client, ResultSet, createClient } from "@libsql/client"

import { Metadata } from "next"

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

export async function getChanges(): Promise<ChangeRecord[]> {
    const statement = `SELECT * FROM "changes" ORDER BY "id" DESC`

    const results = await getClientInstance().execute(statement)

    return normalizeResults(results)
}

export async function getMetadataForPage(path: string): Promise<Metadata> {
    const statement = `SELECT * FROM "pages" WHERE "path" = ? LIMIT 1`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [path],
    })

    const record = normalizeResults<PageRecord>(results)[0]

    return {
        title: record.title,
        description: record.description,
        keywords: record.keywords,
    }
}

export async function getPages(): Promise<PageRecord[]> {
    const statement = `SELECT * FROM "pages" ORDER BY "id" ASC`

    const results = await getClientInstance().execute(statement)

    return normalizeResults(results)
}

export async function getPagesByGroup(group: string): Promise<PageRecord[]> {
    const statement = `SELECT * FROM "pages" WHERE "group" = ? ORDER BY "id" ASC`

    const results = await getClientInstance().execute({
        sql: statement,
        args: [group],
    })

    return normalizeResults(results)
}

export async function getRecommendations(): Promise<RecommendationRecord[]> {
    const statement = `SELECT * FROM "recommendations" ORDER BY "id" ASC`

    const results = await getClientInstance().execute(statement)

    return normalizeResults(results)
}
