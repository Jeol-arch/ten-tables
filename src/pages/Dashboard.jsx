import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Input, FilterPanel, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_MENU, INIT_ORDERS, BAR_DATA } from "../data/seed";

const BarChart = ({ data, h = 120 }) => {
  const mx = Math.max(...data);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:h, width:"100%" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, background: i === data.length - 4 ? C.primary : C.borderLight,
          borderRadius:"3px 3px 0 0", height:`${(v/mx)*100}%` }} />
      ))}
    </div>
  );
};

export default function Dashboard({ setPage }) {
  const [chartTab, setChartTab] = useState("Monthly");
  const [sel, setSel] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});
  const [search, setSearch] = useState("");

  const mostOrdered = [...INIT_MENU].sort((a, b) => b.orderCount - a.orderCount).slice(0, 4);
  const statusSummary = ["Preparing","Ready","Served","Paid","Delayed"]
    .map(s => [s, INIT_ORDERS.filter(o => o.status === s).length]);

  const filtered = INIT_ORDERS.filter(o => {
    const s = o.customer.toLowerCase().includes(search.toLowerCase());
    return s && (!fv.status || o.status === fv.status) && (!fv.payType || o.payType === fv.payType);
  });

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:22 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {[["Total Inflow (Today)","₦300.634M","↑ 53.4% vs yesterday",C.green],["Total Orders","5,000","↑ 53.4% vs yesterday",C.green],["Total Customers","60,439","↑ 53.4% vs yesterday",C.green]].map(([l,v,s,c]) => (
          <div key={l} style={{ background:C.surface, borderRadius:12, padding:"20px 22px", border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:6 }}>{l}</div>
            <div style={{ fontSize:26, fontWeight:700, color:C.text, marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, color:c }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 22px" }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:12 }}>Live Order Status</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {statusSummary.map(([s, n]) => (
            <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center",
              padding:"8px 16px", borderRadius:10, background:C.bg, border:`1px solid ${C.border}`, minWidth:80 }}>
              <div style={{ fontSize:20, fontWeight:700, color:C.text }}>{n}</div>
              <Badge color={statusColor(s)} dot={false}>{s}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 290px", gap:16 }}>
        <div style={{ background:C.surface, borderRadius:12, padding:24, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:15, color:C.text }}>Order Rate</div>
              <div style={{ fontSize:12, color:C.textSub }}>Order activity this year</div>
            </div>
            <div style={{ display:"flex", gap:2, background:C.borderLight, borderRadius:8, padding:3 }}>
              {["Monthly","Weekly","Yearly"].map(t => (
                <button key={t} onClick={() => setChartTab(t)} style={{ padding:"4px 10px", borderRadius:6, border:"none", background: chartTab===t ? C.surface : "transparent", color: chartTab===t ? C.text : C.textSub, fontSize:12, fontWeight: chartTab===t ? 600 : 400, cursor:"pointer", fontFamily:"inherit" }}>{t}</button>
              ))}
            </div>
          </div>
          <BarChart data={BAR_DATA} h={130} />
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
            {["Jan","Mar","May","Jul","Sep","Nov"].map(m => <span key={m} style={{ fontSize:11, color:C.textMuted }}>{m}</span>)}
          </div>
        </div>

        <div style={{ background:C.surface, borderRadius:12, padding:20, border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:600, fontSize:15, color:C.text, marginBottom:14 }}>Most Ordered</div>
          {mostOrdered.map((item, i) => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom: i < mostOrdered.length-1 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ width:34, height:34, borderRadius:8, background:C.borderLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{item.image}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:500, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                <div style={{ fontSize:11, color:C.textSub }}>{item.orderCount} orders</div>
              </div>
              <span style={{ fontSize:12, fontWeight:600, color:C.primary, whiteSpace:"nowrap" }}>{item.price}</span>
            </div>
          ))}
          <button onClick={() => setPage("menu")} style={{ width:"100%", marginTop:12, padding:"7px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.textSub, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>View full menu →</button>
        </div>
      </div>

      <SectionCard title="Recent Orders" action={
        <div style={{ display:"flex", gap:8 }}>
          <Input placeholder="Search customer..." value={search} onChange={e => setSearch(e.target.value)} icon="search" style={{ width:200 }} />
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({ ...fv }); setFilterOpen(v => !v); }}>
              <Icon name="filter" size={14} />Filter{(fv.status || fv.payType) ? " ●" : ""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"status",label:"Status",options:["Preparing","Delayed","Ready","Served","Paid"]},{key:"payType",label:"Payment Type",options:["Pay Now","Pay Later"]}]} values={pf} onChange={(k,v) => setPf(f => ({...f,[k]:v}))} onApply={() => { setFv({...pf}); setFilterOpen(false); }} onReset={() => { setPf({}); setFv({}); setFilterOpen(false); }} />}
          </div>
        </div>
      }>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Customer","Items","Price","Table","Waiter","Prep Time","Status","Type"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {filtered.map(o => (
                <TR key={o.id} onClick={() => setSel(o)}>
                  <TD style={{ color:C.primary, fontWeight:500 }}>{o.customer}</TD>
                  <TD>{o.items}</TD>
                  <TD style={{ fontWeight:500 }}>{o.price}</TD>
                  <TD>{o.table}</TD>
                  <TD style={{ color:C.textSub }}>{o.waiter}</TD>
                  <TD><span style={{ fontFamily:"monospace", fontSize:12 }}>{o.prepTime}</span></TD>
                  <TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD>
                  <TD><Badge color={o.payType === "Pay Later" ? "amber" : "blue"} dot={false}>{o.payType}</Badge></TD>
                </TR>
              ))}
            </tbody>
          </table>
        </div>
        <Pager count={filtered.length} />
      </SectionCard>
    </div>
  );
}
