import { AxiosPromise } from "axios";
import { API } from "../configs/api";
import { useQuery } from "@tanstack/react-query";
import { UserDataTypes } from "../@types/user";

export function useQueryUser() {
  const query = useQuery({
    queryKey: ["userData"],
    queryFn: async (): AxiosPromise<UserDataTypes> => {
      return await API.get<UserDataTypes>("/user");
    },
  });
  return { ...query, data: query.data?.data, referchQueryUser: query.refetch };
}
