import React from "react";
import {
  Box,
  Text,
  Icon,
  Flex,
  Image,
  VStack,
  HStack,
  Avatar,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiUsers, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <Box
      color="white"
      h="97vh"
      w="250px"
      p="4"
      m="3"
      top="0"
      left="0"
      bg="#2d3748"
      display="flex"
      boxShadow="lg"
      position="fixed"
      borderRadius={5}
    >
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack spacing="4" align="stretch">
          <Flex justifyContent="center" alignItems="center">
            <Image
              alt="App Logo"
              width="170px"
              height="140px"
              borderRadius="70px"
              src="/images/app_logo.png"
            />
          </Flex>

          <ChakraLink
            href="#"
            _hover={{
              textDecoration: "none",
              "::before": {
                content: '""',
                width: "8px",
                height: "8px",
                backgroundColor: "green.500",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              },
            }}
          >
            <HStack spacing="3">
              <Icon as={FiUsers} boxSize="1.5em" />
              <Text fontSize="md">Groups</Text>
            </HStack>
          </ChakraLink>

          <ChakraLink
            href="#"
            _hover={{
              textDecoration: "none",
              "::before": {
                content: '""',
                width: "8px",
                height: "8px",
                backgroundColor: "green.500",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              },
            }}
            className="active"
          >
            <HStack spacing="3">
              <Icon as={FiUsers} boxSize="1.5em" />
              <Text fontSize="md">Groups</Text>
            </HStack>
          </ChakraLink>

          <ChakraLink
            href="#"
            _hover={{
              textDecoration: "none",
              "::before": {
                content: '""',
                width: "8px",
                height: "8px",
                backgroundColor: "green.500",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              },
            }}
            className="active"
          >
            <HStack spacing="3">
              <Icon as={FiSettings} boxSize="1.5em" />
              <Text fontSize="md">Settings</Text>
            </HStack>
          </ChakraLink>
        </VStack>

        <VStack spacing="4" align="stretch">
          <Avatar size="md" name="Ryan Florence" />
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
