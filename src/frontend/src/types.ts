import type {
  AgriDetails,
  AgriSubType,
  Branch,
  CallDetails,
  CallLog,
  CallOutcome,
  CallReport,
  CallReportFilter,
  CallStatus,
  Campaign,
  CreateFollowUpInput,
  CreateLeadInput,
  DateRange,
  DocStatus,
  FollowUp,
  FollowUpFilter,
  Lead,
  LeadFilter,
  LeadReport,
  LeadReportFilter,
  LeadStatus,
  LogCallInput,
  Priority,
  Product,
  ProductCategory,
  SaleFields,
  Source,
  SubsidyFields,
  UpdateFollowUpInput,
  UpdateLeadInput,
  UserInfo,
  UserRole,
} from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";

export type {
  Lead,
  LeadStatus,
  Priority,
  CallLog,
  CallStatus,
  CallOutcome,
  CallDetails,
  FollowUp,
  FollowUpFilter,
  ProductCategory,
  Campaign,
  Source,
  Branch,
  Product,
  UserInfo,
  UserRole,
  AgriSubType,
  DocStatus,
  LeadReport,
  CallReport,
  LeadFilter,
  CreateLeadInput,
  UpdateLeadInput,
  LogCallInput,
  CreateFollowUpInput,
  UpdateFollowUpInput,
  DateRange,
  CallReportFilter,
  LeadReportFilter,
  AgriDetails,
  SaleFields,
  SubsidyFields,
  Principal,
};

export type CRMRole =
  | "admin"
  | "coordinator"
  | "telecaller"
  | "sales_executive"
  | "unknown";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: CRMRole[];
}

export type FilterOption = {
  label: string;
  value: string;
};
