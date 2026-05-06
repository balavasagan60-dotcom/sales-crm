import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { CRMRole } from "@/types";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Phone,
  Settings,
  User,
  Users,
} from "lucide-react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  roles: CRMRole[];
  ocid: string;
}

const ALL_ROLES: CRMRole[] = [
  "admin",
  "coordinator",
  "telecaller",
  "sales_executive",
];

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
    roles: ALL_ROLES,
    ocid: "nav.dashboard",
  },
  {
    label: "Leads",
    to: "/leads",
    icon: Users,
    roles: ALL_ROLES,
    ocid: "nav.leads",
  },
  {
    label: "Calls",
    to: "/calls",
    icon: Phone,
    roles: ["admin", "coordinator", "telecaller"],
    ocid: "nav.calls",
  },
  {
    label: "Follow-ups",
    to: "/followups",
    icon: CalendarClock,
    roles: ALL_ROLES,
    ocid: "nav.followups",
  },
  {
    label: "Reports",
    to: "/reports",
    icon: BarChart3,
    roles: ["admin", "coordinator"],
    ocid: "nav.reports",
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
    roles: ["admin"],
    ocid: "nav.settings",
  },
];

function NavLink({ item, compact }: { item: NavItem; compact?: boolean }) {
  const location = useLocation();
  const isActive =
    item.to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.to);
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      data-ocid={item.ocid}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {!compact && <span className="font-body">{item.label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const { crmRole, profile, logout } = useAuth();
  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(crmRole));

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 bg-card border-r border-border min-h-screen">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <span className="text-base font-bold font-display text-foreground tracking-tight">
          Sales<span className="text-primary">CRM</span>
        </span>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 px-2 py-3 space-y-0.5"
        aria-label="Main navigation"
      >
        {visibleItems.map((item) => (
          <NavLink key={item.to} item={item} />
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-border space-y-1">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <User className="w-3 h-3 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold font-display text-foreground truncate">
              {profile?.name ?? "User"}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {crmRole.replace("_", " ")}
            </p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="nav.logout_button"
          onClick={logout}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const { crmRole } = useAuth();
  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(crmRole));
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border overflow-x-auto"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch h-14 min-w-max w-full">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`mobile.${item.ocid}`}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="font-body">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
