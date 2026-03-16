"use client";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { MeOutput } from "@/types/types";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const AuthLoader = () => {
  const trpc = useTRPC();
  const dispatch = useAppDispatch();
  const meQuery = useQuery(
    trpc.users.me.queryOptions(undefined, {
      retry: false,
    }),
  );

  const refreshMutations = useMutation(
    trpc.users.refresh.mutationOptions({
      onSuccess: () => meQuery.refetch(),
    }),
  );

  useEffect(() => {
    if (meQuery.data && "user" in meQuery.data) {
      dispatch(setUser(meQuery.data.user));
    }

    if (meQuery.error?.data?.httpStatus === 401) {
      refreshMutations.mutate();
    }
  }, [meQuery.data, meQuery.error]);
  return null;
};
export default AuthLoader;
