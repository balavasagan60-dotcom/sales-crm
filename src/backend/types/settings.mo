module {
  public type ProductCategory = {
    id : Nat;
    name : Text;
    isActive : Bool;
  };

  public type Product = {
    id : Nat;
    categoryId : Nat;
    name : Text;
    isActive : Bool;
  };

  public type Campaign = {
    id : Nat;
    name : Text;
    budget : ?Nat;
    startDate : ?Text;
    endDate : ?Text;
    source : ?Text;
    isActive : Bool;
  };

  public type Source = {
    id : Nat;
    name : Text;
    isActive : Bool;
  };

  public type Branch = {
    id : Nat;
    name : Text;
    isActive : Bool;
  };

  public type UserInfo = {
    id : Principal;
    name : Text;
    role : Text;
  };
}
