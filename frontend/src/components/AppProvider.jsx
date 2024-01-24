import { Suspense } from "react";
import {
  Box,
  Flex,
  Button,
  VStack,
  Spinner,
  Heading,
  ChakraProvider,
} from "@chakra-ui/react";
import theme from "../theme/theme";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ErrorFallback = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDir="column" alignItems="center">
        <Heading size="lg">Oops, Something went wrong</Heading>
        <VStack spacing={4} mt={4}>
          <Button
            size="md"
            variant="primary"
            onClick={() => window.location.assign(window.location.origin)}
          >
            Refresh
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

const queryConfig = {
  queries: {
    retry: false,
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
  },
};

export const AppProvider = ({ children }) => {
  const queryClient = new QueryClient({ defaultOptions: queryConfig });

  return (
    <ChakraProvider theme={theme}>
      <Suspense
        fallback={
          <Flex h="full" w="full" alignItems="center" justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              size="xl"
              color="blue.500"
              emptyColor="gray.200"
            />
          </Flex>
        }
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  );
};
