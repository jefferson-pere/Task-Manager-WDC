import { API } from "../configs/api";
import { useQuery } from "@tanstack/react-query";
import { UserDataTypes } from "../@types/user";
import { useEffect, useState } from "react";
import { TaskDataTypes } from "../@types/tasks";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type Filtertype = "all" | "completed" | "pending" | "late";
type GetTasksProps = { page: number; limit: number; filter: Filtertype };

export function useQueryTasks() {
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<Filtertype>("all");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useSearchParams();

  async function getTasks({
    page = 1,
    limit = 10,
    filter = "all",
  }: GetTasksProps) {
    if (page <= 0) page = 1;
    const offset = (page - 1) * limit;

    await changeTotalPages(filter, limit);
    const { data } = await API.get(
      `/tasks?limit=${limit}&offset=${offset}&filter=${filter}`
    );
    return data.userTasks as TaskDataTypes[];
  }
  async function changeTotalPages(filter: Filtertype = "all", limit: number) {
    const { data } = await API.get("/user");
    const { tasksInfo } = data as UserDataTypes;

    const total = filter == "all" ? tasksInfo["total"] : tasksInfo[filter];
    const calcTotalPages = Math.ceil(total / limit);

    if (calcTotalPages != totalpage) {
      setTotalPages(calcTotalPages);
    }
  }
  function nextPage() {
    if (page < totalpage) {
      setPage((prev) => prev + 1);
      navigate(`/filter?page=${page + 1}&filter=${filter}`);
    }
  }
  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      navigate(`/filter?page=${page - 1}&filter=${filter}`);
    }
  }
  function changePage(value: number) {
    setPage(value);
  }
  function changeLimit(value: number) {
    setLimit(value);
  }
  function changeFilter(value: Filtertype) {
    setFilter(value);
  }
  useEffect(() => {
    if (location.pathname == "/tasks") {
      const pageQuery = Number(searchParams[0].get("page"));
      const filterQuery = searchParams[0].get("filter") as Filtertype;
      setPage(pageQuery || 1);
      setFilter(filterQuery || "all");

      if (totalpage > 0) {
        if (pageQuery > totalpage) {
          navigate(`/tasks?page=${totalpage}&filter=${filterQuery}`);
          setPage(totalpage);
          return;
        }
        if (pageQuery < 1) {
          navigate(`/tasks?page=1&filter=${filterQuery}`);
          navigate(totalpage);
        }
      }
    }
  }, [page, totalpage, searchParams, navigate, location]);

  const query = useQuery({
    queryKey: ["tasksData"],
    queryFn: () => getTasks({ page, limit, filter }),
  });
  return {
    ...query,
    data: query.data,
    referchQueryTask: query.refetch,
    page,
    nextPage,
    prevPage,
    changePage,
    changeLimit,
    changeFilter,
    totalpage,
  };
}
