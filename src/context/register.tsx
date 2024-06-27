"use client";

import { API_URL } from "@/constants";
import { getFromLocalStorage, setToLocalStorage } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ReactNode, createContext, useEffect } from "react";


export type TSignupKeys = "name" | "username" | "password";

interface IRegister {
    register: (name: string, username: string, password: string) => Promise<void>
}

export const RegisterContext = createContext<IRegister>({
    register: async () => {}
});


export const RegisterProvider = ({children}: {children: ReactNode}) => {

    const router = useRouter();

    const register = async(name: string, username: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, {
                name,
                username,
                password
            });
            setToLocalStorage("jwt", res.data.accessToken);
            enqueueSnackbar({message: "User registered!", variant: "success"});
            router.push("/add-provider/gmail");
            return;
        } catch (error) {
            console.log(error);
            enqueueSnackbar({message: "Cannot register user, please try again!", variant: "error"});
        }
    }

    useEffect(() => {
        if(getFromLocalStorage("jwt")){
            router.replace("/");
        }
    })

    return (
        <RegisterContext.Provider
            value={{
                register
            }}
        >
            {children}
        </RegisterContext.Provider>
    )
}