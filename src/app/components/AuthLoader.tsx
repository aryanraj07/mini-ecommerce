"use client";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/hooks";
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
  const refreshMutations = useMutation(trpc.users.refresh.mutationOptions());
  useEffect(() => {
    if (meQuery.isSuccess && meQuery.data?.user) {
      dispatch(setUser(meQuery.data.user));
    }
    if (meQuery.isError) {
      refreshMutations.mutate(undefined, {
        onSuccess: () => {
          meQuery.refetch();
        },
      });
    }
  }, [meQuery.isSuccess, meQuery.isError]);
  return null;
};
export default AuthLoader;
