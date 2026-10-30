import { defaultRule, type Task, type Rule } from './types';
// Pure evaluation: the virtual day is the only clock. Replies in the future have no effect.
export function evaluate(tasks: Task[], rule: Rule = defaultRule, currentDay: number): Task[] {
 return tasks.map(task => {
 const age = currentDay-task.createdDay;
 const confirmed = task.confirmedDay !== undefined && task.confirmedDay <= currentDay;
 const acknowledged = task.acknowledgedDay !== undefined && task.acknowledgedDay <= currentDay;
 const problem = task.problemDay !== undefined && task.problemDay <= currentDay;
 const level = confirmed || age < rule.reminderDay ? 0 : age >= rule.blockOfficerDay ? 3 : age >= rule.supervisorDay ? 2 : 1;
 return {...task, state: confirmed ? 'CONFIRMED' : acknowledged ? 'ACKNOWLEDGED' : age >= rule.supervisorDay || problem ? 'OVERDUE' : 'NOTIFIED', rag: confirmed ? 'GREEN' : acknowledged ? 'AMBER' : age >= rule.supervisorDay || problem ? 'RED' : 'GREY', escalationLevel: level, reasonCode: confirmed ? undefined : task.reasonCode === 'NOT_IN_DIRECTORY' ? 'NOT_IN_DIRECTORY' : task.channelUsed === 'CALL_TASK' ? 'CHANNEL_FAILURE' : problem || (!acknowledged && age >= rule.supervisorDay) ? 'SERVICE_GAP' : acknowledged ? 'ADMIN_DELAY' : undefined };
 });
}
