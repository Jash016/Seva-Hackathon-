import { describe,it,expect } from 'vitest';
import { evaluate } from './engine';
import { makeSeed } from './seed';
describe('Silence Detector',()=>{
 it('replays the worked example at days 0, 2, 7, 9 and 10',()=>{const tasks=makeSeed().tasks.slice(0,2);expect(evaluate(tasks,undefined,0).map(t=>t.state)).toEqual(['NOTIFIED','NOTIFIED']);expect(evaluate(tasks,undefined,2)[0].rag).toBe('AMBER');expect(evaluate(tasks,undefined,7).map(t=>t.rag)).toEqual(['AMBER','RED']);expect(evaluate(tasks,undefined,9)[1].state).toBe('CONFIRMED');expect(evaluate(tasks,undefined,10).every(t=>t.state==='CONFIRMED')).toBe(true);});
 it('uses day 2 / 4 / 7 escalation boundaries and clears confirmed alerts',()=>{const t={...makeSeed().tasks[1],confirmedDay:undefined};expect([1,2,4,7].map(d=>evaluate([t],undefined,d)[0].escalationLevel)).toEqual([0,1,2,3]);expect(evaluate([{...t,confirmedDay:8}],undefined,8)[0].escalationLevel).toBe(0);});
 it('respects custom thresholds and does not mutate input',()=>{const tasks=makeSeed().tasks;const before=JSON.stringify(tasks);expect(evaluate(tasks,{reminderDay:3,supervisorDay:6,blockOfficerDay:9},4)[1].rag).toBe('GREY');expect(JSON.stringify(tasks)).toBe(before);});
});
