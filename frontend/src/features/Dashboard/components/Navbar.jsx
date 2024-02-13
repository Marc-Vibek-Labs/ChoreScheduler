import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import ToggleColorMode from "../../../components/ToggleColorMode";

const Navbar = () => {
  return (
    <Flex
      p="4"
      bg="blue.500"
      display="flex"
      align="center"
      boxShadow="md"
      borderRadius={5}
      justify="space-between"
      justifyContent="flex-end"
      backgroundColor="#2d3748"
      margin="0.75rem 0.75rem 0.75rem 280px"
    >
      {/* Your App Name or Logo */}
      <ToggleColorMode />
    </Flex>
  );
};

export default Navbar;
