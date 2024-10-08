import { ReactNode } from "react"

type Props = {
    readonly heading: string
    readonly children: ReactNode
}

export function PageSection({ heading, children }: Props) {
    return (
        <section className="row section">
            <div className="col-mid">
                <header className="section-header">
                    <h2>{heading}</h2>
                </header>
                {children}
            </div>
        </section>
    )
}
