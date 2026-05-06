import { LeadStatus as LS, Priority as P } from "@/backend";
import { type Column, DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  useCampaigns,
  useDeleteLead,
  useLeads,
  useSources,
  useUsers,
} from "@/hooks/useCRM";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus, Priority } from "@/types";
import { Download, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { LeadDetailModal } from "./leads/LeadDetailModal";
import { LeadFormModal } from "./leads/LeadFormModal";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "New", value: LS.New },
  { label: "Interested", value: LS.Interested },
  { label: "Proposal", value: LS.Proposal },
  { label: "Won", value: LS.ClosedWon },
  { label: "Lost", value: LS.ClosedLost },
];

const PRIORITY_FILTERS = [
  { label: "All", value: "" },
  { label: "🔥 Hot", value: P.Hot },
  { label: "☀️ Warm", value: P.Warm },
  { label: "❄️ Cold", value: P.Cold },
];

function exportCSV(leads: Lead[], users: Map<string, string>) {
  const headers = [
    "Name",
    "Phone",
    "Email",
    "Alt Phone",
    "Source",
    "Campaign",
    "Status",
    "Priority",
    "Product Interest",
    "Assigned To",
    "Notes",
    "Created",
  ];
  const rows = leads.map((l) => [
    l.name,
    l.phone,
    l.email ?? "",
    l.altPhone ?? "",
    l.source ?? "",
    l.campaign ?? "",
    l.status,
    l.priority,
    l.productInterest ?? "",
    l.assignedUserId ? (users.get(l.assignedUserId.toString()) ?? "—") : "—",
    (l.notes ?? "").replace(/\n/g, " "),
    new Date(Number(l.createdAt / 1_000_000n)).toLocaleDateString(),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsPage() {
  const { crmRole } = useAuth();
  const canManage = crmRole === "admin" || crmRole === "coordinator";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  const hasFilter = !!(
    search ||
    statusFilter ||
    priorityFilter ||
    sourceFilter ||
    campaignFilter
  );

  const { data: leads, isLoading } = useLeads(
    hasFilter
      ? {
          searchText: search || undefined,
          status: (statusFilter as LeadStatus) || undefined,
          priority: (priorityFilter as Priority) || undefined,
          source: sourceFilter || undefined,
          campaign: campaignFilter || undefined,
        }
      : null,
  );

  const { data: sources = [] } = useSources();
  const { data: campaigns = [] } = useCampaigns();
  const { data: users = [] } = useUsers();
  const deleteLead = useDeleteLead();

  const userMap = useMemo(
    () => new Map(users.map((u) => [u.id.toString(), u.name])),
    [users],
  );

  const handleDelete = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    if (confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) {
      deleteLead.mutate(lead.id);
    }
  };

  const columns: Column<Lead>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => (
        <div className="min-w-0 max-w-[160px]">
          <p className="text-sm font-medium text-foreground truncate">
            {row.name}
          </p>
          {row.email && (
            <p className="text-[11px] text-muted-foreground truncate">
              {row.email}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (row) => (
        <span className="text-xs font-mono text-foreground whitespace-nowrap">
          {row.phone}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (row) => <StatusBadge type="priority" value={row.priority} />,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge type="status" value={row.status} />,
    },
    {
      key: "source",
      header: "Source",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.source ?? "—"}
        </span>
      ),
    },
    {
      key: "campaign",
      header: "Campaign",
      render: (row) => (
        <span className="text-xs text-muted-foreground truncate max-w-[100px] block">
          {row.campaign ?? "—"}
        </span>
      ),
    },
    {
      key: "assigned",
      header: "Assigned",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.assignedUserId
            ? (userMap.get(row.assignedUserId.toString()) ?? "—")
            : "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (row) => (
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {new Date(Number(row.createdAt / 1_000_000n)).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            },
          )}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-[72px]",
      render: (row, idx) =>
        canManage ? (
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            <button
              type="button"
              data-ocid={`leads.edit_button.${idx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setEditLead(row);
              }}
              className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label={`Edit ${row.name}`}
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              type="button"
              data-ocid={`leads.delete_button.${idx + 1}`}
              onClick={(e) => handleDelete(e, row)}
              className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label={`Delete ${row.name}`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ) : null,
    },
  ];

  const visibleColumns = canManage
    ? columns
    : columns.filter((c) => c.key !== "actions");

  return (
    <div data-ocid="leads.page">
      <PageHeader
        title="Leads"
        subtitle={`${leads?.length ?? 0} leads`}
        actions={
          <div className="flex items-center gap-2">
            {leads && leads.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="leads.export_button"
                onClick={() => exportCSV(leads, userMap)}
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
              </Button>
            )}
            {canManage && (
              <Button
                size="sm"
                data-ocid="leads.add_button"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Lead
              </Button>
            )}
          </div>
        }
      />

      <div className="px-4 md:px-6 py-4 space-y-3">
        {/* Search + Filters Row */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                data-ocid="leads.search_input"
                placeholder="Search name, phone, email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>

            <div className="flex gap-2">
              <select
                data-ocid="leads.source_select"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="h-8 px-2.5 bg-muted border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All Sources</option>
                {sources
                  .filter((s) => s.isActive)
                  .map((s) => (
                    <option key={s.id.toString()} value={s.name}>
                      {s.name}
                    </option>
                  ))}
              </select>

              <select
                data-ocid="leads.campaign_select"
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="h-8 px-2.5 bg-muted border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All Campaigns</option>
                {campaigns
                  .filter((c) => c.isActive)
                  .map((c) => (
                    <option key={c.id.toString()} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Status chips */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              Status
            </span>
            {STATUS_FILTERS.map((f) => (
              <button
                key={`status-${f.label}`}
                type="button"
                data-ocid={`leads.status_filter.${f.label.toLowerCase()}`}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium transition-smooth",
                  statusFilter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80",
                )}
              >
                {f.label}
              </button>
            ))}

            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mx-1">
              Priority
            </span>
            {PRIORITY_FILTERS.map((f) => (
              <button
                key={`priority-${f.label}`}
                type="button"
                data-ocid={`leads.priority_filter.${f.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                onClick={() => setPriorityFilter(f.value)}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium transition-smooth",
                  priorityFilter === f.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80",
                )}
              >
                {f.label}
              </button>
            ))}

            {hasFilter && (
              <button
                type="button"
                data-ocid="leads.clear_filters_button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                  setPriorityFilter("");
                  setSourceFilter("");
                  setCampaignFilter("");
                }}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-smooth ml-1"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {!isLoading && leads?.length === 0 ? (
          <div className="bg-card border border-border rounded-lg">
            <EmptyState
              data-ocid="leads.empty_state"
              icon={Users}
              title="No leads found"
              description={
                hasFilter
                  ? "No leads match your current filters. Try adjusting them."
                  : "Add your first lead to get started tracking your pipeline."
              }
              action={
                canManage
                  ? { label: "Add Lead", onClick: () => setShowAddModal(true) }
                  : undefined
              }
            />
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <DataTable
              data-ocid="leads.table"
              columns={visibleColumns}
              data={leads ?? []}
              keyExtractor={(r) => r.id.toString()}
              isLoading={isLoading}
              onRowClick={(row) => setDetailLead(row)}
            />
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      <LeadFormModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        users={users}
        campaigns={campaigns}
        sources={sources}
      />

      {/* Edit Lead Modal */}
      {editLead && (
        <LeadFormModal
          open={!!editLead}
          onClose={() => setEditLead(null)}
          editLead={editLead}
          users={users}
          campaigns={campaigns}
          sources={sources}
        />
      )}

      {/* Lead Detail Modal */}
      {detailLead && (
        <LeadDetailModal
          open={!!detailLead}
          lead={detailLead}
          onClose={() => setDetailLead(null)}
          onEdit={
            canManage
              ? (l) => {
                  setDetailLead(null);
                  setEditLead(l);
                }
              : undefined
          }
          userMap={userMap}
        />
      )}
    </div>
  );
}
