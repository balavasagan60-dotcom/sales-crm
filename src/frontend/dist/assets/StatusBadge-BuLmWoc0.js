import { j as jsxRuntimeExports, h as cn } from "./index-Dycem9-F.js";
const variantConfig = {
  hot: {
    label: "HOT",
    className: "bg-destructive/20 text-destructive border-destructive/30"
  },
  warm: {
    label: "WARM",
    className: "bg-accent/20 text-accent border-accent/30"
  },
  cold: {
    label: "COLD",
    className: "bg-primary/20 text-primary border-primary/30"
  },
  new: {
    label: "NEW",
    className: "bg-primary/20 text-primary border-primary/30"
  },
  interested: {
    label: "INTERESTED",
    className: "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30"
  },
  proposal: {
    label: "PROPOSAL",
    className: "bg-accent/20 text-accent border-accent/30"
  },
  closed_won: {
    label: "WON",
    className: "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30"
  },
  closed_lost: {
    label: "LOST",
    className: "bg-destructive/20 text-destructive border-destructive/30"
  },
  connected: {
    label: "CONNECTED",
    className: "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30"
  },
  not_connected: {
    label: "NOT CONNECTED",
    className: "bg-muted text-muted-foreground border-border"
  },
  default: {
    label: "UNKNOWN",
    className: "bg-muted text-muted-foreground border-border"
  }
};
function priorityToVariant(p) {
  if (p === "Hot") return "hot";
  if (p === "Warm") return "warm";
  if (p === "Cold") return "cold";
  return "default";
}
function statusToVariant(s) {
  if (s === "New") return "new";
  if (s === "Interested") return "interested";
  if (s === "Proposal") return "proposal";
  if (s === "ClosedWon") return "closed_won";
  if (s === "ClosedLost") return "closed_lost";
  return "default";
}
function StatusBadge({ type, value, className }) {
  let variant = "default";
  if (type === "priority" && value)
    variant = priorityToVariant(value);
  else if (type === "status" && value)
    variant = statusToVariant(value);
  else if (type === "variant" && value) variant = value;
  const config = variantConfig[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wider font-display",
        config.className,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-80" }),
        config.label
      ]
    }
  );
}
export {
  StatusBadge as S
};
