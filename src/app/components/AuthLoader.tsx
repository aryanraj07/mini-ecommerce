"use client";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { MeOutput } from "@/types/types";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { useEffect, useRef } from "react";
type MeResponse = {
  user: MeOutput;
};
const AuthLoader = () => {
  const trpc = useTRPC();
  const dispatch = useAppDispatch();
  const meQuery = useQuery(
    trpc.users.me.queryOptions(undefined, {
      retry: false,
    }),
  );
  const refreshMutation = useMutation(
    trpc.users.refresh.mutationOptions({
      onSuccess: () => meQuery.refetch(),
    }),
  );
  const hasRefreshed = useRef(false);

  useEffect(() => {
    const data = meQuery.data as MeResponse | undefined;
    if (data?.user) {
      dispatch(setUser(data.user));
    }

    if (
      meQuery.error instanceof TRPCClientError &&
      meQuery.error.data?.httpStatus === 401 &&
      !hasRefreshed.current
    ) {
      hasRefreshed.current = true;
      refreshMutation.mutate();
    }
  }, [meQuery.data, meQuery.error]);
  return null;
};
export default AuthLoader;
