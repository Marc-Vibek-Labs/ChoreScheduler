import { Link as ReactRouterLink } from "react-router-dom";
import { CustomFade } from "../../../components/CustomFade";
import {
  Box,
  Flex,
  Text,
  Link,
  Image,
  HStack,
  Divider,
  Heading,
} from "@chakra-ui/react";

export const AuthFormLayout = ({
  linkTo,
  header,
  subText,
  children,
  subHeader,
  textBottom,
  linkBottom,
  coverImgSrc,
}) => (
  <>
    <Flex direction={{ base: "column", lg: "row" }}>
      <Flex
        width={{ base: "100%", lg: "50%" }}
        paddingLeft="22px"
        paddingRight="22px"
        paddingTop="145px"
        backgroundColor="neutral.50"
        my="auto"
      >
        <CustomFade style={{ width: "100%" }}>
          <Box marginX="auto" width={{ base: "100%", md: "90vw", lg: "483px" }}>
            <Flex flexDirection="column" gap="16px" marginBottom="40px">
              <Heading
                variant={{ base: "headlineTwo", lg: "headlineOne" }}
                fontWeight="bold"
              >
                {header}
              </Heading>
              <Text color="neutral.500">{subHeader}</Text>
            </Flex>
            {children}
          </Box>
          <HStack spacing="4" margin="32px 0 32px" justifyContent="center">
            <Divider flex="1" borderColor="neutral.300" />
            <Text as="span" padding="2">
              {subText}
            </Text>
            <Divider flex="1" borderColor="neutral.300" />
          </HStack>
          <Text align="center" marginTop="32px">
            {textBottom} {""}
            <Link
              as={ReactRouterLink}
              to={`../${linkTo}`}
              fontWeight="bold"
              color="primary.500"
            >
              {linkBottom}
            </Link>
          </Text>
        </CustomFade>
      </Flex>
      <Flex
        width={{ base: "100%", lg: "50%" }}
        paddingTop="145px"
        paddingLeft="22px"
        paddingRight="22px"
        paddingBottom="75px"
        marginTop={{ base: "40px", lg: "0px" }}
        backgroundColor="neutral.100"
        alignItems="center"
        justifyContent="center"
        minH={{ base: "auto", lg: "100vh" }}
      >
        <CustomFade style={{ width: "100%" }}>
          <Image
            margin="auto"
            width="100%"
            maxW="416.34px"
            src={coverImgSrc}
            alt="Cover"
            loading="lazy"
            backgroundColor="neutral.100"
          />
        </CustomFade>
      </Flex>
    </Flex>
    <Box
      width="100%"
      maxWidth={{ sm: "none", lg: "80vw" }}
      padding={{ base: "0 16px", lg: "0" }}
      margin="0 auto"
    ></Box>
  </>
);
