import { getBaseRoutes } from "@/routes"

export function PageNavigation() {
    const routes = getBaseRoutes()

    const linkNodes = routes.map((route) => {
        let title = route.title

        if (route.path === "/") {
            title = "Home"
        }

        return (
            <a key={route.path} href={route.path}>
                {title}
            </a>
        )
    })

    return (
        <nav className="row">
            <div className="col-mid page-navigation">{linkNodes}</div>
        </nav>
    )
}
