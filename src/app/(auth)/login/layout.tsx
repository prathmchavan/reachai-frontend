import { LoginLayout } from "@/components"
import { ReactNode } from "react"


const Layout = ({children}: {children: ReactNode}) => {
    return (
        <LoginLayout>
            {children}
        </LoginLayout>
    )
}

export default Layout;