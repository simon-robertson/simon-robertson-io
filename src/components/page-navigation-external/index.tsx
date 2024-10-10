import { PlayArrow } from "@/components/icons/play-arrow"

export function PageNavigationExternal() {
    return (
        <nav className="row">
            <div
                className="col-mid page-navigation page-navigation-external"
                data-shadow-source="right"
            >
                <a
                    className="with-icon"
                    href="https://www.linkedin.com/in/simon-robertson-9459a7292"
                >
                    <PlayArrow /> LinkedIn
                </a>
                <a className="with-icon" href="https://github.com/simon-robertson">
                    <PlayArrow /> GitHub
                </a>
            </div>
        </nav>
    )
}
