import { Link as ReactRouterLink } from "react-router-dom";
import { CustomFade } from "../../../components/CustomFade";
import ToggleColorMode from "../../../components/ToggleColorMode";
import { Box, Flex, Text, Link, Image, Heading } from "@chakra-ui/react";

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
    <Flex direction={{ base: "column", lg: "row" }} height="100%">
      <Flex
        flex={0.5}
        alignItems="center"
        justifyContent="center"
        backgroundColor="neutral.50"
        width={{ base: "100%", lg: "50%" }}
      >
        <CustomFade style={{ width: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            px="90px"
            py={10}
            width={{ base: "100%", lg: "100%" }}
          >
            <Box marginBottom="25px">
              <Heading
                variant={{ base: "headlineTwo", lg: "headlineOne" }}
                fontWeight="bold"
              >
                {header}
              </Heading>
              <Text color="neutral.500">{subHeader}</Text>
            </Box>
            <Box>{children}</Box>
          </Box>
          <Text align="center" mb={4}>
            {textBottom} {""}
            <Link
              as={ReactRouterLink}
              to={`../${linkTo}`}
              fontWeight="bold"
              color="primary.500"
              _hover={{ textDecoration: "none", color: "blue.500" }}
            >
              {linkBottom}
            </Link>
          </Text>
        </CustomFade>
      </Flex>

      <Box display="flex" flexDirection="column" flex={0.5}>
        <Flex justifyContent="flex-end" mx={5} my={5}>
          <ToggleColorMode />
        </Flex>

        <Flex
          width={{ base: "100%", lg: "100%" }}
          alignItems="center"
          flex="1"
          p={5}
          justifyContent="center"
          backgroundColor="neutral.100"
          marginTop={{ base: "40px", lg: "0px" }}
        >
          <CustomFade style={{ width: "100%" }}>
            <Image
              alt="Cover"
              width="100%"
              height="50%"
              loading="lazy"
              src={coverImgSrc}
              objectFit="cover"
              borderRadius="8px"
              backgroundColor="neutral.100"
              boxShadow="5px 5px 5px rgba(0, 0, 0, 0.5)"
            />
          </CustomFade>
        </Flex>
      </Box>
    </Flex>
  </>
);
