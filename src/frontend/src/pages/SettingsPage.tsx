import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddBranch,
  useAddCampaign,
  useAddProduct,
  useAddProductCategory,
  useAddSource,
  useAssignUserRole,
  useBranches,
  useCampaigns,
  useDeleteBranch,
  useDeleteCampaign,
  useDeleteProduct,
  useDeleteProductCategory,
  useDeleteSource,
  useProductCategories,
  useProducts,
  useSources,
  useUpdateBranch,
  useUpdateCampaign,
  useUpdateProduct,
  useUpdateProductCategory,
  useUpdateSource,
  useUsers,
} from "@/hooks/useCRM";
import type {
  Branch,
  Campaign,
  Product,
  ProductCategory,
  Source,
  UserInfo,
} from "@/types";
import type { Principal } from "@icp-sdk/core/principal";
import {
  AlertTriangle,
  Box,
  Building2,
  FolderOpen,
  Megaphone,
  Pencil,
  Plus,
  Radio,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Tab definitions ─────────────────────────────────────────────────────────

const TABS = [
  { id: "categories", label: "Product Categories", icon: FolderOpen },
  { id: "products", label: "Products", icon: Box },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "sources", label: "Sources", icon: Radio },
  { id: "branches", label: "Branches", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Role options ─────────────────────────────────────────────────────────────

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "coordinator", label: "Coordinator" },
  { value: "telecaller", label: "Telecaller" },
  { value: "sales_executive", label: "Sales Executive" },
];

const ROLE_BADGE_VARIANT: Record<string, string> = {
  admin: "bg-primary/15 text-primary border-primary/20",
  coordinator: "bg-accent/15 text-accent border-accent/20",
  telecaller: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  sales_executive: "bg-chart-5/15 text-chart-5 border-chart-5/20",
};

// ─── Shared inline input row ──────────────────────────────────────────────────

function InputRow({
  value,
  onChange,
  placeholder,
  onSave,
  onCancel,
  isPending,
  dataOcid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onSave: () => void;
  onCancel: () => void;
  isPending: boolean;
  dataOcid?: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-ocid={dataOcid}
        className="flex-1 px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
        // biome-ignore lint/a11y/noAutofocus: intentional for inline edit UX
        autoFocus
      />
      <Button
        type="button"
        size="sm"
        onClick={onSave}
        disabled={isPending || !value.trim()}
      >
        {isPending ? "Saving..." : "Save"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onCancel}
        data-ocid={dataOcid ? `${dataOcid}_cancel` : undefined}
      >
        Cancel
      </Button>
    </div>
  );
}

// ─── Delete confirm dialog ────────────────────────────────────────────────────

