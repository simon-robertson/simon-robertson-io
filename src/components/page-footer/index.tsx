import { fetchChanges } from "@/system/data"

import { Fragment } from "react"

export async function PageFooter() {
    const changes = await fetchChanges()

    const changeNodes = changes
        .map((record) => {
            const paragraphNodes = record.content.map((content) => {
                return <p key={content}>{content}</p>
            })

            return (
                <Fragment key={record.date}>
                    <dt>{record.date}</dt>
                    <dd>{paragraphNodes}</dd>
                </Fragment>
            )
        })
        .reverse()

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
