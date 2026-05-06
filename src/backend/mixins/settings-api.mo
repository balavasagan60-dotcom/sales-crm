import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SettingsLib "../lib/settings";
import SettingsTypes "../types/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  productCategories : List.List<SettingsTypes.ProductCategory>,
  products : List.List<SettingsTypes.Product>,
  campaigns : List.List<SettingsTypes.Campaign>,
  sources : List.List<SettingsTypes.Source>,
  branches : List.List<SettingsTypes.Branch>,
  nextCategoryId : [var Nat],
  nextProductId : [var Nat],
  nextCampaignId : [var Nat],
  nextSourceId : [var Nat],
  nextBranchId : [var Nat],
) {
  // ─── Product Categories ────────────────────────────────────────────
  public query ({ caller }) func listProductCategories() : async [SettingsTypes.ProductCategory] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SettingsLib.listProductCategories(productCategories)
  };

  public shared ({ caller }) func addProductCategory(name : Text) : async SettingsTypes.ProductCategory {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let cat = SettingsLib.addProductCategory(productCategories, nextCategoryId[0], name);
    nextCategoryId[0] += 1;
    cat
  };

  public shared ({ caller }) func updateProductCategory(id : Nat, name : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.updateProductCategory(productCategories, id, name)
  };

  public shared ({ caller }) func deleteProductCategory(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.deleteProductCategory(productCategories, id)
  };

  // ─── Products ──────────────────────────────────────────────────────
  public query ({ caller }) func listProducts(categoryId : ?Nat) : async [SettingsTypes.Product] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SettingsLib.listProducts(products, categoryId)
  };

  public shared ({ caller }) func addProduct(categoryId : Nat, name : Text) : async SettingsTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let prod = SettingsLib.addProduct(products, nextProductId[0], categoryId, name);
    nextProductId[0] += 1;
    prod
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.updateProduct(products, id, name)
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.deleteProduct(products, id)
  };

  // ─── Campaigns ─────────────────────────────────────────────────────
  public query ({ caller }) func listCampaigns() : async [SettingsTypes.Campaign] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SettingsLib.listCampaigns(campaigns)
  };

  public shared ({ caller }) func addCampaign(input : SettingsTypes.Campaign) : async SettingsTypes.Campaign {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let camp = SettingsLib.addCampaign(campaigns, nextCampaignId[0], input);
    nextCampaignId[0] += 1;
    camp
  };

  public shared ({ caller }) func updateCampaign(input : SettingsTypes.Campaign) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.updateCampaign(campaigns, input)
  };

  public shared ({ caller }) func deleteCampaign(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.deleteCampaign(campaigns, id)
  };

  // ─── Sources ───────────────────────────────────────────────────────
  public query ({ caller }) func listSources() : async [SettingsTypes.Source] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SettingsLib.listSources(sources)
  };

  public shared ({ caller }) func addSource(name : Text) : async SettingsTypes.Source {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let src = SettingsLib.addSource(sources, nextSourceId[0], name);
    nextSourceId[0] += 1;
    src
  };

  public shared ({ caller }) func updateSource(id : Nat, name : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.updateSource(sources, id, name)
  };

  public shared ({ caller }) func deleteSource(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.deleteSource(sources, id)
  };

  // ─── Branches ──────────────────────────────────────────────────────
  public query ({ caller }) func listBranches() : async [SettingsTypes.Branch] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SettingsLib.listBranches(branches)
  };

  public shared ({ caller }) func addBranch(name : Text) : async SettingsTypes.Branch {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let branch = SettingsLib.addBranch(branches, nextBranchId[0], name);
    nextBranchId[0] += 1;
    branch
  };

  public shared ({ caller }) func updateBranch(id : Nat, name : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.updateBranch(branches, id, name)
  };

  public shared ({ caller }) func deleteBranch(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    SettingsLib.deleteBranch(branches, id)
  };
};
