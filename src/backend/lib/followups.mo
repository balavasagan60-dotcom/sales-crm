import List "mo:core/List";
import CommonTypes "../types/common";
import FollowUpTypes "../types/followups";

module {
  public func createFollowUp(
    followUps : List.List<FollowUpTypes.FollowUp>,
    nextId : Nat,
    input : FollowUpTypes.CreateFollowUpInput,
    now : CommonTypes.Timestamp,
  ) : FollowUpTypes.FollowUp {
    let fu : FollowUpTypes.FollowUp = {
      id = nextId;
      leadId = input.leadId;
      scheduledDate = input.scheduledDate;
      scheduledTime = input.scheduledTime;
      notes = input.notes;
      reminderEnabled = input.reminderEnabled;
      isCompleted = false;
      completionNotes = null;
      createdAt = now;
    };
    followUps.add(fu);
    fu
  };

  public func updateFollowUp(
    followUps : List.List<FollowUpTypes.FollowUp>,
    input : FollowUpTypes.UpdateFollowUpInput,
  ) : Bool {
    var found = false;
    followUps.mapInPlace(func(f) {
      if (f.id == input.id) {
        found := true;
        {
          f with
          scheduledDate = switch (input.scheduledDate) { case (?v) v; case null f.scheduledDate };
          scheduledTime = switch (input.scheduledTime) { case (?v) v; case null f.scheduledTime };
          notes = switch (input.notes) { case (?v) ?v; case null f.notes };
          reminderEnabled = switch (input.reminderEnabled) { case (?v) v; case null f.reminderEnabled };
          isCompleted = switch (input.isCompleted) { case (?v) v; case null f.isCompleted };
          completionNotes = switch (input.completionNotes) { case (?v) ?v; case null f.completionNotes };
        }
      } else { f }
    });
    found
  };

  public func deleteFollowUp(
    followUps : List.List<FollowUpTypes.FollowUp>,
    id : Nat,
  ) : Bool {
    let sizeBefore = followUps.size();
    let filtered = followUps.filter(func(f) { f.id != id });
    followUps.clear();
    followUps.append(filtered);
    followUps.size() < sizeBefore
  };

  public func getFollowUpsForLead(
    followUps : List.List<FollowUpTypes.FollowUp>,
    leadId : Nat,
  ) : [FollowUpTypes.FollowUp] {
    followUps.filter(func(f) { f.leadId == leadId }).toArray()
  };

  public func queryFollowUps(
    followUps : List.List<FollowUpTypes.FollowUp>,
    filterType : CommonTypes.FollowUpFilter,
    now : CommonTypes.Timestamp,
  ) : [FollowUpTypes.FollowUp] {
    let nanosPerDay : Int = 86_400_000_000_000;
    let todayDay : Int = now / nanosPerDay;
    let today = dateTextFromDay(todayDay);
    let items = followUps.values().filter(func(f) {
      switch (filterType) {
        case (#Completed) { f.isCompleted };
        case (#Today) {
          not f.isCompleted and f.scheduledDate == today
        };
        case (#Missed) {
          not f.isCompleted and f.scheduledDate < today
        };
        case (#Upcoming) {
          not f.isCompleted and f.scheduledDate > today
        };
      }
    });
    items.toArray()
  };

  // Convert day count (ns / nsPerDay) to YYYY-MM-DD text (proleptic Gregorian)
  func dateTextFromDay(daysSinceEpoch : Int) : Text {
    let z = daysSinceEpoch + 719468;
    let era = if (z >= 0) z / 146097 else (z - 146096) / 146097;
    let doe = z - era * 146097;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if (mp < 10) mp + 3 else mp - 9;
    let yr = if (m <= 2) y + 1 else y;
    let yText = yr.toText();
    let mText = if (m < 10) "0" # m.toText() else m.toText();
    let dText = if (d < 10) "0" # d.toText() else d.toText();
    yText # "-" # mText # "-" # dText
  };
};
