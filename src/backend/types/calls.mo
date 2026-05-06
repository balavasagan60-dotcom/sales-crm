import CommonTypes "common";

module {
  public type SubsidyFields = {
    farmerName : Text;
    village : Text;
    block : Text;
    division : ?Text;
    district : Text;
    productCategoryId : Nat;
    productId : Nat;
    docStatus : CommonTypes.DocStatus;
  };

  public type SaleFields = {
    productCategoryId : Nat;
    productId : Nat;
    priority : CommonTypes.Priority;
    place : ?Text;
    followUpDate : ?CommonTypes.Timestamp;
  };

  public type AgriDetails = {
    subType : CommonTypes.AgriSubType;
    subsidyFields : ?SubsidyFields;
    saleFields : ?SaleFields;
  };

  public type CallDetails = {
    #Agri : AgriDetails;
    #CivilEquip : SaleFields;
    #IndustrialEquip : SaleFields;
  };

  public type CallLog = {
    id : Nat;
    leadId : Nat;
    callerId : CommonTypes.UserId;
    callStatus : CommonTypes.CallStatus;
    outcome : ?CommonTypes.CallOutcome;
    details : ?CallDetails;
    callTimestamp : CommonTypes.Timestamp;
    duration : ?Nat;
    notes : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type LogCallInput = {
    leadId : Nat;
    callStatus : CommonTypes.CallStatus;
    outcome : ?CommonTypes.CallOutcome;
    details : ?CallDetails;
    callTimestamp : CommonTypes.Timestamp;
    duration : ?Nat;
    notes : ?Text;
  };

  public type CallReportFilter = {
    dateRange : ?CommonTypes.DateRange;
    userId : ?CommonTypes.UserId;
  };

  public type CallReport = {
    totalCalls : Nat;
    connectedCalls : Nat;
    notConnectedCalls : Nat;
    interestedCount : Nat;
    notInterestedCount : Nat;
    notReachableCount : Nat;
    switchOffCount : Nat;
    totalDurationSecs : Nat;
  };
}
