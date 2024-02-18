import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../apis/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Button,
  Spinner,
  InputGroup,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";

const userSchema = yup.object({
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
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useLoginMutation();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Login
      </Text>

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

      <Button type="submit" colorScheme="purple" width="73.5px">
        {mutation.isPending ? <Spinner size="sm" color="white" /> : "Login"}
      </Button>
    </Box>
  );
};
