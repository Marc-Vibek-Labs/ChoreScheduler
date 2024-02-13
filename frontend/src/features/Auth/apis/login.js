import axios from "../../../configs/axios";
import { storage } from "../../../utils/storage";
import { authQueryKeys } from "../constants/queryKeys";
import useCustomToast from "../../../hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const loginWithEmailAndPassword = (data) => {
  return axios.post("/authentication/login", data);
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { addCustomToast } = useCustomToast();

  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onError: (err, _, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(authQueryKeys.user, context.previousUser);
      }

      if (err.name === "AxiosError") {
        addCustomToast({
          title: err.response.data?.message ?? "Something Went Wrong",
          status: "error",
        });

        return err;
      }
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(authQueryKeys.user, data);
      storage.setToken(data.token);

      window.location.href = "/";
    },
  });
};
