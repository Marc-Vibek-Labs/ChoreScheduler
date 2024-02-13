import { AxiosError } from "axios";
import axios from "../configs/axios";
import { useQuery } from "@tanstack/react-query";
import useCustomToast from "../hooks/useCustomToast";
import { userQueryKeys } from "../constants/queryKeys";

export const getLoggedInUserDetails = async () => {
  return await axios.get(`/users/user`);
};

export const useGetLoggedInUserDetails = (jwt) => {
  const { addCustomToast } = useCustomToast();

  return useQuery({
    queryKey: userQueryKeys.loggedInUserDetails,
    queryFn: () => getLoggedInUserDetails(),
    enabled: !!jwt,
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data?.statusCode) {
          addCustomToast({
            title: `Error`,
            description: err.response?.data?.message,
            status: "error",
          });

          return err;
        }
      }
    },
  });
};
