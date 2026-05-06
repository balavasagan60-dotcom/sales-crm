import List "mo:core/List";
import CommonTypes "../types/common";
import CallTypes "../types/calls";
import Principal "mo:core/Principal";

module {
  public func logCall(
    callLogs : List.List<CallTypes.CallLog>,
    nextId : Nat,
    callerId : CommonTypes.UserId,
    input : CallTypes.LogCallInput,
    now : CommonTypes.Timestamp,
  ) : CallTypes.CallLog {
    let entry : CallTypes.CallLog = {
      id = nextId;
      leadId = input.leadId;
      callerId = callerId;
      callStatus = input.callStatus;
      outcome = input.outcome;
      details = input.details;
      callTimestamp = input.callTimestamp;
      duration = input.duration;
      notes = input.notes;
      createdAt = now;
    };
    callLogs.add(entry);
    entry
  };

  public func getCallsForLead(
    callLogs : List.List<CallTypes.CallLog>,
    leadId : Nat,
  ) : [CallTypes.CallLog] {
    callLogs.filter(func(c) { c.leadId == leadId }).toArray()
  };

  public func getCallReport(
    callLogs : List.List<CallTypes.CallLog>,
    filter : CallTypes.CallReportFilter,
  ) : CallTypes.CallReport {
    let items = callLogs.values().filter(func(c) {
      let matchDate = switch (filter.dateRange) {
        case null true;
        case (?dr) c.createdAt >= dr.fromTs and c.createdAt <= dr.toTs;
      };
      let matchUser = switch (filter.userId) {
        case null true;
        case (?u) Principal.equal(c.callerId, u);
      };
      matchDate and matchUser
    });
    var total = 0;
    var connected = 0;
    var notConnected = 0;
    var interested = 0;
    var notInterested = 0;
    var notReachable = 0;
    var switchOff = 0;
    var totalDuration = 0;
    items.forEach(func(c) {
      total += 1;
      switch (c.callStatus) {
        case (#Connected) { connected += 1 };
        case (#NotConnected) { notConnected += 1 };
      };
      switch (c.outcome) {
        case (?#Interested) { interested += 1 };
        case (?#NotInterested) { notInterested += 1 };
        case (?#NotReachable) { notReachable += 1 };
        case (?#SwitchOff) { switchOff += 1 };
        case null {};
      };
      switch (c.duration) {
        case (?d) { totalDuration += d };
        case null {};
      };
    });
    {
      totalCalls = total;
      connectedCalls = connected;
      notConnectedCalls = notConnected;
      interestedCount = interested;
      notInterestedCount = notInterested;
      notReachableCount = notReachable;
      switchOffCount = switchOff;
      totalDurationSecs = totalDuration;
    }
  };
};
