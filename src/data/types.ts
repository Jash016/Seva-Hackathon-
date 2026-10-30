export type Service = 'SCHOOL' | 'ANGANWADI' | 'HOSTEL' | 'VACCINATION';
export type Role = 'Field Worker' | 'Receiver' | 'Supervisor' | 'Block Officer' | 'Admin';
export type State = 'NOTIFIED' | 'ACKNOWLEDGED' | 'CONFIRMED' | 'OVERDUE';
export type Reason = 'ADMIN_DELAY' | 'SERVICE_GAP' | 'CHANNEL_FAILURE' | 'FAMILY_MOVED' | 'NOT_IN_DIRECTORY';
export interface Child { id: string; firstName: string; ageBand: string; sourceVillage: string; sourceDistrict: string; destination: string; guardianConsent: { given: boolean; day: number }; seasonThreadId: string }
export interface Institution { id: string; name: string; type: Service; block: string; whatsappOk: boolean; smsOk: boolean; }
export interface Task { id: string; childId: string; institutionId: string; serviceType: Service; createdDay: number; acknowledgedDay?: number; confirmedDay?: number; problemDay?: number; state: State; rag: 'GREEN'|'AMBER'|'RED'|'GREY'; reasonCode?: Reason; escalationLevel: number; channelUsed: 'WHATSAPP'|'SMS'|'CALL_TASK'; }
export interface Event { id: string; who: string; what: string; day: number; taskId?: string }
export interface Rule { reminderDay: number; supervisorDay: number; blockOfficerDay: number }
export interface Database { children: Child[]; institutions: Institution[]; tasks: Task[]; events: Event[]; day: number; workedExample: boolean }
export const defaultRule: Rule = { reminderDay: 2, supervisorDay: 4, blockOfficerDay: 7 };
