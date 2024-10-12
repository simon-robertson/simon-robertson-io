import { getPagesByGroup } from "@/network/database"

export async function PageNavigation() {
    const pages = await getPagesByGroup("root")

    const linkNodes = pages.map((page) => {
        let title = page.title

        if (page.path === "/") {
            title = "Home"
        }

        return (
            <a key={page.path} href={page.path}>
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
