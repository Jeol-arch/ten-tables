import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Modal, Confirm, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_ORDERS, INIT_TABLES, INIT_WAITERS } from "../data/seed";

const LIFECYCLE = ["Preparing","Ready","Served","Paid"];

export default function Supervisor() {
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [timers, setTimers] = useState({ T03:42, T05:38, T07:55, T08:22 });
  const [timerModal, setTimerModal] = useState(null);
  const [voidTarget, setVoidTarget] = useState(null);

  const tableStatusColor = s => ({ Vacant:"green", Occupied:"blue", "Pending Payment":"amber" }[s] || "gray");

  const advance = id => setOrders(prev => prev.map(o => {
    if (o.id !== id) return o;
    const i = LIFECYCLE.indexOf(o.status);
    return { ...o, status: i >= 0 && i < LIFECYCLE.length - 1 ? LIFECYCLE[i+1] : o.status };
  }));

  const adjustTimer = (id, delta) => setTimers(t => ({ ...t, [id]: Math.max(0, Math.min(120, (t[id]||0) + delta)) }));

  return (
    <div style={{ padding:28 }}>
      <div style={{ background:C.amberBg, border:`1px solid ${C.amber}`, borderRadius:10, padding:"12px 18px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        <Icon name="shield" size={18} color={C.amber} />
        <span style={{ fontSize:13, color:C.amber, fontWeight:500 }}>Supervisor View — You have elevated override permissions. Changes here affect live floor operations.</span>
      </div>

      {/* Floor map */}
      <div style={{ marginBottom:22 }}>
        <div style={{ fontWeight:600, fontSize:15, color:C.text, marginBottom:12 }}>Live Floor Map</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {INIT_TABLES.map(t => {
            const mins = timers[t.id];
            const alert = mins && mins >= 45;
            return (
              <div key={t.id} style={{ background:C.surface, border:`2px solid ${alert?C.red:t.status==="Occupied"?C.blue:t.status==="Pending Payment"?C.amber:C.border}`, borderRadius:12, padding:16, position:"relative" }}>
                {alert && <div style={{ position:"absolute", top:-8, right:-8, width:18, height:18, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:10, fontWeight:700 }}>!</span></div>}
                <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4 }}>Table {t.number}</div>
                <div style={{ fontSize:11, color:C.textSub, marginBottom:8 }}>{t.type} · {t.zone}</div>
                <Badge color={tableStatusColor(t.status)}>{t.status}</Badge>
                {mins !== undefined && <div style={{ marginTop:8, fontSize:12, color:alert?C.red:C.textSub, fontWeight:alert?700:400 }}><Icon name="clock" size={12} color={alert?C.red:C.textSub} /> {mins} min open</div>}
                {mins !== undefined && (
                  <div style={{ display:"flex", gap:4, marginTop:8 }}>
                    <button onClick={() => adjustTimer(t.id,-5)} style={{ flex:1, padding:"3px", borderRadius:5, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:12 }}>-5</button>
                    <button onClick={() => setTimerModal(t.id)} style={{ flex:1, padding:"3px", borderRadius:5, border:`1px solid ${C.primary}`, background:C.primaryLight, cursor:"pointer", fontSize:12, color:C.primary }}>Set</button>
                    <button onClick={() => adjustTimer(t.id,5)} style={{ flex:1, padding:"3px", borderRadius:5, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:12 }}>+5</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order intervention */}
      <SectionCard title="Active Order Intervention" subtitle="Manually advance order statuses or void tickets">
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.borderLight }}>{["Order ID","Customer","Table","Waiter","Status","Advance Status","Void Order"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {orders.filter(o => o.status !== "Paid").map(o => {
              const i = LIFECYCLE.indexOf(o.status);
              const next = i >= 0 && i < LIFECYCLE.length - 1 ? LIFECYCLE[i+1] : null;
              return (
                <TR key={o.id}>
                  <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{o.id}</TD>
                  <TD style={{ fontWeight:500, color:C.text }}>{o.customer}</TD>
                  <TD>{o.table}</TD>
                  <TD style={{ color:C.textSub }}>{o.waiter}</TD>
                  <TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD>
                  <TD>{next ? <Btn variant="primary" size="sm" onClick={() => advance(o.id)}>→ {next}</Btn> : <span style={{ fontSize:12, color:C.textMuted }}>—</span>}</TD>
                  <TD><Btn variant="danger" size="sm" onClick={() => setVoidTarget(o)}><Icon name="trash" size={13} />Void</Btn></TD>
                </TR>
              );
            })}
          </tbody>
        </table>
        <Pager count={orders.filter(o => o.status!=="Paid").length} />
      </SectionCard>

      {/* Waiter shift overview */}
      <div style={{ marginTop:20 }}>
        <SectionCard title="Waiter Shift Oversight">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Waiter","Zone","Shift Status","Clock In","Orders Taken","Avg Response"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {INIT_WAITERS.map(w => (
                <TR key={w.id}>
                  <TD style={{ fontWeight:500, color:C.text }}>{w.name}</TD>
                  <TD style={{ color:C.textSub }}>{w.zone}</TD>
                  <TD><Badge color={statusColor(w.status)}>{w.status}</Badge></TD>
                  <TD style={{ fontFamily:"monospace", fontSize:12, color:C.textSub }}>{w.clockIn}</TD>
                  <TD style={{ fontWeight:500 }}>{w.totalOrders}</TD>
                  <TD style={{ color:C.textSub }}>{w.avgResponse}</TD>
                </TR>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      {timerModal && (
        <Modal title="Adjust Payment Timer" subtitle={`Table ${INIT_TABLES.find(t=>t.id===timerModal)?.number}`} onClose={() => setTimerModal(null)} width={360}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:48, fontWeight:700, color:timers[timerModal]>=45?C.red:C.primary }}>{timers[timerModal]} <span style={{ fontSize:16, fontWeight:400, color:C.textSub }}>min</span></div>
            <div style={{ fontSize:13, color:C.textSub }}>Current open time</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:20 }}>
            {[[-15,"-15"],[-5,"-5"],[0,"Reset"],[5,"+5"],[15,"+15"]].map(([d,l]) => (
              <button key={l} onClick={() => { if(d===0) setTimers(t=>({...t,[timerModal]:0})); else adjustTimer(timerModal,d); }} style={{ padding:"8px", borderRadius:8, border:`1px solid ${d<0?C.redBg:d===0?C.border:C.greenBg}`, background:d<0?C.redBg:d===0?C.surface:C.greenBg, color:d<0?C.red:d===0?C.text:C.green, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>{l}</button>
            ))}
          </div>
          <Btn variant="primary" style={{ width:"100%", justifyContent:"center" }} onClick={() => setTimerModal(null)}>Done</Btn>
        </Modal>
      )}

      {voidTarget && (
        <Confirm
          title="Void Order?"
          message={`Void order ${voidTarget.id} for ${voidTarget.customer}? A full charge reversal will be applied including VAT and service charge.`}
          confirmLabel="Void Order"
          onConfirm={() => { setOrders(prev => prev.filter(o => o.id!==voidTarget.id)); setVoidTarget(null); }}
          onCancel={() => setVoidTarget(null)}
        />
      )}
    </div>
  );
}
