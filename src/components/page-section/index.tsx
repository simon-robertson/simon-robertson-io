import { ReactNode } from "react"

type Props = {
    readonly heading: string
    readonly children: ReactNode
    readonly edge?: ReactNode
}

export function PageSection({ heading, children, edge }: Props) {
    return (
        <section className="row section">
            {edge ? <div className="col-min edge">{edge}</div> : null}
            <div className="col-mid">
                <header className="section-header">
                    <h2>{heading}</h2>
                </header>
                {children}
            </div>
        </section>
    )
}
