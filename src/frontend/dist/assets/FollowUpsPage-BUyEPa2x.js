import { c as createLucideIcon, r as reactExports, f as useLeads, F as FollowUpFilter, j as jsxRuntimeExports, P as PageHeader, B as Button, e as useFollowUps, G as useCreateFollowUp, H as useUpdateFollowUp, g as Phone, I as Link, J as ue } from "./index-Dycem9-F.js";
import { E as EmptyState } from "./EmptyState-BY50E1ts.js";
import { M as Modal } from "./Modal-CC6OlCR-.js";
import { B as Badge } from "./badge-BR0hoAOX.js";
import { S as Skeleton } from "./skeleton-Df5iuJsB.js";
import { P as Plus } from "./plus-D0FSMPUw.js";
import { C as Clock } from "./clock-nTN9oU5y.js";
import { C as Calendar } from "./calendar-Dda-mbyZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
const TABS = [
  {
    id: "today",
    label: "Today",
    filter: FollowUpFilter.Today,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
    emptyTitle: "No follow-ups today",
    emptyDescription: "You're all clear for today. Add one to stay on track."
  },
  {
    id: "missed",
    label: "Missed",
    filter: FollowUpFilter.Missed,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5" }),
    emptyTitle: "No missed follow-ups",
    emptyDescription: "Great job! You haven't missed any scheduled follow-ups."
  },
  {
    id: "upcoming",
    label: "Upcoming",
    filter: FollowUpFilter.Upcoming,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-3.5 h-3.5" }),
    emptyTitle: "Nothing upcoming",
    emptyDescription: "Schedule a follow-up with a lead to see it here."
  },
  {
    id: "completed",
    label: "Completed",
    filter: FollowUpFilter.Completed,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
    emptyTitle: "No completed follow-ups",
    emptyDescription: "Mark follow-ups as done to see them in this tab."
  }
];
function formatDateTime(date, time) {
  try {
    const d = /* @__PURE__ */ new Date(`${date}T${time}`);
    return d.toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return `${date} ${time}`;
  }
}
function getLeadById(leads, id) {
  return leads == null ? void 0 : leads.find((l) => l.id === id);
}
const inputClass = "w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth";
const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5";
function AddFollowUpModal({ open, onClose, leads }) {
  const createFollowUp = useCreateFollowUp();
  const [leadId, setLeadId] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [reminder, setReminder] = reactExports.useState(false);
  const reset = () => {
    setLeadId("");
    setDate("");
    setTime("");
    setNotes("");
    setReminder(false);
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadId || !date || !time) return;
    const input = {
      leadId: BigInt(leadId),
      scheduledDate: date,
      scheduledTime: time,
      notes: notes.trim() || void 0,
      reminderEnabled: reminder
    };
    createFollowUp.mutate(input, {
      onSuccess: () => {
        ue.success("Follow-up scheduled");
        handleClose();
      },
      onError: () => ue.error("Failed to schedule follow-up")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: handleClose,
      title: "Schedule Follow-up",
      size: "md",
      "data-ocid": "followup.add_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "fu-lead", className: labelClass, children: [
            "Select Lead ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "fu-lead",
              "data-ocid": "followup.lead_select",
              value: leadId,
              onChange: (e) => setLeadId(e.target.value),
              className: inputClass,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a lead..." }),
                leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: lead.id.toString(), children: [
                  lead.name,
                  " — ",
                  lead.phone
                ] }, lead.id.toString()))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "fu-date", className: labelClass, children: [
              "Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "fu-date",
                "data-ocid": "followup.date_input",
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                className: inputClass,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "fu-time", className: labelClass, children: [
              "Time ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "fu-time",
                "data-ocid": "followup.time_input",
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value),
                className: inputClass,
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fu-notes", className: labelClass, children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "fu-notes",
              "data-ocid": "followup.notes_textarea",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "What to discuss, context, etc.",
              rows: 3,
              className: `${inputClass} resize-none`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/60 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Enable reminder" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "followup.reminder_toggle",
              onClick: () => setReminder((v) => !v),
              "aria-pressed": reminder,
              "aria-label": "Toggle reminder",
              className: `relative w-10 h-5 rounded-full transition-smooth ${reminder ? "bg-primary" : "bg-border"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-foreground transition-smooth ${reminder ? "translate-x-5" : "translate-x-0"}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: handleClose,
              "data-ocid": "followup.add_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "flex-1",
              "data-ocid": "followup.add_modal.submit_button",
              disabled: !leadId || !date || !time || createFollowUp.isPending,
              children: createFollowUp.isPending ? "Scheduling..." : "Schedule"
            }
          )
        ] })
      ] })
    }
  );
}
function EditFollowUpModal({
  open,
  onClose,
  followUp
}) {
  const updateFollowUp = useUpdateFollowUp();
  const [date, setDate] = reactExports.useState(followUp.scheduledDate);
  const [time, setTime] = reactExports.useState(followUp.scheduledTime);
  const [notes, setNotes] = reactExports.useState(followUp.notes ?? "");
  const [reminder, setReminder] = reactExports.useState(followUp.reminderEnabled);
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = {
      id: followUp.id,
      scheduledDate: date,
      scheduledTime: time,
      notes: notes.trim() || void 0,
      reminderEnabled: reminder
    };
    updateFollowUp.mutate(input, {
      onSuccess: () => {
        ue.success("Follow-up updated");
        onClose();
      },
      onError: () => ue.error("Failed to update follow-up")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Edit Follow-up",
      size: "md",
      "data-ocid": "followup.edit_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "efu-date", className: labelClass, children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "efu-date",
                "data-ocid": "followup.edit_date_input",
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                className: inputClass,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "efu-time", className: labelClass, children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "efu-time",
                "data-ocid": "followup.edit_time_input",
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value),
                className: inputClass,
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "efu-notes", className: labelClass, children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "efu-notes",
              "data-ocid": "followup.edit_notes_textarea",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Discussion notes...",
              rows: 3,
              className: `${inputClass} resize-none`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/60 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Enable reminder" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "followup.edit_reminder_toggle",
              onClick: () => setReminder((v) => !v),
              "aria-pressed": reminder,
              "aria-label": "Toggle reminder",
              className: `relative w-10 h-5 rounded-full transition-smooth ${reminder ? "bg-primary" : "bg-border"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-foreground transition-smooth ${reminder ? "translate-x-5" : "translate-x-0"}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: onClose,
              "data-ocid": "followup.edit_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "flex-1",
              "data-ocid": "followup.edit_modal.submit_button",
              disabled: !date || !time || updateFollowUp.isPending,
              children: updateFollowUp.isPending ? "Saving..." : "Save changes"
            }
          )
        ] })
      ] })
    }
  );
}
function CompleteFollowUpModal({
  open,
  onClose,
  followUp,
  leadName
}) {
  const updateFollowUp = useUpdateFollowUp();
  const [completionNotes, setCompletionNotes] = reactExports.useState("");
  const handleConfirm = () => {
    const input = {
      id: followUp.id,
      isCompleted: true,
      completionNotes: completionNotes.trim() || void 0
    };
    updateFollowUp.mutate(input, {
      onSuccess: () => {
        ue.success("Follow-up marked as completed");
        setCompletionNotes("");
        onClose();
      },
      onError: () => ue.error("Failed to update follow-up")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Mark as Completed",
      size: "sm",
      "data-ocid": "followup.complete_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Mark follow-up with",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: leadName }),
          " as completed. Add outcome notes below."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "complete-notes", className: labelClass, children: "Completion notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "complete-notes",
              "data-ocid": "followup.complete_notes_textarea",
              value: completionNotes,
              onChange: (e) => setCompletionNotes(e.target.value),
              placeholder: "What happened? Outcome of the call...",
              rows: 3,
              className: `${inputClass} resize-none`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: onClose,
              "data-ocid": "followup.complete_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "flex-1",
              onClick: handleConfirm,
              "data-ocid": "followup.complete_modal.confirm_button",
              disabled: updateFollowUp.isPending,
              children: updateFollowUp.isPending ? "Saving..." : "Mark Complete"
            }
          )
        ] })
      ] })
    }
  );
}
function FollowUpCard({
  followUp,
  lead,
  isMissed,
  isCompleted,
  index,
  onComplete,
  onEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `followup.item.${index}`,
      className: `relative bg-card border rounded-xl p-4 transition-smooth hover:shadow-md-elevated animate-fade-in ${isMissed ? "border-amber-500/40" : isCompleted ? "border-border/50 opacity-80" : "border-border"}`,
      style: isMissed ? { background: "oklch(0.72 0.17 70 / 0.06)" } : void 0,
      children: [
        isMissed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 top-3 bottom-3 w-1 rounded-r-full",
            style: { background: "oklch(0.72 0.17 70)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display text-foreground truncate", children: (lead == null ? void 0 : lead.name) ?? `Lead #${followUp.leadId.toString()}` }),
              isMissed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-amber-500/60 text-amber-400 text-[10px] px-1.5 py-0 shrink-0",
                  children: "Overdue"
                }
              ),
              isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-green-500/40 text-green-400 text-[10px] px-1.5 py-0 shrink-0",
                  children: "Done"
                }
              ),
              followUp.reminderEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3 text-primary shrink-0" })
            ] }),
            (lead == null ? void 0 : lead.phone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: lead.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium ${isMissed ? "text-amber-400" : "text-muted-foreground"}`,
                  children: formatDateTime(followUp.scheduledDate, followUp.scheduledTime)
                }
              )
            ] }),
            followUp.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: followUp.notes }),
            isCompleted && followUp.completionNotes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 px-2.5 py-1.5 bg-muted/60 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground italic", children: [
              "✓ ",
              followUp.completionNotes
            ] }) })
          ] }),
          !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `followup.complete_button.${index}`,
                onClick: () => onComplete(followUp, lead),
                className: "flex items-center gap-1.5 px-2.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-[11px] font-medium transition-smooth",
                "aria-label": "Mark as complete",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Complete" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `followup.edit_button.${index}`,
                onClick: () => onEdit(followUp),
                className: "flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth",
                "aria-label": "Edit follow-up",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Edit" })
                ]
              }
            ),
            lead && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/leads",
                "data-ocid": `followup.view_lead_link.${index}`,
                className: "flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth",
                "aria-label": "View lead",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Lead" })
                ]
              }
            )
          ] }),
          isCompleted && lead && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/leads",
              "data-ocid": `followup.view_lead_link.${index}`,
              className: "flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth shrink-0",
              "aria-label": "View lead",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function FollowUpSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded-lg" })
    ] })
  ] }) }, i)) });
}
function TabPanel({
  tab,
  leads,
  onAddFollowUp,
  onComplete,
  onEdit
}) {
  const { data: followUps, isLoading } = useFollowUps(tab.filter);
  const isMissed = tab.id === "missed";
  const isCompleted = tab.id === "completed";
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FollowUpSkeleton, {});
  if (!followUps || followUps.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: isCompleted ? CircleCheck : Calendar,
        title: tab.emptyTitle,
        description: tab.emptyDescription,
        action: !isCompleted ? { label: "Add Follow-up", onClick: onAddFollowUp } : void 0,
        "data-ocid": `followup.${tab.id}_tab.empty_state`
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 animate-fade-in", children: followUps.map((fu, i) => {
    const lead = getLeadById(leads, fu.leadId);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FollowUpCard,
      {
        followUp: fu,
        lead,
        isMissed,
        isCompleted,
        index: i + 1,
        onComplete,
        onEdit
      },
      fu.id.toString()
    );
  }) });
}
function useTabCounts() {
  var _a, _b, _c, _d;
  const todayQ = useFollowUps(FollowUpFilter.Today);
  const missedQ = useFollowUps(FollowUpFilter.Missed);
  const upcomingQ = useFollowUps(FollowUpFilter.Upcoming);
  const completedQ = useFollowUps(FollowUpFilter.Completed);
  return {
    today: ((_a = todayQ.data) == null ? void 0 : _a.length) ?? 0,
    missed: ((_b = missedQ.data) == null ? void 0 : _b.length) ?? 0,
    upcoming: ((_c = upcomingQ.data) == null ? void 0 : _c.length) ?? 0,
    completed: ((_d = completedQ.data) == null ? void 0 : _d.length) ?? 0
  };
}
function FollowUpsPage() {
  var _a;
  const [activeTab, setActiveTab] = reactExports.useState("today");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [completeTarget, setCompleteTarget] = reactExports.useState(null);
  const { data: leads } = useLeads();
  const counts = useTabCounts();
  const activeTabConfig = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const countMap = {
    today: counts.today,
    missed: counts.missed,
    upcoming: counts.upcoming,
    completed: counts.completed
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Follow-ups",
        subtitle: "Track and manage all scheduled follow-ups",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "followup.add_button",
            onClick: () => setAddOpen(true),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Follow-up"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 p-1 bg-card border border-border rounded-xl mb-6 overflow-x-auto",
          role: "tablist",
          "aria-label": "Follow-up filters",
          children: TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = countMap[tab.id];
            const isMissedTab = tab.id === "missed";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": isActive,
                "data-ocid": `followup.${tab.id}_tab`,
                onClick: () => setActiveTab(tab.id),
                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-smooth whitespace-nowrap flex-1 justify-center ${isActive ? isMissedTab ? "bg-amber-500/15 text-amber-400" : "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                children: [
                  tab.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label }),
                  count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold ${isActive ? isMissedTab ? "bg-amber-500 text-amber-950" : "bg-primary text-primary-foreground" : isMissedTab ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground"}`,
                      children: count > 9 ? "9+" : count
                    }
                  )
                ]
              },
              tab.id
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabPanel,
        {
          tab: activeTabConfig,
          leads,
          onAddFollowUp: () => setAddOpen(true),
          onComplete: (fu, lead) => setCompleteTarget({ fu, lead }),
          onEdit: (fu) => setEditTarget(fu)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddFollowUpModal,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        leads: leads ?? []
      }
    ),
    editTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditFollowUpModal,
      {
        open: true,
        onClose: () => setEditTarget(null),
        followUp: editTarget
      }
    ),
    completeTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompleteFollowUpModal,
      {
        open: true,
        onClose: () => setCompleteTarget(null),
        followUp: completeTarget.fu,
        leadName: ((_a = completeTarget.lead) == null ? void 0 : _a.name) ?? `Lead #${completeTarget.fu.leadId.toString()}`
      }
    )
  ] });
}
export {
  FollowUpsPage as default
};
