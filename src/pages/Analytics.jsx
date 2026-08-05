import { useState } from "react";
import { C } from "../tokens";
import { Badge, Btn, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import { Sel } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_MENU, INIT_WAITERS } from "../data/seed";

const tableStats = [
  { table:"Table 7", orders:856, turnover:"4.2x", revenue:"₦128,400" },
  { table:"Table 5", orders:712, turnover:"3.8x", revenue:"₦89,000"  },
  { table:"Table 2", orders:534, turnover:"2.9x", revenue:"₦66,750"  },
  { table:"Table 3", orders:421, turnover:"2.3x", revenue:"₦52,625"  },
  { table:"Table 1", orders:190, turnover:"1.1x", revenue:"₦23,750"  },
];

export default function Analytics() {
  const [range, setRange] = useState("This Week");
  const sorted = [...INIT_MENU].sort((a,b) => b.orderCount - a.orderCount);
  const top = sorted.slice(0,3);
  const bottom = sorted.slice(-3).reverse();
  const waiterStats = INIT_WAITERS.map(w => ({ ...w, revenue:w.totalOrders>0?`₦${(w.totalOrders*4200).toLocaleString()}`:"₦0" }));

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <div style={{ fontWeight:600, fontSize:16, color:C.text }}>Analytics & Reports</div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <Sel value={range} onChange={setRange} options={["Today","This Week","This Month","Custom"].map(o=>({value:o,label:o}))} />
          <Btn variant="secondary" size="sm"><Icon name="download" size={14} />Export Report</Btn>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[["Total Revenue","₦300.634M",C.green,"↑ 18% vs last period"],["Orders Processed","5,000",C.blue,"↑ 12% vs last period"],["Avg Order Value","₦60,127",C.purple,"↑ 5% vs last period"],["Table Turnover","3.2x",C.teal,"Per table per shift"]].map(([l,v,c,s]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c, marginBottom:2 }}>{v}</div>
            <div style={{ fontSize:11, color:C.textSub }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <SectionCard title="🔥 Top Performing Items" subtitle="Most ordered this period">
          {top.map((item,i) => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 24px", borderBottom:`1px solid ${C.borderLight}` }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:[C.amberBg,C.borderLight,C.borderLight][i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:[C.amber,C.textSub,C.textSub][i] }}>{i+1}</div>
              <div style={{ fontSize:20 }}>{item.image}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{item.name}</div>
                <div style={{ fontSize:11, color:C.textSub }}>{item.category}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.primary }}>{item.orderCount} orders</div>
                <div style={{ fontSize:11, color:C.textSub }}>{item.price}</div>
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="📉 Under-Performing Items" subtitle="Least ordered — consider promotions">
          {bottom.map((item,i) => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 24px", borderBottom:`1px solid ${C.borderLight}` }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:C.redBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:C.red }}>{i+1}</div>
              <div style={{ fontSize:20 }}>{item.image}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{item.name}</div>
                <div style={{ fontSize:11, color:C.textSub }}>{item.category}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.red }}>{item.orderCount} orders</div>
                <div style={{ fontSize:11, color:C.textSub }}>{item.price}</div>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <SectionCard title="📋 Table Performance" subtitle="Orders and turnover by table">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Table","Orders","Turnover","Revenue"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {tableStats.map(t => (
                <TR key={t.table}>
                  <TD style={{ fontWeight:500, color:C.primary }}>{t.table}</TD>
                  <TD>{t.orders}</TD>
                  <TD><Badge color="blue" dot={false}>{t.turnover}</Badge></TD>
                  <TD style={{ fontWeight:600, color:C.green }}>{t.revenue}</TD>
                </TR>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="👥 Waiter Performance" subtitle="Weekly summary">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Name","Orders","Avg Response","Revenue"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {waiterStats.map(w => (
                <TR key={w.id}>
                  <TD style={{ fontWeight:500, color:C.text }}>{w.name}</TD>
                  <TD>{w.totalOrders}</TD>
                  <TD style={{ color:C.textSub }}>{w.avgResponse}</TD>
                  <TD style={{ fontWeight:600, color:C.green }}>{w.revenue}</TD>
                </TR>
              ))}
            </tbody>
          </table>
          <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.border}` }}>
            <Btn variant="secondary" size="sm"><Icon name="download" size={14} />Export Waiter Report (CSV)</Btn>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="💳 Payment Method Breakdown">
        <div style={{ padding:"20px 24px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {[["Pay Now (Digital)",3000,"60%",C.primary],["Pay After Eating",1500,"30%",C.amber],["Credit Line",500,"10%",C.purple]].map(([l,n,pct,c]) => (
            <div key={l} style={{ textAlign:"center", padding:"16px", background:C.bg, borderRadius:12 }}>
              <div style={{ fontSize:32, fontWeight:700, color:c, marginBottom:4 }}>{pct}</div>
              <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:2 }}>{l}</div>
              <div style={{ fontSize:12, color:C.textSub }}>{n.toLocaleString()} orders</div>
              <div style={{ height:6, borderRadius:3, background:C.borderLight, marginTop:10, overflow:"hidden" }}>
                <div style={{ height:"100%", width:pct, background:c, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
