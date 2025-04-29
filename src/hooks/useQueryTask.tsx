import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { UserDataTypes } from "../@types/user";
import { useEffect, useState } from "react";
import { TaskDataTypes } from "../@types/tasks";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type FilterType = "all" | "completed" | "pending" | "late";

type GetTasksProps = {
  page: number;
  limit: number;
  filter: FilterType;
};

export function useQueryTasks() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<FilterType>("all");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useSearchParams();

  async function getTasks({
    page = 1,
    limit = 10,
    filter = "all",
  }: GetTasksProps) {
    if (page <= 0) page = 1;
    const offset = limit * (page - 1);

    await changeTotalPages(filter, limit);

    const { data } = await API.get(
      `/tasks?limit=${limit}&offset=${offset}&filter=${filter}`
    );

    return data.userTasks as TaskDataTypes[];
  }

  async function changeTotalPages(filter: FilterType = "all", limit: number) {
    const { data } = await API.get("/user");
    const { tasksInfo } = data as UserDataTypes;

    const total = filter == "all" ? tasksInfo["total"] : tasksInfo[filter];

    const calcTotalPages = Math.ceil(total / limit);

    if (calcTotalPages != totalPages) {
      setTotalPages(calcTotalPages);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      navigate(`?page=${page + 1}&filter=${filter}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      navigate(`?page=${page - 1}&filter=${filter}`);
    }
  }

  function changePage(value: number) {
    setPage(value);
  }

  function changeLimit(value: number) {
    setLimit(value);
  }

  function changeFilter(value: FilterType) {
    setFilter(value);
  }

  useEffect(() => {
    if (location.pathname == "/tasks") {
      const pageQuery = Number(searchParams[0].get("page"));
      const filterQuery = searchParams[0].get("filter") as FilterType;

      setPage(pageQuery || 1);
      setFilter(Number(filterQuery) ? filterQuery : "all");

      if (totalPages > 0) {
        if (pageQuery > totalPages) {
          navigate(`?page=${totalPages}&filter=${filterQuery}`);
          setPage(totalPages);
          return;
        }

        if (pageQuery < 1) {
          navigate(`?page=1&filter=${filterQuery}`);
          setPage(1);
          return;
        }
      }
    }
  }, [page, totalPages, searchParams, navigate, location]);

  const query = useQuery({
    queryKey: ["tasksData", page, limit, filter],
    queryFn: () => getTasks({ page, limit, filter }),
  });

  return {
    ...query,
    data: query.data,
    refetchQueryTask: query.refetch,
    page,
    totalPages,
    nextPage,
    prevPage,
    changePage,
    changeLimit,
    changeFilter,
  };
}
