import { fetchPagesByGroup } from "@/system/data"

export async function PageNavigation() {
    const pages = await fetchPagesByGroup("root")

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
