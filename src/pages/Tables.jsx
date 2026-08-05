import { useState } from "react";
import { C } from "../tokens";
import { Badge, Btn, Modal, FilterPanel, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import { Input, Sel, Confirm } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_TABLES } from "../data/seed";

export default function Tables() {
  const [tables, setTables] = useState(INIT_TABLES);
  const [filterStatus, setFilterStatus] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [qrTable, setQrTable] = useState(null);
  const [mergeOpen, setMergeOpen] = useState(false);
  const [migrateOpen, setMigrateOpen] = useState(false);
  const [migrateFrom, setMigrateFrom] = useState(null);
  const [migrateTo, setMigrateTo] = useState("");
  const [mergeSelected, setMergeSelected] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});
  const blank = { number:"", type:"2 seater", capacity:2, zone:"Oak Wood 1" };
  const [form, setForm] = useState(blank);

  const statusColor = s => ({ Vacant:"green", Occupied:"blue", "Pending Payment":"amber" }[s] || "gray");
  const displayed = tables.filter(t => (filterStatus==="All" || t.status===filterStatus) && (!fv.zone || t.zone===fv.zone));

  const openEdit = t => { setForm({ number:t.number, type:t.type, capacity:t.capacity, zone:t.zone }); setEditTable(t); setAddOpen(true); };
  const saveTable = () => {
    if (!editTable) setTables(prev => [...prev, { id:`T${Date.now()}`, ...form, status:"Vacant", mergedWith:[] }]);
    else setTables(prev => prev.map(t => t.id===editTable.id ? { ...t, ...form } : t));
    setAddOpen(false); setEditTable(null);
  };
  const doMerge = () => {
    const [master, ...rest] = mergeSelected;
    setTables(prev => prev.map(t => {
      if (t.id===master) return { ...t, mergedWith:[...t.mergedWith,...rest] };
      if (rest.includes(t.id)) return { ...t, status:"Occupied", mergedWith:[master] };
      return t;
    }));
    setMergeSelected([]); setMergeOpen(false);
  };
  const doMigrate = () => {
    if (!migrateFrom || !migrateTo) return;
    setTables(prev => prev.map(t => {
      if (t.id===migrateFrom.id) return { ...t, status:"Vacant", mergedWith:[] };
      if (t.id===migrateTo) return { ...t, status:"Occupied" };
      return t;
    }));
    setMigrateOpen(false); setMigrateFrom(null); setMigrateTo("");
  };

  return (
    <div style={{ padding:28 }}>
      {mergeSelected.length > 0 && (
        <div style={{ background:C.primaryLight, border:`1px solid ${C.primary}`, borderRadius:10, padding:"12px 18px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:13, color:C.primary, fontWeight:500 }}>{mergeSelected.length} table{mergeSelected.length>1?"s":""} selected</span>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="secondary" size="sm" onClick={() => setMergeSelected([])}>Clear</Btn>
            <Btn variant="primary" size="sm" disabled={mergeSelected.length < 2} onClick={() => setMergeOpen(true)}>Merge Tables</Btn>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[["Total",tables.length,C.text],["Vacant",tables.filter(t=>t.status==="Vacant").length,C.green],["Occupied",tables.filter(t=>t.status==="Occupied").length,C.blue],["Pending Pay",tables.filter(t=>t.status==="Pending Payment").length,C.amber]].map(([l,v,c]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Tables" action={
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:2, background:C.borderLight, borderRadius:8, padding:3 }}>
            {["All","Vacant","Occupied","Pending Payment"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding:"4px 9px", borderRadius:6, border:"none", background:filterStatus===s?C.surface:"transparent", color:filterStatus===s?C.text:C.textSub, fontSize:12, fontWeight:filterStatus===s?600:400, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>{s}</button>
            ))}
          </div>
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({...fv}); setFilterOpen(v=>!v); }}>
              <Icon name="filter" size={14} />Filter{fv.zone?" ●":""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"zone",label:"Zone",options:["Oak Wood 1","Oak Wood 2","Oak Wood 3"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false);}} onReset={()=>{setPf({});setFv({});setFilterOpen(false);}} />}
          </div>
          <Btn variant="secondary" size="sm" onClick={() => { setMigrateFrom(null); setMigrateOpen(true); }}><Icon name="migrate" size={14} />Migrate Session</Btn>
          <Btn variant="primary" size="sm" onClick={() => { setForm(blank); setEditTable(null); setAddOpen(true); }}><Icon name="plus" size={14} />Add Table</Btn>
        </div>
      }>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.borderLight }}>{["","Table","Type","Cap","Zone","Status","Merged With","Actions"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {displayed.map(table => (
              <TR key={table.id}>
                <TD><input type="checkbox" checked={mergeSelected.includes(table.id)} onChange={() => setMergeSelected(s => s.includes(table.id)?s.filter(x=>x!==table.id):[...s,table.id])} style={{ cursor:"pointer", accentColor:C.primary }} /></TD>
                <TD style={{ fontWeight:600, color:C.primary }}>Table {table.number}</TD>
                <TD style={{ color:C.textSub }}>{table.type}</TD>
                <TD style={{ color:C.textSub }}>{table.capacity}</TD>
                <TD style={{ color:C.textSub }}>{table.zone}</TD>
                <TD><Badge color={statusColor(table.status)}>{table.status}</Badge></TD>
                <TD>{table.mergedWith.length>0 ? <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{table.mergedWith.map(mid => { const mt = tables.find(t=>t.id===mid); return mt ? <span key={mid} style={{ fontSize:11, padding:"2px 6px", background:C.purpleBg, color:C.purple, borderRadius:4 }}>T{mt.number}</span> : null; })}</div> : <span style={{ color:C.textMuted, fontSize:12 }}>—</span>}</TD>
                <TD>
                  <div style={{ display:"flex", gap:5 }}>
                    <button onClick={() => setQrTable(table)} style={{ fontSize:12, color:C.primary, background:C.primaryLight, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>QR</button>
                    <button onClick={() => openEdit(table)} style={{ fontSize:12, color:C.textSub, background:C.borderLight, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>Edit</button>
                    <button onClick={() => { setMigrateFrom(table); setMigrateOpen(true); }} style={{ fontSize:12, color:C.purple, background:C.purpleBg, border:"none", borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>Migrate</button>
                  </div>
                </TD>
              </TR>
            ))}
          </tbody>
        </table>
        <Pager count={displayed.length} />
      </SectionCard>

      {addOpen && (
        <Modal title={editTable ? "Edit Table "+editTable.number : "Add New Table"} onClose={() => { setAddOpen(false); setEditTable(null); }} width={420}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Table Number *</div><Input placeholder="e.g. 09" value={form.number} onChange={e => setForm(f=>({...f,number:e.target.value}))} style={{ width:"100%" }} /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Seating Type</div><Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["2 seater","4 seater","6 seater","8 seater","10 seater"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Capacity</div><Input placeholder="4" type="number" value={form.capacity} onChange={e => setForm(f=>({...f,capacity:e.target.value}))} style={{ width:"100%" }} /></div>
            </div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Zone</div><Sel value={form.zone} onChange={v=>setForm(f=>({...f,zone:v}))} options={["Oak Wood 1","Oak Wood 2","Oak Wood 3"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => { setAddOpen(false); setEditTable(null); }}>Cancel</Btn>
              <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} disabled={!form.number.trim()} onClick={saveTable}>{editTable?"Save Changes":"Create Table"}</Btn>
            </div>
          </div>
        </Modal>
      )}

      {mergeOpen && (
        <Modal title="Merge Tables" onClose={() => setMergeOpen(false)} width={460}>
          <div style={{ padding:12, background:C.amberBg, borderRadius:8, fontSize:13, color:C.amber, marginBottom:16 }}>⚠️ Tables share one bill and cannot be unmerged while there is an unpaid balance.</div>
          <div style={{ fontWeight:500, fontSize:13, color:C.text, marginBottom:8 }}>Tables to merge:</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
            {mergeSelected.map((id, idx) => { const t = tables.find(x=>x.id===id); return t ? <div key={id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:idx===0?C.primaryLight:C.bg, borderRadius:8, border:`1px solid ${idx===0?C.primary:C.border}` }}><div><span style={{ fontWeight:600, color:idx===0?C.primary:C.text }}>Table {t.number}</span>{idx===0&&<span style={{ fontSize:11, color:C.primary, marginLeft:8, background:"rgba(37,99,235,.1)", padding:"1px 6px", borderRadius:4 }}>Master</span>}<span style={{ fontSize:12, color:C.textSub, marginLeft:8 }}>{t.type} · {t.zone}</span></div><Badge color={statusColor(t.status)}>{t.status}</Badge></div> : null; })}
          </div>
          <div style={{ fontSize:12, color:C.textSub, marginBottom:16 }}>First selected table becomes the master. All orders consolidate under it.</div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => setMergeOpen(false)}>Cancel</Btn>
            <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} onClick={doMerge}>Confirm Merge</Btn>
          </div>
        </Modal>
      )}

      {migrateOpen && (
        <Modal title="Migrate Table Session" subtitle="Move an active session to a different physical table" onClose={() => { setMigrateOpen(false); setMigrateFrom(null); }} width={440}>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Migrate FROM (active table)</div>
            <Sel value={migrateFrom?.id||""} onChange={v => setMigrateFrom(tables.find(t=>t.id===v)||null)} options={[{value:"",label:"Select source table..."},...tables.filter(t=>t.status==="Occupied"||t.status==="Pending Payment").map(t=>({value:t.id,label:`Table ${t.number} — ${t.status}`}))]} style={{ width:"100%" }} />
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Migrate TO (vacant table)</div>
            <Sel value={migrateTo} onChange={setMigrateTo} options={[{value:"",label:"Select destination table..."},...tables.filter(t=>t.status==="Vacant"&&(!migrateFrom||t.id!==migrateFrom.id)).map(t=>({value:t.id,label:`Table ${t.number} — ${t.type} · ${t.zone}`}))]} style={{ width:"100%" }} />
          </div>
          <div style={{ padding:12, background:C.blueBg, borderRadius:8, fontSize:12.5, color:C.blue, marginBottom:16 }}>ℹ️ All orders and session data transfer to the destination. Source table is marked Vacant.</div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => { setMigrateOpen(false); setMigrateFrom(null); }}>Cancel</Btn>
            <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} disabled={!migrateFrom||!migrateTo} onClick={doMigrate}>Migrate Session</Btn>
          </div>
        </Modal>
      )}

      {qrTable && (
        <Modal title={`QR Code — Table ${qrTable.number}`} onClose={() => setQrTable(null)} width={340}>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:160, height:160, margin:"0 auto 16px", background:"#000", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", padding:14 }}>
              <svg viewBox="0 0 100 100" width="132" height="132">
                {[...Array(10)].map((_,r) => [...Array(10)].map((_,c) => { const on=((r+c+r*c)%3===0)||(r<3&&c<3)||(r<3&&c>6)||(r>6&&c<3); return on?<rect key={`${r}-${c}`} x={c*10} y={r*10} width={9} height={9} fill="white"/>:null; }))}
              </svg>
            </div>
            <div style={{ fontWeight:700, fontSize:16, color:C.text }}>Table {qrTable.number}</div>
            <div style={{ fontSize:12, color:C.textSub, marginTop:4 }}>{qrTable.type} · {qrTable.zone}</div>
            <Btn variant="primary" style={{ width:"100%", justifyContent:"center", marginTop:20 }}><Icon name="printer" size={14} />Print QR Code</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
