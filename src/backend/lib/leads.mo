import List "mo:core/List";
import CommonTypes "../types/common";
import LeadTypes "../types/leads";
import ReportTypes "../types/reports";

module {
  public func listLeads(
    leads : List.List<LeadTypes.Lead>,
    filter : ?LeadTypes.LeadFilter,
  ) : [LeadTypes.Lead] {
    let all = leads.values();
    switch (filter) {
      case null { leads.toArray() };
      case (?f) {
        let filtered = all.filter(func(l) {
          let matchStatus = switch (f.status) {
            case null true;
            case (?s) l.status == s;
          };
          let matchPriority = switch (f.priority) {
            case null true;
            case (?p) l.priority == p;
          };
          let matchSource = switch (f.source) {
            case null true;
            case (?s) l.source == ?s;
          };
          let matchCampaign = switch (f.campaign) {
            case null true;
            case (?c) l.campaign == ?c;
          };
          let matchUser = switch (f.assignedUserId) {
            case null true;
            case (?u) l.assignedUserId == ?u;
          };
          let matchSearch = switch (f.searchText) {
            case null true;
            case (?q) {
              let ql = q.toLower();
              l.name.toLower().contains(#text ql) or l.phone.contains(#text ql)
            };
          };
          matchStatus and matchPriority and matchSource and matchCampaign and matchUser and matchSearch
        });
        filtered.toArray()
      };
    }
  };

  public func getLead(
    leads : List.List<LeadTypes.Lead>,
    id : Nat,
  ) : ?LeadTypes.Lead {
    leads.find(func(l) { l.id == id })
  };

  public func createLead(
    leads : List.List<LeadTypes.Lead>,
    nextId : Nat,
    input : LeadTypes.CreateLeadInput,
    now : CommonTypes.Timestamp,
  ) : LeadTypes.Lead {
    let lead : LeadTypes.Lead = {
      id = nextId;
      name = input.name;
      phone = input.phone;
      altPhone = input.altPhone;
      email = input.email;
      source = input.source;
      campaign = input.campaign;
      assignedUserId = input.assignedUserId;
      productInterest = input.productInterest;
      status = input.status;
      priority = input.priority;
      notes = input.notes;
      createdAt = now;
      updatedAt = now;
    };
    leads.add(lead);
    lead
  };

  public func updateLead(
    leads : List.List<LeadTypes.Lead>,
    input : LeadTypes.UpdateLeadInput,
    now : CommonTypes.Timestamp,
  ) : Bool {
    var found = false;
    leads.mapInPlace(func(l) {
      if (l.id == input.id) {
        found := true;
        {
          l with
          name = switch (input.name) { case (?v) v; case null l.name };
          phone = switch (input.phone) { case (?v) v; case null l.phone };
          altPhone = switch (input.altPhone) { case (?v) ?v; case null l.altPhone };
          email = switch (input.email) { case (?v) ?v; case null l.email };
          source = switch (input.source) { case (?v) ?v; case null l.source };
          campaign = switch (input.campaign) { case (?v) ?v; case null l.campaign };
          assignedUserId = switch (input.assignedUserId) { case (?v) ?v; case null l.assignedUserId };
          productInterest = switch (input.productInterest) { case (?v) ?v; case null l.productInterest };
          status = switch (input.status) { case (?v) v; case null l.status };
          priority = switch (input.priority) { case (?v) v; case null l.priority };
          notes = switch (input.notes) { case (?v) ?v; case null l.notes };
          updatedAt = now;
        }
      } else { l }
    });
    found
  };

  public func deleteLead(
    leads : List.List<LeadTypes.Lead>,
    id : Nat,
  ) : Bool {
    let sizeBefore = leads.size();
    let filtered = leads.filter(func(l) { l.id != id });
    leads.clear();
    leads.append(filtered);
    leads.size() < sizeBefore
  };

  public func getLeadReport(
    leads : List.List<LeadTypes.Lead>,
    filter : ReportTypes.LeadReportFilter,
  ) : ReportTypes.LeadReport {
    let items = leads.values().filter(func(l) {
      let matchDate = switch (filter.dateRange) {
        case null true;
        case (?dr) l.createdAt >= dr.fromTs and l.createdAt <= dr.toTs;
      };
      let matchUser = switch (filter.userId) {
        case null true;
        case (?u) l.assignedUserId == ?u;
      };
      let matchSource = switch (filter.source) {
        case null true;
        case (?s) l.source == ?s;
      };
      let matchCampaign = switch (filter.campaign) {
        case null true;
        case (?c) l.campaign == ?c;
      };
      matchDate and matchUser and matchSource and matchCampaign
    });
    var total = 0;
    var newCount = 0;
    var qualified = 0;
    var proposal = 0;
    var closedWon = 0;
    var closedLost = 0;
    items.forEach(func(l) {
      total += 1;
      switch (l.status) {
        case (#New) { newCount += 1 };
        case (#Interested) { qualified += 1 };
        case (#Proposal) { proposal += 1 };
        case (#ClosedWon) { closedWon += 1 };
        case (#ClosedLost) { closedLost += 1 };
      };
    });
    let conversionPercent = if (total == 0) 0 else (closedWon * 100) / total;
    {
      totalLeads = total;
      newLeads = newCount;
      qualified = qualified;
      proposalSent = proposal;
      closedWon = closedWon;
      closedLost = closedLost;
      conversionPercent = conversionPercent;
    }
  };
};
