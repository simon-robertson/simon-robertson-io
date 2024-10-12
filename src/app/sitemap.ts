import { HOST } from "@/environment"

import { getPages } from "@/network/database"

import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    const pages = await getPages()

    return pages.map((page) => {
        return {
            url: HOST + page.path,
            priority: 1.0 - (page.path.split("/").length - 2) * 0.2,
            lastModified: now,
            changeFrequency: "weekly",
        }
    })
}
