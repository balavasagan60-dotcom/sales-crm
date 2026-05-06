import { EmptyState } from "@/components/EmptyState";
import { KPICard } from "@/components/KPICard";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  useCallReport,
  useCampaigns,
  useLeadReport,
  useSources,
  useUsers,
} from "@/hooks/useCRM";
import type { DateRange } from "@/types";
import type {
  CallReport,
  CallReportFilter,
  Campaign,
  LeadReport,
  LeadReportFilter,
  Source,
  UserInfo,
} from "@/types";
import {
  BarChart3,
  Download,
  FilterIcon,
  Phone,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type ReportType = "call" | "lead";

function toTimestamp(dateStr: string, endOfDay = false): bigint {
  const d = new Date(dateStr);
  if (endOfDay) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return BigInt(d.getTime()) * 1_000_000n;
}

function formatDuration(secs: bigint): string {
  const s = Number(secs);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function safeNum(n: bigint | undefined): number {
  return n !== undefined ? Number(n) : 0;
}

// ─── DistributionBar ────────────────────────────────────────────────────────

function DistributionBar({
  segments,
  total,
}: {
  segments: { label: string; value: number; color: string }[];
  total: number;
}) {
  if (total === 0) {
    return <div className="h-3 rounded-full bg-muted" />;
  }
  return (
    <div className="space-y-2">
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {segments
          .filter((s) => s.value > 0)
          .map((seg) => (
            <div
              key={seg.label}
              className={seg.color}
              style={{ width: `${(seg.value / total) * 100}%` }}
              title={`${seg.label}: ${seg.value}`}
            />
          ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments
          .filter((s) => s.value > 0)
          .map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${seg.color}`} />
              <span className="text-xs text-muted-foreground">
                {seg.label}{" "}
                <span className="text-foreground font-medium">{seg.value}</span>
                <span className="text-muted-foreground ml-0.5">
                  ({total > 0 ? Math.round((seg.value / total) * 100) : 0}%)
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

// ─── Filter Panel ───────────────────────────────────────────────────────────

interface FilterState {
  fromDate: string;
  toDate: string;
  userId: string;
  sourceId: string;
  campaignId: string;
}

const todayStr = () => new Date().toISOString().slice(0, 10);
const thirtyDaysAgoStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
};

function FilterPanel({
  filters,
  setFilters,
  onApply,
  showUserFilter,
  showSourceFilter,
  showCampaignFilter,
  users,
  sources,
  campaigns,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onApply: () => void;
  showUserFilter: boolean;
  showSourceFilter: boolean;
  showCampaignFilter: boolean;
  users: UserInfo[];
  sources: Source[];
  campaigns: Campaign[];
}) {
  const inputCls =
    "h-8 w-full rounded-md border border-input bg-muted px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50";

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-3 items-end"
      data-ocid="reports.filter_panel"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="reports-from"
          className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
        >
          From
        </label>
        <input
          id="reports-from"
          type="date"
          data-ocid="reports.from_date_input"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          className={inputCls}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="reports-to"
          className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
        >
          To
        </label>
        <input
          id="reports-to"
          type="date"
          data-ocid="reports.to_date_input"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          className={inputCls}
        />
      </div>
      {showUserFilter && (
        <div className="flex flex-col gap-1 min-w-[140px]">
          <label
            htmlFor="reports-user"
            className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
          >
            Assigned User
          </label>
          <select
            id="reports-user"
            data-ocid="reports.user_select"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
            className={inputCls}
          >
            <option value="">All Users</option>
            {users.map((u) => (
              <option key={u.id.toString()} value={u.id.toString()}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {showSourceFilter && (
        <div className="flex flex-col gap-1 min-w-[140px]">
          <label
            htmlFor="reports-source"
            className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
          >
            Source
          </label>
          <select
            id="reports-source"
            data-ocid="reports.source_select"
            value={filters.sourceId}
            onChange={(e) =>
              setFilters({ ...filters, sourceId: e.target.value })
            }
            className={inputCls}
          >
            <option value="">All Sources</option>
            {sources.map((s) => (
              <option key={s.id.toString()} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {showCampaignFilter && (
        <div className="flex flex-col gap-1 min-w-[140px]">
          <label
            htmlFor="reports-campaign"
            className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
          >
            Campaign
          </label>
          <select
            id="reports-campaign"
            data-ocid="reports.campaign_select"
            value={filters.campaignId}
            onChange={(e) =>
              setFilters({ ...filters, campaignId: e.target.value })
            }
            className={inputCls}
          >
            <option value="">All Campaigns</option>
            {campaigns.map((c) => (
              <option key={c.id.toString()} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <Button
        size="sm"
        data-ocid="reports.apply_button"
        onClick={onApply}
        className="gap-1.5 h-8 self-end"
      >
        <FilterIcon className="w-3.5 h-3.5" />
        Apply Filters
      </Button>
    </div>
  );
}

// ─── Call Report Panel ───────────────────────────────────────────────────────

function CallReportPanel({ data }: { data: CallReport }) {
  const total = safeNum(data.totalCalls);
  const connected = safeNum(data.connectedCalls);
  const notConnected = safeNum(data.notConnectedCalls);
  const interested = safeNum(data.interestedCount);
  const notInterested = safeNum(data.notInterestedCount);
  const notReachable = safeNum(data.notReachableCount);
  const switchOff = safeNum(data.switchOffCount);
  const duration = data.totalDurationSecs;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard
          title="Total Calls"
          value={total}
          icon={Phone}
          accent="primary"
          data-ocid="reports.call.total_card"
        />
        <KPICard
          title="Connected"
          value={connected}
          accent="success"
          data-ocid="reports.call.connected_card"
        />
        <KPICard
          title="Not Connected"
          value={notConnected}
          accent="destructive"
          data-ocid="reports.call.not_connected_card"
        />
        <KPICard
          title="Total Duration"
          value={formatDuration(duration)}
          accent="accent"
          data-ocid="reports.call.duration_card"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard
          title="Interested"
          value={interested}
          accent="success"
          data-ocid="reports.call.interested_card"
        />
        <KPICard
          title="Not Interested"
          value={notInterested}
          accent="destructive"
          data-ocid="reports.call.not_interested_card"
        />
        <KPICard
          title="Not Reachable"
          value={notReachable}
          accent="accent"
          data-ocid="reports.call.not_reachable_card"
        />
        <KPICard
          title="Switch Off"
          value={switchOff}
          accent="accent"
          data-ocid="reports.call.switch_off_card"
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-5 space-y-5">
        <h3 className="text-sm font-semibold font-display text-foreground">
          Call Distribution
        </h3>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Connection Rate</p>
          <DistributionBar
            total={total}
            segments={[
              {
                label: "Connected",
                value: connected,
                color: "bg-chart-3",
              },
              {
                label: "Not Connected",
                value: notConnected,
                color: "bg-destructive",
              },
            ]}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Call Outcomes (of connected)
          </p>
          <DistributionBar
            total={interested + notInterested + notReachable + switchOff}
            segments={[
              { label: "Interested", value: interested, color: "bg-primary" },
              {
                label: "Not Interested",
                value: notInterested,
                color: "bg-destructive",
              },
              {
                label: "Not Reachable",
                value: notReachable,
                color: "bg-accent",
              },
              {
                label: "Switch Off",
                value: switchOff,
                color: "bg-muted-foreground",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Lead Report Panel ───────────────────────────────────────────────────────

function LeadReportPanel({ data }: { data: LeadReport }) {
  const total = safeNum(data.totalLeads);
  const newLeads = safeNum(data.newLeads);
  const qualified = safeNum(data.qualified);
  const proposalSent = safeNum(data.proposalSent);
  const closedWon = safeNum(data.closedWon);
  const closedLost = safeNum(data.closedLost);
  const convPct = safeNum(data.conversionPercent);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard
          title="Total Leads"
          value={total}
          icon={TrendingUp}
          accent="primary"
          data-ocid="reports.lead.total_card"
        />
        <KPICard
          title="New Leads"
          value={newLeads}
          accent="primary"
          data-ocid="reports.lead.new_card"
        />
        <KPICard
          title="Closed Won"
          value={closedWon}
          accent="success"
          data-ocid="reports.lead.won_card"
        />
        <KPICard
          title="Conversion %"
          value={`${convPct}%`}
          accent="success"
          data-ocid="reports.lead.conversion_card"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <KPICard
          title="Qualified"
          value={qualified}
          accent="accent"
          data-ocid="reports.lead.qualified_card"
        />
        <KPICard
          title="Proposal Sent"
          value={proposalSent}
          accent="accent"
          data-ocid="reports.lead.proposal_card"
        />
        <KPICard
          title="Closed Lost"
          value={closedLost}
          accent="destructive"
          data-ocid="reports.lead.lost_card"
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-5 space-y-5">
        <h3 className="text-sm font-semibold font-display text-foreground">
          Lead Pipeline Distribution
        </h3>
        <DistributionBar
          total={total}
          segments={[
            { label: "New", value: newLeads, color: "bg-primary" },
            {
              label: "Qualified",
              value: qualified,
              color: "bg-primary/70",
            },
            { label: "Proposal Sent", value: proposalSent, color: "bg-accent" },
            {
              label: "Closed Won",
              value: closedWon,
              color: "bg-chart-3",
            },
            {
              label: "Closed Lost",
              value: closedLost,
              color: "bg-destructive",
            },
          ]}
        />

        {total > 0 && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">
              Win / Loss Ratio
            </p>
            <DistributionBar
              total={closedWon + closedLost}
              segments={[
                {
                  label: "Won",
                  value: closedWon,
                  color: "bg-chart-3",
                },
                { label: "Lost", value: closedLost, color: "bg-destructive" },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CSV Export ──────────────────────────────────────────────────────────────

function exportCallReportCSV(data: CallReport, filters: FilterState) {
  const rows = [
    ["Metric", "Value"],
    ["Total Calls", String(data.totalCalls)],
    ["Connected Calls", String(data.connectedCalls)],
    ["Not Connected Calls", String(data.notConnectedCalls)],
    ["Interested", String(data.interestedCount)],
    ["Not Interested", String(data.notInterestedCount)],
    ["Not Reachable", String(data.notReachableCount)],
    ["Switch Off", String(data.switchOffCount)],
    ["Total Duration (secs)", String(data.totalDurationSecs)],
    ["Period", `${filters.fromDate} to ${filters.toDate}`],
  ];
  downloadCSV(rows, `call-report-${filters.fromDate}-${filters.toDate}.csv`);
}

function exportLeadReportCSV(data: LeadReport, filters: FilterState) {
  const rows = [
    ["Metric", "Value"],
    ["Total Leads", String(data.totalLeads)],
    ["New Leads", String(data.newLeads)],
    ["Qualified", String(data.qualified)],
    ["Proposal Sent", String(data.proposalSent)],
    ["Closed Won", String(data.closedWon)],
    ["Closed Lost", String(data.closedLost)],
    ["Conversion %", String(data.conversionPercent)],
    ["Period", `${filters.fromDate} to ${filters.toDate}`],
  ];
  downloadCSV(rows, `lead-report-${filters.fromDate}-${filters.toDate}.csv`);
}

function downloadCSV(rows: string[][], filename: string) {
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { crmRole } = useAuth();
  const isAdminOrCoordinator = crmRole === "admin" || crmRole === "coordinator";

  const { data: users = [] } = useUsers();
  const { data: sources = [] } = useSources();
  const { data: campaigns = [] } = useCampaigns();

  const [reportType, setReportType] = useState<ReportType>("call");
  const [filters, setFilters] = useState<FilterState>({
    fromDate: thirtyDaysAgoStr(),
    toDate: todayStr(),
    userId: "",
    sourceId: "",
    campaignId: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(filters);

  const buildDateRange = (f: FilterState): DateRange | undefined => {
    if (!f.fromDate || !f.toDate) return undefined;
    return {
      fromTs: toTimestamp(f.fromDate),
      toTs: toTimestamp(f.toDate, true),
    };
  };

  const callFilter: CallReportFilter = {
    dateRange: buildDateRange(appliedFilters),
    ...(isAdminOrCoordinator && appliedFilters.userId
      ? {
          userId: users.find((u) => u.id.toString() === appliedFilters.userId)
            ?.id,
        }
      : {}),
  };

  const leadFilter: LeadReportFilter = {
    dateRange: buildDateRange(appliedFilters),
    source: appliedFilters.sourceId || undefined,
    campaign: appliedFilters.campaignId || undefined,
    ...(isAdminOrCoordinator && appliedFilters.userId
      ? {
          userId: users.find((u) => u.id.toString() === appliedFilters.userId)
            ?.id,
        }
      : {}),
  };

  const callReportQuery = useCallReport(callFilter);
  const leadReportQuery = useLeadReport(leadFilter);

  const activeQuery = reportType === "call" ? callReportQuery : leadReportQuery;

  const handleExport = () => {
    if (reportType === "call" && callReportQuery.data) {
      exportCallReportCSV(callReportQuery.data, appliedFilters);
    } else if (reportType === "lead" && leadReportQuery.data) {
      exportLeadReportCSV(leadReportQuery.data, appliedFilters);
    }
  };

  return (
    <div data-ocid="reports.page">
      <PageHeader
        title="Reports"
        subtitle="Analytics and performance metrics"
        actions={
          <Button
            size="sm"
            variant="outline"
            data-ocid="reports.export_button"
            onClick={handleExport}
            disabled={!activeQuery.data}
            className="gap-1.5 text-xs h-8"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        }
      />

      <div className="px-4 md:px-6 py-5 space-y-5">
        {/* Report type toggle */}
        <div
          className="inline-flex rounded-lg border border-border bg-card p-1 gap-1"
          role="tablist"
          data-ocid="reports.type_toggle"
        >
          {(["call", "lead"] as ReportType[]).map((type) => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={reportType === type}
              data-ocid={`reports.${type}_tab`}
              onClick={() => setReportType(type)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium font-display transition-smooth ${
                reportType === type
                  ? "bg-primary text-primary-foreground shadow-sm-subtle"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type === "call" ? (
                <Phone className="w-3.5 h-3.5" />
              ) : (
                <BarChart3 className="w-3.5 h-3.5" />
              )}
              {type === "call" ? "Call Reports" : "Lead Reports"}
            </button>
          ))}
        </div>

        {/* Filters */}
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onApply={() => setAppliedFilters({ ...filters })}
          showUserFilter={isAdminOrCoordinator}
          showSourceFilter={reportType === "lead"}
          showCampaignFilter={reportType === "lead"}
          users={users}
          sources={sources}
          campaigns={campaigns}
        />

        {/* Report content */}
        {activeQuery.isLoading ? (
          <div
            className="flex items-center justify-center py-20"
            data-ocid="reports.loading_state"
          >
            <LoadingSpinner size="md" label="Loading report data..." />
          </div>
        ) : activeQuery.isError ? (
          <div data-ocid="reports.error_state">
            <EmptyState
              icon={BarChart3}
              title="Failed to load report"
              description="There was an error fetching the report data. Please try again."
            />
          </div>
        ) : activeQuery.data ? (
          <div data-ocid="reports.content">
            {reportType === "call" && callReportQuery.data && (
              <CallReportPanel data={callReportQuery.data} />
            )}
            {reportType === "lead" && leadReportQuery.data && (
              <LeadReportPanel data={leadReportQuery.data} />
            )}
          </div>
        ) : (
          <div data-ocid="reports.empty_state">
            <EmptyState
              icon={BarChart3}
              title="No data for selected period"
              description="Try adjusting your date range or filters to see report data."
            />
          </div>
        )}
      </div>
    </div>
  );
}
