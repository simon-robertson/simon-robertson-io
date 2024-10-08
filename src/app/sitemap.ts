import { constants } from "@/constants"
import { routes } from "@/routes"

import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    return routes.map((route) => {
        return {
            url: constants.host + route.path,
            priority: 1.0 - (route.path.split("/").length - 2),
            lastModified: now,
            changeFrequency: "weekly",
        }
    })
}
