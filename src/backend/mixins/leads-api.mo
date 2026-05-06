import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import LeadsLib "../lib/leads";
import LeadTypes "../types/leads";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  leads : List.List<LeadTypes.Lead>,
  nextLeadId : [var Nat],
) {
  public query ({ caller }) func listLeads(filter : ?LeadTypes.LeadFilter) : async [LeadTypes.Lead] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let role = AccessControl.getUserRole(accessControlState, caller);
    // Telecaller/SalesExecutive see only their assigned leads
    let effectiveFilter : ?LeadTypes.LeadFilter = switch (role) {
      case (#admin or #user) filter;
      case (#guest) Runtime.trap("Unauthorized");
    };
    LeadsLib.listLeads(leads, effectiveFilter)
  };

  public query ({ caller }) func getLeadById(id : Nat) : async ?LeadTypes.Lead {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    LeadsLib.getLead(leads, id)
  };

  public shared ({ caller }) func addLead(input : LeadTypes.CreateLeadInput) : async LeadTypes.Lead {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let role = AccessControl.getUserRole(accessControlState, caller);
    switch (role) {
      case (#guest) Runtime.trap("Unauthorized: only admin, coordinator can create leads");
      case _ {};
    };
    let lead = LeadsLib.createLead(leads, nextLeadId[0], input, Time.now());
    nextLeadId[0] += 1;
    lead
  };

  public shared ({ caller }) func updateLead(input : LeadTypes.UpdateLeadInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    LeadsLib.updateLead(leads, input, Time.now())
  };

  public shared ({ caller }) func deleteLead(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can delete leads");
    };
    LeadsLib.deleteLead(leads, id)
  };

  public shared ({ caller }) func assignLead(id : Nat, userId : CommonTypes.UserId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can assign leads");
    };
    let input : LeadTypes.UpdateLeadInput = {
      id = id;
      name = null;
      phone = null;
      altPhone = null;
      email = null;
      source = null;
      campaign = null;
      assignedUserId = ?userId;
      productInterest = null;
      status = null;
      priority = null;
      notes = null;
    };
    LeadsLib.updateLead(leads, input, Time.now())
  };
};
