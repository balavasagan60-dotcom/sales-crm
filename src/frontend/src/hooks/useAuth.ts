import { createActor } from "@/backend";
import { UserRole } from "@/backend";
import type { CRMRole, UserInfo } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function mapRoleToCRM(role: UserRole | string): CRMRole {
  if (role === UserRole.admin || role === "admin") return "admin";
  if (role === "coordinator") return "coordinator";
  if (role === "telecaller") return "telecaller";
  if (role === "sales_executive") return "sales_executive";
  return "unknown";
}

export function useAuth() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const profileQuery = useQuery<UserInfo | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const roleQuery = useQuery<string>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const role = await actor.getCallerUserRole();
      return role as string;
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const crmRole: CRMRole = roleQuery.data
    ? mapRoleToCRM(roleQuery.data)
    : "unknown";

  const isLoading =
    actorFetching || profileQuery.isLoading || roleQuery.isLoading;
  const isFetched = !!actor && profileQuery.isFetched;

  const needsProfileSetup =
    isAuthenticated && !isLoading && isFetched && profileQuery.data === null;

  const logout = () => {
    clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoading,
    login,
    logout,
    identity,
    profile: profileQuery.data ?? null,
    crmRole,
    needsProfileSetup,
    isFetched,
  };
}
