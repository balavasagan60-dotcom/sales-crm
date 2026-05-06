module {
  public type Timestamp = Int;
  public type UserId = Principal;

  public type LeadStatus = {
    #New;
    #Interested;
    #Proposal;
    #ClosedWon;
    #ClosedLost;
  };

  public type Priority = {
    #Hot;
    #Warm;
    #Cold;
  };

  public type CallStatus = {
    #Connected;
    #NotConnected;
  };

  public type CallOutcome = {
    #Interested;
    #NotInterested;
    #NotReachable;
    #SwitchOff;
  };

  public type ProductCategory = {
    #Agri;
    #CivilEquip;
    #IndustrialEquip;
  };

  public type AgriSubType = {
    #Subsidy;
    #Sale;
  };

  public type DocStatus = {
    #Collected;
    #Pending;
  };

  public type FollowUpFilter = {
    #Today;
    #Missed;
    #Upcoming;
    #Completed;
  };

  public type DateRange = {
    fromTs : Timestamp;
    toTs : Timestamp;
  };

  public type UserRole = {
    #Admin;
    #Coordinator;
    #Telecaller;
    #SalesExecutive;
  };
}
