import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters"),
  groupname: yup
    .string()
    .trim()
    .required("Group Name is required")
    .min(3, "Group Name must be at least 3 characters long")
    .max(50, "Group Name must be less than 50 characters"),
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
    .required("Phone Number is required")
    .min(10, "Phone Number must be at least 10 digits long")
    .max(12, "Phone Number must be less than 12 digits long"),
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
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mb="8">
        <Input
          type="text"
          placeholder="Group Name"
          {...register("groupname")}
        />
        {errors.groupname && (
          <FormErrorMessage>{errors.groupname.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb="8">
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb="8">
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mb="8">
        <Input type="tel" placeholder="Phone Number" {...register("number")} />
        {errors.number && (
          <FormErrorMessage>{errors.number.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit" colorScheme="purple">
        Sign Up
      </Button>
    </Box>
  );
};
