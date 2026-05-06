import CommonTypes "common";

module {
  public type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    altPhone : ?Text;
    email : ?Text;
    source : ?Text;
    campaign : ?Text;
    assignedUserId : ?CommonTypes.UserId;
    productInterest : ?Text;
    status : CommonTypes.LeadStatus;
    priority : CommonTypes.Priority;
    notes : ?Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type CreateLeadInput = {
    name : Text;
    phone : Text;
    altPhone : ?Text;
    email : ?Text;
    source : ?Text;
    campaign : ?Text;
    assignedUserId : ?CommonTypes.UserId;
    productInterest : ?Text;
    status : CommonTypes.LeadStatus;
    priority : CommonTypes.Priority;
    notes : ?Text;
  };

  public type UpdateLeadInput = {
    id : Nat;
    name : ?Text;
    phone : ?Text;
    altPhone : ?Text;
    email : ?Text;
    source : ?Text;
    campaign : ?Text;
    assignedUserId : ?CommonTypes.UserId;
    productInterest : ?Text;
    status : ?CommonTypes.LeadStatus;
    priority : ?CommonTypes.Priority;
    notes : ?Text;
  };

  public type LeadFilter = {
    status : ?CommonTypes.LeadStatus;
    priority : ?CommonTypes.Priority;
    source : ?Text;
    campaign : ?Text;
    assignedUserId : ?CommonTypes.UserId;
    searchText : ?Text;
  };
}
