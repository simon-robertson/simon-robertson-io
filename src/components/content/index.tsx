type Props = {
    readonly source: string
}

export function Content({ source: content }: Props) {
    return <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
}
