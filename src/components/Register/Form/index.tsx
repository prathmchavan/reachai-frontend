"use client";

import { MainInput } from "@/components/Global";
import { RegisterContext, TSignupKeys } from "@/context";
import { Email, Password, Person, PersonPinCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { register } = useContext(RegisterContext);

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (key: TSignupKeys, val: string) => {
    setData((d) => ({ ...d, [key]: val }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await register(data.name, data.username, data.password);
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
          placeholder="Name"
          fieldName="name"
          type="text"
          handleChange={handleChange}
        />
        <MainInput
          icon={<PersonPinCircle />}
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
          Register
        </LoadingButton>
      </Box>
    </form>
  );
};
