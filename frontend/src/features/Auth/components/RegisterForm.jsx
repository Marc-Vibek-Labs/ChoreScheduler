import React from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Text, FormControl } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters"),
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
  number: yup
    .string()
    .trim()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits long")
    .max(12, "Phone number must be less than 12 digits long"),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async (data) => {
    // Submit data to your backend API here
    console.log(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Register
      </Text>
      <FormControl mb="8">
        <Input type="text" placeholder="Username" {...register("username")} />
        {errors.username && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.username.message}
          </Text>
        )}
      </FormControl>

      <FormControl mb="8">
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.email.message}
          </Text>
        )}
      </FormControl>
      <FormControl mb="8">
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.password.message}
          </Text>
        )}
      </FormControl>

      <FormControl mb="8">
        <Input type="tel" placeholder="Phone Number" {...register("number")} />
        {errors.number && (
          <Text color="red" fontSize="sm" mt="2">
            {errors.number.message}
          </Text>
        )}
      </FormControl>
      <Button type="submit" colorScheme="purple">
        Sign Up
      </Button>
    </Box>
  );
};
