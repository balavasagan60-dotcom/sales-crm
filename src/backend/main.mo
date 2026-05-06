import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ProfileMixin "mixins/profile";
import LeadsMixin "mixins/leads-api";
import CallsMixin "mixins/calls-api";
import FollowUpsMixin "mixins/followups-api";
import ReportsMixin "mixins/reports-api";
import SettingsMixin "mixins/settings-api";
import SettingsLib "lib/settings";
import LeadTypes "types/leads";
import CallTypes "types/calls";
import FollowUpTypes "types/followups";
import SettingsTypes "types/settings";

actor {
  // Auth
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  let userProfiles = Map.empty<Principal, SettingsTypes.UserInfo>();
  include ProfileMixin(accessControlState, userProfiles);

  // Leads — counter wrapped in [var Nat] so mixin can mutate it
  let leads = List.empty<LeadTypes.Lead>();
  let nextLeadId = [var 1];
  include LeadsMixin(accessControlState, leads, nextLeadId);

  // Call logs
  let callLogs = List.empty<CallTypes.CallLog>();
  let nextCallId = [var 1];
  include CallsMixin(accessControlState, callLogs, nextCallId);

  // Follow-ups
  let followUps = List.empty<FollowUpTypes.FollowUp>();
  let nextFollowUpId = [var 1];
  include FollowUpsMixin(accessControlState, followUps, nextFollowUpId);

  // Reports (read-only view of leads)
  include ReportsMixin(accessControlState, leads);

  // Settings master data
  let productCategories = List.empty<SettingsTypes.ProductCategory>();
  let products = List.empty<SettingsTypes.Product>();
  let campaigns = List.empty<SettingsTypes.Campaign>();
  let sources = List.empty<SettingsTypes.Source>();
  let branches = List.empty<SettingsTypes.Branch>();
  let nextCategoryId = [var 1];
  let nextProductId = [var 1];
  let nextCampaignId = [var 1];
  let nextSourceId = [var 1];
  let nextBranchId = [var 1];

  // Seed default master data on first run
  if (productCategories.size() == 0) {
    ignore SettingsLib.addProductCategory(productCategories, nextCategoryId[0], "Agri");
    nextCategoryId[0] += 1;
    ignore SettingsLib.addProductCategory(productCategories, nextCategoryId[0], "Civil Equipment");
    nextCategoryId[0] += 1;
    ignore SettingsLib.addProductCategory(productCategories, nextCategoryId[0], "Industrial Equipment");
    nextCategoryId[0] += 1;
  };
  if (sources.size() == 0) {
    ignore SettingsLib.addSource(sources, nextSourceId[0], "Website");
    nextSourceId[0] += 1;
    ignore SettingsLib.addSource(sources, nextSourceId[0], "Referral");
    nextSourceId[0] += 1;
    ignore SettingsLib.addSource(sources, nextSourceId[0], "Cold Call");
    nextSourceId[0] += 1;
    ignore SettingsLib.addSource(sources, nextSourceId[0], "Social Media");
    nextSourceId[0] += 1;
    ignore SettingsLib.addSource(sources, nextSourceId[0], "Exhibition");
    nextSourceId[0] += 1;
  };
  if (branches.size() == 0) {
    ignore SettingsLib.addBranch(branches, nextBranchId[0], "Head Office");
    nextBranchId[0] += 1;
  };

  include SettingsMixin(
    accessControlState,
    productCategories,
    products,
    campaigns,
    sources,
    branches,
    nextCategoryId,
    nextProductId,
    nextCampaignId,
    nextSourceId,
    nextBranchId,
  );
};
