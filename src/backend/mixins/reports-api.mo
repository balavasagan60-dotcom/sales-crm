import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import LeadsLib "../lib/leads";
import LeadTypes "../types/leads";
import ReportTypes "../types/reports";

mixin (
  accessControlState : AccessControl.AccessControlState,
  leads : List.List<LeadTypes.Lead>,
) {
  public query ({ caller }) func getLeadReport(filter : ReportTypes.LeadReportFilter) : async ReportTypes.LeadReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    LeadsLib.getLeadReport(leads, filter)
  };
};
