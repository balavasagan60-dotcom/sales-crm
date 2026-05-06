import List "mo:core/List";
import SettingsTypes "../types/settings";

module {
  // Product Categories
  public func listProductCategories(
    categories : List.List<SettingsTypes.ProductCategory>
  ) : [SettingsTypes.ProductCategory] {
    categories.toArray()
  };

  public func addProductCategory(
    categories : List.List<SettingsTypes.ProductCategory>,
    nextId : Nat,
    name : Text,
  ) : SettingsTypes.ProductCategory {
    let cat : SettingsTypes.ProductCategory = { id = nextId; name = name; isActive = true };
    categories.add(cat);
    cat
  };

  public func updateProductCategory(
    categories : List.List<SettingsTypes.ProductCategory>,
    id : Nat,
    name : Text,
  ) : Bool {
    var found = false;
    categories.mapInPlace(func(c) {
      if (c.id == id) { found := true; { c with name = name } } else { c }
    });
    found
  };

  public func deleteProductCategory(
    categories : List.List<SettingsTypes.ProductCategory>,
    id : Nat,
  ) : Bool {
    let sizeBefore = categories.size();
    let filtered = categories.filter(func(c) { c.id != id });
    categories.clear();
    categories.append(filtered);
    categories.size() < sizeBefore
  };

  // Products
  public func listProducts(
    products : List.List<SettingsTypes.Product>,
    categoryId : ?Nat,
  ) : [SettingsTypes.Product] {
    switch (categoryId) {
      case null { products.toArray() };
      case (?cid) { products.filter(func(p) { p.categoryId == cid }).toArray() };
    }
  };

  public func addProduct(
    products : List.List<SettingsTypes.Product>,
    nextId : Nat,
    categoryId : Nat,
    name : Text,
  ) : SettingsTypes.Product {
    let prod : SettingsTypes.Product = { id = nextId; categoryId = categoryId; name = name; isActive = true };
    products.add(prod);
    prod
  };

  public func updateProduct(
    products : List.List<SettingsTypes.Product>,
    id : Nat,
    name : Text,
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id) { found := true; { p with name = name } } else { p }
    });
    found
  };

  public func deleteProduct(
    products : List.List<SettingsTypes.Product>,
    id : Nat,
  ) : Bool {
    let sizeBefore = products.size();
    let filtered = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(filtered);
    products.size() < sizeBefore
  };

  // Campaigns
  public func listCampaigns(
    campaigns : List.List<SettingsTypes.Campaign>
  ) : [SettingsTypes.Campaign] {
    campaigns.toArray()
  };

  public func addCampaign(
    campaigns : List.List<SettingsTypes.Campaign>,
    nextId : Nat,
    input : SettingsTypes.Campaign,
  ) : SettingsTypes.Campaign {
    let camp : SettingsTypes.Campaign = { input with id = nextId; isActive = true };
    campaigns.add(camp);
    camp
  };

  public func updateCampaign(
    campaigns : List.List<SettingsTypes.Campaign>,
    input : SettingsTypes.Campaign,
  ) : Bool {
    var found = false;
    campaigns.mapInPlace(func(c) {
      if (c.id == input.id) { found := true; input } else { c }
    });
    found
  };

  public func deleteCampaign(
    campaigns : List.List<SettingsTypes.Campaign>,
    id : Nat,
  ) : Bool {
    let sizeBefore = campaigns.size();
    let filtered = campaigns.filter(func(c) { c.id != id });
    campaigns.clear();
    campaigns.append(filtered);
    campaigns.size() < sizeBefore
  };

  // Sources
  public func listSources(
    sources : List.List<SettingsTypes.Source>
  ) : [SettingsTypes.Source] {
    sources.toArray()
  };

  public func addSource(
    sources : List.List<SettingsTypes.Source>,
    nextId : Nat,
    name : Text,
  ) : SettingsTypes.Source {
    let src : SettingsTypes.Source = { id = nextId; name = name; isActive = true };
    sources.add(src);
    src
  };

  public func updateSource(
    sources : List.List<SettingsTypes.Source>,
    id : Nat,
    name : Text,
  ) : Bool {
    var found = false;
    sources.mapInPlace(func(s) {
      if (s.id == id) { found := true; { s with name = name } } else { s }
    });
    found
  };

  public func deleteSource(
    sources : List.List<SettingsTypes.Source>,
    id : Nat,
  ) : Bool {
    let sizeBefore = sources.size();
    let filtered = sources.filter(func(s) { s.id != id });
    sources.clear();
    sources.append(filtered);
    sources.size() < sizeBefore
  };

  // Branches
  public func listBranches(
    branches : List.List<SettingsTypes.Branch>
  ) : [SettingsTypes.Branch] {
    branches.toArray()
  };

  public func addBranch(
    branches : List.List<SettingsTypes.Branch>,
    nextId : Nat,
    name : Text,
  ) : SettingsTypes.Branch {
    let branch : SettingsTypes.Branch = { id = nextId; name = name; isActive = true };
    branches.add(branch);
    branch
  };

  public func updateBranch(
    branches : List.List<SettingsTypes.Branch>,
    id : Nat,
    name : Text,
  ) : Bool {
    var found = false;
    branches.mapInPlace(func(b) {
      if (b.id == id) { found := true; { b with name = name } } else { b }
    });
    found
  };

  public func deleteBranch(
    branches : List.List<SettingsTypes.Branch>,
    id : Nat,
  ) : Bool {
    let sizeBefore = branches.size();
    let filtered = branches.filter(func(b) { b.id != id });
    branches.clear();
    branches.append(filtered);
    branches.size() < sizeBefore
  };
};
