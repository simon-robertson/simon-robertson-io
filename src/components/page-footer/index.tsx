import { fetchChanges } from "@/network/actions/chnages"

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
                <h3>Changes</h3>
                <dl>{changeNodes}</dl>
            </div>
        </aside>
    )
}
