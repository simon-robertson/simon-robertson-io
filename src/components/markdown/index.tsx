import { Content } from "@/components/content"

import { HOST } from "@/environment"

import { parseMarkdown } from "@/helpers/markdown"

import { notFound } from "next/navigation"

type Props = {
    /**
     * The URL of the source markdown file, within the "/source" directory,
     * without the file extension.
     *
     * Example "/blog/markdown-test"
     */
    readonly source: string
}

export async function Markdown({ source }: Props) {
    const response = await fetch(HOST + "/source" + source + ".md")

    if (response.status >= 400) {
        return notFound()
    }

    const contents = await response.text()
    const parsed = await parseMarkdown(contents)

    return <Content content={parsed} />
}
