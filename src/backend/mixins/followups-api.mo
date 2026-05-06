import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FollowUpsLib "../lib/followups";
import FollowUpTypes "../types/followups";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  followUps : List.List<FollowUpTypes.FollowUp>,
  nextFollowUpId : [var Nat],
) {
  public shared ({ caller }) func logFollowUp(input : FollowUpTypes.CreateFollowUpInput) : async FollowUpTypes.FollowUp {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let fu = FollowUpsLib.createFollowUp(followUps, nextFollowUpId[0], input, Time.now());
    nextFollowUpId[0] += 1;
    fu
  };

  public shared ({ caller }) func updateFollowUpStatus(input : FollowUpTypes.UpdateFollowUpInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FollowUpsLib.updateFollowUp(followUps, input)
  };

  public shared ({ caller }) func deleteFollowUp(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FollowUpsLib.deleteFollowUp(followUps, id)
  };

  public query ({ caller }) func getFollowUpsForLead(leadId : Nat) : async [FollowUpTypes.FollowUp] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FollowUpsLib.getFollowUpsForLead(followUps, leadId)
  };

  public query ({ caller }) func queryFollowUps(filterType : CommonTypes.FollowUpFilter) : async [FollowUpTypes.FollowUp] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FollowUpsLib.queryFollowUps(followUps, filterType, Time.now())
  };
};
