import { ReactNode } from "react"

type Props = {
    readonly children: ReactNode
}

export function Icon({ children }: Props) {
    return <div className="icon">{children}</div>
}
