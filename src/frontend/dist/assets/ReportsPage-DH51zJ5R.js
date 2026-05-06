import { c as createLucideIcon, u as useAuth, s as useUsers, p as useSources, q as useCampaigns, r as reactExports, d as useCallReport, b as useLeadReport, j as jsxRuntimeExports, P as PageHeader, B as Button, g as Phone, K as ChartColumn, w as LoadingSpinner } from "./index-Dycem9-F.js";
import { E as EmptyState } from "./EmptyState-BY50E1ts.js";
import { K as KPICard, T as TrendingUp } from "./KPICard-DwxYgfU9.js";
import { D as Download } from "./download-BYQrhwLw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function toTimestamp(dateStr, endOfDay = false) {
  const d = new Date(dateStr);
  if (endOfDay) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return BigInt(d.getTime()) * 1000000n;
}
function formatDuration(secs) {
  const s = Number(secs);
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
function safeNum(n) {
  return n !== void 0 ? Number(n) : 0;
}
function DistributionBar({
  segments,
  total
}) {
  if (total === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-muted" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-3 rounded-full overflow-hidden gap-0.5", children: segments.filter((s) => s.value > 0).map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: seg.color,
        style: { width: `${seg.value / total * 100}%` },
        title: `${seg.label}: ${seg.value}`
      },
      seg.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-4 gap-y-1", children: segments.filter((s) => s.value > 0).map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2.5 h-2.5 rounded-sm ${seg.color}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        seg.label,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: seg.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-0.5", children: [
          "(",
          total > 0 ? Math.round(seg.value / total * 100) : 0,
          "%)"
        ] })
      ] })
    ] }, seg.label)) })
  ] });
}
const todayStr = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const thirtyDaysAgoStr = () => {
  const d = /* @__PURE__ */ new Date();
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
  campaigns
}) {
  const inputCls = "h-8 w-full rounded-md border border-input bg-muted px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-wrap gap-3 items-end",
      "data-ocid": "reports.filter_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-from",
              className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
              children: "From"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reports-from",
              type: "date",
              "data-ocid": "reports.from_date_input",
              value: filters.fromDate,
              onChange: (e) => setFilters({ ...filters, fromDate: e.target.value }),
              className: inputCls
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-to",
              className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
              children: "To"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reports-to",
              type: "date",
              "data-ocid": "reports.to_date_input",
              value: filters.toDate,
              onChange: (e) => setFilters({ ...filters, toDate: e.target.value }),
              className: inputCls
            }
          )
        ] }),
        showUserFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-user",
              className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
              children: "Assigned User"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reports-user",
              "data-ocid": "reports.user_select",
              value: filters.userId,
              onChange: (e) => setFilters({ ...filters, userId: e.target.value }),
              className: inputCls,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Users" }),
                users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id.toString(), children: u.name }, u.id.toString()))
              ]
            }
          )
        ] }),
        showSourceFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-source",
              className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
              children: "Source"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reports-source",
              "data-ocid": "reports.source_select",
              value: filters.sourceId,
              onChange: (e) => setFilters({ ...filters, sourceId: e.target.value }),
              className: inputCls,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Sources" }),
                sources.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.name, children: s.name }, s.id.toString()))
              ]
            }
          )
        ] }),
        showCampaignFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reports-campaign",
              className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
              children: "Campaign"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reports-campaign",
              "data-ocid": "reports.campaign_select",
              value: filters.campaignId,
              onChange: (e) => setFilters({ ...filters, campaignId: e.target.value }),
              className: inputCls,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Campaigns" }),
                campaigns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.id.toString()))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "reports.apply_button",
            onClick: onApply,
            className: "gap-1.5 h-8 self-end",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
              "Apply Filters"
            ]
          }
        )
      ]
    }
  );
}
function CallReportPanel({ data }) {
  const total = safeNum(data.totalCalls);
  const connected = safeNum(data.connectedCalls);
  const notConnected = safeNum(data.notConnectedCalls);
  const interested = safeNum(data.interestedCount);
  const notInterested = safeNum(data.notInterestedCount);
  const notReachable = safeNum(data.notReachableCount);
  const switchOff = safeNum(data.switchOffCount);
  const duration = data.totalDurationSecs;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Total Calls",
          value: total,
          icon: Phone,
          accent: "primary",
          "data-ocid": "reports.call.total_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Connected",
          value: connected,
          accent: "success",
          "data-ocid": "reports.call.connected_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Not Connected",
          value: notConnected,
          accent: "destructive",
          "data-ocid": "reports.call.not_connected_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Total Duration",
          value: formatDuration(duration),
          accent: "accent",
          "data-ocid": "reports.call.duration_card"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Interested",
          value: interested,
          accent: "success",
          "data-ocid": "reports.call.interested_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Not Interested",
          value: notInterested,
          accent: "destructive",
          "data-ocid": "reports.call.not_interested_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Not Reachable",
          value: notReachable,
          accent: "accent",
          "data-ocid": "reports.call.not_reachable_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Switch Off",
          value: switchOff,
          accent: "accent",
          "data-ocid": "reports.call.switch_off_card"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold font-display text-foreground", children: "Call Distribution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Connection Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DistributionBar,
          {
            total,
            segments: [
              {
                label: "Connected",
                value: connected,
                color: "bg-chart-3"
              },
              {
                label: "Not Connected",
                value: notConnected,
                color: "bg-destructive"
              }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Call Outcomes (of connected)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DistributionBar,
          {
            total: interested + notInterested + notReachable + switchOff,
            segments: [
              { label: "Interested", value: interested, color: "bg-primary" },
              {
                label: "Not Interested",
                value: notInterested,
                color: "bg-destructive"
              },
              {
                label: "Not Reachable",
                value: notReachable,
                color: "bg-accent"
              },
              {
                label: "Switch Off",
                value: switchOff,
                color: "bg-muted-foreground"
              }
            ]
          }
        )
      ] })
    ] })
  ] });
}
function LeadReportPanel({ data }) {
  const total = safeNum(data.totalLeads);
  const newLeads = safeNum(data.newLeads);
  const qualified = safeNum(data.qualified);
  const proposalSent = safeNum(data.proposalSent);
  const closedWon = safeNum(data.closedWon);
  const closedLost = safeNum(data.closedLost);
  const convPct = safeNum(data.conversionPercent);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Total Leads",
          value: total,
          icon: TrendingUp,
          accent: "primary",
          "data-ocid": "reports.lead.total_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "New Leads",
          value: newLeads,
          accent: "primary",
          "data-ocid": "reports.lead.new_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Closed Won",
          value: closedWon,
          accent: "success",
          "data-ocid": "reports.lead.won_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Conversion %",
          value: `${convPct}%`,
          accent: "success",
          "data-ocid": "reports.lead.conversion_card"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Qualified",
          value: qualified,
          accent: "accent",
          "data-ocid": "reports.lead.qualified_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Proposal Sent",
          value: proposalSent,
          accent: "accent",
          "data-ocid": "reports.lead.proposal_card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          title: "Closed Lost",
          value: closedLost,
          accent: "destructive",
          "data-ocid": "reports.lead.lost_card"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold font-display text-foreground", children: "Lead Pipeline Distribution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DistributionBar,
        {
          total,
          segments: [
            { label: "New", value: newLeads, color: "bg-primary" },
            {
              label: "Qualified",
              value: qualified,
              color: "bg-primary/70"
            },
            { label: "Proposal Sent", value: proposalSent, color: "bg-accent" },
            {
              label: "Closed Won",
              value: closedWon,
              color: "bg-chart-3"
            },
            {
              label: "Closed Lost",
              value: closedLost,
              color: "bg-destructive"
            }
          ]
        }
      ),
      total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Win / Loss Ratio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DistributionBar,
          {
            total: closedWon + closedLost,
            segments: [
              {
                label: "Won",
                value: closedWon,
                color: "bg-chart-3"
              },
              { label: "Lost", value: closedLost, color: "bg-destructive" }
            ]
          }
        )
      ] })
    ] })
  ] });
}
function exportCallReportCSV(data, filters) {
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
    ["Period", `${filters.fromDate} to ${filters.toDate}`]
  ];
  downloadCSV(rows, `call-report-${filters.fromDate}-${filters.toDate}.csv`);
}
function exportLeadReportCSV(data, filters) {
  const rows = [
    ["Metric", "Value"],
    ["Total Leads", String(data.totalLeads)],
    ["New Leads", String(data.newLeads)],
    ["Qualified", String(data.qualified)],
    ["Proposal Sent", String(data.proposalSent)],
    ["Closed Won", String(data.closedWon)],
    ["Closed Lost", String(data.closedLost)],
    ["Conversion %", String(data.conversionPercent)],
    ["Period", `${filters.fromDate} to ${filters.toDate}`]
  ];
  downloadCSV(rows, `lead-report-${filters.fromDate}-${filters.toDate}.csv`);
}
function downloadCSV(rows, filename) {
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function ReportsPage() {
  var _a, _b;
  const { crmRole } = useAuth();
  const isAdminOrCoordinator = crmRole === "admin" || crmRole === "coordinator";
  const { data: users = [] } = useUsers();
  const { data: sources = [] } = useSources();
  const { data: campaigns = [] } = useCampaigns();
  const [reportType, setReportType] = reactExports.useState("call");
  const [filters, setFilters] = reactExports.useState({
    fromDate: thirtyDaysAgoStr(),
    toDate: todayStr(),
    userId: "",
    sourceId: "",
    campaignId: ""
  });
  const [appliedFilters, setAppliedFilters] = reactExports.useState(filters);
  const buildDateRange = (f) => {
    if (!f.fromDate || !f.toDate) return void 0;
    return {
      fromTs: toTimestamp(f.fromDate),
      toTs: toTimestamp(f.toDate, true)
    };
  };
  const callFilter = {
    dateRange: buildDateRange(appliedFilters),
    ...isAdminOrCoordinator && appliedFilters.userId ? {
      userId: (_a = users.find((u) => u.id.toString() === appliedFilters.userId)) == null ? void 0 : _a.id
    } : {}
  };
  const leadFilter = {
    dateRange: buildDateRange(appliedFilters),
    source: appliedFilters.sourceId || void 0,
    campaign: appliedFilters.campaignId || void 0,
    ...isAdminOrCoordinator && appliedFilters.userId ? {
      userId: (_b = users.find((u) => u.id.toString() === appliedFilters.userId)) == null ? void 0 : _b.id
    } : {}
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Reports",
        subtitle: "Analytics and performance metrics",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            "data-ocid": "reports.export_button",
            onClick: handleExport,
            disabled: !activeQuery.data,
            className: "gap-1.5 text-xs h-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Export CSV"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 py-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "inline-flex rounded-lg border border-border bg-card p-1 gap-1",
          role: "tablist",
          "data-ocid": "reports.type_toggle",
          children: ["call", "lead"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": reportType === type,
              "data-ocid": `reports.${type}_tab`,
              onClick: () => setReportType(type),
              className: `flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium font-display transition-smooth ${reportType === type ? "bg-primary text-primary-foreground shadow-sm-subtle" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                type === "call" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5" }),
                type === "call" ? "Call Reports" : "Lead Reports"
              ]
            },
            type
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPanel,
        {
          filters,
          setFilters,
          onApply: () => setAppliedFilters({ ...filters }),
          showUserFilter: isAdminOrCoordinator,
          showSourceFilter: reportType === "lead",
          showCampaignFilter: reportType === "lead",
          users,
          sources,
          campaigns
        }
      ),
      activeQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-20",
          "data-ocid": "reports.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading report data..." })
        }
      ) : activeQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "reports.error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ChartColumn,
          title: "Failed to load report",
          description: "There was an error fetching the report data. Please try again."
        }
      ) }) : activeQuery.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.content", children: [
        reportType === "call" && callReportQuery.data && /* @__PURE__ */ jsxRuntimeExports.jsx(CallReportPanel, { data: callReportQuery.data }),
        reportType === "lead" && leadReportQuery.data && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadReportPanel, { data: leadReportQuery.data })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "reports.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ChartColumn,
          title: "No data for selected period",
          description: "Try adjusting your date range or filters to see report data."
        }
      ) })
    ] })
  ] });
}
export {
  ReportsPage as default
};
