import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useSaveProfile } from "@/hooks/useCRM";
import {
  InternetIdentityProvider,
  useInternetIdentity,
} from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";

// ─── Lazy page imports
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const LeadsPage = lazy(() => import("@/pages/LeadsPage"));
const CallsPage = lazy(() => import("@/pages/CallsPage"));
const FollowUpsPage = lazy(() => import("@/pages/FollowUpsPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

// ─── Query Client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

function PageFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner size="md" label="Loading..." />
    </div>
  );
}

function ProfileSetupModal({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState("");
  const saveProfile = useSaveProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveProfile.mutate(name.trim(), { onSuccess: onComplete });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90">
      <div
        className="bg-card border border-border rounded-xl p-8 w-full max-w-sm shadow-md-elevated animate-fade-in"
        data-ocid="profile_setup.dialog"
      >
        <h2 className="text-lg font-bold font-display text-foreground mb-1">
          Welcome to SalesCRM
        </h2>
        <p className="text-xs text-muted-foreground mb-6">
          Enter your name to get started. This will be visible to your team.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="text-xs font-semibold text-muted-foreground block mb-1.5"
            >
              Your name
            </label>
            <input
              id="profile-name"
              data-ocid="profile_setup.input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ravi Kumar"
              className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button
            type="submit"
            data-ocid="profile_setup.submit_button"
            disabled={!name.trim() || saveProfile.isPending}
            className="w-full"
          >
            {saveProfile.isPending ? "Saving..." : "Get started"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function LoginPage() {
  const { login, isInitializing, isLoggingIn } = useInternetIdentity();
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background"
      data-ocid="login.page"
    >
      <div className="w-full max-w-sm px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">
            Sales<span className="text-primary">CRM</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enterprise lead management platform
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-md-elevated">
          <p className="text-xs text-muted-foreground mb-5 text-center">
            Sign in with Internet Identity to access your dashboard.
          </p>
          <Button
            data-ocid="login.submit_button"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            className="w-full"
          >
            {isInitializing
              ? "Initializing..."
              : isLoggingIn
                ? "Signing in..."
                : "Sign in with Internet Identity"}
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center mt-6">
          © {new Date().getFullYear()}. Built with{" "}
          <a
            href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── Routes
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <RouterOutlet />
      </Suspense>
    </Layout>
  ),
});

function RouterOutlet() {
  return null;
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <DashboardPage />
    </Suspense>
  ),
});

const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LeadsPage />
    </Suspense>
  ),
});

const callsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calls",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CallsPage />
    </Suspense>
  ),
});

const followupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/followups",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <FollowUpsPage />
    </Suspense>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ReportsPage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  leadsRoute,
  callsRoute,
  followupsRoute,
  reportsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthenticatedApp() {
  const {
    isAuthenticated,
    isInitializing,
    isLoading,
    needsProfileSetup,
    isFetched,
  } = useAuth();
  const [setupDone, setSetupDone] = useState(false);

  if (isInitializing || (isAuthenticated && isLoading && !isFetched)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" label="Loading your workspace..." />
      </div>
    );
  }

  if (!isAuthenticated) return <LoginPage />;

  if (needsProfileSetup && !setupDone) {
    return <ProfileSetupModal onComplete={() => setSetupDone(true)} />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticatedApp />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </InternetIdentityProvider>
  );
}
