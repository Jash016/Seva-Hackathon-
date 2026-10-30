import type { Database, Service } from './types';
const services: Service[] = ['SCHOOL','ANGANWADI','HOSTEL','VACCINATION'];
export function makeSeed(): Database {
 const destinations=['Baramati','Satara','Sangli','Kolhapur','Solapur','Ahmednagar'];
 const names=['Asha','Rohan','Meera','Aarav','Kavya','Ishaan','Sana','Vihaan','Anaya','Kabir','Gauri','Dev'];
 const institutions=Array.from({length:30},(_,i)=>({id:`i${i}`,name:`${['Zilla Parishad School','Anganwadi Centre','Seasonal Hostel','Primary Health Centre'][i%4]} ${i+1}`,type:services[i%4],block:destinations[Math.floor(i/4)%6],whatsappOk:i%7!==0,smsOk:i%11!==0}));
 institutions[0].whatsappOk=true; institutions[1].whatsappOk=true;
 const children=Array.from({length:60},(_,i)=>({id:`c${i}`,firstName:i===1?'Rohan':names[i%12],ageBand:i===0?'6–8':i===1?'3–5':['6–8','9–11','12–14','3–5'][i%4],sourceVillage:i===1?'Georai':['Georai','Ambad','Pathardi'][i%3],sourceDistrict:i===1?'Beed':['Beed','Jalna','Ahmednagar'][i%3],destination:destinations[Math.floor(i/10)],guardianConsent:{given:true,day:0},seasonThreadId:`season-${i}`}));
 const tasks=children.map((child,i)=>({id:`t${i}`,childId:child.id,institutionId:`i${i<2?i:(Math.floor(i/10)*4+i%4)%30}`,serviceType:services[i<2?i:i%4],createdDay:0,acknowledgedDay:i===0?2:i===1?undefined:i%3===0?1:undefined,confirmedDay:i===0?10:i===1?9:i%3===0?3:undefined,state:'NOTIFIED' as const,rag:'GREY' as const,escalationLevel:0,channelUsed:institutions[i<2?i:(Math.floor(i/10)*4+i%4)%30].whatsappOk?'WHATSAPP' as const:institutions[i<2?i:(Math.floor(i/10)*4+i%4)%30].smsOk?'SMS' as const:'CALL_TASK' as const}));
 return {children,institutions,tasks,events:[{id:'seed',who:'Demo',what:'Fictional season opened. Worked example replies scheduled for days 2, 9 and 10.',day:0}],day:7,workedExample:true};
}
