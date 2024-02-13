import React from "react";
import { publicRoutes } from "./public";
import { storage } from "../utils/storage";
import { protectedRoutes } from "./protected";
import { Flex, Spinner } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import ToggleColorMode from "../components/ToggleColorMode";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useGetLoggedInUserDetails } from "../apis/getLoggedInUserDetails";

const AuthContext = createContext({
  user: {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be within AuthProvider");
  }

  return context;
};

export const AppRoutes = () => {
  const jwtToken = storage.getToken();
  const { data, isLoading } = useGetLoggedInUserDetails(jwtToken);

  if (isLoading) {
    return (
      <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" color="primary.500" size="xl" />
      </Flex>
    );
  }

  const routes = data ? protectedRoutes : publicRoutes;
  const router = createBrowserRouter([...routes]);

  return (
    <AuthContext.Provider value={{ user: data }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
