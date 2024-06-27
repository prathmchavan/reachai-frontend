"use client";

import { MainInput } from "@/components/Global";
import { LoginContext, TLoginKeys } from "@/context";
import { Email, Password, Person } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const { login } = useContext(LoginContext);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (key: TLoginKeys, val: string) => {
    setData((d) => ({ ...d, [key]: val }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login(data.username, data.password);
    setLoading(false);
  };

  return (
    <form method="POST" onSubmit={submitForm}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <MainInput
          icon={<Person />}
          placeholder="Username"
          fieldName="username"
          type="text"
          handleChange={handleChange}
        />
        <MainInput
          icon={<Password />}
          placeholder="Password"
          fieldName="password"
          type="password"
          handleChange={handleChange}
        />
        <LoadingButton
          sx={{
            backgroundColor: "white",
            textTransform: "capitalize",
            ":hover": {
              backgroundColor: "white",
            },
          }}
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
    </form>
  );
};
