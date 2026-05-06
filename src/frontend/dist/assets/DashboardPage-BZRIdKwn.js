import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, b as useLeadReport, d as useCallReport, e as useFollowUps, F as FollowUpFilter, f as useLeads, j as jsxRuntimeExports, P as PageHeader, B as Button, g as Phone, U as Users, C as CalendarClock } from "./index-Dycem9-F.js";
import { K as KPICard, T as TrendingUp } from "./KPICard-DwxYgfU9.js";
import { S as StatusBadge } from "./StatusBadge-BuLmWoc0.js";
import { S as Skeleton } from "./skeleton-Df5iuJsB.js";
import { T as TriangleAlert } from "./triangle-alert-Ct7FVtBC.js";
import { P as Plus } from "./plus-D0FSMPUw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5", key: "1glfrc" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
];
const CalendarPlus = createLucideIcon("calendar-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
const REVENUE_PER_DEAL = 45e3;
function isAdminOrCoordinator(role) {
  return role === "admin" || role === "coordinator";
}
function DashboardPage() {
  var _a, _b, _c, _d;
  const { crmRole, profile } = useAuth();
  const navigate = useNavigate();
  const meetingDialogRef = reactExports.useRef(null);
  const scopedUserId = isAdminOrCoordinator(crmRole) ? void 0 : profile == null ? void 0 : profile.id;
  const { data: leadReport, isLoading: reportLoading } = useLeadReport(
    scopedUserId ? { userId: scopedUserId } : {}
  );
  const { data: callReport, isLoading: callReportLoading } = useCallReport(
    scopedUserId ? { userId: scopedUserId } : {}
  );
  const { data: todayFollowUps, isLoading: followUpLoading } = useFollowUps(
    FollowUpFilter.Today
  );
  const { data: missedFollowUps } = useFollowUps(FollowUpFilter.Missed);
  const { data: leads, isLoading: leadsLoading } = useLeads(
    scopedUserId ? { assignedUserId: scopedUserId } : null
  );
  const isLoading = reportLoading || followUpLoading || leadsLoading || callReportLoading;
  const closedWonCount = Number((leadReport == null ? void 0 : leadReport.closedWon) ?? 0);
  const revenueEstimate = closedWonCount * REVENUE_PER_DEAL;
  const recentActivity = [...leads ?? []].sort((a, b) => Number(b.updatedAt - a.updatedAt)).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        subtitle: `${crmRole === "unknown" ? "" : crmRole.replace("_", " ")} — ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          missedFollowUps && missedFollowUps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-destructive/15 border border-destructive/30 text-destructive text-xs font-semibold",
              "data-ocid": "dashboard.missed_followup_alert",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                missedFollowUps.length,
                " missed"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "dashboard.call_button",
              onClick: () => navigate({ to: "/calls" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 mr-1.5" }),
                " Log Call"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              "data-ocid": "dashboard.add_lead_button",
              onClick: () => navigate({ to: "/leads" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                " Add Lead"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 py-5 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "dashboard.kpi.section", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", children: [0, 1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-12" })
          ]
        },
        n
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.total_leads",
            title: "Total Leads",
            value: ((_a = leadReport == null ? void 0 : leadReport.totalLeads) == null ? void 0 : _a.toString()) ?? "0",
            icon: Users,
            accent: "primary",
            subtitle: "All time"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.new_leads",
            title: "New Today",
            value: ((_b = leadReport == null ? void 0 : leadReport.newLeads) == null ? void 0 : _b.toString()) ?? "0",
            icon: TrendingUp,
            accent: "primary",
            subtitle: "Added today"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.followup_due",
            title: "Follow-up Due",
            value: ((_c = todayFollowUps == null ? void 0 : todayFollowUps.length) == null ? void 0 : _c.toString()) ?? "0",
            icon: CalendarClock,
            accent: "accent",
            subtitle: (missedFollowUps == null ? void 0 : missedFollowUps.length) ? `${missedFollowUps.length} missed` : "On schedule"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.deals_closed",
            title: "Deals Closed",
            value: ((_d = leadReport == null ? void 0 : leadReport.closedWon) == null ? void 0 : _d.toString()) ?? "0",
            icon: CircleCheckBig,
            accent: "success",
            subtitle: "Won deals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.revenue",
            title: "Revenue (Est.)",
            value: `₹${revenueEstimate.toLocaleString("en-IN")}`,
            icon: DollarSign,
            accent: "success",
            subtitle: "Closed deals × avg"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            "data-ocid": "dashboard.kpi.conversion",
            title: "Conversion",
            value: leadReport ? `${leadReport.conversionPercent}%` : "0%",
            icon: Percent,
            accent: "primary",
            subtitle: "Qualified → Won"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "lg:col-span-2 bg-card border border-border rounded-lg p-5",
            "data-ocid": "dashboard.pipeline.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-foreground", children: "Sales Pipeline" }),
                isAdminOrCoordinator(crmRole) && callReport && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                  Number(callReport.totalCalls).toLocaleString(),
                  " total calls"
                ] })
              ] }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 flex-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-8" })
              ] }, n)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PipelineFunnel, { report: leadReport }),
              isAdminOrCoordinator(crmRole) && callReport && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border grid grid-cols-4 gap-3", children: [
                {
                  label: "Total Calls",
                  value: Number(callReport.totalCalls),
                  color: "text-foreground"
                },
                {
                  label: "Connected",
                  value: Number(callReport.connectedCalls),
                  color: "text-chart-3"
                },
                {
                  label: "Interested",
                  value: Number(callReport.interestedCount),
                  color: "text-primary"
                },
                {
                  label: "Not Reached",
                  value: Number(callReport.notConnectedCalls),
                  color: "text-muted-foreground"
                }
              ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-lg font-bold font-display tabular-nums ${color}`,
                    children: value.toLocaleString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: label })
              ] }, label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-lg p-5",
            "data-ocid": "dashboard.activity.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-foreground", children: "Recent Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-muted-foreground" })
              ] }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-7 h-7 rounded-full shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-16" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14 rounded-full" })
              ] }, n)) }) : recentActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-8 text-center",
                  "data-ocid": "dashboard.activity.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 mx-auto text-muted-foreground/40 mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No leads yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-primary hover:underline mt-1",
                        onClick: () => navigate({ to: "/leads" }),
                        children: "Add your first lead →"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: recentActivity.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActivityRow,
                {
                  lead,
                  dataOcid: `dashboard.activity.item.${i + 1}`
                },
                lead.id.toString()
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quick_actions.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display mb-3", children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              label: "Add Lead",
              icon: Plus,
              description: "Create a new lead",
              ocid: "dashboard.quick_add_lead_button",
              accent: "primary",
              onClick: () => navigate({ to: "/leads" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              label: "Log Call",
              icon: Phone,
              description: "Record call outcome",
              ocid: "dashboard.quick_call_button",
              accent: "default",
              onClick: () => navigate({ to: "/calls" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              label: "Add Follow-up",
              icon: CalendarPlus,
              description: "Schedule a follow-up",
              ocid: "dashboard.quick_followup_button",
              accent: "accent",
              onClick: () => navigate({ to: "/followups" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              label: "Add Meeting",
              icon: CalendarClock,
              description: "Schedule a meeting",
              ocid: "dashboard.quick_meeting_button",
              accent: "default",
              onClick: () => {
                var _a2;
                return (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.showModal();
              }
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "dialog",
      {
        ref: meetingDialogRef,
        "data-ocid": "dashboard.meeting.dialog",
        className: "bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-md-elevated backdrop:bg-background/80 open:animate-fade-in",
        onClick: (e) => {
          var _a2;
          if (e.target === meetingDialogRef.current)
            (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.close();
        },
        onKeyDown: (e) => {
          var _a2;
          if (e.key === "Escape") (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.close();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold font-display text-foreground", children: "Add Meeting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "dashboard.meeting.close_button",
                onClick: () => {
                  var _a2;
                  return (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.close();
                },
                className: "w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                "aria-label": "Close dialog",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Meeting scheduling will be available in a future update. Use Follow-ups to track call-backs and appointments." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": "dashboard.meeting.cancel_button",
                onClick: () => {
                  var _a2;
                  return (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.close();
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                "data-ocid": "dashboard.meeting.confirm_button",
                onClick: () => {
                  var _a2;
                  (_a2 = meetingDialogRef.current) == null ? void 0 : _a2.close();
                  navigate({ to: "/followups" });
                },
                children: "Schedule Follow-up"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function ActivityRow({
  lead,
  dataOcid
}) {
  const ts = Number(lead.updatedAt) / 1e6;
  const now = Date.now();
  const diffMin = Math.floor((now - ts) / 6e4);
  const timeLabel = diffMin < 1 ? "just now" : diffMin < 60 ? `${diffMin}m ago` : diffMin < 1440 ? `${Math.floor(diffMin / 60)}h ago` : new Date(ts).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": dataOcid,
      className: "flex items-center gap-2.5 py-1.5 px-1 rounded-md hover:bg-muted/50 transition-colors group cursor-default",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: lead.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: timeLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "status", value: lead.status })
      ]
    }
  );
}
const accentClasses = {
  primary: "border-primary/25 bg-primary/8 hover:bg-primary/15 hover:border-primary/40",
  accent: "border-accent/25 bg-accent/8 hover:bg-accent/15 hover:border-accent/40",
  default: "border-border bg-card hover:bg-muted/70 hover:border-border"
};
const iconClasses = {
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent/15 text-accent",
  default: "bg-muted text-muted-foreground"
};
function QuickActionCard({
  label,
  icon: Icon,
  description,
  ocid,
  accent,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": ocid,
      onClick,
      className: `flex flex-col items-start gap-2.5 p-4 rounded-lg border transition-smooth text-left ${accentClasses[accent]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-md flex items-center justify-center ${iconClasses[accent]}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-display text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: description })
        ] })
      ]
    }
  );
}
function PipelineFunnel({ report }) {
  const stages = [
    {
      label: "Total",
      value: Number((report == null ? void 0 : report.totalLeads) ?? 0),
      colorClass: "bg-primary",
      bg: "bg-primary/10"
    },
    {
      label: "New",
      value: Number((report == null ? void 0 : report.newLeads) ?? 0),
      colorClass: "bg-primary/80",
      bg: "bg-primary/8"
    },
    {
      label: "Qualified",
      value: Number((report == null ? void 0 : report.qualified) ?? 0),
      colorClass: "bg-accent",
      bg: "bg-accent/8"
    },
    {
      label: "Proposal",
      value: Number((report == null ? void 0 : report.proposalSent) ?? 0),
      colorClass: "bg-accent/70",
      bg: "bg-accent/6"
    },
    {
      label: "Closed Won",
      value: Number((report == null ? void 0 : report.closedWon) ?? 0),
      colorClass: "bg-chart-3",
      bg: "bg-chart-3/8"
    }
  ];
  const max = Math.max(...stages.map((s) => s.value), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: stages.map((stage) => {
    const pct = Math.max(4, Math.round(stage.value / max * 100));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 text-[11px] text-muted-foreground font-display shrink-0 text-right", children: stage.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-7 bg-muted rounded-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full ${stage.colorClass} rounded-md transition-all duration-700 flex items-center px-2.5`,
          style: { width: `${pct}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-background/90 font-mono tabular-nums", children: stage.value.toLocaleString() })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 text-[11px] text-muted-foreground text-right font-mono tabular-nums", children: pct === 4 && stage.value === 0 ? "0%" : `${Math.round(stage.value / max * 100)}%` })
    ] }, stage.label);
  }) });
}
export {
  DashboardPage as default
};
