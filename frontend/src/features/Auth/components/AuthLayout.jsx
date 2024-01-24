import { Box } from "@chakra-ui/react";

export const AuthLayout = ({ children }) => (
  <Box height="100vh" flexDirection="column" display="flex">
    {children}
  </Box>
);
