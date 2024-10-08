type Props = {
    readonly heading: string
}

export function PageHeader({ heading }: Props) {
    return (
        <header className="row">
            <div className="col-mid page-header" data-shadow-source="left">
                <h1>{heading}</h1>
            </div>
            <div className="col-mid-max background" id="page-header-background" />
        </header>
    )
}
