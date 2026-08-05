import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Input, Modal, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_CREDIT_REQUESTS, INIT_PREORDERS } from "../data/seed";

export default function Credit() {
  const [tab, setTab] = useState("credit");
  const [credits, setCredits] = useState(INIT_CREDIT_REQUESTS);
  const [preorders, setPreorders] = useState(INIT_PREORDERS);
  const [addPreorder, setAddPreorder] = useState(false);
  const [poForm, setPoForm] = useState({ customer:"", phone:"", items:"", scheduledFor:"", notes:"" });

  const updateCredit = (id, status) => setCredits(prev => prev.map(c => c.id===id ? {...c,status} : c));
  const savePreorder = () => {
    setPreorders(prev => [...prev, { id:`PO${Date.now()}`, customer:poForm.customer, phone:poForm.phone, items:poForm.items, total:"TBD", rawTotal:0, scheduledFor:poForm.scheduledFor, status:"Holding", notes:poForm.notes }]);
    setAddPreorder(false);
    setPoForm({ customer:"", phone:"", items:"", scheduledFor:"", notes:"" });
  };

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"flex", gap:4, background:C.borderLight, borderRadius:10, padding:4, marginBottom:22, width:"fit-content" }}>
        {[["credit","Credit Requests"],["preorder","Phone-in Pre-Orders"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:"8px 18px", borderRadius:8, border:"none", background:tab===k?C.surface:"transparent", color:tab===k?C.text:C.textSub, fontSize:13, fontWeight:tab===k?600:400, cursor:"pointer", fontFamily:"inherit" }}>{l}</button>
        ))}
      </div>

      {tab === "credit" && (
        <SectionCard title="Customer Credit Requests" subtitle="Review and approve or reject Pay via Credit Line requests in real time">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Request ID","Customer","Email","Table","Amount","Requested At","Status","Actions"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {credits.map(c => (
                <TR key={c.id}>
                  <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{c.id}</TD>
                  <TD style={{ fontWeight:500, color:C.text }}>{c.customer}</TD>
                  <TD style={{ color:C.textSub, fontSize:12 }}>{c.email}</TD>
                  <TD>{c.table}</TD>
                  <TD style={{ fontWeight:600, color:C.primary }}>{c.amount}</TD>
                  <TD style={{ color:C.textSub, fontSize:12 }}>{c.requestedAt}</TD>
                  <TD><Badge color={statusColor(c.status)}>{c.status}</Badge></TD>
                  <TD>
                    {c.status === "Awaiting Approval"
                      ? <div style={{ display:"flex", gap:6 }}>
                          <Btn variant="success" size="sm" onClick={() => updateCredit(c.id,"Approved")}><Icon name="check" size={13} />Approve</Btn>
                          <Btn variant="danger"  size="sm" onClick={() => updateCredit(c.id,"Rejected")}><Icon name="x"     size={13} />Reject</Btn>
                        </div>
                      : <span style={{ fontSize:12, color:C.textSub }}>{c.status}</span>
                    }
                  </TD>
                </TR>
              ))}
            </tbody>
          </table>
          <Pager count={credits.length} />
        </SectionCard>
      )}

      {tab === "preorder" && (
        <SectionCard title="Phone-in Pre-Orders" subtitle="Log and hold call-ahead orders until the guest arrives" action={
          <Btn variant="primary" size="sm" onClick={() => setAddPreorder(true)}><Icon name="plus" size={14} />New Pre-Order</Btn>
        }>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Order ID","Customer","Phone","Items","Total","Arrival Time","Status","Notes","Actions"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {preorders.map(p => (
                <TR key={p.id}>
                  <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{p.id}</TD>
                  <TD style={{ fontWeight:500, color:C.text }}>{p.customer}</TD>
                  <TD style={{ fontSize:12, color:C.textSub }}>{p.phone}</TD>
                  <TD style={{ fontSize:12, maxWidth:180 }}><div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.items}</div></TD>
                  <TD style={{ fontWeight:600, color:C.primary }}>{p.total}</TD>
                  <TD style={{ color:C.textSub, fontSize:12 }}>{p.scheduledFor}</TD>
                  <TD><Badge color={p.status==="Arrived"?"green":"amber"}>{p.status}</Badge></TD>
                  <TD style={{ fontSize:12, color:C.textSub, maxWidth:160 }}><div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.notes || "—"}</div></TD>
                  <TD>{p.status==="Holding" && <Btn variant="secondary" size="sm" onClick={() => setPreorders(prev => prev.map(x => x.id===p.id?{...x,status:"Arrived"}:x))}>Mark Arrived</Btn>}</TD>
                </TR>
              ))}
            </tbody>
          </table>
          <Pager count={preorders.length} />
        </SectionCard>
      )}

      {addPreorder && (
        <Modal title="New Phone-in Pre-Order" onClose={() => setAddPreorder(false)} width={480}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Customer Name *</div><Input placeholder="Caller name" value={poForm.customer} onChange={e => setPoForm(f=>({...f,customer:e.target.value}))} style={{ width:"100%" }} /></div>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Phone Number *</div><Input placeholder="+234 801 ..." value={poForm.phone} onChange={e => setPoForm(f=>({...f,phone:e.target.value}))} style={{ width:"100%" }} /></div>
            </div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Items Ordered</div><textarea value={poForm.items} onChange={e => setPoForm(f=>({...f,items:e.target.value}))} style={{ width:"100%", padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, fontFamily:"inherit", resize:"vertical", minHeight:60, outline:"none", boxSizing:"border-box" }} placeholder="e.g. Grilled Salmon x1, Caesar Salad x2..." /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Expected Arrival</div><Input placeholder="e.g. 07:30 PM" value={poForm.scheduledFor} onChange={e => setPoForm(f=>({...f,scheduledFor:e.target.value}))} style={{ width:"100%" }} /></div>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Special Notes</div><Input placeholder="e.g. window seat, allergies" value={poForm.notes} onChange={e => setPoForm(f=>({...f,notes:e.target.value}))} style={{ width:"100%" }} /></div>
            </div>
            <div style={{ padding:12, background:C.blueBg, borderRadius:8, fontSize:12.5, color:C.blue }}>ℹ️ A "PRE-ORDER // HOLD FOR ARRIVAL" ticket will be printed to the kitchen automatically.</div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => setAddPreorder(false)}>Cancel</Btn>
              <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} disabled={!poForm.customer.trim()||!poForm.phone.trim()} onClick={savePreorder}><Icon name="printer" size={14} />Save & Print Ticket</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
