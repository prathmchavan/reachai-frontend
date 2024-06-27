import { RegisterProvider } from "@/context"
import { ReactNode } from "react"

export const RegisterLayout = ({children}: {children: ReactNode}) => {
    return (
        <RegisterProvider>
            {children}
        </RegisterProvider>
    )
}