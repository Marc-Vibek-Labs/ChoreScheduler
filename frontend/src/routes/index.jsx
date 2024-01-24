import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { Flex, Spinner } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { NotFound } from "../components/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  const { data, isLoading } = {
    data: { status: "inactive" },
    isLoading: false,
  };

  if (isLoading) {
    return (
      <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" color="primary.500" size="xl" />
      </Flex>
    );
  }

  if (!data) return <NotFound />;

  const routes = data.status === "active" ? protectedRoutes : publicRoutes;
  const router = createBrowserRouter([...routes]);

  return (
    <AuthContext.Provider value={{ user: data }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
