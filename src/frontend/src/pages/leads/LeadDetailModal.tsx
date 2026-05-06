import { Modal } from "@/components/Modal";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useCallsForLead, useFollowUpsForLead } from "@/hooks/useCRM";
import type { Lead } from "@/types";
import { Calendar, Clock, Mail, Pencil, Phone, Tag, User } from "lucide-react";

interface LeadDetailModalProps {
  open: boolean;
  lead: Lead;
  onClose: () => void;
  onEdit?: (lead: Lead) => void;
  userMap: Map<string, string>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
      {children}
    </h3>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xs text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}

export function LeadDetailModal({
  open,
  lead,
  onClose,
  onEdit,
  userMap,
}: LeadDetailModalProps) {
  const { data: calls = [], isLoading: callsLoading } = useCallsForLead(
    lead.id,
  );
  const { data: followUps = [], isLoading: fuLoading } = useFollowUpsForLead(
    lead.id,
  );

  const assignedName = lead.assignedUserId
    ? (userMap.get(lead.assignedUserId.toString()) ?? "Unknown")
    : "Unassigned";

  const createdDate = new Date(
    Number(lead.createdAt / 1_000_000n),
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={lead.name}
      size="xl"
      data-ocid="leads.detail_modal"
    >
      <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">
        {/* Header badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge type="priority" value={lead.priority} />
          <StatusBadge type="status" value={lead.status} />
          {onEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-auto"
              data-ocid="leads.detail_modal.edit_button"
              onClick={() => onEdit(lead)}
            >
              <Pencil className="w-3 h-3 mr-1.5" /> Edit Lead
            </Button>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-muted/40 rounded-lg p-3">
          <SectionTitle>Contact Information</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <InfoRow icon={Phone} label="Phone" value={lead.phone} />
            <InfoRow icon={Phone} label="Alt. Phone" value={lead.altPhone} />
            <InfoRow icon={Mail} label="Email" value={lead.email} />
            <InfoRow icon={User} label="Assigned To" value={assignedName} />
            <InfoRow icon={Tag} label="Source" value={lead.source} />
            <InfoRow icon={Tag} label="Campaign" value={lead.campaign} />
            <InfoRow
              icon={Tag}
              label="Product Interest"
              value={lead.productInterest}
            />
            <InfoRow icon={Clock} label="Created" value={createdDate} />
          </div>
          {lead.notes && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                Notes
              </p>
              <p className="text-xs text-foreground whitespace-pre-wrap">
                {lead.notes}
              </p>
            </div>
          )}
        </div>

        {/* Call History */}
        <div>
          <SectionTitle>
            Call History ({callsLoading ? "…" : calls.length})
          </SectionTitle>
          {callsLoading ? (
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-muted animate-pulse rounded-md"
                />
              ))}
            </div>
          ) : calls.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              No calls logged yet.
            </p>
          ) : (
            <div className="space-y-1.5">
              {calls.map((call, i) => (
                <div
                  key={call.id.toString()}
                  data-ocid={`leads.detail_modal.call.${i + 1}`}
                  className="flex items-start gap-3 bg-muted/30 rounded-md px-3 py-2"
                >
                  <div
                    className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      call.callStatus === "Connected"
                        ? "bg-chart-3"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                          call.callStatus === "Connected"
                            ? "text-chart-3"
                            : "text-muted-foreground"
                        }`}
                      >
                        {call.callStatus}
                      </span>
                      {call.outcome && (
                        <span className="text-[10px] text-muted-foreground">
                          · {call.outcome}
                        </span>
                      )}
                      {call.duration && (
                        <span className="text-[10px] text-muted-foreground">
                          · {Math.floor(Number(call.duration) / 60)}m{" "}
                          {Number(call.duration) % 60}s
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {new Date(
                          Number(call.callTimestamp / 1_000_000n),
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    {call.notes && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {call.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Follow-up History */}
        <div>
          <SectionTitle>
            Follow-ups ({fuLoading ? "…" : followUps.length})
          </SectionTitle>
          {fuLoading ? (
            <div className="space-y-1.5">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-muted animate-pulse rounded-md"
                />
              ))}
            </div>
          ) : followUps.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              No follow-ups scheduled.
            </p>
          ) : (
            <div className="space-y-1.5">
              {followUps.map((fu, i) => (
                <div
                  key={fu.id.toString()}
                  data-ocid={`leads.detail_modal.followup.${i + 1}`}
                  className="flex items-start gap-3 bg-muted/30 rounded-md px-3 py-2"
                >
                  <div
                    className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      fu.isCompleted ? "bg-chart-3" : "bg-accent"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">
                        {fu.scheduledDate} at {fu.scheduledTime}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ml-auto ${
                          fu.isCompleted ? "text-chart-3" : "text-accent"
                        }`}
                      >
                        {fu.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                    {fu.notes && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {fu.notes}
                      </p>
                    )}
                    {fu.completionNotes && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 italic">
                        Completion: {fu.completionNotes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
