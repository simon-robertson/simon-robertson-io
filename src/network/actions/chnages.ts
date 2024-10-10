type ChangeInfo = {
    readonly date: string
    readonly description: string
}

export async function fetchChanges(): Promise<ChangeInfo[]> {
    // TODO: Move these over to Turso
    return [
        {
            date: "2024-08-10",
            description: "Improved the UI.",
        },
        {
            date: "2024-08-08",
            description: "Switched the website over to NextJS in preparation for planned features.",
        },
        {
            date: "2024-08-06",
            description: "Released the initial version of the website.",
        },
    ]
}
