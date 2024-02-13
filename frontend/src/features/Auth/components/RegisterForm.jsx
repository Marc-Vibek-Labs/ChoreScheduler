import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Text,
  Input,
  Flex,
  Button,
  Spinner,
  InputGroup,
  FormControl,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import * as yup from "yup";
import { SiAircanada } from "react-icons/si";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "../apis/register";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const userSchema = yup.object({
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
  confirmPassword: yup
    .string()
    .min(8, "Must contain at least 8 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits long")
    .max(12, "Phone number must be less than 12 digits long"),
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const mutation = useRegisterMutation();

  const onSubmit = async (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
      lastName: data.lastName,
      firstName: data.firstName,
      phoneNumber: data.phoneNumber,
    };

    mutation.mutate(requestData);
  };

  const handleKeyPress = (e) => {
    const charCode = e.which || e.keyCode;
    // Allow numeric characters (0-9) only
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Register
      </Text>

      <Flex mb="8" gap={3}>
        <FormControl>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <Text color="red" fontSize="sm" mt="2">
              {errors.firstName.message}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <Text color="red" fontSize="sm" mt="2">
              {errors.lastName.message}
            </Text>
          )}
        </FormControl>
      </Flex>

      <FormControl mb="8">
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.email.message}
          </Text>
        )}
      </FormControl>

      <FormControl mb="8">
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <InputRightElement width="3rem">
            <Button size="sm" onClick={togglePasswordVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.password.message}
          </Text>
        )}
      </FormControl>

      <FormControl mb="8">
        <InputGroup paddingRight={0}>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <InputRightElement width="3rem">
            <Button size="sm" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.confirmPassword && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.confirmPassword.message}
          </Text>
        )}
      </FormControl>

      <FormControl mb="8">
        <InputGroup>
          <InputLeftAddon>
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <Box fontSize="l">+1</Box>
              <Box fontSize="l">
                <SiAircanada style={{ color: "red", fontSize: "1.2em" }} />
              </Box>
            </Flex>
          </InputLeftAddon>
          <Input
            type="tel"
            placeholder="Phone Number"
            {...register("phoneNumber")}
            inputMode="numeric"
            onKeyPress={handleKeyPress}
          />
        </InputGroup>
        {errors.phoneNumber && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.phoneNumber.message}
          </Text>
        )}
      </FormControl>
      <Button
        type="submit"
        width="73.5px"
        colorScheme="purple"
        isLoading={mutation.isLoading}
      >
        {mutation.isPending ? <Spinner size="sm" color="white" /> : "Submit"}
      </Button>
    </Box>
  );
};
