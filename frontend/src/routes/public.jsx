import { Suspense, lazy } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { NotFound } from "../components/NotFound";
import { Navigate, Outlet } from "react-router-dom";
import { AuthRoutes } from "../features/Auth/routes/index";
import { AuthLayout } from "../features/Auth/components/AuthLayout";

const UnauthorizedApp = () => (
  <AuthLayout>
    <Suspense
      fallback={
        <Flex h="full" w="full" alignItems="center" justifyContent="center">
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            color="primary.500"
            emptyColor="gray.200"
          />
        </Flex>
      }
    >
      <Outlet />
    </Suspense>
  </AuthLayout>
);

export const publicRoutes = [
  {
    path: "/",
    element: <UnauthorizedApp />,
    errorElement: <NotFound />,
    children: [
      // { path: "/", element: <Navigate to="/auth/login" /> },
      { path: "/auth/*", element: <AuthRoutes /> },
      // { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
];
