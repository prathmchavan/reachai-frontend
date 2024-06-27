import { ConnectProvider } from "@/context";
import { Box } from "@mui/material";
import { ReactNode } from "react";

/**
 * Layout component for wrapping children components with login context provider.
 * @param {Object} props - The props for the LoginLayout component.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 */
export const ConnectLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      {/* Provides the login context to its children components */}
      <ConnectProvider>{children}</ConnectProvider>
    </Box>
  );
};