function DeleteDialog({
  open,
  name,
  onConfirm,
  onCancel,
  isPending,
}: {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Confirm Delete"
      size="sm"
      data-ocid="settings.confirm_dialog"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{name}</span>? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            data-ocid="settings.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="settings.confirm_button"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="outline"
      className={
        active
          ? "border-chart-3/40 text-chart-3 bg-chart-3/10"
          : "border-border text-muted-foreground"
      }
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}

// ─── Table skeleton ───────────────────────────────────────────────────────────

function TableSkeleton({ cols }: { cols: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <tr key={i} className="border-b border-border/50">
          {[0, 1, 2, 3, 4].slice(0, cols).map((j) => (
            <td key={j} className="px-3 py-2.5">
              <div className="h-3.5 bg-muted animate-pulse rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ─── Section table wrapper ──────────────────────────────────────────────────

function SectionTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ─── Product Categories Tab ───────────────────────────────────────────────────

function CategoriesTab() {
  const { data: categories = [], isLoading } = useProductCategories();
  const addMut = useAddProductCategory();
  const updateMut = useUpdateProductCategory();
  const deleteMut = useDeleteProductCategory();

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: bigint; name: string } | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<ProductCategory | null>(
    null,
  );

  const handleAdd = () => {
    if (!newName.trim()) return;
    addMut.mutate(newName.trim(), {
      onSuccess: () => {
        toast.success("Category added");
        setAdding(false);
        setNewName("");
      },
      onError: () => toast.error("Failed to add category"),
    });
  };

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return;
    updateMut.mutate(
      { id: editing.id, name: editing.name.trim() },
      {
        onSuccess: () => {
          toast.success("Category updated");
          setEditing(null);
        },
        onError: () => toast.error("Failed to update"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Category deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div className="space-y-3" data-ocid="settings.categories.section">
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setAdding(true);
            setNewName("");
          }}
          disabled={adding}
          data-ocid="settings.categories.add_button"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
        </Button>
      </div>
      {adding && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border animate-fade-in">
          <InputRow
            value={newName}
            onChange={setNewName}
            placeholder="Category name"
            onSave={handleAdd}
            onCancel={() => {
              setAdding(false);
              setNewName("");
            }}
            isPending={addMut.isPending}
            dataOcid="settings.categories.input"
          />
        </div>
      )}
      <SectionTable headers={["Name", "Status", "Actions"]}>
        {isLoading ? (
          <TableSkeleton cols={3} />
        ) : categories.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              className="px-3 py-10 text-center text-muted-foreground text-sm"
            >
              No categories yet. Add one above.
            </td>
          </tr>
        ) : (
          categories.map((cat, idx) => (
            <tr
              key={cat.id.toString()}
              className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              data-ocid={`settings.categories.item.${idx + 1}`}
            >
              <td className="px-3 py-2.5">
                {editing?.id === cat.id ? (
                  <InputRow
                    value={editing.name}
                    onChange={(v) =>
                      setEditing((prev) => (prev ? { ...prev, name: v } : prev))
                    }
                    placeholder="Category name"
                    onSave={handleUpdate}
                    onCancel={() => setEditing(null)}
                    isPending={updateMut.isPending}
                  />
                ) : (
                  <span className="font-medium text-foreground">
                    {cat.name}
                  </span>
                )}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge active={cat.isActive} />
              </td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditing({ id: cat.id, name: cat.name })}
                    data-ocid={`settings.categories.edit_button.${idx + 1}`}
                    aria-label="Edit category"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(cat)}
                    data-ocid={`settings.categories.delete_button.${idx + 1}`}
                    aria-label="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </SectionTable>
      <DeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab() {
  const { data: categories = [] } = useProductCategories();
  const [filterCatId, setFilterCatId] = useState<bigint | null>(null);
  const { data: products = [], isLoading } = useProducts(filterCatId);
  const addMut = useAddProduct();
  const updateMut = useUpdateProduct();
  const deleteMut = useDeleteProduct();

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCatId, setNewCatId] = useState<bigint | null>(null);
  const [editing, setEditing] = useState<{ id: bigint; name: string } | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleAdd = () => {
    if (!newName.trim() || newCatId === null) return;
    addMut.mutate(
      { categoryId: newCatId, name: newName.trim() },
      {
        onSuccess: () => {
          toast.success("Product added");
          setAdding(false);
          setNewName("");
          setNewCatId(null);
        },
        onError: () => toast.error("Failed to add product"),
      },
    );
  };

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return;
    updateMut.mutate(
      { id: editing.id, name: editing.name.trim() },
      {
        onSuccess: () => {
          toast.success("Product updated");
          setEditing(null);
        },
        onError: () => toast.error("Failed to update"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Product deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  const getCatName = (id: bigint) =>
    categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-3" data-ocid="settings.products.section">
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <select
          value={filterCatId?.toString() ?? ""}
          onChange={(e) =>
            setFilterCatId(e.target.value ? BigInt(e.target.value) : null)
          }
          className="px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid="settings.products.filter.select"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id.toString()} value={c.id.toString()}>
              {c.name}
            </option>
          ))}
        </select>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setAdding(true);
            setNewName("");
            setNewCatId(categories[0]?.id ?? null);
          }}
          disabled={adding || categories.length === 0}
          data-ocid="settings.products.add_button"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Product
        </Button>
      </div>
      {adding && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border animate-fade-in space-y-2">
          <select
            value={newCatId?.toString() ?? ""}
            onChange={(e) => setNewCatId(BigInt(e.target.value))}
            className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            data-ocid="settings.products.category.select"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
          <InputRow
            value={newName}
            onChange={setNewName}
            placeholder="Product name"
            onSave={handleAdd}
            onCancel={() => {
              setAdding(false);
              setNewName("");
            }}
            isPending={addMut.isPending}
            dataOcid="settings.products.input"
          />
        </div>
      )}
      <SectionTable headers={["Name", "Category", "Status", "Actions"]}>
        {isLoading ? (
          <TableSkeleton cols={4} />
        ) : products.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="px-3 py-10 text-center text-muted-foreground text-sm"
            >
              No products found.
            </td>
          </tr>
        ) : (
          products.map((prod, idx) => (
            <tr
              key={prod.id.toString()}
              className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              data-ocid={`settings.products.item.${idx + 1}`}
            >
              <td className="px-3 py-2.5">
                {editing?.id === prod.id ? (
                  <InputRow
                    value={editing.name}
                    onChange={(v) =>
                      setEditing((prev) => (prev ? { ...prev, name: v } : prev))
                    }
                    placeholder="Product name"
                    onSave={handleUpdate}
                    onCancel={() => setEditing(null)}
                    isPending={updateMut.isPending}
                  />
                ) : (
                  <span className="font-medium text-foreground">
                    {prod.name}
                  </span>
                )}
              </td>
              <td className="px-3 py-2.5 text-sm text-muted-foreground">
                {getCatName(prod.categoryId)}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge active={prod.isActive} />
              </td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditing({ id: prod.id, name: prod.name })}
                    data-ocid={`settings.products.edit_button.${idx + 1}`}
                    aria-label="Edit product"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(prod)}
                    data-ocid={`settings.products.delete_button.${idx + 1}`}
                    aria-label="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </SectionTable>
      <DeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}

// ─── Campaign form ───────────────────────────────────────────────────────────

type CampaignDraft = Omit<Campaign, "id">;

const emptyCampaign = (): CampaignDraft => ({
  name: "",
  budget: undefined,
  startDate: undefined,
  endDate: undefined,
  source: undefined,
  isActive: true,
});

function CampaignForm({
  initial,
  sources,
  onSave,
  onCancel,
  isPending,
  dataOcidPrefix,
}: {
  initial: CampaignDraft;
  sources: Source[];
  onSave: (d: CampaignDraft) => void;
  onCancel: () => void;
  isPending: boolean;
  dataOcidPrefix: string;
}) {
  const [form, setForm] = useState<CampaignDraft>(initial);
  const set = <K extends keyof CampaignDraft>(k: K, v: CampaignDraft[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label
          htmlFor="campaign-name"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Campaign Name *
        </label>
        <input
          id="campaign-name"
          type="text"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Kharif 2026"
          className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid={`${dataOcidPrefix}.name_input`}
        />
      </div>
      <div>
        <label
          htmlFor="campaign-budget"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Budget (₹)
        </label>
        <input
          id="campaign-budget"
          type="number"
          value={form.budget !== undefined ? Number(form.budget) : ""}
          onChange={(e) =>
            set(
              "budget",
              e.target.value
                ? BigInt(Math.round(Number(e.target.value)))
                : undefined,
            )
          }
          placeholder="e.g. 50000"
          className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid={`${dataOcidPrefix}.budget_input`}
        />
      </div>
      <div>
        <label
          htmlFor="campaign-start"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Start Date
        </label>
        <input
          id="campaign-start"
          type="date"
          value={form.startDate ?? ""}
          onChange={(e) => set("startDate", e.target.value || undefined)}
          className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid={`${dataOcidPrefix}.start_date_input`}
        />
      </div>
      <div>
        <label
          htmlFor="campaign-end"
          className="text-xs text-muted-foreground mb-1 block"
        >
          End Date
        </label>
        <input
          id="campaign-end"
          type="date"
          value={form.endDate ?? ""}
          onChange={(e) => set("endDate", e.target.value || undefined)}
          className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid={`${dataOcidPrefix}.end_date_input`}
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="campaign-source"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Source
        </label>
        <select
          id="campaign-source"
          value={form.source ?? ""}
          onChange={(e) => set("source", e.target.value || undefined)}
          className="w-full px-3 py-1.5 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid={`${dataOcidPrefix}.source_select`}
        >
          <option value="">None</option>
          {sources.map((s) => (
            <option key={s.id.toString()} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 flex gap-2 justify-end pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid={`${dataOcidPrefix}.cancel_button`}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => onSave(form)}
          disabled={isPending || !form.name.trim()}
          data-ocid={`${dataOcidPrefix}.save_button`}
        >
          {isPending ? "Saving..." : "Save Campaign"}
        </Button>
      </div>
    </div>
  );
}

// ─── Campaigns Tab ────────────────────────────────────────────────────────────

function CampaignsTab() {
  const { data: campaigns = [], isLoading } = useCampaigns();
  const { data: sources = [] } = useSources();
  const addMut = useAddCampaign();
  const updateMut = useUpdateCampaign();
  const deleteMut = useDeleteCampaign();

  const [adding, setAdding] = useState(false);
  const [editTarget, setEditTarget] = useState<Campaign | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Campaign | null>(null);

  const handleAdd = (data: CampaignDraft) => {
    addMut.mutate(
      { ...data, id: BigInt(0) },
      {
        onSuccess: () => {
          toast.success("Campaign added");
          setAdding(false);
        },
        onError: () => toast.error("Failed to add campaign"),
      },
    );
  };

  const handleUpdate = (data: CampaignDraft) => {
    if (!editTarget) return;
    updateMut.mutate(
      { ...data, id: editTarget.id },
      {
        onSuccess: () => {
          toast.success("Campaign updated");
          setEditTarget(null);
        },
        onError: () => toast.error("Failed to update"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Campaign deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div className="space-y-3" data-ocid="settings.campaigns.section">
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => setAdding(true)}
          disabled={adding}
          data-ocid="settings.campaigns.add_button"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Campaign
        </Button>
      </div>
      {adding && (
        <div className="p-4 bg-muted/30 rounded-lg border border-border animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground mb-3 font-display uppercase tracking-wider">
            New Campaign
          </p>
          <CampaignForm
            initial={emptyCampaign()}
            sources={sources}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
            isPending={addMut.isPending}
            dataOcidPrefix="settings.campaigns.add"
          />
        </div>
      )}
      <SectionTable
        headers={[
          "Name",
          "Budget",
          "Start",
          "End",
          "Source",
          "Status",
          "Actions",
        ]}
      >
        {isLoading ? (
          <TableSkeleton cols={7} />
        ) : campaigns.length === 0 ? (
          <tr>
            <td
              colSpan={7}
              className="px-3 py-10 text-center text-muted-foreground text-sm"
            >
              No campaigns yet.
            </td>
          </tr>
        ) : (
          campaigns.map((c, idx) => (
            <tr
              key={c.id.toString()}
              className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              data-ocid={`settings.campaigns.item.${idx + 1}`}
            >
              <td className="px-3 py-2.5 font-medium text-foreground">
                {c.name}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {c.budget !== undefined
                  ? `₹${Number(c.budget).toLocaleString()}`
                  : "—"}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {c.startDate ?? "—"}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {c.endDate ?? "—"}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {c.source ?? "—"}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge active={c.isActive} />
              </td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditTarget(c)}
                    data-ocid={`settings.campaigns.edit_button.${idx + 1}`}
                    aria-label="Edit campaign"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(c)}
                    data-ocid={`settings.campaigns.delete_button.${idx + 1}`}
                    aria-label="Delete campaign"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </SectionTable>
      {editTarget && (
        <Modal
          open
          onClose={() => setEditTarget(null)}
          title={`Edit Campaign — ${editTarget.name}`}
          size="lg"
          data-ocid="settings.campaigns.edit_dialog"
        >
          <CampaignForm
            initial={editTarget}
            sources={sources}
            onSave={handleUpdate}
            onCancel={() => setEditTarget(null)}
            isPending={updateMut.isPending}
            dataOcidPrefix="settings.campaigns.edit"
          />
        </Modal>
      )}
      <DeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}

// ─── Generic simple tab (Sources, Branches) ────────────────────────────────

type SimpleItem = { id: bigint; name: string; isActive: boolean };

type SimpleAddMut = {
  mutate: (
    name: string,
    opts: { onSuccess: () => void; onError: () => void },
  ) => void;
  isPending: boolean;
};
type SimpleUpdateMut = {
  mutate: (
    args: { id: bigint; name: string },
    opts: { onSuccess: () => void; onError: () => void },
  ) => void;
  isPending: boolean;
};
type SimpleDeleteMut = {
  mutate: (
    id: bigint,
    opts: { onSuccess: () => void; onError: () => void },
  ) => void;
  isPending: boolean;
};

function SimpleTab({
  data,
  isLoading,
  addMut,
  updateMut,
  deleteMut,
  label,
  placeholder,
  ocidPrefix,
}: {
  data: SimpleItem[];
  isLoading: boolean;
  addMut: SimpleAddMut;
  updateMut: SimpleUpdateMut;
  deleteMut: SimpleDeleteMut;
  label: string;
  placeholder: string;
  ocidPrefix: string;
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: bigint; name: string } | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<SimpleItem | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addMut.mutate(newName.trim(), {
      onSuccess: () => {
        toast.success(`${label} added`);
        setAdding(false);
        setNewName("");
      },
      onError: () => toast.error(`Failed to add ${label.toLowerCase()}`),
    });
  };

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return;
    updateMut.mutate(
      { id: editing.id, name: editing.name.trim() },
      {
        onSuccess: () => {
          toast.success(`${label} updated`);
          setEditing(null);
        },
        onError: () => toast.error("Failed to update"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`${label} deleted`);
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div className="space-y-3" data-ocid={`settings.${ocidPrefix}.section`}>
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setAdding(true);
            setNewName("");
          }}
          disabled={adding}
          data-ocid={`settings.${ocidPrefix}.add_button`}
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add {label}
        </Button>
      </div>
      {adding && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border animate-fade-in">
          <InputRow
            value={newName}
            onChange={setNewName}
            placeholder={placeholder}
            onSave={handleAdd}
            onCancel={() => {
              setAdding(false);
              setNewName("");
            }}
            isPending={addMut.isPending}
            dataOcid={`settings.${ocidPrefix}.input`}
          />
        </div>
      )}
      <SectionTable headers={["Name", "Status", "Actions"]}>
        {isLoading ? (
          <TableSkeleton cols={3} />
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              className="px-3 py-10 text-center text-muted-foreground text-sm"
            >
              No {label.toLowerCase()}s yet. Add one above.
            </td>
          </tr>
        ) : (
          data.map((item, idx) => (
            <tr
              key={item.id.toString()}
              className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              data-ocid={`settings.${ocidPrefix}.item.${idx + 1}`}
            >
              <td className="px-3 py-2.5">
                {editing?.id === item.id ? (
                  <InputRow
                    value={editing.name}
                    onChange={(v) =>
                      setEditing((prev) => (prev ? { ...prev, name: v } : prev))
                    }
                    placeholder={placeholder}
                    onSave={handleUpdate}
                    onCancel={() => setEditing(null)}
                    isPending={updateMut.isPending}
                  />
                ) : (
                  <span className="font-medium text-foreground">
                    {item.name}
                  </span>
                )}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge active={item.isActive} />
              </td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditing({ id: item.id, name: item.name })}
                    data-ocid={`settings.${ocidPrefix}.edit_button.${idx + 1}`}
                    aria-label={`Edit ${label.toLowerCase()}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(item)}
                    data-ocid={`settings.${ocidPrefix}.delete_button.${idx + 1}`}
                    aria-label={`Delete ${label.toLowerCase()}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </SectionTable>
      <DeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteMut.isPending}
      />
    </div>
  );
}

function SourcesTab() {
  const { data: sources = [], isLoading } = useSources();
  const addMut = useAddSource();
  const updateMut = useUpdateSource();
  const deleteMut = useDeleteSource();
  return (
    <SimpleTab
      data={sources}
      isLoading={isLoading}
      addMut={addMut as SimpleAddMut}
      updateMut={updateMut as SimpleUpdateMut}
      deleteMut={deleteMut as SimpleDeleteMut}
      label="Source"
      placeholder="e.g. Facebook Ads"
      ocidPrefix="sources"
    />
  );
}

function BranchesTab() {
  const { data: branches = [], isLoading } = useBranches();
  const addMut = useAddBranch();
  const updateMut = useUpdateBranch();
  const deleteMut = useDeleteBranch();
  return (
    <SimpleTab
      data={branches}
      isLoading={isLoading}
      addMut={addMut as SimpleAddMut}
      updateMut={updateMut as SimpleUpdateMut}
      deleteMut={deleteMut as SimpleDeleteMut}
      label="Branch"
      placeholder="e.g. North Delhi Office"
      ocidPrefix="branches"
    />
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

function truncatePrincipal(p: Principal): string {
  const s = p.toString();
  return s.length > 14 ? `${s.slice(0, 7)}…${s.slice(-5)}` : s;
}

function UsersTab() {
  const { data: users = [], isLoading } = useUsers();
  const assignRoleMut = useAssignUserRole();
  const [pendingRoleUser, setPendingRoleUser] = useState<string | null>(null);

  const handleRoleChange = (user: UserInfo, role: string) => {
    setPendingRoleUser(user.id.toString());
    assignRoleMut.mutate(
      { principal: user.id, role },
      {
        onSuccess: () => {
          toast.success(`Role updated for ${user.name}`);
          setPendingRoleUser(null);
        },
        onError: () => {
          toast.error("Failed to update role");
          setPendingRoleUser(null);
        },
      },
    );
  };

  return (
    <div className="space-y-3" data-ocid="settings.users.section">
      <SectionTable headers={["User", "Principal ID", "Role", "Actions"]}>
        {isLoading ? (
          <TableSkeleton cols={4} />
        ) : users.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="px-3 py-10 text-center text-muted-foreground text-sm"
            >
              No users registered yet.
            </td>
          </tr>
        ) : (
          users.map((user, idx) => (
            <tr
              key={user.id.toString()}
              className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              data-ocid={`settings.users.item.${idx + 1}`}
            >
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">
                      {user.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {user.name}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <code className="text-[11px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                  {truncatePrincipal(user.id)}
                </code>
              </td>
              <td className="px-3 py-2.5">
                <Badge
                  variant="outline"
                  className={
                    ROLE_BADGE_VARIANT[user.role] ??
                    "border-border text-muted-foreground"
                  }
                >
                  {user.role}
                </Badge>
              </td>
              <td className="px-3 py-2.5">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user, e.target.value)}
                  disabled={pendingRoleUser === user.id.toString()}
                  className="px-2 py-1 bg-muted border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                  data-ocid={`settings.users.role.select.${idx + 1}`}
                  aria-label={`Assign role to ${user.name}`}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))
        )}
      </SectionTable>
    </div>
  );
}

// ─── Main SettingsPage ────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { crmRole } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("categories");

  if (crmRole !== "admin") {
    return (
      <div className="flex flex-col" data-ocid="settings.page">
        <PageHeader title="Settings" subtitle="Master data management" />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <EmptyState
            icon={ShieldCheck}
            title="Admin Access Required"
            description="Only administrators can access the settings page. Please contact your system admin to request access."
            data-ocid="settings.access_denied.empty_state"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full" data-ocid="settings.page">
      <PageHeader
        title="Settings"
        subtitle="Manage master data for products, campaigns, users, and more"
        actions={
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-semibold">Admin</span>
          </div>
        }
      />

      {/* Tab bar */}
      <div className="bg-card border-b border-border px-4 md:px-6 overflow-x-auto">
        <div className="flex gap-0.5 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`settings.${tab.id}.tab`}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 p-4 md:p-6 bg-background animate-fade-in">
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "campaigns" && <CampaignsTab />}
        {activeTab === "sources" && <SourcesTab />}
        {activeTab === "branches" && <BranchesTab />}
        {activeTab === "users" && <UsersTab />}
      </div>
    </div>
  );
}
