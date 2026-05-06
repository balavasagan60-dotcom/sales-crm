import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CallsLib "../lib/calls";
import CallTypes "../types/calls";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  callLogs : List.List<CallTypes.CallLog>,
  nextCallId : [var Nat],
) {
  public shared ({ caller }) func logCall(input : CallTypes.LogCallInput) : async CallTypes.CallLog {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let entry = CallsLib.logCall(callLogs, nextCallId[0], caller, input, Time.now());
    nextCallId[0] += 1;
    entry
  };

  public query ({ caller }) func getCallsForLead(leadId : Nat) : async [CallTypes.CallLog] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CallsLib.getCallsForLead(callLogs, leadId)
  };

  public query ({ caller }) func getCallReport(filter : CallTypes.CallReportFilter) : async CallTypes.CallReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CallsLib.getCallReport(callLogs, filter)
  };
};
