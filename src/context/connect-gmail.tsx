"use client";

import { API_URL } from "@/constants";
import {
  fetchUserInfo,
  generateAccessToken,
  generateConnectUrl,
  getAccessToken,
  getFromLocalStorage,
  getOpenAIAPIKey,
  setToLocalStorage,
} from "@/lib";
import { IConnect } from "@/utils";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

/**
 * Context for managing connect-related state and functions.
 */
export const ConnectContext = createContext<IConnect>({
  saveOpenAPIKey: () => {},
  connectGoogle: () => {},
  loading: false,
});

/**
 * Provides the connect context to its children components.
 * @param {Object} props - The props for the ConnectProvider component.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 */
export const ConnectProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Saves the OpenAI API key to local storage.
   * @param {string} key - The OpenAI API key to save.
   */
  const saveOpenAPIKey = (key: string) => {
    setToLocalStorage("openai-key", key);
    enqueueSnackbar({
      message: "OpenAI API saved successfully!",
      variant: "success",
    });
    location.replace("/");
    return;
  };

  /**
   * Handles the connect process.
   * @param {MouseEvent<HTMLButtonElement>} e - The mouse event object.
   */
  const connectGoogle: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      const url = await generateConnectUrl();
      window.open(url, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetches user data after successful connect.
   * @param {string | null} code - The authentication code.
   */
  const fetchUserData = async (code: string | null) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await generateAccessToken(code);
      const user = await fetchUserInfo(accessToken);
      console.log(user.email);
      const addProvToUser = await axios.post(
        `${API_URL}/provider/add-provider`,
        {
          provider: "gmail",
          email: user.email,
          accessToken,
          refreshToken,
        },
        {
          headers: {
            authorization: getFromLocalStorage("jwt"),
          },
        }
      );
      console.log(addProvToUser.data);
      enqueueSnackbar({ message: "Gmail added!", variant: "success" });
      // router.replace("/connect/add-api");
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        message: error.response ? error.response.data.error : error.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startup = () => {
      const jwt = getFromLocalStorage("jwt");
      if (!jwt) {
        enqueueSnackbar({ message: "Register first!", variant: "error" });
        router.replace("/register");
        return;
      }
      if (searchParams.get("code")) {
        fetchUserData(searchParams.get("code"));
      }
    };
    startup();
    // else if (accessToken && openAIKey) {
    //   router.replace("/");
    // } else if (accessToken && !openAIKey) {
    //   router.replace("/connect/add-api");
    // } else if (!accessToken && !openAIKey) {
    //   router.replace("/connect");
    // } else {
    //   return;
    // }
  }, []);

  return (
    <ConnectContext.Provider
      value={{
        saveOpenAPIKey,
        connectGoogle,
        loading,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
