import { beforeEach,describe,expect,it } from 'vitest';
import { repository } from './repository';
beforeEach(()=>repository.reset());
describe('repository workflow and simulated scope',()=>{
 it('limits non-admin records to Baramati',()=>{expect(repository.listChildren('Admin')).toHaveLength(60);expect(repository.listChildren('Block Officer')).toHaveLength(10);expect(repository.getTasks('Receiver')).toHaveLength(10);});
 it('creates consented departures and confirms a newly created task',()=>{expect(()=>repository.logDeparture({firstName:'Demo',ageBand:'6–8',sourceVillage:'Test',destination:'Baramati',services:['SCHOOL'],consent:false},'Field Worker')).toThrow();repository.logDeparture({firstName:'Demo',ageBand:'6–8',sourceVillage:'Test',destination:'Baramati',services:['SCHOOL','HOSTEL'],consent:true},'Field Worker');const tasks=repository.getTasks('Receiver').slice(-2);expect(tasks).toHaveLength(2);repository.updateTask(tasks[0].id,'confirmed','Receiver');expect(repository.getTasks('Block Officer').find(t=>t.id===tasks[0].id)?.state).toBe('CONFIRMED');});
 it('rejects unauthorized replies and out-of-scope tasks',()=>{expect(()=>repository.updateTask('t0','confirmed','Field Worker')).toThrow();expect(()=>repository.updateTask('t20','confirmed','Receiver')).toThrow();});
});
