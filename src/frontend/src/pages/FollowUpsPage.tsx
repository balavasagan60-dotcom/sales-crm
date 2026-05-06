import { FollowUpFilter } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateFollowUp,
  useFollowUps,
  useLeads,
  useUpdateFollowUp,
} from "@/hooks/useCRM";
import type {
  CreateFollowUpInput,
  FollowUp,
  Lead,
  UpdateFollowUpInput,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  Edit2,
  ExternalLink,
  Phone,
  Plus,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = "today" | "missed" | "upcoming" | "completed";

interface TabConfig {
  id: TabId;
  label: string;
  filter: FollowUpFilter;
  icon: React.ReactNode;
  emptyTitle: string;
  emptyDescription: string;
}

const TABS: TabConfig[] = [
  {
    id: "today",
    label: "Today",
    filter: FollowUpFilter.Today,
    icon: <Clock className="w-3.5 h-3.5" />,
    emptyTitle: "No follow-ups today",
    emptyDescription: "You're all clear for today. Add one to stay on track.",
  },
  {
    id: "missed",
    label: "Missed",
    filter: FollowUpFilter.Missed,
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    emptyTitle: "No missed follow-ups",
    emptyDescription: "Great job! You haven't missed any scheduled follow-ups.",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    filter: FollowUpFilter.Upcoming,
    icon: <Timer className="w-3.5 h-3.5" />,
    emptyTitle: "Nothing upcoming",
    emptyDescription: "Schedule a follow-up with a lead to see it here.",
  },
  {
    id: "completed",
    label: "Completed",
    filter: FollowUpFilter.Completed,
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    emptyTitle: "No completed follow-ups",
    emptyDescription: "Mark follow-ups as done to see them in this tab.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateTime(date: string, time: string): string {
  try {
    const d = new Date(`${date}T${time}`);
    return d.toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return `${date} ${time}`;
  }
}

function getLeadById(leads: Lead[] | undefined, id: bigint): Lead | undefined {
  return leads?.find((l) => l.id === id);
}

const inputClass =
  "w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth";
const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5";

// ─── Add Follow-up Modal ─────────────────────────────────────────────────────

interface AddFollowUpModalProps {
  open: boolean;
  onClose: () => void;
  leads: Lead[];
}

function AddFollowUpModal({ open, onClose, leads }: AddFollowUpModalProps) {
  const createFollowUp = useCreateFollowUp();
  const [leadId, setLeadId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId || !date || !time) return;
    const input: CreateFollowUpInput = {
      leadId: BigInt(leadId),
      scheduledDate: date,
      scheduledTime: time,
      notes: notes.trim() || undefined,
      reminderEnabled: reminder,
    };
    createFollowUp.mutate(input, {
      onSuccess: () => {
        toast.success("Follow-up scheduled");
        handleClose();
      },
      onError: () => toast.error("Failed to schedule follow-up"),
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Schedule Follow-up"
      size="md"
      data-ocid="followup.add_modal"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fu-lead" className={labelClass}>
            Select Lead <span className="text-destructive">*</span>
          </label>
          <select
            id="fu-lead"
            data-ocid="followup.lead_select"
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Choose a lead...</option>
            {leads.map((lead) => (
              <option key={lead.id.toString()} value={lead.id.toString()}>
                {lead.name} — {lead.phone}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="fu-date" className={labelClass}>
              Date <span className="text-destructive">*</span>
            </label>
            <input
              id="fu-date"
              data-ocid="followup.date_input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="fu-time" className={labelClass}>
              Time <span className="text-destructive">*</span>
            </label>
            <input
              id="fu-time"
              data-ocid="followup.time_input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="fu-notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="fu-notes"
            data-ocid="followup.notes_textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What to discuss, context, etc."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/60 rounded-lg">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Enable reminder</span>
          </div>
          <button
            type="button"
            data-ocid="followup.reminder_toggle"
            onClick={() => setReminder((v) => !v)}
            aria-pressed={reminder}
            aria-label="Toggle reminder"
            className={`relative w-10 h-5 rounded-full transition-smooth ${
              reminder ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-foreground transition-smooth ${
                reminder ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleClose}
            data-ocid="followup.add_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            data-ocid="followup.add_modal.submit_button"
            disabled={!leadId || !date || !time || createFollowUp.isPending}
          >
            {createFollowUp.isPending ? "Scheduling..." : "Schedule"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Edit Follow-up Modal ─────────────────────────────────────────────────────

interface EditFollowUpModalProps {
  open: boolean;
  onClose: () => void;
  followUp: FollowUp;
}

function EditFollowUpModal({
  open,
  onClose,
  followUp,
}: EditFollowUpModalProps) {
  const updateFollowUp = useUpdateFollowUp();
  const [date, setDate] = useState(followUp.scheduledDate);
  const [time, setTime] = useState(followUp.scheduledTime);
  const [notes, setNotes] = useState(followUp.notes ?? "");
  const [reminder, setReminder] = useState(followUp.reminderEnabled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: UpdateFollowUpInput = {
      id: followUp.id,
      scheduledDate: date,
      scheduledTime: time,
      notes: notes.trim() || undefined,
      reminderEnabled: reminder,
    };
    updateFollowUp.mutate(input, {
      onSuccess: () => {
        toast.success("Follow-up updated");
        onClose();
      },
      onError: () => toast.error("Failed to update follow-up"),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Follow-up"
      size="md"
      data-ocid="followup.edit_modal"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="efu-date" className={labelClass}>
              Date
            </label>
            <input
              id="efu-date"
              data-ocid="followup.edit_date_input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="efu-time" className={labelClass}>
              Time
            </label>
            <input
              id="efu-time"
              data-ocid="followup.edit_time_input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="efu-notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="efu-notes"
            data-ocid="followup.edit_notes_textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Discussion notes..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/60 rounded-lg">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Enable reminder</span>
          </div>
          <button
            type="button"
            data-ocid="followup.edit_reminder_toggle"
            onClick={() => setReminder((v) => !v)}
            aria-pressed={reminder}
            aria-label="Toggle reminder"
            className={`relative w-10 h-5 rounded-full transition-smooth ${
              reminder ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-foreground transition-smooth ${
                reminder ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="followup.edit_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            data-ocid="followup.edit_modal.submit_button"
            disabled={!date || !time || updateFollowUp.isPending}
          >
            {updateFollowUp.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Complete Follow-up Modal ─────────────────────────────────────────────────

interface CompleteFollowUpModalProps {
  open: boolean;
  onClose: () => void;
  followUp: FollowUp;
  leadName: string;
}

function CompleteFollowUpModal({
  open,
  onClose,
  followUp,
  leadName,
}: CompleteFollowUpModalProps) {
  const updateFollowUp = useUpdateFollowUp();
  const [completionNotes, setCompletionNotes] = useState("");

  const handleConfirm = () => {
    const input: UpdateFollowUpInput = {
      id: followUp.id,
      isCompleted: true,
      completionNotes: completionNotes.trim() || undefined,
    };
    updateFollowUp.mutate(input, {
      onSuccess: () => {
        toast.success("Follow-up marked as completed");
        setCompletionNotes("");
        onClose();
      },
      onError: () => toast.error("Failed to update follow-up"),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Mark as Completed"
      size="sm"
      data-ocid="followup.complete_modal"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Mark follow-up with{" "}
          <span className="font-semibold text-foreground">{leadName}</span> as
          completed. Add outcome notes below.
        </p>
        <div>
          <label htmlFor="complete-notes" className={labelClass}>
            Completion notes
          </label>
          <textarea
            id="complete-notes"
            data-ocid="followup.complete_notes_textarea"
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
            placeholder="What happened? Outcome of the call..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="followup.complete_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={handleConfirm}
            data-ocid="followup.complete_modal.confirm_button"
            disabled={updateFollowUp.isPending}
          >
            {updateFollowUp.isPending ? "Saving..." : "Mark Complete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Follow-up Card ───────────────────────────────────────────────────────────

interface FollowUpCardProps {
  followUp: FollowUp;
  lead: Lead | undefined;
  isMissed: boolean;
  isCompleted: boolean;
  index: number;
  onComplete: (fu: FollowUp, lead: Lead | undefined) => void;
  onEdit: (fu: FollowUp) => void;
}

function FollowUpCard({
  followUp,
  lead,
  isMissed,
  isCompleted,
  index,
  onComplete,
  onEdit,
}: FollowUpCardProps) {
  return (
    <div
      data-ocid={`followup.item.${index}`}
      className={`relative bg-card border rounded-xl p-4 transition-smooth hover:shadow-md-elevated animate-fade-in ${
        isMissed
          ? "border-amber-500/40"
          : isCompleted
            ? "border-border/50 opacity-80"
            : "border-border"
      }`}
      style={
        isMissed ? { background: "oklch(0.72 0.17 70 / 0.06)" } : undefined
      }
    >
      {/* Missed indicator bar */}
      {isMissed && (
        <div
          className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
          style={{ background: "oklch(0.72 0.17 70)" }}
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Lead info */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold font-display text-foreground truncate">
              {lead?.name ?? `Lead #${followUp.leadId.toString()}`}
            </span>
            {isMissed && (
              <Badge
                variant="outline"
                className="border-amber-500/60 text-amber-400 text-[10px] px-1.5 py-0 shrink-0"
              >
                Overdue
              </Badge>
            )}
            {isCompleted && (
              <Badge
                variant="outline"
                className="border-green-500/40 text-green-400 text-[10px] px-1.5 py-0 shrink-0"
              >
                Done
              </Badge>
            )}
            {followUp.reminderEnabled && (
              <Bell className="w-3 h-3 text-primary shrink-0" />
            )}
          </div>

          {/* Phone */}
          {lead?.phone && (
            <div className="flex items-center gap-1.5 mb-2">
              <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground font-mono">
                {lead.phone}
              </span>
            </div>
          )}

          {/* Scheduled date/time */}
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar className="w-3 h-3 text-muted-foreground shrink-0" />
            <span
              className={`text-xs font-medium ${
                isMissed ? "text-amber-400" : "text-muted-foreground"
              }`}
            >
              {formatDateTime(followUp.scheduledDate, followUp.scheduledTime)}
            </span>
          </div>

          {/* Notes */}
          {followUp.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {followUp.notes}
            </p>
          )}

          {/* Completion notes */}
          {isCompleted && followUp.completionNotes && (
            <div className="mt-2 px-2.5 py-1.5 bg-muted/60 rounded-md">
              <p className="text-[11px] text-muted-foreground italic">
                ✓ {followUp.completionNotes}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isCompleted && (
          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              type="button"
              data-ocid={`followup.complete_button.${index}`}
              onClick={() => onComplete(followUp, lead)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-[11px] font-medium transition-smooth"
              aria-label="Mark as complete"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Complete</span>
            </button>
            <button
              type="button"
              data-ocid={`followup.edit_button.${index}`}
              onClick={() => onEdit(followUp)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth"
              aria-label="Edit follow-up"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            {lead && (
              <Link
                to="/leads"
                data-ocid={`followup.view_lead_link.${index}`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth"
                aria-label="View lead"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lead</span>
              </Link>
            )}
          </div>
        )}
        {isCompleted && lead && (
          <Link
            to="/leads"
            data-ocid={`followup.view_lead_link.${index}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg text-[11px] font-medium transition-smooth shrink-0"
            aria-label="View lead"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────────

function FollowUpSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-56" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-7 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab Panel ────────────────────────────────────────────────────────────────

interface TabPanelProps {
  tab: TabConfig;
  leads: Lead[] | undefined;
  onAddFollowUp: () => void;
  onComplete: (fu: FollowUp, lead: Lead | undefined) => void;
  onEdit: (fu: FollowUp) => void;
}

function TabPanel({
  tab,
  leads,
  onAddFollowUp,
  onComplete,
  onEdit,
}: TabPanelProps) {
  const { data: followUps, isLoading } = useFollowUps(tab.filter);
  const isMissed = tab.id === "missed";
  const isCompleted = tab.id === "completed";

  if (isLoading) return <FollowUpSkeleton />;

  if (!followUps || followUps.length === 0) {
    return (
      <EmptyState
        icon={isCompleted ? CheckCircle2 : Calendar}
        title={tab.emptyTitle}
        description={tab.emptyDescription}
        action={
          !isCompleted
            ? { label: "Add Follow-up", onClick: onAddFollowUp }
            : undefined
        }
        data-ocid={`followup.${tab.id}_tab.empty_state`}
      />
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {followUps.map((fu, i) => {
        const lead = getLeadById(leads, fu.leadId);
        return (
          <FollowUpCard
            key={fu.id.toString()}
            followUp={fu}
            lead={lead}
            isMissed={isMissed}
            isCompleted={isCompleted}
            index={i + 1}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}

// ─── Tab Counts hook ─────────────────────────────────────────────────────────

function useTabCounts() {
  const todayQ = useFollowUps(FollowUpFilter.Today);
  const missedQ = useFollowUps(FollowUpFilter.Missed);
  const upcomingQ = useFollowUps(FollowUpFilter.Upcoming);
  const completedQ = useFollowUps(FollowUpFilter.Completed);
  return {
    today: todayQ.data?.length ?? 0,
    missed: missedQ.data?.length ?? 0,
    upcoming: upcomingQ.data?.length ?? 0,
    completed: completedQ.data?.length ?? 0,
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FollowUpsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<FollowUp | null>(null);
  const [completeTarget, setCompleteTarget] = useState<{
    fu: FollowUp;
    lead: Lead | undefined;
  } | null>(null);

  const { data: leads } = useLeads();
  const counts = useTabCounts();

  const activeTabConfig = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  const countMap: Record<TabId, number> = {
    today: counts.today,
    missed: counts.missed,
    upcoming: counts.upcoming,
    completed: counts.completed,
  };

  return (
    <>
      <PageHeader
        title="Follow-ups"
        subtitle="Track and manage all scheduled follow-ups"
        actions={
          <Button
            size="sm"
            data-ocid="followup.add_button"
            onClick={() => setAddOpen(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Follow-up
          </Button>
        }
      />

      <div className="px-4 md:px-6 pb-8">
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 bg-card border border-border rounded-xl mb-6 overflow-x-auto"
          role="tablist"
          aria-label="Follow-up filters"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = countMap[tab.id];
            const isMissedTab = tab.id === "missed";
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-ocid={`followup.${tab.id}_tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-smooth whitespace-nowrap flex-1 justify-center ${
                  isActive
                    ? isMissedTab
                      ? "bg-amber-500/15 text-amber-400"
                      : "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold ${
                      isActive
                        ? isMissedTab
                          ? "bg-amber-500 text-amber-950"
                          : "bg-primary text-primary-foreground"
                        : isMissedTab
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <TabPanel
          tab={activeTabConfig}
          leads={leads}
          onAddFollowUp={() => setAddOpen(true)}
          onComplete={(fu, lead) => setCompleteTarget({ fu, lead })}
          onEdit={(fu) => setEditTarget(fu)}
        />
      </div>

      {/* Modals */}
      <AddFollowUpModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        leads={leads ?? []}
      />

      {editTarget && (
        <EditFollowUpModal
          open
          onClose={() => setEditTarget(null)}
          followUp={editTarget}
        />
      )}

      {completeTarget && (
        <CompleteFollowUpModal
          open
          onClose={() => setCompleteTarget(null)}
          followUp={completeTarget.fu}
          leadName={
            completeTarget.lead?.name ??
            `Lead #${completeTarget.fu.leadId.toString()}`
          }
        />
      )}
    </>
  );
}
