import { LoginProvider } from "@/context"
import { ReactNode } from "react"

export const LoginLayout = ({children}: {children: ReactNode}) => {
    return (
        <LoginProvider>
            {children}
        </LoginProvider>
    )
}