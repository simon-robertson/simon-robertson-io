import { marked } from "marked"

type Props = {
    readonly content: string
}

export async function Markdown({ content }: Props) {
    const parsed = await marked(content, {
        async: true,
    })

    return <div className="markdown" dangerouslySetInnerHTML={{ __html: parsed }} />
}
