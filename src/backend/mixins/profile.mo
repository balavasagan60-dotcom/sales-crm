import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SettingsTypes "../types/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, SettingsTypes.UserInfo>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?SettingsTypes.UserInfo {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(caller)
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let info : SettingsTypes.UserInfo = { id = caller; name = name; role = "user" };
    userProfiles.add(caller, info);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?SettingsTypes.UserInfo {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(user)
  };

  public query ({ caller }) func listUsers() : async [SettingsTypes.UserInfo] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    userProfiles.values().toArray()
  };

  public shared ({ caller }) func assignUserRole(user : Principal, role : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let existing = userProfiles.get(user);
    let info : SettingsTypes.UserInfo = switch (existing) {
      case (?p) { { p with role = role } };
      case null { { id = user; name = ""; role = role } };
    };
    userProfiles.add(user, info);
  };
};
