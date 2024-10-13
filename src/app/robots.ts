import { HOST } from "@/environment"

import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/source"],
        },
        sitemap: HOST + "/sitemap.xml",
    }
}
