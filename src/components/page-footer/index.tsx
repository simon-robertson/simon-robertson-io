import { fetchChanges } from "@/network/actions/changes"

import { Fragment } from "react"

export async function PageFooter() {
    const changes = await fetchChanges()

    const changeNodes = changes.map((info) => {
        return (
            <Fragment key={info.date}>
                <dt>{info.date}</dt>
                <dd>{info.description}</dd>
            </Fragment>
        )
    })

    return (
        <aside className="row no-border">
            <div className="col-mid page-footer">
                <div>
                    <h3>Contact</h3>
                    <dl>
                        <dt>Email</dt>
                        <dd>hello@simon-robertson.io</dd>
                    </dl>
                </div>
                <div>
                    <h3>Changes</h3>
                    <dl>{changeNodes}</dl>
                </div>
            </div>
        </aside>
    )
}
