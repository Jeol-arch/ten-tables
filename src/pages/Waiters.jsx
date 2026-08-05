import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Input, Modal, Confirm, FilterPanel, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import { Sel } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_WAITERS, INIT_TABLES } from "../data/seed";

export default function Waiters() {
  const [waiters, setWaiters] = useState(INIT_WAITERS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editWaiter, setEditWaiter] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [clockTarget, setClockTarget] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});
  const blank = { name:"", zone:"Oak Wood 1", availability:"Available", tables:[], status:"Clocked Out", clockIn:"—", clockOut:"—", totalOrders:0, avgResponse:"—" };
  const [form, setForm] = useState(blank);

  const openEdit = w => { setForm({ name:w.name, zone:w.zone, availability:w.availability, tables:[...w.tables], status:w.status, clockIn:w.clockIn, clockOut:w.clockOut, totalOrders:w.totalOrders, avgResponse:w.avgResponse }); setEditWaiter(w); setModalOpen(true); };
  const save = () => {
    if (!editWaiter) setWaiters(prev => [...prev, { id:Date.now(), ...form }]);
    else setWaiters(prev => prev.map(w => w.id===editWaiter.id ? { ...w, ...form } : w));
    setModalOpen(false); setEditWaiter(null);
  };
  const toggleClock = w => {
    const now = new Date().toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });
    setWaiters(prev => prev.map(x => x.id===w.id ? { ...x, status:x.status==="Clocked In"?"Clocked Out":"Clocked In", clockIn:x.status==="Clocked Out"?now:x.clockIn, clockOut:x.status==="Clocked In"?now:x.clockOut } : x));
    setClockTarget(null);
  };

  const filtered = waiters.filter(w => {
    const s = w.name.toLowerCase().includes(search.toLowerCase());
    return s && (!fv.zone || w.zone===fv.zone) && (!fv.availability || w.availability===fv.availability) && (!fv.status || w.status===fv.status);
  });

  const allTables = INIT_TABLES.map(t => `Table ${t.number}`);
  const toggleTable = t => setForm(f => ({ ...f, tables:f.tables.includes(t)?f.tables.filter(x=>x!==t):[...f.tables,t] }));

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[["Total Waiters",waiters.length,C.text],["Clocked In",waiters.filter(w=>w.status==="Clocked In").length,C.green],["Clocked Out",waiters.filter(w=>w.status==="Clocked Out").length,C.textSub],["Available",waiters.filter(w=>w.availability==="Available").length,C.blue]].map(([l,v,c]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Waiter Management" action={
        <div style={{ display:"flex", gap:8 }}>
          <Input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} icon="search" style={{ width:200 }} />
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({...fv}); setFilterOpen(v=>!v); }}>
              <Icon name="filter" size={14} />Filter{(fv.zone||fv.availability||fv.status)?" ●":""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"zone",label:"Zone",options:["Oak Wood 1","Oak Wood 2","Oak Wood 3"]},{key:"availability",label:"Availability",options:["Available","Unavailable"]},{key:"status",label:"Shift Status",options:["Clocked In","Clocked Out"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false);}} onReset={()=>{setPf({});setFv({});setFilterOpen(false);}} />}
          </div>
          <Btn variant="primary" size="sm" onClick={() => { setForm(blank); setEditWaiter(null); setModalOpen(true); }}><Icon name="plus" size={14} />Add Waiter</Btn>
        </div>
      }>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.borderLight }}>{["Name","Zone","Tables","Shift","Clock In","Clock Out","Orders","Avg Response","Actions"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {filtered.map(w => (
              <TR key={w.id}>
                <TD style={{ fontWeight:500, color:C.text }}>{w.name}</TD>
                <TD style={{ color:C.textSub, fontSize:12 }}>{w.zone}</TD>
                <TD><div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>{w.tables.map(t => <span key={t} style={{ fontSize:10, padding:"1px 6px", background:C.primaryLight, color:C.primary, borderRadius:4, fontWeight:500 }}>{t}</span>)}{w.tables.length===0 && <span style={{ color:C.textMuted, fontSize:11 }}>None</span>}</div></TD>
                <TD><Badge color={statusColor(w.status)}>{w.status}</Badge></TD>
                <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{w.clockIn}</TD>
                <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{w.clockOut}</TD>
                <TD style={{ fontWeight:500 }}>{w.totalOrders}</TD>
                <TD style={{ color:C.textSub, fontSize:12 }}>{w.avgResponse}</TD>
                <TD>
                  <div style={{ display:"flex", gap:5 }}>
                    <button onClick={() => setClockTarget(w)} style={{ fontSize:12, color:w.status==="Clocked In"?C.red:C.green, background:w.status==="Clocked In"?C.redBg:C.greenBg, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer", fontFamily:"inherit" }}>{w.status==="Clocked In"?"Clock Out":"Clock In"}</button>
                    <button onClick={() => openEdit(w)} style={{ fontSize:12, color:C.textSub, background:C.borderLight, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>Edit</button>
                    <button onClick={() => setDeleteTarget(w)} style={{ fontSize:12, color:C.red, background:C.redBg, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>Delete</button>
                  </div>
                </TD>
              </TR>
            ))}
          </tbody>
        </table>
        <Pager count={filtered.length} />
      </SectionCard>

      {modalOpen && (
        <Modal title={editWaiter ? "Edit — "+editWaiter.name : "Add New Waiter"} onClose={() => { setModalOpen(false); setEditWaiter(null); }} width={460}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Full Name *</div><Input placeholder="Enter full name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} style={{ width:"100%" }} /></div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Zone</div><Sel value={form.zone} onChange={v=>setForm(f=>({...f,zone:v}))} options={["Oak Wood 1","Oak Wood 2","Oak Wood 3"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:8 }}>Assign Tables</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {allTables.map(t => { const on = form.tables.includes(t); return <button key={t} onClick={() => toggleTable(t)} style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${on?C.primary:C.border}`, background:on?C.primaryLight:"transparent", color:on?C.primary:C.textSub, fontSize:12, fontWeight:on?600:400, cursor:"pointer", fontFamily:"inherit" }}>{t}</button>; })}
              </div>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:8 }}>Availability</div>
              <div style={{ display:"flex", gap:12 }}>
                {["Available","Unavailable"].map(a => <label key={a} style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", fontSize:13 }}><input type="radio" name="avail" checked={form.availability===a} onChange={() => setForm(f=>({...f,availability:a}))} /><Badge color={a==="Available"?"green":"red"}>{a}</Badge></label>)}
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => { setModalOpen(false); setEditWaiter(null); }}>Cancel</Btn>
              <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} disabled={!form.name.trim()} onClick={save}>{editWaiter?"Save Changes":"Add Waiter"}</Btn>
            </div>
          </div>
        </Modal>
      )}

      {clockTarget && <Confirm title={clockTarget.status==="Clocked In"?"Clock Out?":"Clock In?"} message={`This will ${clockTarget.status==="Clocked In"?"end":"start"} ${clockTarget.name}'s shift and record the timestamp.`} confirmLabel={clockTarget.status==="Clocked In"?"Clock Out":"Clock In"} confirmVariant={clockTarget.status==="Clocked In"?"danger":"success"} onConfirm={() => toggleClock(clockTarget)} onCancel={() => setClockTarget(null)} />}
      {deleteTarget && <Confirm message={`This will permanently remove ${deleteTarget.name} from the system.`} onConfirm={() => { setWaiters(p => p.filter(w => w.id!==deleteTarget.id)); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}
