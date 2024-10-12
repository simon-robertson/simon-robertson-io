type Props = {
    readonly heading: string
    readonly disableAnimation?: boolean
}

export function PageHeader({ heading, disableAnimation }: Props) {
    return (
        <header className="row">
            <div className="col-mid page-header" data-shadow-source="left">
                <h1>{heading}</h1>
            </div>
            {disableAnimation !== true ? (
                <div className="col-mid-max background" id="page-header-background" />
            ) : null}
        </header>
    )
}
