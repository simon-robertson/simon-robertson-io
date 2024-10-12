type Props = {
    readonly content: string
}

export function Content({ content }: Props) {
    return <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
}
