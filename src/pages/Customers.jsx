import { useState } from "react";
import { C, statusColor } from "../tokens";
import { Badge, Btn, Input, FilterPanel, Toggle, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_CUSTOMERS } from "../data/seed";

const CUST_ORDERS = [
  { items:"1 Items", price:"₦100,000", table:100, waiter:"Bukayo Saka",   status:"Successful" },
  { items:"1 Items", price:"₦100,000", table:200, waiter:"Bukayo Saka",   status:"Cancelled"  },
  { items:"1 Items", price:"₦100,000", table:10,  waiter:"Ngozi Okafor",  status:"Successful" },
  { items:"1 Items", price:"₦100,000", table:56,  waiter:"Tunde Adeyemi", status:"Successful" },
  { items:"1 Items", price:"₦100,000", table:19,  waiter:"Bukayo Saka",   status:"Successful" },
];

export default function Customers() {
  const [customers, setCustomers] = useState(INIT_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [detailSearch, setDetailSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});

  const filtered = customers.filter(c => {
    const s = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    return s && (!fv.payLater || (fv.payLater==="Yes" ? c.payLater : !c.payLater)) && (!fv.blacklisted || (fv.blacklisted==="Blacklisted" ? c.blacklisted : !c.blacklisted));
  });

  if (sel) {
    const filteredOrders = CUST_ORDERS.filter(o => !detailSearch || o.waiter.toLowerCase().includes(detailSearch.toLowerCase()));
    return (
      <div style={{ padding:28 }}>
        <SectionCard title="Customer Details" action={
          <button onClick={() => setSel(null)} style={{ display:"flex", alignItems:"center", gap:6, background:C.borderLight, border:"none", cursor:"pointer", borderRadius:8, padding:"6px 12px", fontSize:13, color:C.textSub, fontFamily:"inherit" }}>
            <Icon name="chevronLeft" size={15} />Back
          </button>
        }>
          <div style={{ padding:"18px 24px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>👤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{sel.name}</div>
                <div style={{ fontSize:12, color:C.textSub }}>{sel.email}</div>
                {sel.blacklisted && <Badge color="red">Blacklisted — Pay Now enforced</Badge>}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Toggle value={sel.payLater} onChange={v => setSel(s => ({...s,payLater:v}))} label="Pay Later Enabled" />
                {!sel.blacklisted
                  ? <Btn variant="danger" size="sm" onClick={() => { setCustomers(prev => prev.map(c => c.id===sel.id?{...c,blacklisted:true}:c)); setSel(s=>({...s,blacklisted:true})); }}>Blacklist</Btn>
                  : <Btn variant="secondary" size="sm" onClick={() => { setCustomers(prev => prev.map(c => c.id===sel.id?{...c,blacklisted:false}:c)); setSel(s=>({...s,blacklisted:false})); }}>Remove Blacklist</Btn>
                }
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:16 }}>
              {[["Total Orders",sel.totalOrders],["Amount Spent",sel.spent],["Date Joined",sel.dateJoined],["Account Type",sel.payLater?"Pay Later Enabled":"Pay Now Only"]].map(([l,v]) => (
                <div key={l} style={{ padding:"12px 14px", background:C.bg, borderRadius:10 }}>
                  <div style={{ fontSize:11, color:C.textSub, marginBottom:3 }}>{l}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"14px 24px", borderBottom:`1px solid ${C.border}` }}>
            <Input placeholder="Search by waiter..." value={detailSearch} onChange={e => setDetailSearch(e.target.value)} icon="search" style={{ width:220 }} />
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:C.borderLight }}>{["Items","Price","Table","Waiter","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {filteredOrders.map((o, i) => (
                <TR key={i}>
                  <TD style={{ color:C.primary, fontWeight:500 }}>{o.items}</TD>
                  <TD style={{ fontWeight:500 }}>{o.price}</TD>
                  <TD>{o.table}</TD>
                  <TD style={{ color:C.textSub }}>{o.waiter}</TD>
                  <TD><Badge color={o.status==="Successful"?"green":"red"}>{o.status}</Badge></TD>
                </TR>
              ))}
            </tbody>
          </table>
          <Pager count={filteredOrders.length} />
        </SectionCard>
      </div>
    );
  }

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:22 }}>
        {[["Total Customers","2,000",C.text],["Pay Later Enabled",customers.filter(c=>c.payLater).length,C.amber],["Blacklisted",customers.filter(c=>c.blacklisted).length,C.red]].map(([l,v,c]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Customers" subtitle="Click a row to view order history" action={
        <div style={{ display:"flex", gap:8 }}>
          <Input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} icon="search" style={{ width:220 }} />
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({...fv}); setFilterOpen(v=>!v); }}>
              <Icon name="filter" size={14} />Filter{(fv.payLater||fv.blacklisted)?" ●":""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"payLater",label:"Pay Later",options:["Yes","No"]},{key:"blacklisted",label:"Status",options:["Blacklisted","Active"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false);}} onReset={()=>{setPf({});setFv({});setFilterOpen(false);}} />}
          </div>
        </div>
      }>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.borderLight }}>{["Customer Name","Email","Total Orders","Spent","Joined","Pay Later","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {filtered.map(c => (
              <TR key={c.id} onClick={() => setSel(c)}>
                <TD style={{ color:C.primary, fontWeight:500 }}>{c.name}</TD>
                <TD style={{ color:C.textSub }}>{c.email}</TD>
                <TD>{c.totalOrders}</TD>
                <TD style={{ fontWeight:500 }}>{c.spent}</TD>
                <TD style={{ color:C.textSub }}>{c.dateJoined}</TD>
                <TD><Badge color={c.payLater?"amber":"gray"} dot={false}>{c.payLater?"Yes":"No"}</Badge></TD>
                <TD><Badge color={c.blacklisted?"red":"green"} dot={false}>{c.blacklisted?"Blacklisted":"Active"}</Badge></TD>
              </TR>
            ))}
          </tbody>
        </table>
        <Pager count={filtered.length} />
      </SectionCard>
    </div>
  );
}
