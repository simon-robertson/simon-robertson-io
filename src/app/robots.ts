import { constants } from "@/constants"

import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: constants.host + "/sitemap.xml",
    }
}
