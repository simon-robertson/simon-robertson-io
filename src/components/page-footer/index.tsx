import { getChanges } from "@/network/database"

import { Fragment } from "react"

export async function PageFooter() {
    const changes = await getChanges()

    const changeNodes = changes.map((record) => {
        return (
            <Fragment key={record.date}>
                <dt>{record.date}</dt>
                <dd>{record.content}</dd>
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
