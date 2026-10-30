import { makeSeed } from './seed';
import { evaluate } from './engine';
import type { Database, Role, Service } from './types';
const KEY='setu-demo-v1';
function load(): Database {try {const raw=localStorage.getItem(KEY); if(raw){const db=JSON.parse(raw);if(Array.isArray(db.children)&&Array.isArray(db.tasks)&&Array.isArray(db.events)&&Array.isArray(db.institutions)&&typeof db.day==='number')return db;}}catch{} return makeSeed();}
let db=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));}catch{/* Memory fallback in restricted browsers. */}}
function log(who:string,what:string,taskId?:string){db.events.push({id:crypto.randomUUID(),who,what,day:db.day,taskId});}
// All data access goes through this boundary. Replace this implementation with an API adapter.
export const repository={
 snapshot:()=>structuredClone(db),
 listChildren:(role:Role)=>structuredClone(db.children.filter(c=>role==='Admin'||c.destination==='Baramati')),
 getTasks:(role:Role)=>{const allowed=new Set(repository.listChildren(role).map(c=>c.id));return evaluate(db.tasks,undefined,db.day).filter(t=>allowed.has(t.childId)&&t.createdDay<=db.day);},
 setDay:(day:number)=>{const previous=evaluate(db.tasks,undefined,db.day); db.day=Math.max(0,Math.min(14,day));const next=evaluate(db.tasks,undefined,db.day);next.forEach((t,i)=>{if(t.escalationLevel>previous[i].escalationLevel)log('Silence Detector',`Escalation level ${t.escalationLevel} · ${t.serviceType}`,t.id);});log('Demo clock',`Moved to day ${db.day}`);save();},
 updateTask:(id:string,reply:'received'|'confirmed'|'problem',role:Role)=>{if(role!=='Receiver')throw Error('Only a receiver can reply.');if(!repository.getTasks(role).some(t=>t.id===id))throw Error('Outside your institution scope.'); const t=db.tasks.find(t=>t.id===id)!;if(reply==='confirmed')t.confirmedDay=db.day;else if(reply==='received')t.acknowledgedDay=db.day;else t.problemDay=db.day;log(role,`Reply: ${reply}`,id);save();},
 logDeparture:(input:{firstName:string;ageBand:string;sourceVillage:string;destination:string;services:Service[];consent:boolean},role:Role)=>{if(role!=='Field Worker')throw Error('Field Worker role required.');if(!input.consent||!input.firstName.trim()||!input.sourceVillage.trim()||!input.services.length)throw Error('Complete required fields and guardian consent.');const id=crypto.randomUUID();db.children.push({id,firstName:input.firstName.trim().split(/\s+/)[0],ageBand:input.ageBand,sourceVillage:input.sourceVillage,sourceDistrict:'Beed',destination:input.destination,guardianConsent:{given:true,day:db.day},seasonThreadId:`season-${id}`}); input.services.forEach(service=>{const institution=db.institutions.find(i=>i.block===input.destination&&i.type===service);const channel=institution?.whatsappOk?'WHATSAPP':institution?.smsOk?'SMS':'CALL_TASK';db.tasks.push({id:crypto.randomUUID(),childId:id,institutionId:institution?.id??'unlisted',serviceType:service,createdDay:db.day,state:'NOTIFIED',rag:'GREY',escalationLevel:0,channelUsed:channel,reasonCode:institution?undefined:'NOT_IN_DIRECTORY'});});log(role,`Departure recorded for ${input.firstName.trim().split(/\s+/)[0]}`);save();},
 reset:()=>{db=makeSeed();save();}
};
