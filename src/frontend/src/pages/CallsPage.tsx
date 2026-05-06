import {
  AgriSubType,
  CallOutcome,
  CallStatus,
  DocStatus,
  Priority,
} from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCallsForLead,
  useLeads,
  useLogCall,
  useProductCategories,
  useProducts,
} from "@/hooks/useCRM";
import { cn } from "@/lib/utils";
import type { CallLog, Lead, SaleFields, SubsidyFields } from "@/types";
import {
  ChevronRight,
  Clock,
  Phone,
  PhoneCall,
  PhoneOff,
  Search,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Step definitions ────────────────────────────────────────────────────────

type Step =
  | "select_lead"
  | "call_status"
  | "call_outcome"
  | "product_category"
  | "agri_subtype"
  | "agri_subsidy"
  | "agri_sale"
  | "civil_equip"
  | "industrial_equip"
  | "not_connected_save"
  | "done";

const _STEP_ORDER: Step[] = [
  "select_lead",
  "call_status",
  "call_outcome",
  "product_category",
  "agri_subtype",
];

function getStepNumber(step: Step): number {
  if (step === "select_lead") return 1;
  if (step === "call_status") return 2;
  if (step === "not_connected_save") return 3;
  if (step === "call_outcome") return 3;
  if (step === "product_category") return 4;
  if (
    step === "agri_subtype" ||
    step === "agri_subsidy" ||
    step === "agri_sale" ||
    step === "civil_equip" ||
    step === "industrial_equip"
  )
    return 5;
  if (step === "done") return 6;
  return 1;
}

const TOTAL_STEPS = 5;

// ─── Shared field state types ────────────────────────────────────────────────

interface CommonFields {
  durationMins: string;
  notes: string;
}

interface SaleFormFields {
  productCategoryId: string;
  productId: string;
  priority: string;
  place: string;
  followUpDate: string;
}

interface SubsidyFormFields {
  productCategoryId: string;
  productId: string;
  farmerName: string;
  village: string;
  block: string;
  division: string;
  district: string;
  docStatus: DocStatus;
}

const emptySaleFields = (): SaleFormFields => ({
  productCategoryId: "",
  productId: "",
  priority: Priority.Warm,
  place: "",
  followUpDate: "",
});

const emptySubsidyFields = (): SubsidyFormFields => ({
  productCategoryId: "",
  productId: "",
  farmerName: "",
  village: "",
  block: "",
  division: "",
  district: "",
  docStatus: DocStatus.Pending,
});

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CallsPage() {
  const { data: leads, isLoading } = useLeads();
  const logCall = useLogCall();

  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [step, setStep] = useState<Step>("select_lead");
  const [_callStatus, setCallStatus] = useState<CallStatus | null>(null);
  const [_callOutcome, setCallOutcome] = useState<CallOutcome | null>(null);
  const [_productCategory, setProductCategory] = useState<
    "Agri" | "CivilEquip" | "IndustrialEquip" | null
  >(null);
  const [_agriSubtype, setAgriSubtype] = useState<AgriSubType | null>(null);
  const [common, setCommon] = useState<CommonFields>({
    durationMins: "",
    notes: "",
  });
  const [saleForm, setSaleForm] = useState<SaleFormFields>(emptySaleFields());
  const [subsidyForm, setSubsidyForm] = useState<SubsidyFormFields>(
    emptySubsidyFields(),
  );

  const filtered = useMemo(
    () =>
      (leads ?? []).filter(
        (l) =>
          !search ||
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search),
      ),
    [leads, search],
  );

  function resetFlow() {
    setSelectedLead(null);
    setStep("select_lead");
    setCallStatus(null);
    setCallOutcome(null);
    setProductCategory(null);
    setAgriSubtype(null);
    setCommon({ durationMins: "", notes: "" });
    setSaleForm(emptySaleFields());
    setSubsidyForm(emptySubsidyFields());
  }

  function buildDuration(): bigint | undefined {
    const mins = Number.parseFloat(common.durationMins);
    if (Number.isNaN(mins) || mins <= 0) return undefined;
    return BigInt(Math.round(mins * 60));
  }

  function handleSaveNotConnected() {
    if (!selectedLead) return;
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.NotConnected,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
      },
      { onSuccess: () => setStep("done") },
    );
  }

  function handleSaveAgriSubsidy() {
    if (!selectedLead) return;
    const subsidyFields: SubsidyFields = {
      productCategoryId: BigInt(subsidyForm.productCategoryId || "0"),
      productId: BigInt(subsidyForm.productId || "0"),
      farmerName: subsidyForm.farmerName,
      village: subsidyForm.village,
      block: subsidyForm.block,
      district: subsidyForm.district,
      division: subsidyForm.division || undefined,
      docStatus: subsidyForm.docStatus,
    };
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.Connected,
        outcome: CallOutcome.Interested,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
        details: {
          __kind__: "Agri",
          Agri: { subType: AgriSubType.Subsidy, subsidyFields },
        },
      },
      { onSuccess: () => setStep("done") },
    );
  }

  function handleSaveAgriSale() {
    if (!selectedLead) return;
    const sf: SaleFields = {
      productCategoryId: BigInt(saleForm.productCategoryId || "0"),
      productId: BigInt(saleForm.productId || "0"),
      priority: (saleForm.priority as Priority) || Priority.Warm,
      place: saleForm.place || undefined,
      followUpDate: saleForm.followUpDate
        ? BigInt(new Date(saleForm.followUpDate).getTime()) * 1_000_000n
        : undefined,
    };
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.Connected,
        outcome: CallOutcome.Interested,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
        details: {
          __kind__: "Agri",
          Agri: { subType: AgriSubType.Sale, saleFields: sf },
        },
      },
      { onSuccess: () => setStep("done") },
    );
  }

  function handleSaveCivil() {
    if (!selectedLead) return;
    const sf: SaleFields = {
      productCategoryId: BigInt(saleForm.productCategoryId || "0"),
      productId: BigInt(saleForm.productId || "0"),
      priority: (saleForm.priority as Priority) || Priority.Warm,
      place: saleForm.place || undefined,
      followUpDate: saleForm.followUpDate
        ? BigInt(new Date(saleForm.followUpDate).getTime()) * 1_000_000n
        : undefined,
    };
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.Connected,
        outcome: CallOutcome.Interested,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
        details: { __kind__: "CivilEquip", CivilEquip: sf },
      },
      { onSuccess: () => setStep("done") },
    );
  }

  function handleSaveIndustrial() {
    if (!selectedLead) return;
    const sf: SaleFields = {
      productCategoryId: BigInt(saleForm.productCategoryId || "0"),
      productId: BigInt(saleForm.productId || "0"),
      priority: (saleForm.priority as Priority) || Priority.Warm,
      place: saleForm.place || undefined,
      followUpDate: saleForm.followUpDate
        ? BigInt(new Date(saleForm.followUpDate).getTime()) * 1_000_000n
        : undefined,
    };
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.Connected,
        outcome: CallOutcome.Interested,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
        details: { __kind__: "IndustrialEquip", IndustrialEquip: sf },
      },
      { onSuccess: () => setStep("done") },
    );
  }

  function handleSaveOutcomeOnly(outcome: CallOutcome) {
    if (!selectedLead) return;
    logCall.mutate(
      {
        leadId: selectedLead.id,
        callStatus: CallStatus.Connected,
        outcome,
        callTimestamp: BigInt(Date.now()) * 1_000_000n,
        duration: buildDuration(),
        notes: common.notes || undefined,
      },
      { onSuccess: () => setStep("done") },
    );
  }

  const stepNum = getStepNumber(step);

  return (
    <div data-ocid="calls.page">
      <PageHeader
        title="Call Workflow"
        subtitle="Guided multi-step call logging with full branching"
      />

      <div className="px-4 md:px-6 py-4">
        {/* Step 1: Select Lead */}
        {step === "select_lead" && (
          <div className="space-y-4">
            <StepIndicator current={1} total={TOTAL_STEPS} />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                data-ocid="calls.search_input"
                placeholder="Search leads by name or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center h-40 items-center">
                <LoadingSpinner size="md" />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                data-ocid="calls.empty_state"
                icon={Phone}
                title="No leads found"
                description="Add leads first, then log calls against them."
              />
            ) : (
              <div className="space-y-1" data-ocid="calls.leads.list">
                {filtered.map((lead, i) => (
                  <button
                    key={lead.id.toString()}
                    type="button"
                    data-ocid={`calls.leads.item.${i + 1}`}
                    onClick={() => {
                      setSelectedLead(lead);
                      setStep("call_status");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted/40 transition-smooth text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {lead.phone}
                      </p>
                    </div>
                    <StatusBadge type="priority" value={lead.priority} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Call Status */}
        {step === "call_status" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title={`Calling: ${selectedLead.name}`}
            subtitle={selectedLead.phone}
            onBack={resetFlow}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="calls.status.section"
            >
              <StatusCard
                icon={<PhoneCall className="w-7 h-7" />}
                label="Connected"
                dataOcid="calls.connected_button"
                color="green"
                onClick={() => {
                  setCallStatus(CallStatus.Connected);
                  setStep("call_outcome");
                }}
              />
              <StatusCard
                icon={<PhoneOff className="w-7 h-7" />}
                label="Not Connected"
                dataOcid="calls.not_connected_button"
                color="amber"
                onClick={() => {
                  setCallStatus(CallStatus.NotConnected);
                  setStep("not_connected_save");
                }}
              />
            </div>
          </StepCard>
        )}

        {/* Step 3a: Not Connected — confirm save */}
        {step === "not_connected_save" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Call Not Connected"
            subtitle={`Saving call log for ${selectedLead.name}`}
            onBack={() => setStep("call_status")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-sm text-accent">
              This call will be logged as <strong>Not Connected</strong>. You
              can add notes above before saving.
            </div>
            <Button
              data-ocid="calls.not_connected.save_button"
              onClick={handleSaveNotConnected}
              disabled={logCall.isPending}
              className="w-full"
            >
              {logCall.isPending ? "Saving…" : "Save Call Log"}
            </Button>
          </StepCard>
        )}

        {/* Step 3b: Call Outcome */}
        {step === "call_outcome" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Call Outcome"
            subtitle="What was the result of this call?"
            onBack={() => setStep("call_status")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="calls.outcome.section"
            >
              {(
                [
                  {
                    label: "Interested",
                    outcome: CallOutcome.Interested,
                    color: "green",
                  },
                  {
                    label: "Not Interested",
                    outcome: CallOutcome.NotInterested,
                    color: "muted",
                  },
                  {
                    label: "Not Reachable",
                    outcome: CallOutcome.NotReachable,
                    color: "amber",
                  },
                  {
                    label: "Switch Off",
                    outcome: CallOutcome.SwitchOff,
                    color: "red",
                  },
                ] as const
              ).map(({ label, outcome, color }) => (
                <button
                  key={outcome}
                  type="button"
                  data-ocid={`calls.outcome.${outcome.toLowerCase()}_button`}
                  disabled={logCall.isPending}
                  onClick={() => {
                    setCallOutcome(outcome);
                    if (outcome === CallOutcome.Interested) {
                      setStep("product_category");
                    } else {
                      handleSaveOutcomeOnly(outcome);
                    }
                  }}
                  className={cn(
                    "flex items-center justify-center p-4 border rounded-lg font-semibold font-display text-sm transition-smooth",
                    color === "green" &&
                      "text-chart-3 bg-chart-3/10 border-chart-3/30 hover:bg-chart-3/20",
                    color === "muted" &&
                      "text-muted-foreground bg-muted border-border hover:bg-muted/80",
                    color === "amber" &&
                      "text-accent bg-accent/10 border-accent/30 hover:bg-accent/20",
                    color === "red" &&
                      "text-destructive bg-destructive/10 border-destructive/30 hover:bg-destructive/20",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {/* Step 4: Product Category */}
        {step === "product_category" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Product Interest"
            subtitle="Select the product category the lead is interested in"
            onBack={() => setStep("call_outcome")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <div
              className="grid grid-cols-3 gap-3"
              data-ocid="calls.product_category.section"
            >
              {(
                [
                  {
                    key: "Agri",
                    label: "Agri",
                    icon: <Wheat className="w-6 h-6" />,
                    color: "green",
                  },
                  {
                    key: "CivilEquip",
                    label: "Civil Equip",
                    icon: <Wrench className="w-6 h-6" />,
                    color: "amber",
                  },
                  {
                    key: "IndustrialEquip",
                    label: "Industrial Equip",
                    icon: <Zap className="w-6 h-6" />,
                    color: "blue",
                  },
                ] as const
              ).map(({ key, label, icon, color }) => (
                <button
                  key={key}
                  type="button"
                  data-ocid={`calls.product_category.${key.toLowerCase()}_button`}
                  onClick={() => {
                    setProductCategory(key);
                    if (key === "Agri") setStep("agri_subtype");
                    else if (key === "CivilEquip") setStep("civil_equip");
                    else setStep("industrial_equip");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 py-5 px-2 border rounded-lg transition-smooth",
                    color === "green" &&
                      "text-chart-3 bg-chart-3/10 border-chart-3/30 hover:bg-chart-3/20",
                    color === "amber" &&
                      "text-accent bg-accent/10 border-accent/30 hover:bg-accent/20",
                    color === "blue" &&
                      "text-primary bg-primary/10 border-primary/30 hover:bg-primary/20",
                  )}
                >
                  {icon}
                  <span className="text-xs font-semibold font-display text-center leading-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {/* Step 5a: Agri Subtype */}
        {step === "agri_subtype" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Agri — Select Type"
            subtitle="Is this for a subsidy scheme or a direct sale?"
            onBack={() => setStep("product_category")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="calls.agri_subtype.section"
            >
              <button
                type="button"
                data-ocid="calls.agri_subtype.subsidy_button"
                onClick={() => {
                  setAgriSubtype(AgriSubType.Subsidy);
                  setStep("agri_subsidy");
                }}
                className="flex flex-col items-center gap-2 p-5 bg-accent/10 border border-accent/30 rounded-lg hover:bg-accent/20 transition-smooth"
              >
                <span className="text-2xl">📋</span>
                <span className="text-sm font-semibold font-display text-accent">
                  Subsidy
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Govt scheme
                </span>
              </button>
              <button
                type="button"
                data-ocid="calls.agri_subtype.sale_button"
                onClick={() => {
                  setAgriSubtype(AgriSubType.Sale);
                  setStep("agri_sale");
                }}
                className="flex flex-col items-center gap-2 p-5 bg-chart-3/10 border border-chart-3/30 rounded-lg hover:bg-chart-3/20 transition-smooth"
              >
                <span className="text-2xl">🛒</span>
                <span className="text-sm font-semibold font-display text-chart-3">
                  Sale
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Direct purchase
                </span>
              </button>
            </div>
          </StepCard>
        )}

        {/* Step 5a-Subsidy: Agri Subsidy fields */}
        {step === "agri_subsidy" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Agri — Subsidy Details"
            subtitle="Fill in the farmer and scheme details"
            onBack={() => setStep("agri_subtype")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <AgriSubsidyForm
              form={subsidyForm}
              onChange={setSubsidyForm}
              onSubmit={handleSaveAgriSubsidy}
              isPending={logCall.isPending}
            />
          </StepCard>
        )}

        {/* Step 5a-Sale: Agri Sale fields */}
        {step === "agri_sale" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Agri — Sale Details"
            subtitle="Product and follow-up for Agri sale"
            onBack={() => setStep("agri_subtype")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <SaleForm
              form={saleForm}
              onChange={setSaleForm}
              onSubmit={handleSaveAgriSale}
              isPending={logCall.isPending}
            />
          </StepCard>
        )}

        {/* Step 5b: Civil Equip */}
        {step === "civil_equip" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Civil Equipment — Sale Details"
            subtitle="Product selection and follow-up"
            onBack={() => setStep("product_category")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <SaleForm
              form={saleForm}
              onChange={setSaleForm}
              onSubmit={handleSaveCivil}
              isPending={logCall.isPending}
            />
          </StepCard>
        )}

        {/* Step 5c: Industrial Equip */}
        {step === "industrial_equip" && selectedLead && (
          <StepCard
            stepNum={stepNum}
            total={TOTAL_STEPS}
            title="Industrial Equipment — Sale Details"
            subtitle="Product selection and follow-up"
            onBack={() => setStep("product_category")}
          >
            <CommonFieldsRow common={common} onChange={setCommon} />
            <SaleForm
              form={saleForm}
              onChange={setSaleForm}
              onSubmit={handleSaveIndustrial}
              isPending={logCall.isPending}
            />
          </StepCard>
        )}

        {/* Done */}
        {step === "done" && selectedLead && (
          <div className="max-w-lg mx-auto">
            <div
              className="bg-card border border-border rounded-xl p-6 space-y-5 animate-fade-in"
              data-ocid="calls.success_state"
            >
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-chart-3/20 flex items-center justify-center mx-auto">
                  <PhoneCall className="w-6 h-6 text-chart-3" />
                </div>
                <h2 className="text-base font-bold font-display text-foreground">
                  Call Logged Successfully
                </h2>
                <p className="text-sm text-muted-foreground">
                  Saved call record for{" "}
                  <span className="text-primary font-medium">
                    {selectedLead.name}
                  </span>
                </p>
              </div>
              <Button
                onClick={resetFlow}
                data-ocid="calls.log_another_button"
                className="w-full"
              >
                Log another call
              </Button>
            </div>

            {/* Recent calls list */}
            <RecentCallsList
              leadId={selectedLead.id}
              leadName={selectedLead.name}
            />
          </div>
        )}

        {/* Recent calls for selected lead (below form on active steps) */}
        {step !== "select_lead" && step !== "done" && selectedLead && (
          <div className="mt-6 max-w-lg mx-auto">
            <RecentCallsList
              leadId={selectedLead.id}
              leadName={selectedLead.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step Progress Indicator ─────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex items-center gap-1.5 mb-2"
      data-ocid="calls.step_indicator"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full flex-1 transition-smooth",
            i < current ? "bg-primary" : "bg-muted",
          )}
        />
      ))}
      <span className="text-[11px] text-muted-foreground ml-1 shrink-0 font-mono">
        {current}/{total}
      </span>
    </div>
  );
}

// ─── Step Card Shell ─────────────────────────────────────────────────────────

function StepCard({
  stepNum,
  total,
  title,
  subtitle,
  onBack,
  children,
}: {
  stepNum: number;
  total: number;
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-lg mx-auto">
      <StepIndicator current={stepNum} total={total} />
      <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-slide-down">
        <div>
          <button
            type="button"
            onClick={onBack}
            data-ocid="calls.back_button"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-3 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-base font-bold font-display text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Common Fields (duration + notes) ────────────────────────────────────────

function CommonFieldsRow({
  common,
  onChange,
}: {
  common: CommonFields;
  onChange: (v: CommonFields) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-1">
      <div>
        <label
          htmlFor="call-duration"
          className="text-xs font-semibold text-muted-foreground block mb-1"
        >
          Duration (mins)
        </label>
        <div className="relative">
          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id="call-duration"
            data-ocid="calls.duration_input"
            type="number"
            min="0"
            step="0.5"
            placeholder="e.g. 3.5"
            value={common.durationMins}
            onChange={(e) =>
              onChange({ ...common, durationMins: e.target.value })
            }
            className="pl-8 h-9 text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="call-notes"
          className="text-xs font-semibold text-muted-foreground block mb-1"
        >
          Notes
        </label>
        <Input
          id="call-notes"
          data-ocid="calls.notes_input"
          placeholder="Quick note…"
          value={common.notes}
          onChange={(e) => onChange({ ...common, notes: e.target.value })}
          className="h-9 text-sm"
        />
      </div>
    </div>
  );
}

// ─── StatusCard helper ────────────────────────────────────────────────────────

function StatusCard({
  icon,
  label,
  dataOcid,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  dataOcid: string;
  color: "green" | "amber" | "blue" | "muted";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={dataOcid}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-5 border rounded-lg transition-smooth",
        color === "green" &&
          "text-chart-3 bg-chart-3/10 border-chart-3/30 hover:bg-chart-3/20",
        color === "amber" &&
          "text-accent bg-accent/10 border-accent/30 hover:bg-accent/20",
        color === "blue" &&
          "text-primary bg-primary/10 border-primary/30 hover:bg-primary/20",
        color === "muted" &&
          "text-muted-foreground bg-muted border-border hover:bg-muted/80",
      )}
    >
      {icon}
      <span className="text-sm font-semibold font-display">{label}</span>
    </button>
  );
}

// ─── Sale Form (Agri Sale / Civil / Industrial) ───────────────────────────────

function SaleForm({
  form,
  onChange,
  onSubmit,
  isPending,
}: {
  form: SaleFormFields;
  onChange: (v: SaleFormFields) => void;
  onSubmit: () => void;
  isPending: boolean;
}) {
  const { data: categories } = useProductCategories();
  const selectedCatId = form.productCategoryId
    ? BigInt(form.productCategoryId)
    : null;
  const { data: products } = useProducts(selectedCatId);

  const set = (k: keyof SaleFormFields, v: string) =>
    onChange({ ...form, [k]: v });

  return (
    <div className="space-y-3" data-ocid="calls.sale_form">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="sale-cat"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Product Category
          </label>
          <select
            id="sale-cat"
            data-ocid="calls.sale_form.category_select"
            value={form.productCategoryId}
            onChange={(e) => {
              set("productCategoryId", e.target.value);
              set("productId", "");
            }}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select category…</option>
            {(categories ?? []).map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sale-product"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Product
          </label>
          <select
            id="sale-product"
            data-ocid="calls.sale_form.product_select"
            value={form.productId}
            onChange={(e) => set("productId", e.target.value)}
            disabled={!form.productCategoryId}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            <option value="">Select product…</option>
            {(products ?? []).map((p) => (
              <option key={p.id.toString()} value={p.id.toString()}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sale-priority"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Lead Temperature
          </label>
          <select
            id="sale-priority"
            data-ocid="calls.sale_form.priority_select"
            value={form.priority}
            onChange={(e) => set("priority", e.target.value)}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value={Priority.Hot}>Hot 🔥</option>
            <option value={Priority.Warm}>Warm 🌡️</option>
            <option value={Priority.Cold}>Cold ❄️</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sale-place"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Place
          </label>
          <Input
            id="sale-place"
            data-ocid="calls.sale_form.place_input"
            placeholder="e.g. Patna"
            value={form.place}
            onChange={(e) => set("place", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="sale-followup"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Follow-up Date
          </label>
          <Input
            id="sale-followup"
            data-ocid="calls.sale_form.followup_date_input"
            type="date"
            value={form.followUpDate}
            onChange={(e) => set("followUpDate", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>
      <Button
        type="button"
        data-ocid="calls.sale_form.submit_button"
        onClick={onSubmit}
        disabled={isPending || !form.productCategoryId || !form.productId}
        className="w-full"
      >
        {isPending ? "Saving…" : "Save Call Log"}
      </Button>
    </div>
  );
}

// ─── Agri Subsidy Form ────────────────────────────────────────────────────────

function AgriSubsidyForm({
  form,
  onChange,
  onSubmit,
  isPending,
}: {
  form: SubsidyFormFields;
  onChange: (v: SubsidyFormFields) => void;
  onSubmit: () => void;
  isPending: boolean;
}) {
  const { data: categories } = useProductCategories();
  const selectedCatId = form.productCategoryId
    ? BigInt(form.productCategoryId)
    : null;
  const { data: products } = useProducts(selectedCatId);

  const set = (k: keyof SubsidyFormFields, v: string | DocStatus) =>
    onChange({ ...form, [k]: v });

  return (
    <div className="space-y-3" data-ocid="calls.subsidy_form">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="sub-cat"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Product Category
          </label>
          <select
            id="sub-cat"
            data-ocid="calls.subsidy_form.category_select"
            value={form.productCategoryId}
            onChange={(e) => {
              set("productCategoryId", e.target.value);
              set("productId", "");
            }}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select category…</option>
            {(categories ?? []).map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sub-product"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Product
          </label>
          <select
            id="sub-product"
            data-ocid="calls.subsidy_form.product_select"
            value={form.productId}
            onChange={(e) => set("productId", e.target.value)}
            disabled={!form.productCategoryId}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            <option value="">Select product…</option>
            {(products ?? []).map((p) => (
              <option key={p.id.toString()} value={p.id.toString()}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sub-farmer"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Farmer Name *
          </label>
          <Input
            id="sub-farmer"
            data-ocid="calls.subsidy_form.farmer_name_input"
            placeholder="Farmer's full name"
            value={form.farmerName}
            onChange={(e) => set("farmerName", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sub-village"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Village *
          </label>
          <Input
            id="sub-village"
            data-ocid="calls.subsidy_form.village_input"
            placeholder="Village name"
            value={form.village}
            onChange={(e) => set("village", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sub-block"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Block *
          </label>
          <Input
            id="sub-block"
            data-ocid="calls.subsidy_form.block_input"
            placeholder="Block"
            value={form.block}
            onChange={(e) => set("block", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sub-district"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            District *
          </label>
          <Input
            id="sub-district"
            data-ocid="calls.subsidy_form.district_input"
            placeholder="District"
            value={form.district}
            onChange={(e) => set("district", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sub-division"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Division
          </label>
          <Input
            id="sub-division"
            data-ocid="calls.subsidy_form.division_input"
            placeholder="Division (optional)"
            value={form.division}
            onChange={(e) => set("division", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sub-docstatus"
            className="text-xs font-semibold text-muted-foreground block mb-1"
          >
            Document Status
          </label>
          <select
            id="sub-docstatus"
            data-ocid="calls.subsidy_form.doc_status_select"
            value={form.docStatus}
            onChange={(e) => set("docStatus", e.target.value as DocStatus)}
            className="w-full h-9 px-3 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value={DocStatus.Collected}>Collected ✅</option>
            <option value={DocStatus.Pending}>Pending ⏳</option>
          </select>
        </div>
      </div>
      <Button
        type="button"
        data-ocid="calls.subsidy_form.submit_button"
        onClick={onSubmit}
        disabled={
          isPending ||
          !form.farmerName ||
          !form.village ||
          !form.block ||
          !form.district ||
          !form.productCategoryId ||
          !form.productId
        }
        className="w-full"
      >
        {isPending ? "Saving…" : "Save Call Log"}
      </Button>
    </div>
  );
}

// ─── Recent Calls List ────────────────────────────────────────────────────────

function RecentCallsList({
  leadId,
  leadName,
}: {
  leadId: bigint;
  leadName: string;
}) {
  const { data: calls, isLoading } = useCallsForLead(leadId);

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!calls || calls.length === 0) {
    return (
      <div
        className="mt-4 p-4 rounded-lg bg-muted/40 border border-border text-center"
        data-ocid="calls.recent_calls.empty_state"
      >
        <p className="text-xs text-muted-foreground">
          No previous calls for {leadName}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2" data-ocid="calls.recent_calls.list">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Recent Calls ({calls.length})
      </p>
      {calls.map((call, i) => (
        <CallLogRow key={call.id.toString()} call={call} idx={i} />
      ))}
    </div>
  );
}

function CallLogRow({ call, idx }: { call: CallLog; idx: number }) {
  const date = new Date(
    Number(call.callTimestamp / 1_000_000n),
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isConnected = call.callStatus === CallStatus.Connected;
  const outcomeLabel = call.outcome
    ? ({
        Interested: "Interested",
        NotInterested: "Not Interested",
        NotReachable: "Not Reachable",
        SwitchOff: "Switch Off",
      }[call.outcome] ?? call.outcome)
    : null;

  return (
    <div
      data-ocid={`calls.recent_calls.item.${idx + 1}`}
      className="flex items-start gap-3 px-3 py-2.5 bg-card border border-border rounded-lg"
    >
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          isConnected ? "bg-chart-3/15" : "bg-accent/10",
        )}
      >
        {isConnected ? (
          <PhoneCall className="w-3.5 h-3.5 text-chart-3" />
        ) : (
          <PhoneOff className="w-3.5 h-3.5 text-accent" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold",
              isConnected ? "text-chart-3" : "text-accent",
            )}
          >
            {isConnected ? "Connected" : "Not Connected"}
          </span>
          {outcomeLabel && (
            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
              {outcomeLabel}
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
          {date}
          {call.duration != null && call.duration > 0n && (
            <> · {Math.round(Number(call.duration) / 60)}m</>
          )}
        </p>
        {call.notes && (
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
            {call.notes}
          </p>
        )}
      </div>
    </div>
  );
}
