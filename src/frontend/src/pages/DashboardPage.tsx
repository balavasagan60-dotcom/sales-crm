import { FollowUpFilter } from "@/backend";
import { KPICard } from "@/components/KPICard";
import { Layout, PageHeader } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useCallReport,
  useFollowUps,
  useLeadReport,
  useLeads,
} from "@/hooks/useCRM";
import type { CRMRole, Lead } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  CalendarClock,
  CalendarPlus,
  CheckCircle,
  DollarSign,
  Percent,
  Phone,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef } from "react";

const REVENUE_PER_DEAL = 45_000;

function isAdminOrCoordinator(role: CRMRole) {
  return role === "admin" || role === "coordinator";
}

export default function DashboardPage() {
  const { crmRole, profile } = useAuth();
  const navigate = useNavigate();
  const meetingDialogRef = useRef<HTMLDialogElement>(null);

  const scopedUserId = isAdminOrCoordinator(crmRole) ? undefined : profile?.id;

  const { data: leadReport, isLoading: reportLoading } = useLeadReport(
    scopedUserId ? { userId: scopedUserId } : {},
  );
  const { data: callReport, isLoading: callReportLoading } = useCallReport(
    scopedUserId ? { userId: scopedUserId } : {},
  );
  const { data: todayFollowUps, isLoading: followUpLoading } = useFollowUps(
    FollowUpFilter.Today,
  );
  const { data: missedFollowUps } = useFollowUps(FollowUpFilter.Missed);
  const { data: leads, isLoading: leadsLoading } = useLeads(
    scopedUserId ? { assignedUserId: scopedUserId } : null,
  );

  const isLoading =
    reportLoading || followUpLoading || leadsLoading || callReportLoading;

  const closedWonCount = Number(leadReport?.closedWon ?? 0);
  const revenueEstimate = closedWonCount * REVENUE_PER_DEAL;

  const recentActivity: Lead[] = [...(leads ?? [])]
    .sort((a, b) => Number(b.updatedAt - a.updatedAt))
    .slice(0, 8);

  return (
    <div data-ocid="dashboard.page">
      <PageHeader
        title="Dashboard"
        subtitle={`${
          crmRole === "unknown" ? "" : crmRole.replace("_", " ")
        } — ${new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}`}
        actions={
          <div className="flex gap-2">
            {missedFollowUps && missedFollowUps.length > 0 && (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-destructive/15 border border-destructive/30 text-destructive text-xs font-semibold"
                data-ocid="dashboard.missed_followup_alert"
              >
                <AlertTriangle className="w-3 h-3" />
                {missedFollowUps.length} missed
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              data-ocid="dashboard.call_button"
              onClick={() => navigate({ to: "/calls" })}
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" /> Log Call
            </Button>
            <Button
              size="sm"
              data-ocid="dashboard.add_lead_button"
              onClick={() => navigate({ to: "/leads" })}
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Lead
            </Button>
          </div>
        }
      />

      <div className="px-4 md:px-6 py-5 space-y-6">
        {/* KPI Grid */}
        <section data-ocid="dashboard.kpi.section">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="bg-card border border-border rounded-lg p-4 space-y-3"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-2.5 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <KPICard
                data-ocid="dashboard.kpi.total_leads"
                title="Total Leads"
                value={leadReport?.totalLeads?.toString() ?? "0"}
                icon={Users}
                accent="primary"
                subtitle="All time"
              />
              <KPICard
                data-ocid="dashboard.kpi.new_leads"
                title="New Today"
                value={leadReport?.newLeads?.toString() ?? "0"}
                icon={TrendingUp}
                accent="primary"
                subtitle="Added today"
              />
              <KPICard
                data-ocid="dashboard.kpi.followup_due"
                title="Follow-up Due"
                value={todayFollowUps?.length?.toString() ?? "0"}
                icon={CalendarClock}
                accent="accent"
                subtitle={
                  missedFollowUps?.length
                    ? `${missedFollowUps.length} missed`
                    : "On schedule"
                }
              />
              <KPICard
                data-ocid="dashboard.kpi.deals_closed"
                title="Deals Closed"
                value={leadReport?.closedWon?.toString() ?? "0"}
                icon={CheckCircle}
                accent="success"
                subtitle="Won deals"
              />
              <KPICard
                data-ocid="dashboard.kpi.revenue"
                title="Revenue (Est.)"
                value={`₹${revenueEstimate.toLocaleString("en-IN")}`}
                icon={DollarSign}
                accent="success"
                subtitle="Closed deals × avg"
              />
              <KPICard
                data-ocid="dashboard.kpi.conversion"
                title="Conversion"
                value={leadReport ? `${leadReport.conversionPercent}%` : "0%"}
                icon={Percent}
                accent="primary"
                subtitle="Qualified → Won"
              />
            </div>
          )}
        </section>

        {/* Middle row: Pipeline + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sales Pipeline */}
          <section
            className="lg:col-span-2 bg-card border border-border rounded-lg p-5"
            data-ocid="dashboard.pipeline.section"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold font-display text-foreground">
                Sales Pipeline
              </h2>
              {isAdminOrCoordinator(crmRole) && callReport && (
                <span className="text-[11px] text-muted-foreground">
                  {Number(callReport.totalCalls).toLocaleString()} total calls
                </span>
              )}
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <Skeleton className="h-3 w-20 shrink-0" />
                    <Skeleton className="h-6 flex-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                ))}
              </div>
            ) : (
              <PipelineFunnel report={leadReport} />
            )}

            {/* Call Summary Row — admin/coordinator only */}
            {isAdminOrCoordinator(crmRole) && callReport && !isLoading && (
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-4 gap-3">
                {(
                  [
                    {
                      label: "Total Calls",
                      value: Number(callReport.totalCalls),
                      color: "text-foreground",
                    },
                    {
                      label: "Connected",
                      value: Number(callReport.connectedCalls),
                      color: "text-chart-3",
                    },
                    {
                      label: "Interested",
                      value: Number(callReport.interestedCount),
                      color: "text-primary",
                    },
                    {
                      label: "Not Reached",
                      value: Number(callReport.notConnectedCalls),
                      color: "text-muted-foreground",
                    },
                  ] as const
                ).map(({ label, value, color }) => (
                  <div key={label} className="text-center">
                    <p
                      className={`text-lg font-bold font-display tabular-nums ${color}`}
                    >
                      {value.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Activity */}
          <section
            className="bg-card border border-border rounded-lg p-5"
            data-ocid="dashboard.activity.section"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold font-display text-foreground">
                Recent Activity
              </h2>
              <Activity className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex items-center gap-2.5">
                    <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-2.5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div
                className="py-8 text-center"
                data-ocid="dashboard.activity.empty_state"
              >
                <Users className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground">No leads yet</p>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline mt-1"
                  onClick={() => navigate({ to: "/leads" })}
                >
                  Add your first lead →
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {recentActivity.map((lead, i) => (
                  <ActivityRow
                    key={lead.id.toString()}
                    lead={lead}
                    dataOcid={`dashboard.activity.item.${i + 1}`}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Quick Actions */}
        <section data-ocid="dashboard.quick_actions.section">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickActionCard
              label="Add Lead"
              icon={Plus}
              description="Create a new lead"
              ocid="dashboard.quick_add_lead_button"
              accent="primary"
              onClick={() => navigate({ to: "/leads" })}
            />
            <QuickActionCard
              label="Log Call"
              icon={Phone}
              description="Record call outcome"
              ocid="dashboard.quick_call_button"
              accent="default"
              onClick={() => navigate({ to: "/calls" })}
            />
            <QuickActionCard
              label="Add Follow-up"
              icon={CalendarPlus}
              description="Schedule a follow-up"
              ocid="dashboard.quick_followup_button"
              accent="accent"
              onClick={() => navigate({ to: "/followups" })}
            />
            <QuickActionCard
              label="Add Meeting"
              icon={CalendarClock}
              description="Schedule a meeting"
              ocid="dashboard.quick_meeting_button"
              accent="default"
              onClick={() => meetingDialogRef.current?.showModal()}
            />
          </div>
        </section>
      </div>

      {/* Add Meeting Dialog */}
      <dialog
        ref={meetingDialogRef}
        data-ocid="dashboard.meeting.dialog"
        className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-md-elevated backdrop:bg-background/80 open:animate-fade-in"
        onClick={(e) => {
          if (e.target === meetingDialogRef.current)
            meetingDialogRef.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") meetingDialogRef.current?.close();
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-display text-foreground">
            Add Meeting
          </h3>
          <button
            type="button"
            data-ocid="dashboard.meeting.close_button"
            onClick={() => meetingDialogRef.current?.close()}
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Meeting scheduling will be available in a future update. Use
          Follow-ups to track call-backs and appointments.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="dashboard.meeting.cancel_button"
            onClick={() => meetingDialogRef.current?.close()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            data-ocid="dashboard.meeting.confirm_button"
            onClick={() => {
              meetingDialogRef.current?.close();
              navigate({ to: "/followups" });
            }}
          >
            Schedule Follow-up
          </Button>
        </div>
      </dialog>
    </div>
  );
}

// ── ActivityRow ──────────────────────────────────────────────────────────────

function ActivityRow({
  lead,
  dataOcid,
}: {
  lead: Lead;
  dataOcid: string;
}) {
  const ts = Number(lead.updatedAt) / 1_000_000;
  const now = Date.now();
  const diffMin = Math.floor((now - ts) / 60_000);
  const timeLabel =
    diffMin < 1
      ? "just now"
      : diffMin < 60
        ? `${diffMin}m ago`
        : diffMin < 1440
          ? `${Math.floor(diffMin / 60)}h ago`
          : new Date(ts).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            });

  return (
    <div
      data-ocid={dataOcid}
      className="flex items-center gap-2.5 py-1.5 px-1 rounded-md hover:bg-muted/50 transition-colors group cursor-default"
    >
      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Users className="w-3 h-3 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">
          {lead.name}
        </p>
        <p className="text-[10px] text-muted-foreground">{timeLabel}</p>
      </div>
      <StatusBadge type="status" value={lead.status} />
    </div>
  );
}

// ── QuickActionCard ──────────────────────────────────────────────────────────

type AccentType = "primary" | "accent" | "default";

const accentClasses: Record<AccentType, string> = {
  primary:
    "border-primary/25 bg-primary/8 hover:bg-primary/15 hover:border-primary/40",
  accent:
    "border-accent/25 bg-accent/8 hover:bg-accent/15 hover:border-accent/40",
  default: "border-border bg-card hover:bg-muted/70 hover:border-border",
};

const iconClasses: Record<AccentType, string> = {
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent/15 text-accent",
  default: "bg-muted text-muted-foreground",
};

function QuickActionCard({
  label,
  icon: Icon,
  description,
  ocid,
  accent,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  description: string;
  ocid: string;
  accent: AccentType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className={`flex flex-col items-start gap-2.5 p-4 rounded-lg border transition-smooth text-left ${
        accentClasses[accent]
      }`}
    >
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center ${
          iconClasses[accent]
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-semibold font-display text-foreground">
          {label}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
    </button>
  );
}

// ── PipelineFunnel ───────────────────────────────────────────────────────────

type ReportShape =
  | {
      totalLeads: bigint;
      newLeads: bigint;
      qualified: bigint;
      proposalSent: bigint;
      closedWon: bigint;
      closedLost: bigint;
    }
  | null
  | undefined;

function PipelineFunnel({ report }: { report: ReportShape }) {
  const stages: {
    label: string;
    value: number;
    colorClass: string;
    bg: string;
  }[] = [
    {
      label: "Total",
      value: Number(report?.totalLeads ?? 0),
      colorClass: "bg-primary",
      bg: "bg-primary/10",
    },
    {
      label: "New",
      value: Number(report?.newLeads ?? 0),
      colorClass: "bg-primary/80",
      bg: "bg-primary/8",
    },
    {
      label: "Qualified",
      value: Number(report?.qualified ?? 0),
      colorClass: "bg-accent",
      bg: "bg-accent/8",
    },
    {
      label: "Proposal",
      value: Number(report?.proposalSent ?? 0),
      colorClass: "bg-accent/70",
      bg: "bg-accent/6",
    },
    {
      label: "Closed Won",
      value: Number(report?.closedWon ?? 0),
      colorClass: "bg-chart-3",
      bg: "bg-chart-3/8",
    },
  ];

  const max = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className="space-y-2.5">
      {stages.map((stage) => {
        const pct = Math.max(4, Math.round((stage.value / max) * 100));
        return (
          <div key={stage.label} className="flex items-center gap-3">
            <div className="w-20 text-[11px] text-muted-foreground font-display shrink-0 text-right">
              {stage.label}
            </div>
            <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden">
              <div
                className={`h-full ${stage.colorClass} rounded-md transition-all duration-700 flex items-center px-2.5`}
                style={{ width: `${pct}%` }}
              >
                <span className="text-[11px] font-bold text-background/90 font-mono tabular-nums">
                  {stage.value.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-9 text-[11px] text-muted-foreground text-right font-mono tabular-nums">
              {pct === 4 && stage.value === 0
                ? "0%"
                : `${Math.round((stage.value / max) * 100)}%`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
