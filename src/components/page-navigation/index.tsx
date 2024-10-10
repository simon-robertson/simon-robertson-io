import { getBaseRoutes } from "@/routes"

export function PageNavigation() {
    const routes = getBaseRoutes()

    const linkNodes = routes.map((route) => {
        return (
            <a key={route.path} href={route.path}>
                {route.title}
            </a>
        )
    })

    return (
        <nav className="row">
            <div className="col-mid page-navigation">{linkNodes}</div>
        </nav>
    )
}
