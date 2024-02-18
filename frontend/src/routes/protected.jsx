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
            color="primary.500"
            size="xl"
            speed="0.65s"
            thickness="4px"
            emptyColor="gray.200"
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
