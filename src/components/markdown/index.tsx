import { Content } from "@/components/content"

import { parseMarkdown } from "@/helpers/markdown"

import fs from "node:fs"

import path from "node:path"

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
    const sourcePath = path.join(process.cwd(), "public/source" + source + ".md")
    const sourceContents = fs.readFileSync(sourcePath)
    const parsed = await parseMarkdown(sourceContents.toString())

    return <Content content={parsed} />
}
