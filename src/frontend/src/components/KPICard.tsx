import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: number; positive: boolean };
  accent?: "primary" | "accent" | "destructive" | "success";
  className?: string;
  "data-ocid"?: string;
}

const accentBar: Record<NonNullable<KPICardProps["accent"]>, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  success: "bg-[oklch(0.62_0.18_150)]",
};

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = "primary",
  className,
  "data-ocid": dataOcid,
}: KPICardProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "relative bg-card border border-border rounded-lg p-4 flex flex-col gap-2 overflow-hidden transition-smooth hover:shadow-md-elevated group",
        className,
      )}
    >
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          accentBar[accent],
        )}
      />
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold tracking-tight font-display text-foreground">
        {value}
      </div>
      <div className="flex items-center gap-2">
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive
                ? "text-[oklch(0.75_0.18_150)]"
                : "text-destructive",
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
