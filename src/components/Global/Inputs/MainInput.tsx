"use client";

import { TLoginKeys, TSignupKeys } from "@/context";
import { Box, Icon, InputBase } from "@mui/material";
import { useState } from "react";

export const MainInput = ({ placeholder, required=false, icon, type = "text", fieldName, handleChange }: { placeholder: string, fieldName: string, required?: boolean, icon?: JSX.Element, type?: string, handleChange?: (key: any , value: string) => void }) => {

    const [focused, setFocused] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <InputBase
        sx={{
          borderBottom: "1px solid #D2D2D2",
          width: "100%",
          pb: "12px",
          pl: "12px",
          color: "white"
        }}
        name={fieldName}
        startAdornment={icon && <Icon sx={{ mr: "12px", color: !focused ? "#D2D2D2" : "white" }}>{icon}</Icon>}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type}
        onChange={(e) => handleChange && handleChange(e.target.name as TSignupKeys, e.target.value)}
      />
    </Box>
  );
};
