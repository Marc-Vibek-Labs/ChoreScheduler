import * as yup from "yup";
import { AxiosError } from "axios";
import {
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// import localStorage from "../../../utils/localStorage";

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

export const LoginForm = ({ defaultUsername }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async (data) => {
    // Submit data to your backend API here
    console.log(data);
  };

  useEffect(() => {
    if (defaultUsername) {
      setRememberMe(true);
    }
  }, [defaultUsername]);

  // const mutation = useLoginMutation();

  // const submitHandler = (data) => {
  //   if (rememberMe) {
  //     localStorage.setUsername(data.username);
  //   } else {
  //     localStorage.clearUsername();
  //   }
  //   // mutation.mutate(data);
  // };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Login
      </Text>

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

      <Button type="submit" colorScheme="purple">
        Login
      </Button>
    </Box>
  );
};
