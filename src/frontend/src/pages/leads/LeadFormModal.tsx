import { LeadStatus as LS, Priority as P } from "@/backend";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateLead, useUpdateLead } from "@/hooks/useCRM";
import type {
  Campaign,
  Lead,
  LeadStatus,
  Priority,
  Source,
  UserInfo,
} from "@/types";
import { useState } from "react";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  editLead?: Lead;
  users: UserInfo[];
  campaigns: Campaign[];
  sources: Source[];
}

const LABEL =
  "text-[11px] font-semibold text-muted-foreground block mb-1 uppercase tracking-wide";
const SELECT_CLS =
  "w-full h-9 px-3 bg-muted border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

export function LeadFormModal({
  open,
  onClose,
  editLead,
  users,
  campaigns,
  sources,
}: LeadFormModalProps) {
  const isEdit = !!editLead;
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();

  const [form, setForm] = useState({
    name: editLead?.name ?? "",
    phone: editLead?.phone ?? "",
    altPhone: editLead?.altPhone ?? "",
    email: editLead?.email ?? "",
    source: editLead?.source ?? "",
    campaign: editLead?.campaign ?? "",
    productInterest: editLead?.productInterest ?? "",
    priority: (editLead?.priority ?? P.Warm) as Priority,
    status: (editLead?.status ?? LS.New) as LeadStatus,
    notes: editLead?.notes ?? "",
    assignedUserId: editLead?.assignedUserId?.toString() ?? "",
  });

  const field = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const isPending = createLead.isPending || updateLead.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = users.find(
      (u) => u.id.toString() === form.assignedUserId,
    );

    if (isEdit && editLead) {
      updateLead.mutate(
        {
          id: editLead.id,
          name: form.name || undefined,
          phone: form.phone || undefined,
          altPhone: form.altPhone || undefined,
          email: form.email || undefined,
          source: form.source || undefined,
          campaign: form.campaign || undefined,
          productInterest: form.productInterest || undefined,
          priority: form.priority,
          status: form.status,
          notes: form.notes || undefined,
          assignedUserId: assignedUser?.id,
        },
        { onSuccess: onClose },
      );
    } else {
      createLead.mutate(
        {
          name: form.name,
          phone: form.phone,
          altPhone: form.altPhone || undefined,
          email: form.email || undefined,
          source: form.source || undefined,
          campaign: form.campaign || undefined,
          productInterest: form.productInterest || undefined,
          priority: form.priority,
          status: form.status,
          notes: form.notes || undefined,
          assignedUserId: assignedUser?.id,
        },
        { onSuccess: onClose },
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? `Edit Lead — ${editLead?.name}` : "Add New Lead"}
      size="lg"
      data-ocid={isEdit ? "leads.edit_modal" : "leads.add_modal"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="lf-name" className={LABEL}>
              Full Name *
            </label>
            <Input
              id="lf-name"
              data-ocid="leads.modal.name_input"
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="Lead name"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="lf-phone" className={LABEL}>
              Phone *
            </label>
            <Input
              id="lf-phone"
              data-ocid="leads.modal.phone_input"
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>
        </div>

        {/* Row 2: Alt Phone + Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lf-altphone" className={LABEL}>
              Alt. Phone
            </label>
            <Input
              id="lf-altphone"
              data-ocid="leads.modal.altphone_input"
              value={form.altPhone}
              onChange={(e) => field("altPhone", e.target.value)}
              placeholder="Alternate number"
            />
          </div>
          <div>
            <label htmlFor="lf-email" className={LABEL}>
              Email
            </label>
            <Input
              id="lf-email"
              data-ocid="leads.modal.email_input"
              type="email"
              value={form.email}
              onChange={(e) => field("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Row 3: Source + Campaign */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lf-source" className={LABEL}>
              Source
            </label>
            <select
              id="lf-source"
              data-ocid="leads.modal.source_select"
              value={form.source}
              onChange={(e) => field("source", e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">— Select source —</option>
              {sources
                .filter((s) => s.isActive)
                .map((s) => (
                  <option key={s.id.toString()} value={s.name}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="lf-campaign" className={LABEL}>
              Campaign
            </label>
            <select
              id="lf-campaign"
              data-ocid="leads.modal.campaign_select"
              value={form.campaign}
              onChange={(e) => field("campaign", e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">— Select campaign —</option>
              {campaigns
                .filter((c) => c.isActive)
                .map((c) => (
                  <option key={c.id.toString()} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Row 4: Priority + Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lf-priority" className={LABEL}>
              Priority
            </label>
            <select
              id="lf-priority"
              data-ocid="leads.modal.priority_select"
              value={form.priority}
              onChange={(e) => field("priority", e.target.value)}
              className={SELECT_CLS}
            >
              <option value={P.Hot}>🔥 Hot</option>
              <option value={P.Warm}>☀️ Warm</option>
              <option value={P.Cold}>❄️ Cold</option>
            </select>
          </div>
          <div>
            <label htmlFor="lf-status" className={LABEL}>
              Lead Status
            </label>
            <select
              id="lf-status"
              data-ocid="leads.modal.status_select"
              value={form.status}
              onChange={(e) => field("status", e.target.value)}
              className={SELECT_CLS}
            >
              <option value={LS.New}>New</option>
              <option value={LS.Interested}>Interested</option>
              <option value={LS.Proposal}>Proposal</option>
              <option value={LS.ClosedWon}>Closed Won</option>
              <option value={LS.ClosedLost}>Closed Lost</option>
            </select>
          </div>
        </div>

        {/* Row 5: Product Interest + Assigned */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lf-product" className={LABEL}>
              Product Interest
            </label>
            <Input
              id="lf-product"
              data-ocid="leads.modal.product_input"
              value={form.productInterest}
              onChange={(e) => field("productInterest", e.target.value)}
              placeholder="e.g. Agri Tractor"
            />
          </div>
          <div>
            <label htmlFor="lf-assigned" className={LABEL}>
              Assign To
            </label>
            <select
              id="lf-assigned"
              data-ocid="leads.modal.assigned_select"
              value={form.assignedUserId}
              onChange={(e) => field("assignedUserId", e.target.value)}
              className={SELECT_CLS}
            >
              <option value="">— Unassigned —</option>
              {users.map((u) => (
                <option key={u.id.toString()} value={u.id.toString()}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="lf-notes" className={LABEL}>
            Notes
          </label>
          <textarea
            id="lf-notes"
            data-ocid="leads.modal.notes_textarea"
            value={form.notes}
            onChange={(e) => field("notes", e.target.value)}
            placeholder="Any additional context…"
            rows={2}
            className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            data-ocid="leads.modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            data-ocid="leads.modal.submit_button"
          >
            {isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
