import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Input, Modal, Confirm, FilterPanel, Pager, TH, TD, TR, SectionCard, InfoRow } from "../components/UI";
import Icon from "../components/Icon";
import { Sel } from "../components/UI";
import { INIT_ORDERS } from "../data/seed";

const LIFECYCLE = ["Preparing","Ready","Served","Paid"];

export default function Orders() {
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [markOpen, setMarkOpen] = useState(false);
  const [mergeOpen, setMergeOpen] = useState(false);
  const [mergeTargets, setMergeTargets] = useState([]);
  const [posRef, setPosRef] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});

  const advance = id => setOrders(prev => prev.map(o => {
    if (o.id !== id) return o;
    const i = LIFECYCLE.indexOf(o.status);
    return { ...o, status: i >= 0 && i < LIFECYCLE.length - 1 ? LIFECYCLE[i+1] : o.status };
  }));

  const toggleMerge = id => setMergeTargets(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);

  const doMerge = () => {
    const [first, ...rest] = mergeTargets;
    const fo = orders.find(o => o.id === first);
    const ro = orders.filter(o => rest.includes(o.id));
    const ci = ro.reduce((s, o) => s + o.items, fo.items);
    const cp = ro.reduce((s, o) => s + o.rawPrice, fo.rawPrice);
    setOrders(prev => prev.filter(o => !rest.includes(o.id)).map(o =>
      o.id === first ? { ...o, items:ci, rawPrice:cp, price:`₦${cp.toLocaleString()}`, customer:`${o.customer} +${rest.length}` } : o
    ));
    setMergeTargets([]); setMergeOpen(false);
  };

  const filtered = orders.filter(o => {
    const s = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    return s && (!fv.status || o.status === fv.status) && (!fv.table || o.table === fv.table) && (!fv.payType || o.payType === fv.payType);
  });

  return (
    <div style={{ padding:28 }}>
      {mergeTargets.length > 0 && (
        <div style={{ background:C.primaryLight, border:`1px solid ${C.primary}`, borderRadius:10, padding:"12px 18px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:13, color:C.primary, fontWeight:500 }}>{mergeTargets.length} order{mergeTargets.length > 1 ? "s" : ""} selected</span>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="secondary" size="sm" onClick={() => setMergeTargets([])}>Clear</Btn>
            <Btn variant="primary" size="sm" disabled={mergeTargets.length < 2} onClick={() => setMergeOpen(true)}>Merge Orders</Btn>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[["Total",orders.length,C.text],["Preparing",orders.filter(o=>o.status==="Preparing").length,C.blue],["Ready",orders.filter(o=>o.status==="Ready").length,"#14B8A6"],["Delayed",orders.filter(o=>o.status==="Delayed").length,C.red]].map(([l,v,c]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Orders" subtitle="Tick checkboxes to merge orders into one bill" action={
        <div style={{ display:"flex", gap:8 }}>
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} icon="search" style={{ width:200 }} />
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({...fv}); setFilterOpen(v => !v); }}>
              <Icon name="filter" size={14} />Filter{(fv.status||fv.table||fv.payType)?" ●":""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"status",label:"Status",options:["Preparing","Ready","Served","Delayed","Paid"]},{key:"table",label:"Table",options:[...new Set(INIT_ORDERS.map(o=>o.table))]},{key:"payType",label:"Payment Type",options:["Pay Now","Pay Later"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false);}} onReset={()=>{setPf({});setFv({});setFilterOpen(false);}} />}
          </div>
        </div>
      }>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["","Order ID","Customer","Items","Price","Table","Waiter","Status","Type","Advance",""].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {filtered.map(o => {
                const ni = LIFECYCLE.indexOf(o.status);
                const next = ni >= 0 && ni < LIFECYCLE.length - 1 ? LIFECYCLE[ni+1] : null;
                return (
                  <TR key={o.id}>
                    <TD><input type="checkbox" checked={mergeTargets.includes(o.id)} onChange={() => toggleMerge(o.id)} style={{ cursor:"pointer", accentColor:C.primary }} onClick={e => e.stopPropagation()} /></TD>
                    <TD style={{ color:C.textSub, fontFamily:"monospace", fontSize:12 }}>{o.id}</TD>
                    <TD style={{ color:C.primary, fontWeight:500, cursor:"pointer" }} onClick={() => setSel(o)}>{o.customer}</TD>
                    <TD>{o.items}</TD>
                    <TD style={{ fontWeight:500 }}>{o.price}</TD>
                    <TD>{o.table}</TD>
                    <TD style={{ color:C.textSub }}>{o.waiter}</TD>
                    <TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD>
                    <TD><Badge color={o.payType === "Pay Later" ? "amber" : "blue"} dot={false}>{o.payType}</Badge></TD>
                    <TD>{next && <Btn variant="secondary" size="sm" onClick={() => advance(o.id)}>→ {next}</Btn>}</TD>
                    <TD><button onClick={() => setSel(o)} style={{ background:"none", border:"none", cursor:"pointer", color:C.textSub, display:"flex" }}><Icon name="dots" size={16} /></button></TD>
                  </TR>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pager count={filtered.length} />
      </SectionCard>

      {mergeOpen && (
        <Modal title="Merge Orders" onClose={() => setMergeOpen(false)} width={440}>
          <div style={{ padding:12, background:C.amberBg, borderRadius:8, fontSize:13, color:C.amber, marginBottom:16 }}>⚠️ Combines selected orders into one bill. Cannot be undone.</div>
          {mergeTargets.map(id => { const o = orders.find(x => x.id === id); return o ? <div key={id} style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", background:C.bg, borderRadius:8, marginBottom:6 }}><span style={{ fontSize:13, color:C.text }}>{o.customer} — {o.table}</span><span style={{ fontSize:13, fontWeight:600, color:C.primary }}>{o.price}</span></div> : null; })}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderTop:`1px solid ${C.border}`, marginTop:8 }}>
            <span style={{ fontWeight:600, color:C.text }}>Combined Total</span>
            <span style={{ fontWeight:700, color:C.primary }}>₦{mergeTargets.reduce((s,id) => s + (orders.find(o => o.id===id)?.rawPrice||0), 0).toLocaleString()}</span>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:16 }}>
            <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => setMergeOpen(false)}>Cancel</Btn>
            <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} onClick={doMerge}>Confirm Merge</Btn>
          </div>
        </Modal>
      )}

      {sel && !markOpen && (
        <Modal title={`Order ${sel.id}`} onClose={() => setSel(null)} width={440}>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <Badge color={statusColor(sel.status)}>{sel.status}</Badge>
            <Badge color={sel.payType === "Pay Later" ? "amber" : "blue"} dot={false}>{sel.payType}</Badge>
          </div>
          <InfoRow label="Waiter" value={sel.waiter} />
          <InfoRow label="Table" value={sel.table} />
          <InfoRow label="Date" value="30 Sept, 2026" />
          <div style={{ fontWeight:600, fontSize:13, color:C.text, marginTop:16, marginBottom:8 }}>Items</div>
          {sel.orderItems.map((it, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.borderLight}` }}>
              <span style={{ fontSize:20 }}>🍽️</span>
              <div style={{ flex:1, fontSize:13, color:C.text }}>{it}</div>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0" }}>
            <span style={{ fontWeight:600 }}>Total</span>
            <span style={{ fontWeight:700 }}>{sel.price}</span>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => setMarkOpen(true)}>Mark as Paid</Btn>
            <Btn variant="primary" style={{ flex:1, justifyContent:"center" }}><Icon name="printer" size={14} />Print Receipt</Btn>
          </div>
        </Modal>
      )}

      {markOpen && (
        <Modal title="POS Settlement" onClose={() => { setMarkOpen(false); setSel(null); }} width={400}>
          <div style={{ padding:12, background:C.amberBg, borderRadius:8, fontSize:12.5, color:C.amber, marginBottom:16 }}>A valid transaction reference is required before marking as paid.</div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Payment Method</div>
            <Sel value="pos" onChange={() => {}} options={[{value:"pos",label:"POS Terminal"},{value:"transfer",label:"Bank Transfer"},{value:"cash",label:"Cash"}]} style={{ width:"100%" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Transaction Reference (RRN) *</div>
            <Input placeholder="Enter POS receipt reference" value={posRef} onChange={e => setPosRef(e.target.value)} style={{ width:"100%" }} />
          </div>
          <Btn variant="primary" disabled={!posRef.trim()} style={{ width:"100%", justifyContent:"center" }} onClick={() => { setMarkOpen(false); setSel(null); setPosRef(""); }}>Confirm Payment</Btn>
        </Modal>
      )}
    </div>
  );
}
