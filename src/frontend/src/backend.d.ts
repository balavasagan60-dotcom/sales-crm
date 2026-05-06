import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface LogCallInput {
    duration?: bigint;
    callStatus: CallStatus;
    leadId: bigint;
    notes?: string;
    callTimestamp: Timestamp;
    details?: CallDetails;
    outcome?: CallOutcome;
}
export interface CreateLeadInput {
    status: LeadStatus;
    source?: string;
    campaign?: string;
    name: string;
    email?: string;
    notes?: string;
    productInterest?: string;
    priority: Priority;
    phone: string;
    assignedUserId?: UserId;
    altPhone?: string;
}
export interface AgriDetails {
    subType: AgriSubType;
    subsidyFields?: SubsidyFields;
    saleFields?: SaleFields;
}
export interface LeadFilter {
    status?: LeadStatus;
    source?: string;
    campaign?: string;
    searchText?: string;
    priority?: Priority;
    assignedUserId?: UserId;
}
export interface UserInfo {
    id: Principal;
    name: string;
    role: string;
}
export interface Lead {
    id: bigint;
    status: LeadStatus;
    source?: string;
    campaign?: string;
    name: string;
    createdAt: Timestamp;
    email?: string;
    updatedAt: Timestamp;
    notes?: string;
    productInterest?: string;
    priority: Priority;
    phone: string;
    assignedUserId?: UserId;
    altPhone?: string;
}
export interface LeadReportFilter {
    source?: string;
    campaign?: string;
    userId?: UserId;
    dateRange?: DateRange;
}
export interface Campaign {
    id: bigint;
    endDate?: string;
    source?: string;
    name: string;
    isActive: boolean;
    budget?: bigint;
    startDate?: string;
}
export interface SaleFields {
    productCategoryId: bigint;
    productId: bigint;
    priority: Priority;
    place?: string;
    followUpDate?: Timestamp;
}
export interface Source {
    id: bigint;
    name: string;
    isActive: boolean;
}
export interface LeadReport {
    closedWon: bigint;
    totalLeads: bigint;
    proposalSent: bigint;
    newLeads: bigint;
    conversionPercent: bigint;
    qualified: bigint;
    closedLost: bigint;
}
export interface ProductCategory {
    id: bigint;
    name: string;
    isActive: boolean;
}
export type CallDetails = {
    __kind__: "Agri";
    Agri: AgriDetails;
} | {
    __kind__: "CivilEquip";
    CivilEquip: SaleFields;
} | {
    __kind__: "IndustrialEquip";
    IndustrialEquip: SaleFields;
};
export interface CallLog {
    id: bigint;
    duration?: bigint;
    callStatus: CallStatus;
    createdAt: Timestamp;
    callerId: UserId;
    leadId: bigint;
    notes?: string;
    callTimestamp: Timestamp;
    details?: CallDetails;
    outcome?: CallOutcome;
}
export interface CallReportFilter {
    userId?: UserId;
    dateRange?: DateRange;
}
export interface CallReport {
    switchOffCount: bigint;
    totalDurationSecs: bigint;
    totalCalls: bigint;
    interestedCount: bigint;
    notReachableCount: bigint;
    notConnectedCalls: bigint;
    connectedCalls: bigint;
    notInterestedCount: bigint;
}
export type UserId = Principal;
export interface DateRange {
    toTs: Timestamp;
    fromTs: Timestamp;
}
export interface UpdateFollowUpInput {
    id: bigint;
    isCompleted?: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
    reminderEnabled?: boolean;
    notes?: string;
    completionNotes?: string;
}
export interface CreateFollowUpInput {
    scheduledDate: string;
    scheduledTime: string;
    reminderEnabled: boolean;
    leadId: bigint;
    notes?: string;
}
export interface SubsidyFields {
    productCategoryId: bigint;
    division?: string;
    productId: bigint;
    district: string;
    docStatus: DocStatus;
    village: string;
    block: string;
    farmerName: string;
}
export interface FollowUp {
    id: bigint;
    isCompleted: boolean;
    scheduledDate: string;
    scheduledTime: string;
    createdAt: Timestamp;
    reminderEnabled: boolean;
    leadId: bigint;
    notes?: string;
    completionNotes?: string;
}
export interface UpdateLeadInput {
    id: bigint;
    status?: LeadStatus;
    source?: string;
    campaign?: string;
    name?: string;
    email?: string;
    notes?: string;
    productInterest?: string;
    priority?: Priority;
    phone?: string;
    assignedUserId?: UserId;
    altPhone?: string;
}
export interface Branch {
    id: bigint;
    name: string;
    isActive: boolean;
}
export interface Product {
    id: bigint;
    categoryId: bigint;
    name: string;
    isActive: boolean;
}
export enum AgriSubType {
    Sale = "Sale",
    Subsidy = "Subsidy"
}
export enum CallOutcome {
    NotReachable = "NotReachable",
    SwitchOff = "SwitchOff",
    Interested = "Interested",
    NotInterested = "NotInterested"
}
export enum CallStatus {
    Connected = "Connected",
    NotConnected = "NotConnected"
}
export enum DocStatus {
    Collected = "Collected",
    Pending = "Pending"
}
export enum FollowUpFilter {
    Missed = "Missed",
    Today = "Today",
    Completed = "Completed",
    Upcoming = "Upcoming"
}
export enum LeadStatus {
    New = "New",
    Proposal = "Proposal",
    ClosedWon = "ClosedWon",
    Interested = "Interested",
    ClosedLost = "ClosedLost"
}
export enum Priority {
    Hot = "Hot",
    Cold = "Cold",
    Warm = "Warm"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBranch(name: string): Promise<Branch>;
    addCampaign(input: Campaign): Promise<Campaign>;
    addLead(input: CreateLeadInput): Promise<Lead>;
    addProduct(categoryId: bigint, name: string): Promise<Product>;
    addProductCategory(name: string): Promise<ProductCategory>;
    addSource(name: string): Promise<Source>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignLead(id: bigint, userId: UserId): Promise<boolean>;
    assignUserRole(user: Principal, role: string): Promise<void>;
    deleteBranch(id: bigint): Promise<boolean>;
    deleteCampaign(id: bigint): Promise<boolean>;
    deleteFollowUp(id: bigint): Promise<boolean>;
    deleteLead(id: bigint): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    deleteProductCategory(id: bigint): Promise<boolean>;
    deleteSource(id: bigint): Promise<boolean>;
    getCallReport(filter: CallReportFilter): Promise<CallReport>;
    getCallerUserProfile(): Promise<UserInfo | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallsForLead(leadId: bigint): Promise<Array<CallLog>>;
    getFollowUpsForLead(leadId: bigint): Promise<Array<FollowUp>>;
    getLeadById(id: bigint): Promise<Lead | null>;
    getLeadReport(filter: LeadReportFilter): Promise<LeadReport>;
    getUserProfile(user: Principal): Promise<UserInfo | null>;
    isCallerAdmin(): Promise<boolean>;
    listBranches(): Promise<Array<Branch>>;
    listCampaigns(): Promise<Array<Campaign>>;
    listLeads(filter: LeadFilter | null): Promise<Array<Lead>>;
    listProductCategories(): Promise<Array<ProductCategory>>;
    listProducts(categoryId: bigint | null): Promise<Array<Product>>;
    listSources(): Promise<Array<Source>>;
    listUsers(): Promise<Array<UserInfo>>;
    logCall(input: LogCallInput): Promise<CallLog>;
    logFollowUp(input: CreateFollowUpInput): Promise<FollowUp>;
    queryFollowUps(filterType: FollowUpFilter): Promise<Array<FollowUp>>;
    saveCallerUserProfile(name: string): Promise<void>;
    updateBranch(id: bigint, name: string): Promise<boolean>;
    updateCampaign(input: Campaign): Promise<boolean>;
    updateFollowUpStatus(input: UpdateFollowUpInput): Promise<boolean>;
    updateLead(input: UpdateLeadInput): Promise<boolean>;
    updateProduct(id: bigint, name: string): Promise<boolean>;
    updateProductCategory(id: bigint, name: string): Promise<boolean>;
    updateSource(id: bigint, name: string): Promise<boolean>;
}
