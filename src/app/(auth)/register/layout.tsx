import { RegisterLayout } from "@/components"
import { ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <RegisterLayout>
            {children}
        </RegisterLayout>
    )
}

export default Layout;