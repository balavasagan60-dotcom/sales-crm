import { cn } from "@/lib/utils";
import type { LeadStatus, Priority } from "@/types";

type BadgeVariant =
  | "hot"
  | "warm"
  | "cold"
  | "new"
  | "interested"
  | "proposal"
  | "closed_won"
  | "closed_lost"
  | "connected"
  | "not_connected"
  | "default";

const variantConfig: Record<
  BadgeVariant,
  { label: string; className: string }
> = {
  hot: {
    label: "HOT",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
  warm: {
    label: "WARM",
    className: "bg-accent/20 text-accent border-accent/30",
  },
  cold: {
    label: "COLD",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  new: {
    label: "NEW",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  interested: {
    label: "INTERESTED",
    className:
      "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30",
  },
  proposal: {
    label: "PROPOSAL",
    className: "bg-accent/20 text-accent border-accent/30",
  },
  closed_won: {
    label: "WON",
    className:
      "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30",
  },
  closed_lost: {
    label: "LOST",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
  connected: {
    label: "CONNECTED",
    className:
      "bg-[oklch(0.62_0.18_150)]/20 text-[oklch(0.75_0.18_150)] border-[oklch(0.62_0.18_150)]/30",
  },
  not_connected: {
    label: "NOT CONNECTED",
    className: "bg-muted text-muted-foreground border-border",
  },
  default: {
    label: "UNKNOWN",
    className: "bg-muted text-muted-foreground border-border",
  },
};

function priorityToVariant(p: Priority): BadgeVariant {
  if (p === "Hot") return "hot";
  if (p === "Warm") return "warm";
  if (p === "Cold") return "cold";
  return "default";
}

function statusToVariant(s: LeadStatus): BadgeVariant {
  if (s === "New") return "new";
  if (s === "Interested") return "interested";
  if (s === "Proposal") return "proposal";
  if (s === "ClosedWon") return "closed_won";
  if (s === "ClosedLost") return "closed_lost";
  return "default";
}

interface StatusBadgeProps {
  type: "priority" | "status" | "variant";
  value?: Priority | LeadStatus | BadgeVariant;
  className?: string;
}

export function StatusBadge({ type, value, className }: StatusBadgeProps) {
  let variant: BadgeVariant = "default";
  if (type === "priority" && value)
    variant = priorityToVariant(value as Priority);
  else if (type === "status" && value)
    variant = statusToVariant(value as LeadStatus);
  else if (type === "variant" && value) variant = value as BadgeVariant;

  const config = variantConfig[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wider font-display",
        config.className,
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  );
}
