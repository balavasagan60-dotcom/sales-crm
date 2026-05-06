import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, h as cn, i as useCallsForLead, k as useFollowUpsForLead, B as Button, g as Phone, l as User, m as useCreateLead, n as useUpdateLead, L as LeadStatus, o as Priority, u as useAuth, f as useLeads, p as useSources, q as useCampaigns, s as useUsers, t as useDeleteLead, P as PageHeader, U as Users } from "./index-Dycem9-F.js";
import { E as EmptyState } from "./EmptyState-BY50E1ts.js";
import { S as StatusBadge } from "./StatusBadge-BuLmWoc0.js";
import { I as Input, S as Search } from "./input-D9Oxwsql.js";
import { M as Modal } from "./Modal-CC6OlCR-.js";
import { P as Pencil, T as Trash2 } from "./trash-2-ByyWBT5o.js";
import { C as Clock } from "./clock-nTN9oU5y.js";
import { C as Calendar } from "./calendar-Dda-mbyZ.js";
import { D as Download } from "./download-BYQrhwLw.js";
import { P as Plus } from "./plus-D0FSMPUw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function DataTable({
  columns,
  data,
  keyExtractor,
  isLoading,
  emptyMessage = "No data found",
  className,
  rowClassName,
  onRowClick,
  "data-ocid": dataOcid
}) {
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState(null);
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(
        sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc"
      );
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn("w-full overflow-x-auto", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: cn(
              "px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display whitespace-nowrap",
              col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
              col.className
            ),
            onClick: () => col.sortable && handleSort(col.key),
            onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && col.sortable && handleSort(col.key),
            tabIndex: col.sortable ? 0 : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              col.header,
              col.sortable && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronUp,
                  {
                    className: cn(
                      "w-2.5 h-2.5 -mb-0.5",
                      sortKey === col.key && sortDir === "asc" ? "text-primary" : "opacity-30"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "w-2.5 h-2.5 -mt-0.5",
                      sortKey === col.key && sortDir === "desc" ? "text-primary" : "opacity-30"
                    )
                  }
                )
              ] })
            ] })
          },
          col.key
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted animate-pulse rounded" }) }, col.key)) }, `skeleton-${i}`)) : data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: columns.length,
            className: "px-3 py-12 text-center text-muted-foreground text-sm",
            children: emptyMessage
          }
        ) }) : data.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            "data-ocid": dataOcid ? `${dataOcid}.row.${idx + 1}` : void 0,
            className: cn(
              "border-b border-border/50 transition-colors",
              onRowClick && "cursor-pointer hover:bg-muted/40",
              rowClassName == null ? void 0 : rowClassName(row)
            ),
            onClick: () => onRowClick == null ? void 0 : onRowClick(row),
            onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && (onRowClick == null ? void 0 : onRowClick(row)),
            tabIndex: onRowClick ? 0 : void 0,
            children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: cn("px-3 py-2.5", col.className),
                children: col.render(row, idx)
              },
              col.key
            ))
          },
          keyExtractor(row)
        )) })
      ] })
    }
  );
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2", children });
}
function InfoRow({
  icon: Icon,
  label,
  value
}) {
  if (!value) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground break-words", children: value })
    ] })
  ] });
}
function LeadDetailModal({
  open,
  lead,
  onClose,
  onEdit,
  userMap
}) {
  const { data: calls = [], isLoading: callsLoading } = useCallsForLead(
    lead.id
  );
  const { data: followUps = [], isLoading: fuLoading } = useFollowUpsForLead(
    lead.id
  );
  const assignedName = lead.assignedUserId ? userMap.get(lead.assignedUserId.toString()) ?? "Unknown" : "Unassigned";
  const createdDate = new Date(
    Number(lead.createdAt / 1000000n)
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: lead.name,
      size: "xl",
      "data-ocid": "leads.detail_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "priority", value: lead.priority }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "status", value: lead.status }),
          onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "ml-auto",
              "data-ocid": "leads.detail_modal.edit_button",
              onClick: () => onEdit(lead),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3 mr-1.5" }),
                " Edit Lead"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Contact Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Phone, label: "Phone", value: lead.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Phone, label: "Alt. Phone", value: lead.altPhone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Mail, label: "Email", value: lead.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: User, label: "Assigned To", value: assignedName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Tag, label: "Source", value: lead.source }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Tag, label: "Campaign", value: lead.campaign }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: Tag,
                label: "Product Interest",
                value: lead.productInterest
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Clock, label: "Created", value: createdDate })
          ] }),
          lead.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground whitespace-pre-wrap", children: lead.notes })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionTitle, { children: [
            "Call History (",
            callsLoading ? "…" : calls.length,
            ")"
          ] }),
          callsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-10 bg-muted animate-pulse rounded-md"
            },
            i
          )) }) : calls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "No calls logged yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: calls.map((call, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `leads.detail_modal.call.${i + 1}`,
              className: "flex items-start gap-3 bg-muted/30 rounded-md px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${call.callStatus === "Connected" ? "bg-chart-3" : "bg-muted-foreground"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-semibold uppercase tracking-wide ${call.callStatus === "Connected" ? "text-chart-3" : "text-muted-foreground"}`,
                        children: call.callStatus
                      }
                    ),
                    call.outcome && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "· ",
                      call.outcome
                    ] }),
                    call.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "· ",
                      Math.floor(Number(call.duration) / 60),
                      "m",
                      " ",
                      Number(call.duration) % 60,
                      "s"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground ml-auto", children: new Date(
                      Number(call.callTimestamp / 1000000n)
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short"
                    }) })
                  ] }),
                  call.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 truncate", children: call.notes })
                ] })
              ]
            },
            call.id.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionTitle, { children: [
            "Follow-ups (",
            fuLoading ? "…" : followUps.length,
            ")"
          ] }),
          fuLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-10 bg-muted animate-pulse rounded-md"
            },
            i
          )) }) : followUps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "No follow-ups scheduled." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: followUps.map((fu, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `leads.detail_modal.followup.${i + 1}`,
              className: "flex items-start gap-3 bg-muted/30 rounded-md px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${fu.isCompleted ? "bg-chart-3" : "bg-accent"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground", children: [
                      fu.scheduledDate,
                      " at ",
                      fu.scheduledTime
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-semibold uppercase tracking-wide ml-auto ${fu.isCompleted ? "text-chart-3" : "text-accent"}`,
                        children: fu.isCompleted ? "Completed" : "Pending"
                      }
                    )
                  ] }),
                  fu.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: fu.notes }),
                  fu.completionNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5 italic", children: [
                    "Completion: ",
                    fu.completionNotes
                  ] })
                ] })
              ]
            },
            fu.id.toString()
          )) })
        ] })
      ] })
    }
  );
}
const LABEL = "text-[11px] font-semibold text-muted-foreground block mb-1 uppercase tracking-wide";
const SELECT_CLS = "w-full h-9 px-3 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";
function LeadFormModal({
  open,
  onClose,
  editLead,
  users,
  campaigns,
  sources
}) {
  var _a;
  const isEdit = !!editLead;
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const [form, setForm] = reactExports.useState({
    name: (editLead == null ? void 0 : editLead.name) ?? "",
    phone: (editLead == null ? void 0 : editLead.phone) ?? "",
    altPhone: (editLead == null ? void 0 : editLead.altPhone) ?? "",
    email: (editLead == null ? void 0 : editLead.email) ?? "",
    source: (editLead == null ? void 0 : editLead.source) ?? "",
    campaign: (editLead == null ? void 0 : editLead.campaign) ?? "",
    productInterest: (editLead == null ? void 0 : editLead.productInterest) ?? "",
    priority: (editLead == null ? void 0 : editLead.priority) ?? Priority.Warm,
    status: (editLead == null ? void 0 : editLead.status) ?? LeadStatus.New,
    notes: (editLead == null ? void 0 : editLead.notes) ?? "",
    assignedUserId: ((_a = editLead == null ? void 0 : editLead.assignedUserId) == null ? void 0 : _a.toString()) ?? ""
  });
  const field = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const isPending = createLead.isPending || updateLead.isPending;
  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedUser = users.find(
      (u) => u.id.toString() === form.assignedUserId
    );
    if (isEdit && editLead) {
      updateLead.mutate(
        {
          id: editLead.id,
          name: form.name || void 0,
          phone: form.phone || void 0,
          altPhone: form.altPhone || void 0,
          email: form.email || void 0,
          source: form.source || void 0,
          campaign: form.campaign || void 0,
          productInterest: form.productInterest || void 0,
          priority: form.priority,
          status: form.status,
          notes: form.notes || void 0,
          assignedUserId: assignedUser == null ? void 0 : assignedUser.id
        },
        { onSuccess: onClose }
      );
    } else {
      createLead.mutate(
        {
          name: form.name,
          phone: form.phone,
          altPhone: form.altPhone || void 0,
          email: form.email || void 0,
          source: form.source || void 0,
          campaign: form.campaign || void 0,
          productInterest: form.productInterest || void 0,
          priority: form.priority,
          status: form.status,
          notes: form.notes || void 0,
          assignedUserId: assignedUser == null ? void 0 : assignedUser.id
        },
        { onSuccess: onClose }
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: isEdit ? `Edit Lead — ${editLead == null ? void 0 : editLead.name}` : "Add New Lead",
      size: "lg",
      "data-ocid": isEdit ? "leads.edit_modal" : "leads.add_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-name", className: LABEL, children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lf-name",
                "data-ocid": "leads.modal.name_input",
                value: form.name,
                onChange: (e) => field("name", e.target.value),
                placeholder: "Lead name",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-phone", className: LABEL, children: "Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lf-phone",
                "data-ocid": "leads.modal.phone_input",
                value: form.phone,
                onChange: (e) => field("phone", e.target.value),
                placeholder: "+91 XXXXX XXXXX",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-altphone", className: LABEL, children: "Alt. Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lf-altphone",
                "data-ocid": "leads.modal.altphone_input",
                value: form.altPhone,
                onChange: (e) => field("altPhone", e.target.value),
                placeholder: "Alternate number"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-email", className: LABEL, children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lf-email",
                "data-ocid": "leads.modal.email_input",
                type: "email",
                value: form.email,
                onChange: (e) => field("email", e.target.value),
                placeholder: "email@example.com"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-source", className: LABEL, children: "Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lf-source",
                "data-ocid": "leads.modal.source_select",
                value: form.source,
                onChange: (e) => field("source", e.target.value),
                className: SELECT_CLS,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select source —" }),
                  sources.filter((s) => s.isActive).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.name, children: s.name }, s.id.toString()))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-campaign", className: LABEL, children: "Campaign" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lf-campaign",
                "data-ocid": "leads.modal.campaign_select",
                value: form.campaign,
                onChange: (e) => field("campaign", e.target.value),
                className: SELECT_CLS,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select campaign —" }),
                  campaigns.filter((c) => c.isActive).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.id.toString()))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-priority", className: LABEL, children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lf-priority",
                "data-ocid": "leads.modal.priority_select",
                value: form.priority,
                onChange: (e) => field("priority", e.target.value),
                className: SELECT_CLS,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: Priority.Hot, children: "🔥 Hot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: Priority.Warm, children: "☀️ Warm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: Priority.Cold, children: "❄️ Cold" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-status", className: LABEL, children: "Lead Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lf-status",
                "data-ocid": "leads.modal.status_select",
                value: form.status,
                onChange: (e) => field("status", e.target.value),
                className: SELECT_CLS,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: LeadStatus.New, children: "New" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: LeadStatus.Interested, children: "Interested" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: LeadStatus.Proposal, children: "Proposal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: LeadStatus.ClosedWon, children: "Closed Won" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: LeadStatus.ClosedLost, children: "Closed Lost" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-product", className: LABEL, children: "Product Interest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lf-product",
                "data-ocid": "leads.modal.product_input",
                value: form.productInterest,
                onChange: (e) => field("productInterest", e.target.value),
                placeholder: "e.g. Agri Tractor"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-assigned", className: LABEL, children: "Assign To" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lf-assigned",
                "data-ocid": "leads.modal.assigned_select",
                value: form.assignedUserId,
                onChange: (e) => field("assignedUserId", e.target.value),
                className: SELECT_CLS,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Unassigned —" }),
                  users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id.toString(), children: u.name }, u.id.toString()))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lf-notes", className: LABEL, children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "lf-notes",
              "data-ocid": "leads.modal.notes_textarea",
              value: form.notes,
              onChange: (e) => field("notes", e.target.value),
              placeholder: "Any additional context…",
              rows: 2,
              className: "w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              className: "flex-1",
              "data-ocid": "leads.modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              className: "flex-1",
              "data-ocid": "leads.modal.submit_button",
              children: isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Lead"
            }
          )
        ] })
      ] })
    }
  );
}
const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "New", value: LeadStatus.New },
  { label: "Interested", value: LeadStatus.Interested },
  { label: "Proposal", value: LeadStatus.Proposal },
  { label: "Won", value: LeadStatus.ClosedWon },
  { label: "Lost", value: LeadStatus.ClosedLost }
];
const PRIORITY_FILTERS = [
  { label: "All", value: "" },
  { label: "🔥 Hot", value: Priority.Hot },
  { label: "☀️ Warm", value: Priority.Warm },
  { label: "❄️ Cold", value: Priority.Cold }
];
function exportCSV(leads, users) {
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
    "Created"
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
    l.assignedUserId ? users.get(l.assignedUserId.toString()) ?? "—" : "—",
    (l.notes ?? "").replace(/\n/g, " "),
    new Date(Number(l.createdAt / 1000000n)).toLocaleDateString()
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function LeadsPage() {
  const { crmRole } = useAuth();
  const canManage = crmRole === "admin" || crmRole === "coordinator";
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [priorityFilter, setPriorityFilter] = reactExports.useState("");
  const [sourceFilter, setSourceFilter] = reactExports.useState("");
  const [campaignFilter, setCampaignFilter] = reactExports.useState("");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editLead, setEditLead] = reactExports.useState(null);
  const [detailLead, setDetailLead] = reactExports.useState(null);
  const hasFilter = !!(search || statusFilter || priorityFilter || sourceFilter || campaignFilter);
  const { data: leads, isLoading } = useLeads(
    hasFilter ? {
      searchText: search || void 0,
      status: statusFilter || void 0,
      priority: priorityFilter || void 0,
      source: sourceFilter || void 0,
      campaign: campaignFilter || void 0
    } : null
  );
  const { data: sources = [] } = useSources();
  const { data: campaigns = [] } = useCampaigns();
  const { data: users = [] } = useUsers();
  const deleteLead = useDeleteLead();
  const userMap = reactExports.useMemo(
    () => new Map(users.map((u) => [u.id.toString(), u.name])),
    [users]
  );
  const handleDelete = (e, lead) => {
    e.stopPropagation();
    if (confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) {
      deleteLead.mutate(lead.id);
    }
  };
  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 max-w-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: row.name }),
        row.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: row.email })
      ] })
    },
    {
      key: "phone",
      header: "Phone",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground whitespace-nowrap", children: row.phone })
    },
    {
      key: "priority",
      header: "Priority",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "priority", value: row.priority })
    },
    {
      key: "status",
      header: "Status",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "status", value: row.status })
    },
    {
      key: "source",
      header: "Source",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: row.source ?? "—" })
    },
    {
      key: "campaign",
      header: "Campaign",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[100px] block", children: row.campaign ?? "—" })
    },
    {
      key: "assigned",
      header: "Assigned",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: row.assignedUserId ? userMap.get(row.assignedUserId.toString()) ?? "—" : "—" })
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground whitespace-nowrap", children: new Date(Number(row.createdAt / 1000000n)).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "2-digit"
        }
      ) })
    },
    {
      key: "actions",
      header: "",
      className: "w-[72px]",
      render: (row, idx) => canManage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: () => {
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `leads.edit_button.${idx + 1}`,
                onClick: (e) => {
                  e.stopPropagation();
                  setEditLead(row);
                },
                className: "p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors",
                "aria-label": `Edit ${row.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `leads.delete_button.${idx + 1}`,
                onClick: (e) => handleDelete(e, row),
                className: "p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                "aria-label": `Delete ${row.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ]
        }
      ) : null
    }
  ];
  const visibleColumns = canManage ? columns : columns.filter((c) => c.key !== "actions");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "leads.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Leads",
        subtitle: `${(leads == null ? void 0 : leads.length) ?? 0} leads`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          leads && leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              "data-ocid": "leads.export_button",
              onClick: () => exportCSV(leads, userMap),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
                " Export CSV"
              ]
            }
          ),
          canManage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              "data-ocid": "leads.add_button",
              onClick: () => setShowAddModal(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                " Add Lead"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 py-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "leads.search_input",
                placeholder: "Search name, phone, email…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-8 text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                "data-ocid": "leads.source_select",
                value: sourceFilter,
                onChange: (e) => setSourceFilter(e.target.value),
                className: "h-8 px-2.5 bg-muted border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Sources" }),
                  sources.filter((s) => s.isActive).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.name, children: s.name }, s.id.toString()))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                "data-ocid": "leads.campaign_select",
                value: campaignFilter,
                onChange: (e) => setCampaignFilter(e.target.value),
                className: "h-8 px-2.5 bg-muted border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Campaigns" }),
                  campaigns.filter((c) => c.isActive).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.id.toString()))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mr-1", children: "Status" }),
          STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `leads.status_filter.${f.label.toLowerCase()}`,
              onClick: () => setStatusFilter(f.value),
              className: cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium transition-smooth",
                statusFilter === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              ),
              children: f.label
            },
            `status-${f.label}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mx-1", children: "Priority" }),
          PRIORITY_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `leads.priority_filter.${f.label.toLowerCase().replace(/[^a-z]/g, "")}`,
              onClick: () => setPriorityFilter(f.value),
              className: cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium transition-smooth",
                priorityFilter === f.value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              ),
              children: f.label
            },
            `priority-${f.label}`
          )),
          hasFilter && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "leads.clear_filters_button",
              onClick: () => {
                setSearch("");
                setStatusFilter("");
                setPriorityFilter("");
                setSourceFilter("");
                setCampaignFilter("");
              },
              className: "px-2.5 py-0.5 rounded-full text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-smooth ml-1",
              children: "✕ Clear"
            }
          )
        ] })
      ] }),
      !isLoading && (leads == null ? void 0 : leads.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          "data-ocid": "leads.empty_state",
          icon: Users,
          title: "No leads found",
          description: hasFilter ? "No leads match your current filters. Try adjusting them." : "Add your first lead to get started tracking your pipeline.",
          action: canManage ? { label: "Add Lead", onClick: () => setShowAddModal(true) } : void 0
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          "data-ocid": "leads.table",
          columns: visibleColumns,
          data: leads ?? [],
          keyExtractor: (r) => r.id.toString(),
          isLoading,
          onRowClick: (row) => setDetailLead(row)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadFormModal,
      {
        open: showAddModal,
        onClose: () => setShowAddModal(false),
        users,
        campaigns,
        sources
      }
    ),
    editLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadFormModal,
      {
        open: !!editLead,
        onClose: () => setEditLead(null),
        editLead,
        users,
        campaigns,
        sources
      }
    ),
    detailLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadDetailModal,
      {
        open: !!detailLead,
        lead: detailLead,
        onClose: () => setDetailLead(null),
        onEdit: canManage ? (l) => {
          setDetailLead(null);
          setEditLead(l);
        } : void 0,
        userMap
      }
    )
  ] });
}
export {
  LeadsPage as default
};
