import { Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { NotFound } from "../components/NotFound";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../features/Dashboard/components/Dashboard";

const AuthorizedApp = () => (
  <>
    <Suspense
      fallback={
        <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      }
    >
      <Outlet />
    </Suspense>
  </>
);

export const protectedRoutes = [
  {
    path: "/",
    element: <AuthorizedApp />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      // { path: '/loans/*', element: <LoansRoutes /> },
      // { path: '/finance', element: <Finance /> },
      // { path: '/settings', element: <Settings /> },
      // { path: '/profile', element: <ProfileWrapper /> },
      // { path: '/notifications', element: <Notifications /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
