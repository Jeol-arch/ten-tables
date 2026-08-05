import { useState } from "react";
import { C } from "../tokens";
import { Badge, Btn, Input, Modal, Toggle, FilterPanel, Pager, TH, TD, TR, SectionCard } from "../components/UI";
import { Sel } from "../components/UI";
import Icon from "../components/Icon";
import { INIT_MENU } from "../data/seed";

const ALLERGENS = ["Gluten","Dairy","Eggs","Fish","Nuts","Soy"];

export default function Menu() {
  const [items, setItems] = useState(INIT_MENU);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [payLate, setPayLate] = useState(false);
  const [preview, setPreview] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [fv, setFv] = useState({});
  const [pf, setPf] = useState({});

  const blank = { name:"", rawPrice:0, type:"Food", size:"None", availability:"Available", prepTime:"", category:"Main", description:"", image:"🍽️", allergens:[] };
  const [form, setForm] = useState(blank);

  const openEdit = item => { setForm({ ...item, rawPrice:String(item.rawPrice) }); setEditItem(item.id || "new"); };
  const save = () => {
    const rp = Number(form.rawPrice) || 0;
    const up = { ...form, rawPrice:rp, price:`₦${rp.toLocaleString()}` };
    if (editItem === "new") setItems(prev => [...prev, { ...up, id:Date.now(), orderCount:0 }]);
    else setItems(prev => prev.map(i => i.id === editItem ? { ...i, ...up } : i));
    setEditItem(null);
  };

  const filtered = items.filter(i => {
    const s = i.name.toLowerCase().includes(search.toLowerCase());
    return s && (!fv.category || i.category === fv.category) && (!fv.type || i.type === fv.type) && (!fv.availability || i.availability === fv.availability);
  });

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[["Total Items",items.length,C.text],["Available",items.filter(i=>i.availability==="Available").length,C.green],["Out of Stock",items.filter(i=>i.availability==="Out of Stock").length,C.red],["Top Item",[...INIT_MENU].sort((a,b)=>b.orderCount-a.orderCount)[0].name.split(" ").slice(0,2).join(" "),C.purple]].map(([l,v,c]) => (
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:l==="Top Item"?14:22, fontWeight:700, color:c, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Menu" action={
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <Toggle value={payLate} onChange={setPayLate} label="Pay Later for all orders" />
          <Input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} icon="search" style={{ width:180 }} />
          <div style={{ position:"relative" }}>
            <Btn variant="secondary" size="sm" onClick={() => { setPf({...fv}); setFilterOpen(v => !v); }}>
              <Icon name="filter" size={14} />Filter{(fv.category||fv.type||fv.availability)?" ●":""}
            </Btn>
            {filterOpen && <FilterPanel filters={[{key:"category",label:"Category",options:["Main","Starter","Dessert","Drink"]},{key:"type",label:"Type",options:["Food","Drink","Dessert","Appetizer"]},{key:"availability",label:"Availability",options:["Available","Out of Stock"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false);}} onReset={()=>{setPf({});setFv({});setFilterOpen(false);}} />}
          </div>
          <Btn variant="secondary" size="sm" onClick={() => setPreview(true)}><Icon name="eye" size={14} />Diner Preview</Btn>
          <Btn variant="primary" size="sm" onClick={() => { setForm(blank); setEditItem("new"); }}><Icon name="plus" size={14} />New Item</Btn>
        </div>
      }>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.borderLight }}>{["","Item Name","Type","Category","Allergens","Orders","Price","Availability",""].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {filtered.map(item => (
              <TR key={item.id} onClick={() => openEdit(item)}>
                <TD><div style={{ width:36, height:36, borderRadius:8, background:C.borderLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{item.image}</div></TD>
                <TD style={{ color:C.primary, fontWeight:500, maxWidth:240 }}><div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div></TD>
                <TD style={{ color:C.textSub }}>{item.type}</TD>
                <TD style={{ color:C.textSub }}>{item.category}</TD>
                <TD><div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>{(item.allergens||[]).map(a => <span key={a} style={{ fontSize:10, padding:"1px 5px", borderRadius:4, background:C.amberBg, color:C.amber }}>{a}</span>)}</div></TD>
                <TD>{item.orderCount}</TD>
                <TD style={{ fontWeight:500 }}>{item.price}</TD>
                <TD><Badge color={item.availability==="Available"?"green":"red"}>{item.availability}</Badge></TD>
                <TD><button onClick={e => { e.stopPropagation(); openEdit(item); }} style={{ background:"none", border:"none", cursor:"pointer", color:C.textSub, display:"flex" }}><Icon name="edit" size={15} /></button></TD>
              </TR>
            ))}
          </tbody>
        </table>
        <Pager count={filtered.length} />
      </SectionCard>

      {editItem !== null && (
        <Modal title={editItem==="new"?"Add Menu Item":"Edit Menu Item"} onClose={() => setEditItem(null)} width={520}>
          <div style={{ display:"grid", gap:14 }}>
            <div style={{ width:"100%", height:100, border:`2px dashed ${C.border}`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, gap:12, cursor:"pointer" }}>
              <span style={{ fontSize:48 }}>{form.image}</span>
              <div style={{ textAlign:"center", color:C.textSub }}><Icon name="upload" size={18} /><div style={{ fontSize:12, marginTop:4 }}>Upload image</div></div>
            </div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Item Name *</div><Input placeholder="e.g. Grilled Salmon" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))} style={{ width:"100%" }} /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Price (₦) *</div><Input placeholder="5000" type="number" value={form.rawPrice} onChange={e => setForm(f => ({...f,rawPrice:e.target.value}))} style={{ width:"100%" }} /></div>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Prep Time (mins)</div><Input placeholder="15" type="number" value={form.prepTime} onChange={e => setForm(f => ({...f,prepTime:e.target.value}))} style={{ width:"100%" }} /></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Type</div><Sel value={form.type} onChange={v => setForm(f => ({...f,type:v}))} options={["Food","Drink","Dessert","Appetizer"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
              <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Category</div><Sel value={form.category} onChange={v => setForm(f => ({...f,category:v}))} options={["Main","Starter","Dessert","Drink"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
            </div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Availability</div><Sel value={form.availability} onChange={v => setForm(f => ({...f,availability:v}))} options={["Available","Out of Stock"].map(o=>({value:o,label:o}))} style={{ width:"100%" }} /></div>
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:8 }}>Allergen Tags</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {ALLERGENS.map(a => { const on = (form.allergens||[]).includes(a); return <button key={a} onClick={() => setForm(f => ({...f,allergens:on?(f.allergens||[]).filter(x=>x!==a):[...(f.allergens||[]),a]}))} style={{ padding:"3px 10px", borderRadius:6, border:`1px solid ${on?C.amber:C.border}`, background:on?C.amberBg:"transparent", color:on?C.amber:C.textSub, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>{a}</button>; })}
              </div>
            </div>
            <div><div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>Description</div><textarea value={form.description} onChange={e => setForm(f => ({...f,description:e.target.value}))} style={{ width:"100%", padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, fontFamily:"inherit", resize:"vertical", minHeight:70, outline:"none", color:C.text, boxSizing:"border-box" }} placeholder="Describe the item..." /></div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={() => setEditItem(null)}>Cancel</Btn>
              <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} disabled={!form.name.trim()} onClick={save}>{editItem==="new"?"Add Item":"Save Changes"}</Btn>
            </div>
          </div>
        </Modal>
      )}

      {preview && (
        <Modal title="Diner Preview (Sandbox)" subtitle="Simulates what a customer sees after scanning the QR code" onClose={() => setPreview(false)} width={400}>
          <div style={{ background:"#F0F4FF", borderRadius:12, padding:16, marginBottom:16, textAlign:"center" }}><div style={{ fontSize:12, color:C.primary, fontWeight:600 }}>📱 Table 07 — QR Active</div></div>
          {["Main","Starter","Drink","Dessert"].map(cat => {
            const catItems = items.filter(i => i.category===cat && i.availability==="Available");
            if (!catItems.length) return null;
            return (
              <div key={cat} style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:8 }}>{cat}</div>
                {catItems.map(item => (
                  <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:C.bg, borderRadius:10, marginBottom:6 }}>
                    <div style={{ width:40, height:40, borderRadius:8, background:C.borderLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{item.image}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{item.name}</div>
                      <div style={{ fontSize:11, color:C.textSub }}>⏱ {item.prepTime} mins</div>
                      {(item.allergens||[]).length > 0 && <div style={{ fontSize:10, color:C.amber }}>⚠ {item.allergens.join(", ")}</div>}
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:C.primary }}>{item.price}</div>
                      <button style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:C.primary, color:"#fff", border:"none", cursor:"pointer", marginTop:4 }}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {items.filter(i => i.availability==="Out of Stock").length > 0 && (
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.textSub, marginBottom:8 }}>Unavailable</div>
              {items.filter(i => i.availability==="Out of Stock").map(item => (
                <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:C.borderLight, borderRadius:10, marginBottom:6, opacity:.5 }}>
                  <div style={{ fontSize:22, filter:"grayscale(1)" }}>{item.image}</div>
                  <div style={{ flex:1 }}><div style={{ fontSize:13, color:C.textSub }}>{item.name}</div></div>
                  <Badge color="red" dot={false}>Unavailable</Badge>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
