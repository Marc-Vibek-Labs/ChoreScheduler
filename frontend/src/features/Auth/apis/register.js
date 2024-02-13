import { AxiosError } from "axios";
import axios from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import { authQueryKeys } from "../constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const registerWithEmailAndPassword = (data) => {
  return axios.post("/authentication/signup", data);
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onMutate: async () => {
      // It cancels any ongoing queries related to the user
      await queryClient.cancelQueries(authQueryKeys.user);

      // The purpose of retrieving the previous user data in the onMutate callback is to store it in the context object.
      // If an error occurs during the mutation, this cached data can be used to restore the previous state, providing a
      // way to handle potential rollbacks or cleanups in case of an unsuccessful mutation.

      // It retrieves the previous user data from the query client and returns it in the context object which is then
      // passed to the onError()
      const previousUser = queryClient.getQueryData(authQueryKeys.user);

      return { previousUser };
    },
    onError: (err, _, context) => {
      // It checks if there was a previous user in the context and restores it to the query client if an error occurs
      // during the mutation. It also checks if the error is an instance of AxiosError and if it has a specific structure
      if (context?.previousUser) {
        queryClient.setQueryData(authQueryKeys.user, context.previousUser);
      }

      if (err instanceof AxiosError) {
        if (err.response?.data?.statusCode) {
          return err;
        }
      }
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.user, user);
      // Use `const user = queryClient.getQueryData('user');` to retrieve user data in another component

      navigate("/auth/login");
    },
  });
};
