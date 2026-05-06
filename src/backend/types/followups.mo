import CommonTypes "common";

module {
  public type FollowUp = {
    id : Nat;
    leadId : Nat;
    scheduledDate : Text;
    scheduledTime : Text;
    notes : ?Text;
    reminderEnabled : Bool;
    isCompleted : Bool;
    completionNotes : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateFollowUpInput = {
    leadId : Nat;
    scheduledDate : Text;
    scheduledTime : Text;
    notes : ?Text;
    reminderEnabled : Bool;
  };

  public type UpdateFollowUpInput = {
    id : Nat;
    scheduledDate : ?Text;
    scheduledTime : ?Text;
    notes : ?Text;
    reminderEnabled : ?Bool;
    isCompleted : ?Bool;
    completionNotes : ?Text;
  };
}
