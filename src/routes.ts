import { Metadata } from "next"

type Route = {
    readonly path: string
    readonly title: string
    readonly parent: string
    readonly description: string
}

export const routes: Route[] = [
    {
        path: "/",
        title: "Simon Robertson",
        parent: "",
        description:
            "A creator of web-based software, with a passion for creating interesting or innovative web-based applications.",
    },
]

export function getMetadataForPath(path: string): Metadata {
    const route = routes.find((route) => {
        return route.path === path
    })

    if (route === undefined) {
        return {}
    }

    return {
        title: route.title,
        description: route.description,
    }
}

export function getBaseRoutes(): Route[] {
    return routes.filter((route) => {
        return route.parent === ""
    })
}
