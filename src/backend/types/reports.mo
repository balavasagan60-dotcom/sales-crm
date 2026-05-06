import CommonTypes "common";

module {
  public type LeadReportFilter = {
    dateRange : ?CommonTypes.DateRange;
    userId : ?CommonTypes.UserId;
    source : ?Text;
    campaign : ?Text;
  };

  public type LeadReport = {
    totalLeads : Nat;
    newLeads : Nat;
    qualified : Nat;
    proposalSent : Nat;
    closedWon : Nat;
    closedLost : Nat;
    conversionPercent : Nat;
  };
}
