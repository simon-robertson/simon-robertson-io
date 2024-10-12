import { ReactNode } from "react"

type Props = {
    readonly heading?: string
    readonly headingLink?: string
    readonly description?: string
    readonly children: ReactNode
    readonly edge?: ReactNode
    readonly tags?: string[]
}

export function PageSectionArticle({
    heading,
    headingLink,
    description,
    children,
    edge,
    tags,
}: Props) {
    let edgeNode: ReactNode = null
    let headingNode: ReactNode = null
    let descriptionNode: ReactNode = null
    let footerNode: ReactNode = null

    if (edge !== undefined) {
        edgeNode = <div className="col-min edge">{edge}</div>
    }

    if (heading !== undefined) {
        if (headingLink !== undefined) {
            headingNode = (
                <h2>
                    <a href={headingLink}>{heading}</a>
                </h2>
            )
        } else {
            headingNode = <h2>{heading}</h2>
        }
    }

    if (description !== undefined) {
        descriptionNode = <em>{description}</em>
    }

    if (tags !== undefined) {
        const tagNodes = tags.map((tag) => {
            return (
                <span key={tag} className="tag">
                    {tag}
                </span>
            )
        })

        footerNode = <footer className="tags">{tagNodes}</footer>
    }

    return (
        <article className="row section">
            {edgeNode}
            <div className="col-mid">
                <header className="section-header">
                    {headingNode}
                    {descriptionNode}
                </header>
                {children}
                {footerNode}
            </div>
        </article>
    )
}
