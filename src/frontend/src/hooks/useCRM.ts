import { createActor } from "@/backend";
import type {
  Branch,
  CallLog,
  CallReport,
  CallReportFilter,
  Campaign,
  CreateFollowUpInput,
  CreateLeadInput,
  FollowUp,
  FollowUpFilter,
  Lead,
  LeadFilter,
  LeadReport,
  LeadReportFilter,
  LogCallInput,
  Product,
  ProductCategory,
  Source,
  UpdateFollowUpInput,
  UpdateLeadInput,
  UserInfo,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}

// ─── Leads ──────────────────────────────────────────────────────────────────

export function useLeads(filter?: LeadFilter | null) {
  const { actor, ready } = useActorReady();
  return useQuery<Lead[]>({
    queryKey: ["leads", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLeads(filter ?? null);
    },
    enabled: ready,
  });
}

export function useLead(id: bigint | null) {
  const { actor, ready } = useActorReady();
  return useQuery<Lead | null>({
    queryKey: ["lead", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getLeadById(id);
    },
    enabled: ready && id !== null,
  });
}

export function useCreateLead() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addLead(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
}

export function useUpdateLead() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateLeadInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateLead(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
}

export function useDeleteLead() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteLead(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
}

// ─── Follow-ups ─────────────────────────────────────────────────────────────

export function useFollowUps(filterType: FollowUpFilter) {
  const { actor, ready } = useActorReady();
  return useQuery<FollowUp[]>({
    queryKey: ["followups", filterType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.queryFollowUps(filterType);
    },
    enabled: ready,
  });
}

export function useFollowUpsForLead(leadId: bigint | null) {
  const { actor, ready } = useActorReady();
  return useQuery<FollowUp[]>({
    queryKey: ["followups-lead", leadId?.toString()],
    queryFn: async () => {
      if (!actor || leadId === null) return [];
      return actor.getFollowUpsForLead(leadId);
    },
    enabled: ready && leadId !== null,
  });
}

export function useCreateFollowUp() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateFollowUpInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.logFollowUp(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["followups"] }),
  });
}

export function useUpdateFollowUp() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateFollowUpInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFollowUpStatus(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["followups"] }),
  });
}

// ─── Calls ──────────────────────────────────────────────────────────────────

export function useCallsForLead(leadId: bigint | null) {
  const { actor, ready } = useActorReady();
  return useQuery<CallLog[]>({
    queryKey: ["calls-lead", leadId?.toString()],
    queryFn: async () => {
      if (!actor || leadId === null) return [];
      return actor.getCallsForLead(leadId);
    },
    enabled: ready && leadId !== null,
  });
}

export function useLogCall() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LogCallInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.logCall(input);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["calls-lead"] }),
  });
}

// ─── Reports ────────────────────────────────────────────────────────────────

export function useCallReport(filter: CallReportFilter) {
  const { actor, ready } = useActorReady();
  return useQuery<CallReport>({
    queryKey: ["call-report", filter],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallReport(filter);
    },
    enabled: ready,
  });
}

export function useLeadReport(filter: LeadReportFilter) {
  const { actor, ready } = useActorReady();
  return useQuery<LeadReport>({
    queryKey: ["lead-report", filter],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getLeadReport(filter);
    },
    enabled: ready,
  });
}

// ─── Master Data ─────────────────────────────────────────────────────────────

export function useProductCategories() {
  const { actor, ready } = useActorReady();
  return useQuery<ProductCategory[]>({
    queryKey: ["product-categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProductCategories();
    },
    enabled: ready,
  });
}

export function useProducts(categoryId: bigint | null) {
  const { actor, ready } = useActorReady();
  return useQuery<Product[]>({
    queryKey: ["products", categoryId?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(categoryId);
    },
    enabled: ready,
  });
}

export function useCampaigns() {
  const { actor, ready } = useActorReady();
  return useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCampaigns();
    },
    enabled: ready,
  });
}

export function useSources() {
  const { actor, ready } = useActorReady();
  return useQuery<Source[]>({
    queryKey: ["sources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSources();
    },
    enabled: ready,
  });
}

export function useBranches() {
  const { actor, ready } = useActorReady();
  return useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBranches();
    },
    enabled: ready,
  });
}

export function useUsers() {
  const { actor, ready } = useActorReady();
  return useQuery<UserInfo[]>({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: ready,
  });
}

export function useSaveProfile() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(name);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] }),
  });
}

// ─── Settings: Master Data Mutations ────────────────────────────────────────
export function useAddProductCategory() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProductCategory(name);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product-categories"] }),
  });
}

export function useUpdateProductCategory() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProductCategory(id, name);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product-categories"] }),
  });
}

export function useDeleteProductCategory() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProductCategory(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product-categories"] }),
  });
}

export function useAddProduct() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      categoryId,
      name,
    }: { categoryId: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(categoryId, name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(id, name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAddCampaign() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Campaign) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCampaign(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export function useUpdateCampaign() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Campaign) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCampaign(input);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export function useDeleteCampaign() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCampaign(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export function useAddSource() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSource(name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sources"] }),
  });
}

export function useUpdateSource() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSource(id, name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sources"] }),
  });
}

export function useDeleteSource() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSource(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sources"] }),
  });
}

export function useAddBranch() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBranch(name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["branches"] }),
  });
}

export function useUpdateBranch() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBranch(id, name);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["branches"] }),
  });
}

export function useDeleteBranch() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBranch(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["branches"] }),
  });
}

export function useAssignUserRole() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principal,
      role,
    }: {
      principal: import("@icp-sdk/core/principal").Principal;
      role: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.assignUserRole(principal, role);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
