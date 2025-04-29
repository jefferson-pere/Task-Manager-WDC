import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { AxiosPromise } from "axios";
import { UserDataTypes } from "../@types/user";

export function useQueryUser() {
  const query = useQuery({
    queryKey: ["userData"],
    queryFn: async (): AxiosPromise<UserDataTypes> => {
      return await API.get<UserDataTypes>("/user");
    },
  });

  return {
    ...query,
    data: query.data?.data,
    refetchQueryUser: query.refetch,
  };
}
