"use client";

import { API_URL } from "@/constants";
import { getFromLocalStorage, setToLocalStorage } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ReactNode, createContext, useEffect } from "react";


export type TLoginKeys =  "username" | "password";

interface ILogin {
    login: (username: string, password: string) => Promise<void>
}

export const LoginContext = createContext<ILogin>({
    login: async () => {}
});


export const LoginProvider = ({children}: {children: ReactNode}) => {

    const router = useRouter();

    const login = async(username: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });
            setToLocalStorage("jwt", res.data.accessToken);
            enqueueSnackbar({message: "User registered!", variant: "success"});
            router.push("/add-provider");
            return;
        } catch (error) {
            console.log(error);
            enqueueSnackbar({message: "Cannot login user, please try again!", variant: "error"});
        }
    }

    useEffect(() => {
        if(getFromLocalStorage("jwt")){
            router.replace("/");
        }
    })

    return (
        <LoginContext.Provider
            value={{
                login
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}