
import { useEffect, useState } from "react";
import "./styles.css";
const STORAGE_KEY="goose-film-quest";
const regions=[{id:"early",title:"📽️ Early",color:"bg-teal-300",emoji:"🏡",tasks:["Lumière & Méliès","Brighton School"]},
{id:"fr",title:"🇫🇷 France",color:"bg-pink-300",emoji:"🛖",tasks:["Avant-garde","New Wave"]},
{id:"it",title:"🇮🇹 Italy",color:"bg-yellow-300",emoji:"🏰",tasks:["Neorealism","Political"]}];
export default function App(){const def=regions.map(r=>({id:r.id,tasks:r.tasks.map(t=>({text:t,done:false}))}));
const[d,setD]=useState(()=>{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):def});
useEffect(()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(d)),[d]);
const toggle=(id,idx)=>setD(p=>p.map(r=>r.id===id?{...r,tasks:r.tasks.map((t,i)=>i===idx?{...t,done:!t.done}:t)}:r));
const flat=d.flatMap(r=>r.tasks),done=flat.filter(t=>t.done).length,percent=Math.round(done/flat.length*100),pos=Math.min(regions.length-1,Math.floor(done/2));
return (<div className="min-h-screen p-4 bg-lime-50 flex flex-col items-center">
<h1 className="text-3xl font-bold mb-4">🦢 Goose Quest</h1>
<div className="w-full max-w-3xl mb-4 bg-gray-200 rounded-full h-3"><div className="bg-emerald-500 h-3 rounded-full" style={{width:`${percent}%`}}/></div>
<div className="grid gap-4" style={{gridTemplateColumns:`repeat(${regions.length},1fr)`}}>
{regions.map((r,i)=>(<div key={r.id} className={`relative p-4 rounded-xl shadow ${r.color}`}>
{i===pos&&<span className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">🦢</span>}
<h3 className="font-semibold mb-2 flex gap-1"><span>{r.emoji}</span>{r.title}</h3>
{d.find(x=>x.id===r.id).tasks.map((t,j)=>(<div key={j} onClick={()=>toggle(r.id,j)} className={`cursor-pointer ${t.done&&"line-through opacity-60"}`}>
<input type="checkbox" readOnly checked={t.done}/> {t.text}</div>))}
</div>))}
</div></div>);}
