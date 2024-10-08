import { ReactNode } from "react"

type Props = {
    readonly children: ReactNode
}

export function PageContents({ children }: Props) {
    return children
}
