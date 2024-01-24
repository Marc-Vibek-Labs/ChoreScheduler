import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <VStack>
        <Heading>404 Not Found</Heading>
        <Text>The page you are looking for does not exist</Text>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home
        </Button>
      </VStack>
    </Flex>
  );
};
