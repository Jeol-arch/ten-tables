import { useState, useRef, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const RAW_ICONS = {
  dashboard:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  orders:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  menu:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  tables:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  waiter:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  customers:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  bell:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  settings:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  search:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  filter:"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  plus:"M12 4v16m8-8H4",
  chevronLeft:"M15 18l-6-6 6-6",
  chevronRight:"M9 18l6-6-6-6",
  dots:"M12 5v.01M12 12v.01M12 19v.01",
  x:"M6 18L18 6M6 6l12 12",
  check:"M5 13l4 4L19 7",
  edit:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  printer:"M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  merge:"M8 7h12m0 0l-4-4m4 4l-4 4M4 17h12m0 0l-4-4m4 4l-4 4",
  upload:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  warn:"M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  link:"M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  credit:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  preorder:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock:"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
  analytics:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  supervisor:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  shield:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  phone:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  power:"M18.364 5.636a9 9 0 11-12.728 0 M12 2v7",
  download:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  migrate:"M13 5l7 7-7 7 M5 5l7 7-7 7",
  arrowRight:"M5 12h14m-7-7l7 7-7 7",
};
const Ic = ({ name, size=16, color }) => {
  const paths = (RAW_ICONS[name]||"").split(" M ").map((p,i)=>i===0?p:"M "+p);
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color||"currentColor"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{paths.map((p,i)=><path key={i} d={p}/>)}</svg>;
};

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:"#F8F9FB", surface:"#FFFFFF", primary:"#2563EB", primaryLight:"#EFF6FF", primaryDark:"#1D4ED8",
  text:"#111827", textSub:"#6B7280", textMuted:"#9CA3AF",
  border:"#E5E7EB", borderLight:"#F3F4F6",
  green:"#10B981", greenBg:"#ECFDF5",
  red:"#EF4444", redBg:"#FEF2F2",
  amber:"#F59E0B", amberBg:"#FFFBEB",
  blue:"#3B82F6", blueBg:"#EFF6FF",
  purple:"#8B5CF6", purpleBg:"#F5F3FF",
  teal:"#14B8A6", tealBg:"#F0FDFA",
};

// ── Base components ───────────────────────────────────────────────────────────
const Badge = ({ children, color="green", dot=true }) => {
  const m={green:[C.greenBg,C.green],red:[C.redBg,C.red],amber:[C.amberBg,C.amber],blue:[C.blueBg,C.blue],purple:[C.purpleBg,C.purple],teal:[C.tealBg,C.teal],gray:[C.borderLight,C.textSub]};
  const [bg,tc]=m[color]||m.gray;
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:999,background:bg,color:tc,fontSize:12,fontWeight:500,whiteSpace:"nowrap"}}>{dot&&<span style={{width:6,height:6,borderRadius:"50%",background:tc,flexShrink:0}}/>}{children}</span>;
};
const Btn=({children,variant="primary",size="md",onClick,disabled,style:sx})=>{
  const base={display:"inline-flex",alignItems:"center",gap:6,borderRadius:8,fontWeight:500,cursor:disabled?"not-allowed":"pointer",border:"none",transition:"all .15s",fontFamily:"inherit",opacity:disabled?.5:1};
  const sizes={sm:{padding:"5px 10px",fontSize:13},md:{padding:"8px 14px",fontSize:14},lg:{padding:"10px 18px",fontSize:15}};
  const variants={primary:{background:C.primary,color:"#fff"},secondary:{background:C.surface,color:C.text,border:`1px solid ${C.border}`},danger:{background:C.red,color:"#fff"},ghost:{background:"transparent",color:C.textSub},success:{background:C.green,color:"#fff"},amber:{background:C.amberBg,color:C.amber,border:`1px solid ${C.amber}`}};
  return <button onClick={disabled?undefined:onClick} style={{...base,...sizes[size],...variants[variant],...sx}}>{children}</button>;
};
const Input=({placeholder,value,onChange,icon,type="text",readOnly,style:sx})=>(
  <div style={{position:"relative",display:"flex",alignItems:"center",width:sx?.width||"auto"}}>
    {icon&&<span style={{position:"absolute",left:10,color:C.textMuted,pointerEvents:"none",display:"flex"}}><Ic name={icon} size={15}/></span>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
      style={{width:"100%",padding:icon?"7px 12px 7px 32px":"7px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,background:readOnly?C.borderLight:C.surface,outline:"none",fontFamily:"inherit",boxSizing:"border-box",...sx}}/>
  </div>
);
const Sel=({value,onChange,options,style:sx})=>(
  <select value={value} onChange={e=>onChange(e.target.value)}
    style={{padding:"7px 28px 7px 10px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,background:C.surface,outline:"none",fontFamily:"inherit",cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",...sx}}>
    {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);
const Toggle=({value,onChange,label,sublabel})=>(
  <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",userSelect:"none"}}>
    <div onClick={()=>onChange(!value)} style={{width:40,height:22,borderRadius:11,background:value?C.primary:C.border,position:"relative",transition:"background .2s",cursor:"pointer",flexShrink:0}}>
      <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:value?20:2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
    </div>
    {label&&<div><div style={{fontSize:13,fontWeight:500,color:C.text}}>{label}</div>{sublabel&&<div style={{fontSize:11,color:C.textSub,marginTop:1}}>{sublabel}</div>}</div>}
  </label>
);
const Modal=({title,subtitle,onClose,children,width=480})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:C.surface,borderRadius:16,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.18)"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"20px 24px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.surface,zIndex:1}}>
        <div><div style={{fontWeight:700,fontSize:15,color:C.text}}>{title}</div>{subtitle&&<div style={{fontSize:12,color:C.textSub,marginTop:2}}>{subtitle}</div>}</div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.textSub,padding:4,borderRadius:6,display:"flex",flexShrink:0}}><Ic name="x" size={18}/></button>
      </div>
      <div style={{padding:24}}>{children}</div>
    </div>
  </div>
);
const Confirm=({title,message,confirmLabel="Delete",confirmVariant="danger",onConfirm,onCancel})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:C.surface,borderRadius:16,width:"100%",maxWidth:380,padding:28,boxShadow:"0 20px 60px rgba(0,0,0,.2)",textAlign:"center"}}>
      <div style={{width:50,height:50,borderRadius:"50%",background:confirmVariant==="danger"?C.redBg:C.amberBg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
        <Ic name="warn" size={24} color={confirmVariant==="danger"?C.red:C.amber}/>
      </div>
      <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:8}}>{title||"Are you sure?"}</div>
      <div style={{fontSize:13.5,color:C.textSub,marginBottom:24,lineHeight:1.6}}>{message}</div>
      <div style={{display:"flex",gap:10}}>
        <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={onCancel}>Cancel</Btn>
        <Btn variant={confirmVariant} style={{flex:1,justifyContent:"center"}} onClick={onConfirm}>{confirmLabel}</Btn>
      </div>
    </div>
  </div>
);
const FilterPanel=({filters,values,onChange,onApply,onReset})=>(
  <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20,zIndex:300,boxShadow:"0 8px 30px rgba(0,0,0,.12)",minWidth:260}}>
    <div style={{fontWeight:600,fontSize:13,color:C.text,marginBottom:14}}>Filter</div>
    {filters.map(f=>(
      <div key={f.key} style={{marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>{f.label}</div>
        <Sel value={values[f.key]||""} onChange={v=>onChange(f.key,v)} options={[{value:"",label:`All`},...f.options.map(o=>({value:o,label:o}))]} style={{width:"100%"}}/>
      </div>
    ))}
    <div style={{display:"flex",gap:8,marginTop:8}}>
      <Btn variant="secondary" size="sm" style={{flex:1,justifyContent:"center"}} onClick={onReset}>Reset</Btn>
      <Btn variant="primary" size="sm" style={{flex:1,justifyContent:"center"}} onClick={onApply}>Apply</Btn>
    </div>
  </div>
);
const Pager=({count})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 24px",borderTop:`1px solid ${C.border}`}}>
    <span style={{fontSize:12,color:C.textSub}}>{count} result{count!==1?"s":""}</span>
    <div style={{display:"flex",gap:4}}>
      {[1,2,"...",8,9].map((p,i)=><button key={i} style={{width:28,height:28,borderRadius:6,border:`1px solid ${C.border}`,background:p===1?C.primary:C.surface,color:p===1?"#fff":C.text,fontSize:12,cursor:"pointer"}}>{p}</button>)}
    </div>
  </div>
);
const TH=({children,style:sx})=><th style={{padding:"10px 16px",textAlign:"left",fontWeight:500,color:C.textSub,whiteSpace:"nowrap",fontSize:13,...sx}}>{children}</th>;
const TD=({children,style:sx})=><td style={{padding:"12px 16px",fontSize:13,...sx}}>{children}</td>;
const TR=({children,onClick})=>{
  const [h,sH]=useState(false);
  return <tr onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} onClick={onClick} style={{borderBottom:`1px solid ${C.borderLight}`,background:h&&onClick?C.bg:"transparent",cursor:onClick?"pointer":"default",transition:"background .1s"}}>{children}</tr>;
};
const SectionCard=({title,subtitle,children,action})=>(
  <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
    <div style={{padding:"18px 24px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div><div style={{fontWeight:600,fontSize:15,color:C.text}}>{title}</div>{subtitle&&<div style={{fontSize:12,color:C.textSub,marginTop:2}}>{subtitle}</div>}</div>
      {action}
    </div>
    {children}
  </div>
);
const InfoRow=({label,value,mono})=>(
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.borderLight}`}}>
    <span style={{fontSize:13,color:C.textSub}}>{label}</span>
    <span style={{fontSize:13,fontWeight:500,color:C.text,fontFamily:mono?"monospace":"inherit"}}>{value}</span>
  </div>
);

const statusColor=s=>{
  if(["Paid","Available","Successful","Served","Approved","Available"].includes(s))return"green";
  if(["Delayed","Cancelled","Out of Stock","Unavailable","Rejected"].includes(s))return"red";
  if(["Preparing","Pending Payment","Occupied","Pending","Clocked In"].includes(s))return"blue";
  if(["Ready","Awaiting Approval"].includes(s))return"teal";
  if(["Pay Later","Unpaid","Clocked Out"].includes(s))return"amber";
  return"gray";
};

// ── Seed Data ─────────────────────────────────────────────────────────────────
const INIT_MENU=[
  {id:1,name:"Strawberry Oatmeal Pancakes With Honey Syrup",type:"Appetizer",category:"Starter",price:"₦5,000",rawPrice:5000,orderCount:347,availability:"Available",image:"🥞",prepTime:"15",description:"Golden oatmeal pancakes layered with fresh strawberries and drizzled with honey syrup.",allergens:["Gluten","Dairy"]},
  {id:2,name:"Strawberry Milkshake",type:"Drink",category:"Drink",price:"₦3,500",rawPrice:3500,orderCount:220,availability:"Available",image:"🥤",prepTime:"8",description:"A thick, creamy milkshake blended with real strawberries.",allergens:["Dairy"]},
  {id:3,name:"Manhattan",type:"Drink",category:"Drink",price:"₦45,370",rawPrice:45370,orderCount:1639,availability:"Available",image:"🍹",prepTime:"5",description:"A classic whiskey cocktail stirred with sweet vermouth and bitters.",allergens:[]},
  {id:4,name:"Spicy Jollof Rice and Chicken",type:"Food",category:"Main",price:"₦3,200",rawPrice:3200,orderCount:18,availability:"Out of Stock",image:"🍛",prepTime:"25",description:"Smoky jollof rice served with crispy fried chicken and coleslaw.",allergens:[]},
  {id:5,name:"Spicy Chicken",type:"Food",category:"Main",price:"₦7,000",rawPrice:7000,orderCount:224,availability:"Available",image:"🍗",prepTime:"20",description:"Marinated chicken thighs coated in a fiery spice blend, grilled to perfection.",allergens:[]},
  {id:6,name:"Chocolate Cake",type:"Dessert",category:"Dessert",price:"₦3,500",rawPrice:3500,orderCount:89,availability:"Available",image:"🍰",prepTime:"5",description:"Rich three-layer chocolate cake with ganache frosting.",allergens:["Gluten","Dairy","Eggs"]},
  {id:7,name:"Grilled Salmon",type:"Food",category:"Main",price:"₦12,000",rawPrice:12000,orderCount:156,availability:"Available",image:"🐟",prepTime:"22",description:"Atlantic salmon fillet grilled with lemon butter and herbs.",allergens:["Fish"]},
  {id:8,name:"Caesar Salad",type:"Food",category:"Starter",price:"₦4,500",rawPrice:4500,orderCount:201,availability:"Available",image:"🥗",prepTime:"10",description:"Crisp romaine, parmesan, croutons and house Caesar dressing.",allergens:["Gluten","Dairy","Eggs"]},
];
const INIT_ORDERS=[
  {id:"#23456",customer:"Alexis Flores",items:3,price:"₦9,500",rawPrice:9500,table:"Table 7",tableNum:7,waiter:"Bukayo Saka",prepTime:"00:30",status:"Preparing",payType:"Pay Now",orderItems:["Chicken skewers","Strawberry shake","Caesar salad"]},
  {id:"#23457",customer:"Chukwueke Lakhini",items:2,price:"₦5,000",rawPrice:5000,table:"Table 5",tableNum:5,waiter:"Bukayo Saka",prepTime:"02:00",status:"Delayed",payType:"Pay Later",orderItems:["Jollof Rice","Milkshake"]},
  {id:"#23458",customer:"Brown-Hancock",items:3,price:"₦7,000",rawPrice:7000,table:"Table 5",tableNum:5,waiter:"Tunde Adeyemi",prepTime:"05:30",status:"Ready",payType:"Pay Now",orderItems:["Grilled Salmon","Salad","Juice"]},
  {id:"#23459",customer:"Vale Scott",items:1,price:"₦2,500",rawPrice:2500,table:"Table 3",tableNum:3,waiter:"Tunde Adeyemi",prepTime:"10:00",status:"Paid",payType:"Pay Now",orderItems:["Chocolate Cake"]},
  {id:"#23460",customer:"Clifford Milo",items:4,price:"₦15,000",rawPrice:15000,table:"Table 7",tableNum:7,waiter:"Bukayo Saka",prepTime:"02:00",status:"Served",payType:"Pay Later",orderItems:["Steak","Wine","Salad","Bread"]},
  {id:"#23461",customer:"Roland Ollie",items:2,price:"₦8,000",rawPrice:8000,table:"Table 3",tableNum:3,waiter:"Ngozi Okafor",prepTime:"08:00",status:"Served",payType:"Pay Now",orderItems:["Salmon","Cocktail"]},
  {id:"#23462",customer:"Maria Santos",items:5,price:"₦22,000",rawPrice:22000,table:"Table 2",tableNum:2,waiter:"Ngozi Okafor",prepTime:"03:00",status:"Preparing",payType:"Pay Now",orderItems:["5 items"]},
  {id:"#23463",customer:"Ahmed Yusuf",items:1,price:"₦4,500",rawPrice:4500,table:"Table 9",tableNum:9,waiter:"Tunde Adeyemi",prepTime:"01:30",status:"Delayed",payType:"Pay Later",orderItems:["Spicy Chicken"]},
];
const INIT_TABLES=[
  {id:"T01",number:"01",type:"2 seater",capacity:2,status:"Vacant",zone:"Oak Wood 1",mergedWith:[]},
  {id:"T02",number:"02",type:"4 seater",capacity:4,status:"Occupied",zone:"Oak Wood 1",mergedWith:[]},
  {id:"T03",number:"03",type:"4 seater",capacity:4,status:"Pending Payment",zone:"Oak Wood 2",mergedWith:[]},
  {id:"T04",number:"04",type:"2 seater",capacity:2,status:"Vacant",zone:"Oak Wood 2",mergedWith:[]},
  {id:"T05",number:"05",type:"6 seater",capacity:6,status:"Occupied",zone:"Oak Wood 1",mergedWith:[]},
  {id:"T06",number:"06",type:"2 seater",capacity:2,status:"Vacant",zone:"Oak Wood 3",mergedWith:[]},
  {id:"T07",number:"07",type:"8 seater",capacity:8,status:"Occupied",zone:"Oak Wood 3",mergedWith:[]},
  {id:"T08",number:"08",type:"4 seater",capacity:4,status:"Pending Payment",zone:"Oak Wood 2",mergedWith:[]},
];
const INIT_WAITERS=[
  {id:1,name:"Bukayo Saka",tables:["Table 05","Table 07"],availability:"Available",zone:"Oak Wood 1",status:"Clocked In",clockIn:"08:00",clockOut:"—",totalOrders:34,avgResponse:"4.2 min"},
  {id:2,name:"Tunde Adeyemi",tables:["Table 03","Table 05","Table 08"],availability:"Available",zone:"Oak Wood 2",status:"Clocked In",clockIn:"08:15",clockOut:"—",totalOrders:28,avgResponse:"5.1 min"},
  {id:3,name:"Ngozi Okafor",tables:["Table 02","Table 04"],availability:"Unavailable",zone:"Oak Wood 3",status:"Clocked Out",clockIn:"07:30",clockOut:"14:00",totalOrders:12,avgResponse:"6.4 min"},
  {id:4,name:"Emeka Diala",tables:["Table 01","Table 06"],availability:"Available",zone:"Oak Wood 1",status:"Clocked In",clockIn:"09:00",clockOut:"—",totalOrders:19,avgResponse:"3.9 min"},
  {id:5,name:"Fatima Bello",tables:["Table 07"],availability:"Available",zone:"Oak Wood 3",status:"Clocked In",clockIn:"08:45",clockOut:"—",totalOrders:22,avgResponse:"4.7 min"},
  {id:6,name:"Chidi Okeke",tables:["Table 02","Table 08"],availability:"Available",zone:"Oak Wood 2",status:"Clocked Out",clockIn:"—",clockOut:"—",totalOrders:0,avgResponse:"—"},
];
const INIT_CUSTOMERS=[
  {id:1,name:"Joel Oluwatamilore Salem",email:"joel.s@domain.com",totalOrders:100,spent:"₦200,000",rawSpent:200000,dateJoined:"12 Oct, 2026",payLater:false,blacklisted:false},
  {id:2,name:"Chioma Obi",email:"chioma.o@domain.com",totalOrders:200,spent:"₦380,000",rawSpent:380000,dateJoined:"14 Oct, 2026",payLater:true,blacklisted:false},
  {id:3,name:"Adaeze Nwosu",email:"adaeze.n@domain.com",totalOrders:10,spent:"₦45,000",rawSpent:45000,dateJoined:"15 Oct, 2026",payLater:false,blacklisted:false},
  {id:4,name:"Seun Adesola",email:"seun.a@domain.com",totalOrders:56,spent:"₦120,000",rawSpent:120000,dateJoined:"15 Oct, 2026",payLater:false,blacklisted:false},
  {id:5,name:"Kemi Lawal",email:"kemi.l@domain.com",totalOrders:19,spent:"₦60,000",rawSpent:60000,dateJoined:"16 Oct, 2026",payLater:true,blacklisted:true},
];
const INIT_CREDIT_REQUESTS=[
  {id:"CR001",customer:"Chioma Obi",email:"chioma.o@domain.com",table:"Table 5",amount:"₦15,000",rawAmount:15000,requestedAt:"12:30 PM",status:"Awaiting Approval"},
  {id:"CR002",customer:"Joel Oluwatamilore Salem",email:"joel.s@domain.com",table:"Table 2",amount:"₦8,500",rawAmount:8500,requestedAt:"01:05 PM",status:"Awaiting Approval"},
  {id:"CR003",customer:"Fatou Diallo",email:"fatou.d@domain.com",table:"Table 9",amount:"₦22,000",rawAmount:22000,requestedAt:"01:40 PM",status:"Approved"},
];
const INIT_PREORDERS=[
  {id:"PO001",customer:"Emeka Eze",phone:"+234 801 234 5678",items:"Grilled Salmon, Caesar Salad",total:"₦16,500",rawTotal:16500,scheduledFor:"07:30 PM",status:"Holding",notes:"Window seat if possible"},
  {id:"PO002",customer:"Sandra Okonkwo",phone:"+234 703 987 6543",items:"Spicy Chicken x2, Milkshake",total:"₦17,500",rawTotal:17500,scheduledFor:"08:00 PM",status:"Arrived",notes:"Allergy: no dairy"},
];
const INIT_NOTIFICATIONS=[
  {id:1,type:"warning",icon:"warn",color:C.amber,title:"45-min Payment Alert",message:"Table 5 (Chukwueke Lakhini) — open tab unpaid for 45 minutes.",time:"2 min ago",read:false},
  {id:2,type:"info",icon:"clock",color:C.blue,title:"Order Ready for Pickup",message:"Order #23458 (Brown-Hancock, Table 5) is ready at the pass.",time:"5 min ago",read:false},
  {id:3,type:"error",icon:"warn",color:C.red,title:"Delayed Order",message:"Order #23457 (Chukwueke Lakhini) exceeded prep time by 5 min.",time:"8 min ago",read:false},
  {id:4,type:"error",icon:"printer",color:C.red,title:"Printer Offline",message:"Kitchen printer lost connection. Switch to manual order tracking.",time:"12 min ago",read:false},
  {id:5,type:"success",icon:"check",color:C.green,title:"Payment Confirmed",message:"Table 3 (Vale Scott) — ₦2,500 digital payment received.",time:"15 min ago",read:true},
  {id:6,type:"warning",icon:"credit",color:C.amber,title:"Credit Request",message:"Chioma Obi (Table 5) is requesting ₦15,000 credit payment.",time:"20 min ago",read:true},
];
const barData=[28,45,32,60,48,72,55,80,65,90,70,95,75,85,60,78,55,68,82,70,58,75,88,65,72,80,68,90,75,85];

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV=[
  {key:"dashboard",label:"Dashboard",icon:"dashboard"},
  {key:"orders",label:"Orders",icon:"orders"},
  {key:"menu",label:"Menu",icon:"menu"},
  {key:"tables",label:"Tables",icon:"tables"},
  {key:"waiter",label:"Waiter Management",icon:"waiter"},
  {key:"customers",label:"Customers",icon:"customers"},
  {key:"credit",label:"Credit & Pre-Orders",icon:"credit"},
  {key:"supervisor",label:"Supervisor View",icon:"supervisor"},
  {key:"analytics",label:"Analytics & Reports",icon:"analytics"},
  {key:"settings",label:"Settings",icon:"settings"},
];

const Sidebar=({active,setActive})=>(
  <div style={{width:228,flexShrink:0,background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0,overflowY:"auto"}}>
    <div style={{padding:"22px 20px 16px",borderBottom:`1px solid ${C.borderLight}`}}>
      <div style={{fontFamily:"'Georgia',serif",fontWeight:700,fontSize:21,color:C.text,letterSpacing:"-.5px"}}>10<span style={{color:C.primary}}>tables</span>.</div>
      <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>Restaurant Admin</div>
    </div>
    <nav style={{flex:1,padding:"10px 8px"}}>
      {NAV.map(({key,label,icon})=>{
        const on=active===key;
        return <button key={key} onClick={()=>setActive(key)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"8px 11px",borderRadius:8,border:"none",background:on?C.primaryLight:"transparent",color:on?C.primary:C.textSub,fontSize:13,fontWeight:on?600:400,cursor:"pointer",marginBottom:1,textAlign:"left",fontFamily:"inherit",transition:"all .12s"}}>
          <Ic name={icon} size={15} color={on?C.primary:C.textSub}/>{label}
        </button>;
      })}
    </nav>
    <div style={{padding:"10px 8px 18px"}}>
      <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 11px",borderRadius:8,background:C.borderLight}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,flexShrink:0}}>R</div>
        <div><div style={{fontSize:12,fontWeight:600,color:C.text}}>Restaurant Admin</div><div style={{fontSize:11,color:C.textSub}}>Admin</div></div>
      </div>
    </div>
  </div>
);

// ── TopBar ────────────────────────────────────────────────────────────────────
const TopBar=({title,notifications,onBell})=>{
  const unread=notifications.filter(n=>!n.read).length;
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 28px",background:C.surface,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100}}>
      <span style={{fontWeight:700,fontSize:19,color:C.text}}>{title}</span>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Input placeholder="Smart search..." icon="search" value="" onChange={()=>{}} style={{width:200}}/>
        <button onClick={onBell} style={{position:"relative",background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:7,cursor:"pointer",display:"flex",color:C.textSub}}>
          <Ic name="bell" size={16}/>
          {unread>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,borderRadius:"50%",background:C.red,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</span>}
        </button>
      </div>
    </div>
  );
};

// ── Notifications Drawer ──────────────────────────────────────────────────────
const NotifDrawer=({notifications,setNotifications,onClose})=>(
  <div style={{position:"fixed",inset:0,zIndex:900}} onClick={onClose}>
    <div style={{position:"absolute",right:0,top:0,bottom:0,width:380,background:C.surface,boxShadow:"-4px 0 30px rgba(0,0,0,.12)",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 22px",borderBottom:`1px solid ${C.border}`}}>
        <div>
          <div style={{fontWeight:700,fontSize:15,color:C.text}}>Notifications</div>
          <div style={{fontSize:12,color:C.textSub}}>{notifications.filter(n=>!n.read).length} unread</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn variant="ghost" size="sm" onClick={()=>setNotifications(n=>n.map(x=>({...x,read:true})))}>Mark all read</Btn>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.textSub,display:"flex"}}><Ic name="x" size={18}/></button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {notifications.map(n=>(
          <div key={n.id} onClick={()=>setNotifications(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))}
            style={{padding:"14px 22px",borderBottom:`1px solid ${C.borderLight}`,background:n.read?"transparent":"rgba(37,99,235,.03)",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:n.read?C.borderLight:`${n.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic name={n.icon} size={16} color={n.read?C.textMuted:n.color}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:n.read?400:600,fontSize:13,color:C.text}}>{n.title}</div>
              <div style={{fontSize:12,color:C.textSub,marginTop:2,lineHeight:1.5}}>{n.message}</div>
              <div style={{fontSize:11,color:C.textMuted,marginTop:4}}>{n.time}</div>
            </div>
            {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:C.primary,flexShrink:0,marginTop:4}}/>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const BarChart=({data,h=120})=>{const mx=Math.max(...data);return <div style={{display:"flex",alignItems:"flex-end",gap:3,height:h,width:"100%"}}>{data.map((v,i)=><div key={i} style={{flex:1,background:i===data.length-4?C.primary:C.borderLight,borderRadius:"3px 3px 0 0",height:`${(v/mx)*100}%`}}/>)}</div>;};

const DashboardPage=({setPage})=>{
  const [chartTab,setChartTab]=useState("Monthly");
  const [sel,setSel]=useState(null);
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const [pf,setPf]=useState({});
  const [search,setSearch]=useState("");
  const mostOrdered=[...INIT_MENU].sort((a,b)=>b.orderCount-a.orderCount).slice(0,4);
  const filtered=INIT_ORDERS.filter(o=>{
    const s=o.customer.toLowerCase().includes(search.toLowerCase());
    const fs=!fv.status||o.status===fv.status;
    const fp=!fv.payType||o.payType===fv.payType;
    return s&&fs&&fp;
  });
  const statusSummary=[["Preparing",INIT_ORDERS.filter(o=>o.status==="Preparing").length],["Ready",INIT_ORDERS.filter(o=>o.status==="Ready").length],["Served",INIT_ORDERS.filter(o=>o.status==="Served").length],["Paid",INIT_ORDERS.filter(o=>o.status==="Paid").length],["Delayed",INIT_ORDERS.filter(o=>o.status==="Delayed").length]];
  return(
    <div style={{padding:28,display:"flex",flexDirection:"column",gap:22}}>
      {/* KPI Row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {[["Total Inflow (Today)","₦300.634M","↑ 53.4% vs yesterday",C.green],["Total Orders","5,000","↑ 53.4% vs yesterday",C.green],["Total Customers","60,439","↑ 53.4% vs yesterday",C.green]].map(([l,v,s,c])=>(
          <div key={l} style={{background:C.surface,borderRadius:12,padding:"20px 22px",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:12,color:C.textSub,marginBottom:6}}>{l}</div>
            <div style={{fontSize:26,fontWeight:700,color:C.text,marginBottom:4}}>{v}</div>
            <div style={{fontSize:12,color:c}}>{s}</div>
          </div>
        ))}
      </div>

      {/* Order status pills */}
      <div style={{display:"flex",gap:10}}>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 22px",flex:1}}>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:12}}>Live Order Status</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {statusSummary.map(([s,n])=><div key={s} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 16px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`,minWidth:80}}><div style={{fontSize:20,fontWeight:700,color:C.text}}>{n}</div><Badge color={statusColor(s)} dot={false}>{s}</Badge></div>)}
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 290px",gap:16}}>
        {/* Chart */}
        <div style={{background:C.surface,borderRadius:12,padding:24,border:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div><div style={{fontWeight:600,fontSize:15,color:C.text}}>Order Rate</div><div style={{fontSize:12,color:C.textSub}}>Order activity this year</div></div>
            <div style={{display:"flex",gap:2,background:C.borderLight,borderRadius:8,padding:3}}>
              {["Monthly","Weekly","Yearly"].map(t=><button key={t} onClick={()=>setChartTab(t)} style={{padding:"4px 10px",borderRadius:6,border:"none",background:chartTab===t?C.surface:"transparent",color:chartTab===t?C.text:C.textSub,fontSize:12,fontWeight:chartTab===t?600:400,cursor:"pointer",fontFamily:"inherit"}}>{t}</button>)}
            </div>
          </div>
          <BarChart data={barData} h={130}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>{["Jan","Mar","May","Jul","Sep","Nov"].map(m=><span key={m} style={{fontSize:11,color:C.textMuted}}>{m}</span>)}</div>
        </div>
        {/* Most ordered */}
        <div style={{background:C.surface,borderRadius:12,padding:20,border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:600,fontSize:15,color:C.text,marginBottom:14}}>Most Ordered</div>
          {mostOrdered.map((item,i)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<mostOrdered.length-1?`1px solid ${C.borderLight}`:"none"}}>
              <div style={{width:34,height:34,borderRadius:8,background:C.borderLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{item.image}</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div><div style={{fontSize:11,color:C.textSub}}>{item.orderCount} orders</div></div>
              <span style={{fontSize:12,fontWeight:600,color:C.primary,whiteSpace:"nowrap"}}>{item.price}</span>
            </div>
          ))}
          <button onClick={()=>setPage("menu")} style={{width:"100%",marginTop:12,padding:"7px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.textSub,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>View full menu →</button>
        </div>
      </div>

      {/* Recent orders table */}
      <div style={{background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:`1px solid ${C.border}`,flexWrap:"wrap",gap:10}}>
          <span style={{fontWeight:600,fontSize:15,color:C.text}}>Recent Orders</span>
          <div style={{display:"flex",gap:8}}>
            <Input placeholder="Search customer..." value={search} onChange={e=>setSearch(e.target.value)} icon="search" style={{width:200}}/>
            <div style={{position:"relative"}}>
              <Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{(fv.status||fv.payType)?" ●":""}</Btn>
              {filterOpen&&<FilterPanel filters={[{key:"status",label:"Status",options:["Preparing","Delayed","Ready","Served","Paid"]},{key:"payType",label:"Payment Type",options:["Pay Now","Pay Later"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}
            </div>
          </div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.borderLight}}>{["Customer","Items","Price","Table","Waiter","Prep Time","Status","Type"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{filtered.map(o=><TR key={o.id} onClick={()=>setSel(o)}><TD style={{color:C.primary,fontWeight:500}}>{o.customer}</TD><TD>{o.items}</TD><TD style={{fontWeight:500}}>{o.price}</TD><TD>{o.table}</TD><TD style={{color:C.textSub}}>{o.waiter}</TD><TD><span style={{fontFamily:"monospace",fontSize:12}}>{o.prepTime}</span></TD><TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD><TD><Badge color={o.payType==="Pay Later"?"amber":"blue"} dot={false}>{o.payType}</Badge></TD></TR>)}</tbody>
          </table>
        </div>
        <Pager count={filtered.length}/>
      </div>
      {sel&&<Modal title={`Order ${sel.id}`} onClose={()=>setSel(null)} width={420}><div style={{display:"flex",gap:8,marginBottom:16}}><Badge color={statusColor(sel.status)}>{sel.status}</Badge><Badge color={sel.payType==="Pay Later"?"amber":"blue"} dot={false}>{sel.payType}</Badge></div>{[["Waiter",sel.waiter],["Table",sel.table],["Date","30 Sept, 2026"]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}<div style={{fontWeight:600,fontSize:13,color:C.text,marginTop:16,marginBottom:8}}>Items</div>{sel.orderItems.map((it,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.borderLight}`}}><span style={{fontSize:20}}>🍽️</span><div style={{flex:1,fontSize:13,color:C.text}}>{it}</div><div style={{fontSize:13,fontWeight:600}}>₦{(sel.rawPrice/sel.items).toLocaleString()}</div></div>)}<div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><span style={{fontWeight:600}}>Total</span><span style={{fontWeight:700}}>{sel.price}</span></div></Modal>}
    </div>
  );
};

// ── ORDERS ────────────────────────────────────────────────────────────────────
const OrdersPage=()=>{
  const [orders,setOrders]=useState(INIT_ORDERS);
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [markOpen,setMarkOpen]=useState(false);
  const [mergeOpen,setMergeOpen]=useState(false);
  const [mergeTargets,setMergeTargets]=useState([]);
  const [posRef,setPosRef]=useState("");
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const[pf,setPf]=useState({});
  const filtered=orders.filter(o=>{
    const s=o.customer.toLowerCase().includes(search.toLowerCase())||o.id.includes(search);
    return s&&(!fv.status||o.status===fv.status)&&(!fv.table||o.table===fv.table)&&(!fv.payType||o.payType===fv.payType);
  });
  const LIFECYCLE=["Preparing","Ready","Served","Paid"];
  const nextStatus=s=>{const i=LIFECYCLE.indexOf(s);return i>=0&&i<LIFECYCLE.length-1?LIFECYCLE[i+1]:null};
  const advanceOrder=id=>setOrders(prev=>prev.map(o=>o.id===id?{...o,status:nextStatus(o.status)||o.status}:o));
  const toggleMerge=id=>setMergeTargets(t=>t.includes(id)?t.filter(x=>x!==id):[...t,id]);
  const doMerge=()=>{
    const[first,...rest]=mergeTargets;
    const fo=orders.find(o=>o.id===first);
    const ro=orders.filter(o=>rest.includes(o.id));
    const ci=ro.reduce((s,o)=>s+o.items,fo.items);
    const cp=ro.reduce((s,o)=>s+o.rawPrice,fo.rawPrice);
    setOrders(prev=>prev.filter(o=>!rest.includes(o.id)).map(o=>o.id===first?{...o,items:ci,rawPrice:cp,price:`₦${cp.toLocaleString()}`,customer:`${o.customer} +${rest.length}`}:o));
    setMergeTargets([]);setMergeOpen(false);
  };
  return(
    <div style={{padding:28}}>
      {mergeTargets.length>0&&<div style={{background:C.primaryLight,border:`1px solid ${C.primary}`,borderRadius:10,padding:"12px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:13,color:C.primary,fontWeight:500}}>{mergeTargets.length} order{mergeTargets.length>1?"s":""} selected</span><div style={{display:"flex",gap:8}}><Btn variant="secondary" size="sm" onClick={()=>setMergeTargets([])}>Clear</Btn><Btn variant="primary" size="sm" disabled={mergeTargets.length<2} onClick={()=>setMergeOpen(true)}>Merge Orders</Btn></div></div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["Total Orders",orders.length,C.text],["Preparing",orders.filter(o=>o.status==="Preparing").length,C.blue],["Ready",orders.filter(o=>o.status==="Ready").length,C.teal],["Delayed",orders.filter(o=>o.status==="Delayed").length,C.red]].map(([l,v,c])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c}}>{v}</div></div>
        ))}
      </div>
      <SectionCard title="Orders" subtitle="Tick checkboxes on multiple orders to merge them" action={<div style={{display:"flex",gap:8}}><Input placeholder="Search orders..." value={search} onChange={e=>setSearch(e.target.value)} icon="search" style={{width:200}}/><div style={{position:"relative"}}><Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{(fv.status||fv.table||fv.payType)?" ●":""}</Btn>{filterOpen&&<FilterPanel filters={[{key:"status",label:"Status",options:["Preparing","Ready","Served","Delayed","Paid"]},{key:"table",label:"Table",options:[...new Set(INIT_ORDERS.map(o=>o.table))]},{key:"payType",label:"Payment Type",options:["Pay Now","Pay Later"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}</div></div>}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.borderLight}}>{["","Order ID","Customer","Items","Price","Table","Waiter","Status","Type","Advance",""].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{filtered.map(o=><TR key={o.id}><TD><input type="checkbox" checked={mergeTargets.includes(o.id)} onChange={()=>toggleMerge(o.id)} style={{cursor:"pointer",accentColor:C.primary}} onClick={e=>e.stopPropagation()}/></TD><TD style={{color:C.textSub,fontFamily:"monospace",fontSize:12}}>{o.id}</TD><TD style={{color:C.primary,fontWeight:500,cursor:"pointer"}} onClick={()=>setSel(o)}>{o.customer}</TD><TD>{o.items}</TD><TD style={{fontWeight:500}}>{o.price}</TD><TD>{o.table}</TD><TD style={{color:C.textSub}}>{o.waiter}</TD><TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD><TD><Badge color={o.payType==="Pay Later"?"amber":"blue"} dot={false}>{o.payType}</Badge></TD><TD>{nextStatus(o.status)&&<Btn variant="secondary" size="sm" onClick={()=>advanceOrder(o.id)}>→ {nextStatus(o.status)}</Btn>}</TD><TD><button onClick={()=>setSel(o)} style={{background:"none",border:"none",cursor:"pointer",color:C.textSub,display:"flex"}}><Ic name="dots" size={16}/></button></TD></TR>)}</tbody>
          </table>
        </div>
        <Pager count={filtered.length}/>
      </SectionCard>
      {mergeOpen&&<Modal title="Merge Orders" onClose={()=>setMergeOpen(false)} width={440}><div style={{padding:12,background:C.amberBg,borderRadius:8,fontSize:13,color:C.amber,marginBottom:16}}>⚠️ This combines selected orders into one bill. Cannot be undone.</div>{mergeTargets.map(id=>{const o=orders.find(x=>x.id===id);return o?<div key={id} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:C.bg,borderRadius:8,marginBottom:6}}><span style={{fontSize:13,color:C.text}}>{o.customer} — {o.table}</span><span style={{fontSize:13,fontWeight:600,color:C.primary}}>{o.price}</span></div>:null;})}<div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:`1px solid ${C.border}`,marginTop:8}}><span style={{fontWeight:600,color:C.text}}>Combined Total</span><span style={{fontWeight:700,color:C.primary}}>₦{mergeTargets.reduce((s,id)=>s+(orders.find(o=>o.id===id)?.rawPrice||0),0).toLocaleString()}</span></div><div style={{display:"flex",gap:8,marginTop:16}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setMergeOpen(false)}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} onClick={doMerge}>Confirm Merge</Btn></div></Modal>}
      {sel&&!markOpen&&<Modal title={`Order ${sel.id}`} onClose={()=>setSel(null)} width={440}><div style={{display:"flex",gap:8,marginBottom:16}}><Badge color={statusColor(sel.status)}>{sel.status}</Badge><Badge color={sel.payType==="Pay Later"?"amber":"blue"} dot={false}>{sel.payType}</Badge></div>{[["Waiter",sel.waiter],["Table",sel.table],["Date","30 Sept, 2026"]].map(([l,v])=><InfoRow key={l} label={l} value={v}/>)}<div style={{fontWeight:600,fontSize:13,color:C.text,marginTop:16,marginBottom:8}}>Items</div>{sel.orderItems.map((it,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.borderLight}`}}><span style={{fontSize:20}}>🍽️</span><div style={{flex:1,fontSize:13,color:C.text}}>{it}</div></div>)}<div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><span style={{fontWeight:600}}>Total</span><span style={{fontWeight:700}}>{sel.price}</span></div><div style={{display:"flex",gap:8,marginTop:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setMarkOpen(true)}>Mark as Paid</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}}><Ic name="printer" size={14}/>Print Receipt</Btn></div></Modal>}
      {markOpen&&<Modal title="POS Settlement" onClose={()=>{setMarkOpen(false);setSel(null)}} width={400}><div style={{padding:12,background:C.amberBg,borderRadius:8,fontSize:12.5,color:C.amber,marginBottom:16}}>A valid transaction reference is required before marking as paid.</div><div style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Payment Method</div><Sel value="pos" onChange={()=>{}} options={[{value:"pos",label:"POS Terminal"},{value:"transfer",label:"Bank Transfer"},{value:"cash",label:"Cash"}]} style={{width:"100%"}}/></div><div style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Transaction Reference (RRN) *</div><Input placeholder="Enter POS receipt reference" value={posRef} onChange={e=>setPosRef(e.target.value)} style={{width:"100%"}}/></div><Btn variant="primary" disabled={!posRef.trim()} style={{width:"100%",justifyContent:"center"}} onClick={()=>{setMarkOpen(false);setSel(null);setPosRef("")}}>Confirm Payment</Btn></Modal>}
    </div>
  );
};

// ── MENU ──────────────────────────────────────────────────────────────────────
const MenuPage=()=>{
  const [items,setItems]=useState(INIT_MENU);
  const [search,setSearch]=useState("");
  const [editItem,setEditItem]=useState(null);
  const [payLate,setPayLate]=useState(false);
  const [preview,setPreview]=useState(null);
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const[pf,setPf]=useState({});
  const blank={name:"",rawPrice:0,type:"Food",size:"None",availability:"Available",prepTime:"",category:"Main",description:"",image:"🍽️",allergens:[]};
  const [form,setForm]=useState(blank);
  const openEdit=item=>{setForm({...item,rawPrice:String(item.rawPrice)});setEditItem(item.id||"new");};
  const save=()=>{
    const rp=Number(form.rawPrice)||0;
    const up={...form,rawPrice:rp,price:`₦${rp.toLocaleString()}`};
    if(editItem==="new")setItems(prev=>[...prev,{...up,id:Date.now(),orderCount:0}]);
    else setItems(prev=>prev.map(i=>i.id===editItem?{...i,...up}:i));
    setEditItem(null);
  };
  const filtered=items.filter(i=>{
    const s=i.name.toLowerCase().includes(search.toLowerCase());
    return s&&(!fv.category||i.category===fv.category)&&(!fv.type||i.type===fv.type)&&(!fv.availability||i.availability===fv.availability);
  });
  const ALLERGENS=["Gluten","Dairy","Eggs","Fish","Nuts","Soy"];
  return(
    <div style={{padding:28}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["Total Items",items.length,C.text],["Available",items.filter(i=>i.availability==="Available").length,C.green],["Out of Stock",items.filter(i=>i.availability==="Out of Stock").length,C.red],["Top Item",INIT_MENU.sort((a,b)=>b.orderCount-a.orderCount)[0].name.split(" ").slice(0,2).join(" "),C.purple]].map(([l,v,c])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:l==="Top Item"?14:22,fontWeight:700,color:c,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</div></div>
        ))}
      </div>
      <SectionCard title="Menu" action={<div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><Toggle value={payLate} onChange={setPayLate} label="Pay Later for all orders"/><Input placeholder="Search items..." value={search} onChange={e=>setSearch(e.target.value)} icon="search" style={{width:180}}/><div style={{position:"relative"}}><Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{(fv.category||fv.type||fv.availability)?" ●":""}</Btn>{filterOpen&&<FilterPanel filters={[{key:"category",label:"Category",options:["Main","Starter","Dessert","Drink"]},{key:"type",label:"Type",options:["Food","Drink","Dessert","Appetizer"]},{key:"availability",label:"Availability",options:["Available","Out of Stock"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}</div><Btn variant="secondary" size="sm" onClick={()=>setPreview("preview")}><Ic name="eye" size={14}/>Diner Preview</Btn><Btn variant="primary" size="sm" onClick={()=>{setForm(blank);setEditItem("new");}}><Ic name="plus" size={14}/>New Item</Btn></div>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["","Item Name","Type","Category","Allergens","Orders","Price","Availability",""].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{filtered.map(item=><TR key={item.id} onClick={()=>openEdit(item)}><TD><div style={{width:36,height:36,borderRadius:8,background:C.borderLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{item.image}</div></TD><TD style={{color:C.primary,fontWeight:500,maxWidth:240}}><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div></TD><TD style={{color:C.textSub}}>{item.type}</TD><TD style={{color:C.textSub}}>{item.category}</TD><TD><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{(item.allergens||[]).map(a=><span key={a} style={{fontSize:10,padding:"1px 5px",borderRadius:4,background:C.amberBg,color:C.amber}}>{a}</span>)}</div></TD><TD>{item.orderCount}</TD><TD style={{fontWeight:500}}>{item.price}</TD><TD><Badge color={item.availability==="Available"?"green":"red"}>{item.availability}</Badge></TD><TD><button onClick={e=>{e.stopPropagation();openEdit(item)}} style={{background:"none",border:"none",cursor:"pointer",color:C.textSub,display:"flex"}}><Ic name="edit" size={15}/></button></TD></TR>)}</tbody>
        </table>
        <Pager count={filtered.length}/>
      </SectionCard>
      {editItem!==null&&<Modal title={editItem==="new"?"Add Menu Item":"Edit Menu Item"} onClose={()=>setEditItem(null)} width={540}>
        <div style={{display:"grid",gap:14}}>
          <div style={{width:"100%",height:100,border:`2px dashed ${C.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,gap:12,cursor:"pointer"}}>
            <span style={{fontSize:48}}>{form.image}</span><div style={{textAlign:"center",color:C.textSub}}><Ic name="upload" size={18}/><div style={{fontSize:12,marginTop:4}}>Upload image</div></div>
          </div>
          <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Item Name *</div><Input placeholder="e.g. Grilled Salmon" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{width:"100%"}}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Price (₦) *</div><Input placeholder="5000" type="number" value={form.rawPrice} onChange={e=>setForm(f=>({...f,rawPrice:e.target.value}))} style={{width:"100%"}}/></div>
            <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Prep Time (mins)</div><Input placeholder="15" type="number" value={form.prepTime} onChange={e=>setForm(f=>({...f,prepTime:e.target.value}))} style={{width:"100%"}}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Type</div><Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["Food","Drink","Dessert","Appetizer"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div>
            <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Category</div><Sel value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={["Main","Starter","Dessert","Drink"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div>
          </div>
          <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Availability</div><Sel value={form.availability} onChange={v=>setForm(f=>({...f,availability:v}))} options={["Available","Out of Stock"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div>
          <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:8}}>Allergen Tags</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{ALLERGENS.map(a=>{const on=(form.allergens||[]).includes(a);return<button key={a} onClick={()=>setForm(f=>({...f,allergens:on?(f.allergens||[]).filter(x=>x!==a):[...(f.allergens||[]),a]}))} style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${on?C.amber:C.border}`,background:on?C.amberBg:"transparent",color:on?C.amber:C.textSub,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{a}</button>;})}</div></div>
          <div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Description</div><textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} style={{width:"100%",padding:"8px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:70,outline:"none",color:C.text,boxSizing:"border-box"}} placeholder="Describe the item..."/></div>
          <div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setEditItem(null)}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} disabled={!form.name.trim()} onClick={save}>{editItem==="new"?"Add Item":"Save Changes"}</Btn></div>
        </div>
      </Modal>}
      {/* Diner Preview Sandbox */}
      {preview&&<Modal title="Diner Preview (Sandbox)" subtitle="This simulates what a customer sees after scanning the QR code" onClose={()=>setPreview(null)} width={400}>
        <div style={{background:"#F0F4FF",borderRadius:12,padding:16,marginBottom:16,textAlign:"center"}}><div style={{fontSize:12,color:C.primary,fontWeight:600}}>📱 Table 07 — QR Active</div></div>
        {["Main","Starter","Drink","Dessert"].map(cat=>{
          const catItems=items.filter(i=>i.category===cat&&i.availability==="Available");
          if(!catItems.length)return null;
          return (
            <div key={cat} style={{marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>{cat}</div>
              {catItems.map(item=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.bg,borderRadius:10,marginBottom:6}}>
                  <div style={{width:40,height:40,borderRadius:8,background:C.borderLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{item.image}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500,color:C.text}}>{item.name}</div>
                    <div style={{fontSize:11,color:C.textSub}}>⏱ {item.prepTime} mins</div>
                    {(item.allergens||[]).length>0&&<div style={{fontSize:10,color:C.amber}}>⚠ {item.allergens.join(", ")}</div>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:14,fontWeight:700,color:C.primary}}>{item.price}</div>
                    <button style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:C.primary,color:"#fff",border:"none",cursor:"pointer",marginTop:4}}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        {items.filter(i=>i.availability==="Out of Stock").length>0&&(
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.textSub,marginBottom:8}}>Unavailable</div>
            {items.filter(i=>i.availability==="Out of Stock").map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.borderLight,borderRadius:10,marginBottom:6,opacity:.5}}>
                <div style={{width:40,height:40,borderRadius:8,background:C.borderLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,filter:"grayscale(1)"}}>{item.image}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:C.textSub}}>{item.name}</div></div>
                <Badge color="red" dot={false}>Unavailable</Badge>
              </div>
            ))}
          </div>
        )}
      </Modal>}
    </div>
  );
};

// ── TABLES ────────────────────────────────────────────────────────────────────
const TablesPage=()=>{
  const [tables,setTables]=useState(INIT_TABLES);
  const [filterStatus,setFilterStatus]=useState("All");
  const [addOpen,setAddOpen]=useState(false);
  const [editTable,setEditTable]=useState(null);
  const [qrTable,setQrTable]=useState(null);
  const [mergeOpen,setMergeOpen]=useState(false);
  const [migrateOpen,setMigrateOpen]=useState(false);
  const [migrateFrom,setMigrateFrom]=useState(null);
  const [migrateTo,setMigrateTo]=useState("");
  const [mergeSelected,setMergeSelected]=useState([]);
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const[pf,setPf]=useState({});
  const blank={number:"",type:"2 seater",capacity:2,zone:"Oak Wood 1"};
  const [form,setForm]=useState(blank);
  const statusColor=s=>({Vacant:"green",Occupied:"blue","Pending Payment":"amber"}[s]||"gray");
  const displayed=tables.filter(t=>(filterStatus==="All"||t.status===filterStatus)&&(!fv.zone||t.zone===fv.zone));
  const openEdit=t=>{setForm({number:t.number,type:t.type,capacity:t.capacity,zone:t.zone});setEditTable(t);setAddOpen(true);};
  const saveTable=()=>{
    if(!editTable)setTables(prev=>[...prev,{id:`T${Date.now()}`,...form,status:"Vacant",mergedWith:[]}]);
    else setTables(prev=>prev.map(t=>t.id===editTable.id?{...t,...form}:t));
    setAddOpen(false);setEditTable(null);
  };
  const doMerge=()=>{
    const[master,...rest]=mergeSelected;
    setTables(prev=>prev.map(t=>{if(t.id===master)return{...t,mergedWith:[...t.mergedWith,...rest]};if(rest.includes(t.id))return{...t,status:"Occupied",mergedWith:[master]};return t;}));
    setMergeSelected([]);setMergeOpen(false);
  };
  const doMigrate=()=>{
    if(!migrateFrom||!migrateTo)return;
    setTables(prev=>prev.map(t=>{
      if(t.id===migrateFrom.id)return{...t,status:"Vacant",mergedWith:[]};
      if(t.id===migrateTo)return{...t,status:"Occupied"};
      return t;
    }));
    setMigrateOpen(false);setMigrateFrom(null);setMigrateTo("");
  };
  return(
    <div style={{padding:28}}>
      {mergeSelected.length>0&&<div style={{background:C.primaryLight,border:`1px solid ${C.primary}`,borderRadius:10,padding:"12px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:13,color:C.primary,fontWeight:500}}>{mergeSelected.length} table{mergeSelected.length>1?"s":""} selected</span><div style={{display:"flex",gap:8}}><Btn variant="secondary" size="sm" onClick={()=>setMergeSelected([])}>Clear</Btn><Btn variant="primary" size="sm" disabled={mergeSelected.length<2} onClick={()=>setMergeOpen(true)}>Merge Tables</Btn></div></div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["Total",tables.length,C.text],["Vacant",tables.filter(t=>t.status==="Vacant").length,C.green],["Occupied",tables.filter(t=>t.status==="Occupied").length,C.blue],["Pending Pay",tables.filter(t=>t.status==="Pending Payment").length,C.amber]].map(([l,v,c])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c}}>{v}</div></div>
        ))}
      </div>
      <SectionCard title="Tables" action={<div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:2,background:C.borderLight,borderRadius:8,padding:3}}>
          {["All","Vacant","Occupied","Pending Payment"].map(s=><button key={s} onClick={()=>setFilterStatus(s)} style={{padding:"4px 9px",borderRadius:6,border:"none",background:filterStatus===s?C.surface:"transparent",color:filterStatus===s?C.text:C.textSub,fontSize:12,fontWeight:filterStatus===s?600:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{s}</button>)}
        </div>
        <div style={{position:"relative"}}><Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{fv.zone?" ●":""}</Btn>{filterOpen&&<FilterPanel filters={[{key:"zone",label:"Zone",options:["Oak Wood 1","Oak Wood 2","Oak Wood 3"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}</div>
        <Btn variant="secondary" size="sm" onClick={()=>{setMigrateFrom(null);setMigrateOpen(true)}}><Ic name="migrate" size={14}/>Migrate Session</Btn>
        <Btn variant="primary" size="sm" onClick={()=>{setForm(blank);setEditTable(null);setAddOpen(true)}}><Ic name="plus" size={14}/>Add Table</Btn>
      </div>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["","Table","Type","Cap","Zone","Status","Merged With","Actions"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{displayed.map(table=><TR key={table.id}><TD><input type="checkbox" checked={mergeSelected.includes(table.id)} onChange={()=>setMergeSelected(s=>s.includes(table.id)?s.filter(x=>x!==table.id):[...s,table.id])} style={{cursor:"pointer",accentColor:C.primary}}/></TD><TD style={{fontWeight:600,color:C.primary}}>Table {table.number}</TD><TD style={{color:C.textSub}}>{table.type}</TD><TD style={{color:C.textSub}}>{table.capacity}</TD><TD style={{color:C.textSub}}>{table.zone}</TD><TD><Badge color={statusColor(table.status)}>{table.status}</Badge></TD><TD>{table.mergedWith.length>0?<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{table.mergedWith.map(mid=>{const mt=tables.find(t=>t.id===mid);return mt?<span key={mid} style={{fontSize:11,padding:"2px 6px",background:C.purpleBg,color:C.purple,borderRadius:4}}>T{mt.number}</span>:null;})}</div>:<span style={{color:C.textMuted,fontSize:12}}>—</span>}</TD><TD><div style={{display:"flex",gap:5}}><button onClick={()=>setQrTable(table)} style={{fontSize:12,color:C.primary,background:C.primaryLight,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>QR</button><button onClick={()=>openEdit(table)} style={{fontSize:12,color:C.textSub,background:C.borderLight,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>Edit</button><button onClick={()=>{setMigrateFrom(table);setMigrateOpen(true)}} style={{fontSize:12,color:C.purple,background:C.purpleBg,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>Migrate</button></div></TD></TR>)}</tbody>
        </table>
        <Pager count={displayed.length}/>
      </SectionCard>
      {addOpen&&<Modal title={editTable?"Edit Table "+editTable.number:"Add New Table"} onClose={()=>{setAddOpen(false);setEditTable(null)}} width={420}><div style={{display:"flex",flexDirection:"column",gap:14}}><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Table Number *</div><Input placeholder="e.g. 09" value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} style={{width:"100%"}}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Seating Type</div><Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["2 seater","4 seater","6 seater","8 seater","10 seater"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Capacity</div><Input placeholder="4" type="number" value={form.capacity} onChange={e=>setForm(f=>({...f,capacity:e.target.value}))} style={{width:"100%"}}/></div></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Zone</div><Sel value={form.zone} onChange={v=>setForm(f=>({...f,zone:v}))} options={["Oak Wood 1","Oak Wood 2","Oak Wood 3"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div><div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>{setAddOpen(false);setEditTable(null)}}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} disabled={!form.number.trim()} onClick={saveTable}>{editTable?"Save Changes":"Create Table"}</Btn></div></div></Modal>}
      {mergeOpen&&<Modal title="Merge Tables" onClose={()=>setMergeOpen(false)} width={460}><div style={{padding:12,background:C.amberBg,borderRadius:8,fontSize:13,color:C.amber,marginBottom:16}}>⚠️ Tables share one bill and cannot be unmerged while there is an unpaid balance.</div><div style={{fontWeight:500,fontSize:13,color:C.text,marginBottom:8}}>Tables to merge:</div><div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>{mergeSelected.map((id,idx)=>{const t=tables.find(x=>x.id===id);return t?<div key={id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:idx===0?C.primaryLight:C.bg,borderRadius:8,border:`1px solid ${idx===0?C.primary:C.border}`}}><div><span style={{fontWeight:600,color:idx===0?C.primary:C.text}}>Table {t.number}</span>{idx===0&&<span style={{fontSize:11,color:C.primary,marginLeft:8,background:"rgba(37,99,235,.1)",padding:"1px 6px",borderRadius:4}}>Master</span>}<span style={{fontSize:12,color:C.textSub,marginLeft:8}}>{t.type} · {t.zone}</span></div><Badge color={statusColor(t.status)}>{t.status}</Badge></div>:null;})}</div><div style={{fontSize:12,color:C.textSub,marginBottom:16}}>First selected table becomes the master. All orders consolidate under it.</div><div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setMergeOpen(false)}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} onClick={doMerge}>Confirm Merge</Btn></div></Modal>}
      {migrateOpen&&<Modal title="Migrate Table Session" subtitle="Move an active session to a different physical table" onClose={()=>{setMigrateOpen(false);setMigrateFrom(null)}} width={440}><div style={{marginBottom:14}}><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Migrate FROM (active table)</div><Sel value={migrateFrom?.id||""} onChange={v=>setMigrateFrom(tables.find(t=>t.id===v)||null)} options={[{value:"",label:"Select source table..."},...tables.filter(t=>t.status==="Occupied"||t.status==="Pending Payment").map(t=>({value:t.id,label:`Table ${t.number} — ${t.status}`}))]} style={{width:"100%"}}/></div><div style={{marginBottom:20}}><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Migrate TO (vacant table)</div><Sel value={migrateTo} onChange={setMigrateTo} options={[{value:"",label:"Select destination table..."},...tables.filter(t=>t.status==="Vacant"&&(!migrateFrom||t.id!==migrateFrom.id)).map(t=>({value:t.id,label:`Table ${t.number} — ${t.type} · ${t.zone}`}))]} style={{width:"100%"}}/></div><div style={{padding:12,background:C.blueBg,borderRadius:8,fontSize:12.5,color:C.blue,marginBottom:16}}>ℹ️ All orders, items and the active session ID will transfer to the destination table. The source table will be marked Vacant.</div><div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>{setMigrateOpen(false);setMigrateFrom(null)}}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} disabled={!migrateFrom||!migrateTo} onClick={doMigrate}>Migrate Session</Btn></div></Modal>}
      {qrTable&&<Modal title={`QR Code — Table ${qrTable.number}`} onClose={()=>setQrTable(null)} width={340}><div style={{textAlign:"center"}}><div style={{width:160,height:160,margin:"0 auto 16px",background:"#000",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",padding:14}}><svg viewBox="0 0 100 100" width="132" height="132">{[...Array(10)].map((_,r)=>[...Array(10)].map((_,c)=>{const on=((r+c+r*c)%3===0)||(r<3&&c<3)||(r<3&&c>6)||(r>6&&c<3);return on?<rect key={`${r}-${c}`} x={c*10} y={r*10} width={9} height={9} fill="white"/>:null;}))}</svg></div><div style={{fontWeight:700,fontSize:16,color:C.text}}>Table {qrTable.number}</div><div style={{fontSize:12,color:C.textSub,marginTop:4}}>{qrTable.type} · {qrTable.zone}</div><Btn variant="primary" style={{width:"100%",justifyContent:"center",marginTop:20}}><Ic name="printer" size={14}/>Print QR Code</Btn></div></Modal>}
    </div>
  );
};

// ── WAITER MANAGEMENT ─────────────────────────────────────────────────────────
const WaiterPage=()=>{
  const [waiters,setWaiters]=useState(INIT_WAITERS);
  const [search,setSearch]=useState("");
  const [modalOpen,setModalOpen]=useState(false);
  const [editWaiter,setEditWaiter]=useState(null);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [clockTarget,setClockTarget]=useState(null);
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const[pf,setPf]=useState({});
  const blank={name:"",zone:"Oak Wood 1",availability:"Available",tables:[],status:"Clocked Out",clockIn:"—",clockOut:"—",totalOrders:0,avgResponse:"—"};
  const [form,setForm]=useState(blank);
  const openEdit=w=>{setForm({name:w.name,zone:w.zone,availability:w.availability,tables:[...w.tables],status:w.status,clockIn:w.clockIn,clockOut:w.clockOut,totalOrders:w.totalOrders,avgResponse:w.avgResponse});setEditWaiter(w);setModalOpen(true);};
  const save=()=>{
    if(!editWaiter)setWaiters(prev=>[...prev,{id:Date.now(),...form}]);
    else setWaiters(prev=>prev.map(w=>w.id===editWaiter.id?{...w,...form}:w));
    setModalOpen(false);setEditWaiter(null);
  };
  const toggleClock=w=>{
    const now=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
    setWaiters(prev=>prev.map(x=>x.id===w.id?{...x,status:x.status==="Clocked In"?"Clocked Out":"Clocked In",clockIn:x.status==="Clocked Out"?now:x.clockIn,clockOut:x.status==="Clocked In"?now:x.clockOut}:x));
    setClockTarget(null);
  };
  const filtered=waiters.filter(w=>{
    const s=w.name.toLowerCase().includes(search.toLowerCase());
    return s&&(!fv.zone||w.zone===fv.zone)&&(!fv.availability||w.availability===fv.availability)&&(!fv.status||w.status===fv.status);
  });
  const allTables=INIT_TABLES.map(t=>`Table ${t.number}`);
  const toggleTable=t=>setForm(f=>({...f,tables:f.tables.includes(t)?f.tables.filter(x=>x!==t):[...f.tables,t]}));
  return(
    <div style={{padding:28}}>
      {/* Shift summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["Total Waiters",waiters.length,C.text],["Clocked In",waiters.filter(w=>w.status==="Clocked In").length,C.green],["Clocked Out",waiters.filter(w=>w.status==="Clocked Out").length,C.textSub],["Available",waiters.filter(w=>w.availability==="Available").length,C.blue]].map(([l,v,c])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c}}>{v}</div></div>
        ))}
      </div>
      <SectionCard title="Waiter Management" action={<div style={{display:"flex",gap:8}}><Input placeholder="Search by name..." value={search} onChange={e=>setSearch(e.target.value)} icon="search" style={{width:200}}/><div style={{position:"relative"}}><Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{(fv.zone||fv.availability||fv.status)?" ●":""}</Btn>{filterOpen&&<FilterPanel filters={[{key:"zone",label:"Zone",options:["Oak Wood 1","Oak Wood 2","Oak Wood 3"]},{key:"availability",label:"Availability",options:["Available","Unavailable"]},{key:"status",label:"Shift Status",options:["Clocked In","Clocked Out"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}</div><Btn variant="primary" size="sm" onClick={()=>{setForm(blank);setEditWaiter(null);setModalOpen(true)}}><Ic name="plus" size={14}/>Add Waiter</Btn></div>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Name","Zone","Tables","Shift","Clock In","Clock Out","Orders","Avg Response","Actions"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{filtered.map(w=><TR key={w.id}><TD style={{fontWeight:500,color:C.text}}>{w.name}</TD><TD style={{color:C.textSub,fontSize:12}}>{w.zone}</TD><TD><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{w.tables.map(t=><span key={t} style={{fontSize:10,padding:"1px 6px",background:C.primaryLight,color:C.primary,borderRadius:4,fontWeight:500}}>{t}</span>)}{w.tables.length===0&&<span style={{color:C.textMuted,fontSize:11}}>None</span>}</div></TD><TD><Badge color={statusColor(w.status)}>{w.status}</Badge></TD><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{w.clockIn}</TD><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{w.clockOut}</TD><TD style={{fontWeight:500}}>{w.totalOrders}</TD><TD style={{color:C.textSub,fontSize:12}}>{w.avgResponse}</TD><TD><div style={{display:"flex",gap:5}}><button onClick={()=>setClockTarget(w)} style={{fontSize:12,color:w.status==="Clocked In"?C.red:C.green,background:w.status==="Clocked In"?C.redBg:C.greenBg,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontFamily:"inherit"}}>{w.status==="Clocked In"?"Clock Out":"Clock In"}</button><button onClick={()=>openEdit(w)} style={{fontSize:12,color:C.textSub,background:C.borderLight,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>Edit</button><button onClick={()=>setDeleteTarget(w)} style={{fontSize:12,color:C.red,background:C.redBg,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>Delete</button></div></TD></TR>)}</tbody>
        </table>
        <Pager count={filtered.length}/>
      </SectionCard>
      {modalOpen&&<Modal title={editWaiter?"Edit — "+editWaiter.name:"Add New Waiter"} onClose={()=>{setModalOpen(false);setEditWaiter(null)}} width={460}><div style={{display:"flex",flexDirection:"column",gap:14}}><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Full Name *</div><Input placeholder="Enter full name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{width:"100%"}}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Zone</div><Sel value={form.zone} onChange={v=>setForm(f=>({...f,zone:v}))} options={["Oak Wood 1","Oak Wood 2","Oak Wood 3"].map(o=>({value:o,label:o}))} style={{width:"100%"}}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:8}}>Assign Tables</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{allTables.map(t=>{const on=form.tables.includes(t);return<button key={t} onClick={()=>toggleTable(t)} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${on?C.primary:C.border}`,background:on?C.primaryLight:"transparent",color:on?C.primary:C.textSub,fontSize:12,fontWeight:on?600:400,cursor:"pointer",fontFamily:"inherit"}}>{t}</button>;})}</div></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:8}}>Availability</div><div style={{display:"flex",gap:12}}>{["Available","Unavailable"].map(a=><label key={a} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}><input type="radio" name="avail" checked={form.availability===a} onChange={()=>setForm(f=>({...f,availability:a}))}/><Badge color={a==="Available"?"green":"red"}>{a}</Badge></label>)}</div></div><div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>{setModalOpen(false);setEditWaiter(null)}}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} disabled={!form.name.trim()} onClick={save}>{editWaiter?"Save Changes":"Add Waiter"}</Btn></div></div></Modal>}
      {clockTarget&&<Confirm title={clockTarget.status==="Clocked In"?"Clock Out?":"Clock In?"} message={`This will ${clockTarget.status==="Clocked In"?"end":"start"} ${clockTarget.name}'s shift and record the timestamp.`} confirmLabel={clockTarget.status==="Clocked In"?"Clock Out":"Clock In"} confirmVariant={clockTarget.status==="Clocked In"?"danger":"success"} onConfirm={()=>toggleClock(clockTarget)} onCancel={()=>setClockTarget(null)}/>}
      {deleteTarget&&<Confirm message={`This will permanently remove ${deleteTarget.name} from the system. Their table assignments will be cleared.`} onConfirm={()=>{setWaiters(p=>p.filter(w=>w.id!==deleteTarget.id));setDeleteTarget(null)}} onCancel={()=>setDeleteTarget(null)}/>}
    </div>
  );
};

// ── CUSTOMERS ─────────────────────────────────────────────────────────────────
const CustomersPage=()=>{
  const [customers,setCustomers]=useState(INIT_CUSTOMERS);
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [detailSearch,setDetailSearch]=useState("");
  const [filterOpen,setFilterOpen]=useState(false);
  const [fv,setFv]=useState({});const[pf,setPf]=useState({});
  const filtered=customers.filter(c=>{
    const s=c.name.toLowerCase().includes(search.toLowerCase())||c.email.toLowerCase().includes(search.toLowerCase());
    return s&&(!fv.payLater||(fv.payLater==="Yes"?c.payLater:!c.payLater))&&(!fv.blacklisted||(fv.blacklisted==="Blacklisted"?c.blacklisted:!c.blacklisted));
  });
  if(sel)return(
    <div style={{padding:28}}>
      <SectionCard title="Customer Details" action={<button onClick={()=>setSel(null)} style={{display:"flex",alignItems:"center",gap:6,background:C.borderLight,border:"none",cursor:"pointer",borderRadius:8,padding:"6px 12px",fontSize:13,color:C.textSub,fontFamily:"inherit"}}><Ic name="chevronLeft" size={15}/>Back</button>}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>👤</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:C.text}}>{sel.name}</div>
              <div style={{fontSize:12,color:C.textSub}}>{sel.email}</div>
              {sel.blacklisted&&<Badge color="red">Blacklisted — Pay Now enforced</Badge>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <Toggle value={sel.payLater} onChange={v=>setSel(s=>({...s,payLater:v}))} label="Pay Later Enabled"/>
              {!sel.blacklisted?<Btn variant="danger" size="sm" onClick={()=>{setCustomers(prev=>prev.map(c=>c.id===sel.id?{...c,blacklisted:true}:c));setSel(s=>({...s,blacklisted:true}))}}>Blacklist</Btn>:<Btn variant="secondary" size="sm" onClick={()=>{setCustomers(prev=>prev.map(c=>c.id===sel.id?{...c,blacklisted:false}:c));setSel(s=>({...s,blacklisted:false}))}}>Remove Blacklist</Btn>}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:16}}>
            {[["Total Orders",sel.totalOrders],["Amount Spent",sel.spent],["Date Joined",sel.dateJoined],["Account Type",sel.payLater?"Pay Later Enabled":"Pay Now Only"]].map(([l,v])=>(
              <div key={l} style={{padding:"12px 14px",background:C.bg,borderRadius:10}}><div style={{fontSize:11,color:C.textSub,marginBottom:3}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{v}</div></div>
            ))}
          </div>
        </div>
        <div style={{padding:"14px 24px",borderBottom:`1px solid ${C.border}`}}><Input placeholder="Search by waiter..." value={detailSearch} onChange={e=>setDetailSearch(e.target.value)} icon="search" style={{width:220}}/></div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Items","Price","Table","Waiter","Status"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{[{items:"1 Items",price:"₦100,000",table:100,waiter:"Bukayo Saka",status:"Successful"},{items:"1 Items",price:"₦100,000",table:200,waiter:"Bukayo Saka",status:"Cancelled"},{items:"1 Items",price:"₦100,000",table:10,waiter:"Ngozi Okafor",status:"Successful"},{items:"1 Items",price:"₦100,000",table:56,waiter:"Tunde Adeyemi",status:"Successful"},{items:"1 Items",price:"₦100,000",table:19,waiter:"Bukayo Saka",status:"Successful"}].filter(o=>!detailSearch||o.waiter.toLowerCase().includes(detailSearch.toLowerCase())).map((o,i)=><TR key={i}><TD style={{color:C.primary,fontWeight:500}}>{o.items}</TD><TD style={{fontWeight:500}}>{o.price}</TD><TD>{o.table}</TD><TD style={{color:C.textSub}}>{o.waiter}</TD><TD><Badge color={o.status==="Successful"?"green":"red"}>{o.status}</Badge></TD></TR>)}</tbody>
        </table>
        <Pager count={5}/>
      </SectionCard>
    </div>
  );
  return(
    <div style={{padding:28}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22}}>
        {[["Total Customers","2,000",C.text],["Pay Later Enabled",customers.filter(c=>c.payLater).length,C.amber],["Blacklisted",customers.filter(c=>c.blacklisted).length,C.red]].map(([l,v,c])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c}}>{v}</div></div>
        ))}
      </div>
      <SectionCard title="Customers" subtitle="Click a row to view order history" action={<div style={{display:"flex",gap:8}}><Input placeholder="Search customers..." value={search} onChange={e=>setSearch(e.target.value)} icon="search" style={{width:220}}/><div style={{position:"relative"}}><Btn variant="secondary" size="sm" onClick={()=>{setPf({...fv});setFilterOpen(v=>!v)}}><Ic name="filter" size={14}/>Filter{(fv.payLater||fv.blacklisted)?" ●":""}</Btn>{filterOpen&&<FilterPanel filters={[{key:"payLater",label:"Pay Later",options:["Yes","No"]},{key:"blacklisted",label:"Status",options:["Blacklisted","Active"]}]} values={pf} onChange={(k,v)=>setPf(f=>({...f,[k]:v}))} onApply={()=>{setFv({...pf});setFilterOpen(false)}} onReset={()=>{setPf({});setFv({});setFilterOpen(false)}}/>}</div></div>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Customer Name","Email","Total Orders","Spent","Joined","Pay Later","Status"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{filtered.map(c=><TR key={c.id} onClick={()=>setSel(c)}><TD style={{color:C.primary,fontWeight:500}}>{c.name}</TD><TD style={{color:C.textSub}}>{c.email}</TD><TD>{c.totalOrders}</TD><TD style={{fontWeight:500}}>{c.spent}</TD><TD style={{color:C.textSub}}>{c.dateJoined}</TD><TD><Badge color={c.payLater?"amber":"gray"} dot={false}>{c.payLater?"Yes":"No"}</Badge></TD><TD><Badge color={c.blacklisted?"red":"green"} dot={false}>{c.blacklisted?"Blacklisted":"Active"}</Badge></TD></TR>)}</tbody>
        </table>
        <Pager count={filtered.length}/>
      </SectionCard>
    </div>
  );
};

// ── CREDIT & PRE-ORDERS ───────────────────────────────────────────────────────
const CreditPage=()=>{
  const [credits,setCredits]=useState(INIT_CREDIT_REQUESTS);
  const [preorders,setPreorders]=useState(INIT_PREORDERS);
  const [tab,setTab]=useState("credit");
  const [addPreorder,setAddPreorder]=useState(false);
  const [poForm,setPoForm]=useState({customer:"",phone:"",items:"",scheduledFor:"",notes:""});
  const updateCredit=(id,status)=>setCredits(prev=>prev.map(c=>c.id===id?{...c,status}:c));
  const savePreorder=()=>{
    setPreorders(prev=>[...prev,{id:`PO${Date.now()}`,customer:poForm.customer,phone:poForm.phone,items:poForm.items,total:"TBD",rawTotal:0,scheduledFor:poForm.scheduledFor,status:"Holding",notes:poForm.notes}]);
    setAddPreorder(false);setPoForm({customer:"",phone:"",items:"",scheduledFor:"",notes:""});
  };
  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",gap:4,background:C.borderLight,borderRadius:10,padding:4,marginBottom:22,width:"fit-content"}}>
        {[["credit","Credit Requests"],["preorder","Phone-in Pre-Orders"]].map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{padding:"8px 18px",borderRadius:8,border:"none",background:tab===k?C.surface:"transparent",color:tab===k?C.text:C.textSub,fontSize:13,fontWeight:tab===k?600:400,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>)}
      </div>
      {tab==="credit"&&<SectionCard title="Customer Credit Requests" subtitle="Review and approve or reject Pay via Credit Line requests in real time">
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Request ID","Customer","Email","Table","Amount","Requested At","Status","Actions"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{credits.map(c=><TR key={c.id}><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{c.id}</TD><TD style={{fontWeight:500,color:C.text}}>{c.customer}</TD><TD style={{color:C.textSub,fontSize:12}}>{c.email}</TD><TD>{c.table}</TD><TD style={{fontWeight:600,color:C.primary}}>{c.amount}</TD><TD style={{color:C.textSub,fontSize:12}}>{c.requestedAt}</TD><TD><Badge color={statusColor(c.status)}>{c.status}</Badge></TD><TD>{c.status==="Awaiting Approval"?<div style={{display:"flex",gap:6}}><Btn variant="success" size="sm" onClick={()=>updateCredit(c.id,"Approved")}><Ic name="check" size={13}/>Approve</Btn><Btn variant="danger" size="sm" onClick={()=>updateCredit(c.id,"Rejected")}><Ic name="x" size={13}/>Reject</Btn></div>:<span style={{fontSize:12,color:C.textSub}}>{c.status}</span>}</TD></TR>)}</tbody>
        </table>
        <Pager count={credits.length}/>
      </SectionCard>}
      {tab==="preorder"&&<SectionCard title="Phone-in Pre-Orders" subtitle="Log and hold call-ahead orders until the guest arrives" action={<Btn variant="primary" size="sm" onClick={()=>setAddPreorder(true)}><Ic name="plus" size={14}/>New Pre-Order</Btn>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Order ID","Customer","Phone","Items","Total","Arrival Time","Status","Notes","Actions"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{preorders.map(p=><TR key={p.id}><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{p.id}</TD><TD style={{fontWeight:500,color:C.text}}>{p.customer}</TD><TD style={{fontSize:12,color:C.textSub}}>{p.phone}</TD><TD style={{fontSize:12,maxWidth:180}}><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.items}</div></TD><TD style={{fontWeight:600,color:C.primary}}>{p.total}</TD><TD style={{color:C.textSub,fontSize:12}}>{p.scheduledFor}</TD><TD><Badge color={p.status==="Arrived"?"green":"amber"}>{p.status}</Badge></TD><TD style={{fontSize:12,color:C.textSub,maxWidth:160}}><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.notes||"—"}</div></TD><TD>{p.status==="Holding"&&<Btn variant="secondary" size="sm" onClick={()=>setPreorders(prev=>prev.map(x=>x.id===p.id?{...x,status:"Arrived"}:x))}>Mark Arrived</Btn>}</TD></TR>)}</tbody>
        </table>
        <Pager count={preorders.length}/>
      </SectionCard>}
      {addPreorder&&<Modal title="New Phone-in Pre-Order" onClose={()=>setAddPreorder(false)} width={480}><div style={{display:"flex",flexDirection:"column",gap:14}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Customer Name *</div><Input placeholder="Caller name" value={poForm.customer} onChange={e=>setPoForm(f=>({...f,customer:e.target.value}))} style={{width:"100%"}}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Phone Number *</div><Input placeholder="+234 801 ..." value={poForm.phone} onChange={e=>setPoForm(f=>({...f,phone:e.target.value}))} style={{width:"100%"}}/></div></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Items Ordered</div><textarea value={poForm.items} onChange={e=>setPoForm(f=>({...f,items:e.target.value}))} style={{width:"100%",padding:"8px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:60,outline:"none",boxSizing:"border-box"}} placeholder="e.g. Grilled Salmon x1, Caesar Salad x2..."/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Expected Arrival</div><Input placeholder="e.g. 07:30 PM" value={poForm.scheduledFor} onChange={e=>setPoForm(f=>({...f,scheduledFor:e.target.value}))} style={{width:"100%"}}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.textSub,marginBottom:5}}>Special Notes</div><Input placeholder="e.g. window seat, allergies" value={poForm.notes} onChange={e=>setPoForm(f=>({...f,notes:e.target.value}))} style={{width:"100%"}}/></div></div><div style={{padding:12,background:C.blueBg,borderRadius:8,fontSize:12.5,color:C.blue}}>ℹ️ A "PRE-ORDER // HOLD FOR ARRIVAL" ticket will be printed to the kitchen automatically.</div><div style={{display:"flex",gap:8}}><Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setAddPreorder(false)}>Cancel</Btn><Btn variant="primary" style={{flex:1,justifyContent:"center"}} disabled={!poForm.customer.trim()||!poForm.phone.trim()} onClick={savePreorder}><Ic name="printer" size={14}/>Save & Print Ticket</Btn></div></div></Modal>}
    </div>
  );
};

// ── SUPERVISOR VIEW ───────────────────────────────────────────────────────────
const SupervisorPage=()=>{
  const [orders,setOrders]=useState(INIT_ORDERS);
  const [tables]=useState(INIT_TABLES);
  const [timers,setTimers]=useState({T03:42,T05:38,T07:55,T08:22});
  const [timerModal,setTimerModal]=useState(null);
  const [timerAdj,setTimerAdj]=useState(0);
  const [voidTarget,setVoidTarget]=useState(null);
  const statusColor=s=>({Vacant:"green",Occupied:"blue","Pending Payment":"amber"}[s]||"gray");
  const LIFECYCLE=["Preparing","Ready","Served","Paid"];
  const advanceOrder=id=>setOrders(prev=>prev.map(o=>{if(o.id!==id)return o;const i=LIFECYCLE.indexOf(o.status);return{...o,status:i>=0&&i<LIFECYCLE.length-1?LIFECYCLE[i+1]:o.status};}));
  const doVoid=id=>{setOrders(prev=>prev.filter(o=>o.id!==id));setVoidTarget(null);};
  const adjustTimer=(tableId,delta)=>setTimers(t=>({...t,[tableId]:Math.max(0,Math.min(120,(t[tableId]||0)+delta))}));
  return(
    <div style={{padding:28}}>
      <div style={{background:C.amberBg,border:`1px solid ${C.amber}`,borderRadius:10,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
        <Ic name="shield" size={18} color={C.amber}/>
        <span style={{fontSize:13,color:C.amber,fontWeight:500}}>Supervisor View — You have elevated override permissions. Changes here affect live floor operations.</span>
      </div>
      {/* Floor map */}
      <div style={{marginBottom:22}}>
        <div style={{fontWeight:600,fontSize:15,color:C.text,marginBottom:12}}>Live Floor Map</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {tables.map(t=>{
            const mins=timers[t.id];
            const alert=mins&&mins>=45;
            return(
              <div key={t.id} style={{background:C.surface,border:`2px solid ${alert?C.red:t.status==="Occupied"?C.blue:t.status==="Pending Payment"?C.amber:C.border}`,borderRadius:12,padding:16,position:"relative"}}>
                {alert&&<div style={{position:"absolute",top:-8,right:-8,width:18,height:18,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:10,fontWeight:700}}>!</span></div>}
                <div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:4}}>Table {t.number}</div>
                <div style={{fontSize:11,color:C.textSub,marginBottom:8}}>{t.type} · {t.zone}</div>
                <Badge color={statusColor(t.status)}>{t.status}</Badge>
                {mins!==undefined&&<div style={{marginTop:8,fontSize:12,color:alert?C.red:C.textSub,fontWeight:alert?700:400}}><Ic name="clock" size={12} color={alert?C.red:C.textSub}/> {mins} min open</div>}
                {mins!==undefined&&<div style={{display:"flex",gap:4,marginTop:8}}>
                  <button onClick={()=>adjustTimer(t.id,-5)} style={{flex:1,padding:"3px",borderRadius:5,border:`1px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:12}}>-5</button>
                  <button onClick={()=>{setTimerModal(t.id);setTimerAdj(0)}} style={{flex:1,padding:"3px",borderRadius:5,border:`1px solid ${C.primary}`,background:C.primaryLight,cursor:"pointer",fontSize:12,color:C.primary}}>Set</button>
                  <button onClick={()=>adjustTimer(t.id,5)} style={{flex:1,padding:"3px",borderRadius:5,border:`1px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:12}}>+5</button>
                </div>}
              </div>
            );
          })}
        </div>
      </div>
      {/* Active orders with supervisor controls */}
      <SectionCard title="Active Order Intervention" subtitle="Manually advance order statuses or void tickets">
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:C.borderLight}}>{["Order ID","Customer","Table","Waiter","Status","Advance Status","Void Order"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{orders.filter(o=>o.status!=="Paid").map(o=>{
            const i=LIFECYCLE.indexOf(o.status);const next=i>=0&&i<LIFECYCLE.length-1?LIFECYCLE[i+1]:null;
            return <TR key={o.id}><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{o.id}</TD><TD style={{fontWeight:500,color:C.text}}>{o.customer}</TD><TD>{o.table}</TD><TD style={{color:C.textSub}}>{o.waiter}</TD><TD><Badge color={statusColor(o.status)}>{o.status}</Badge></TD><TD>{next?<Btn variant="primary" size="sm" onClick={()=>advanceOrder(o.id)}>→ {next}</Btn>:<span style={{fontSize:12,color:C.textMuted}}>—</span>}</TD><TD><Btn variant="danger" size="sm" onClick={()=>setVoidTarget(o)}><Ic name="trash" size={13}/>Void</Btn></TD></TR>;
          })}</tbody>
        </table>
        <Pager count={orders.filter(o=>o.status!=="Paid").length}/>
      </SectionCard>
      {/* Waiter shift overview */}
      <div style={{marginTop:20}}>
        <SectionCard title="Waiter Shift Oversight">
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.borderLight}}>{["Waiter","Zone","Shift Status","Clock In","Orders Taken","Avg Response"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{INIT_WAITERS.map(w=><TR key={w.id}><TD style={{fontWeight:500,color:C.text}}>{w.name}</TD><TD style={{color:C.textSub}}>{w.zone}</TD><TD><Badge color={statusColor(w.status)}>{w.status}</Badge></TD><TD style={{fontFamily:"monospace",fontSize:12,color:C.textSub}}>{w.clockIn}</TD><TD style={{fontWeight:500}}>{w.totalOrders}</TD><TD style={{color:C.textSub}}>{w.avgResponse}</TD></TR>)}</tbody>
          </table>
        </SectionCard>
      </div>
      {timerModal&&<Modal title="Adjust Payment Timer" subtitle={`Table ${tables.find(t=>t.id===timerModal)?.number}`} onClose={()=>setTimerModal(null)} width={360}><div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:48,fontWeight:700,color:timers[timerModal]>=45?C.red:C.primary}}>{timers[timerModal]} <span style={{fontSize:16,fontWeight:400,color:C.textSub}}>min</span></div><div style={{fontSize:13,color:C.textSub}}>Current open time</div></div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>{[[-15,"-15 min"],[-5,"-5 min"],[0,"Reset"],[5,"+5 min"],[15,"+15 min"]].map(([d,l])=><button key={l} onClick={()=>{if(d===0)setTimers(t=>({...t,[timerModal]:0}));else adjustTimer(timerModal,d)}} style={{padding:"8px",borderRadius:8,border:`1px solid ${d<0?C.redBg:d===0?C.border:C.greenBg}`,background:d<0?C.redBg:d===0?C.surface:C.greenBg,color:d<0?C.red:d===0?C.text:C.green,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>)}</div><Btn variant="primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>setTimerModal(null)}>Done</Btn></Modal>}
      {voidTarget&&<Confirm title="Void Order?" message={`Void order ${voidTarget.id} for ${voidTarget.customer}? A full charge reversal will be applied including VAT and service charge.`} confirmLabel="Void Order" onConfirm={()=>doVoid(voidTarget.id)} onCancel={()=>setVoidTarget(null)}/>}
    </div>
  );
};

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
const AnalyticsPage=()=>{
  const [range,setRange]=useState("This Week");
  const sorted=[...INIT_MENU].sort((a,b)=>b.orderCount-a.orderCount);
  const top=sorted.slice(0,3);
  const bottom=sorted.slice(-3).reverse();
  const tableStats=[{table:"Table 7",orders:856,turnover:"4.2x",revenue:"₦128,400"},{table:"Table 5",orders:712,turnover:"3.8x",revenue:"₦89,000"},{table:"Table 2",orders:534,turnover:"2.9x",revenue:"₦66,750"},{table:"Table 3",orders:421,turnover:"2.3x",revenue:"₦52,625"},{table:"Table 1",orders:190,turnover:"1.1x",revenue:"₦23,750"}];
  const waiterStats=INIT_WAITERS.map(w=>({...w,revenue:w.totalOrders>0?`₦${(w.totalOrders*4200).toLocaleString()}`:"₦0"}));
  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
        <div style={{fontWeight:600,fontSize:16,color:C.text}}>Analytics & Reports</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Sel value={range} onChange={setRange} options={["Today","This Week","This Month","Custom"].map(o=>({value:o,label:o}))}/>
          <Btn variant="secondary" size="sm"><Ic name="download" size={14}/>Export Report</Btn>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["Total Revenue","₦300.634M",C.green,"↑ 18% vs last period"],["Orders Processed","5,000",C.blue,"↑ 12% vs last period"],["Avg Order Value","₦60,127",C.purple,"↑ 5% vs last period"],["Table Turnover","3.2x",C.teal,"Per table per shift"]].map(([l,v,c,s])=>(
          <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:12,color:C.textSub,marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c,marginBottom:2}}>{v}</div><div style={{fontSize:11,color:C.textSub}}>{s}</div></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <SectionCard title="🔥 Top Performing Items" subtitle="Most ordered this period">
          {top.map((item,i)=><div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 24px",borderBottom:`1px solid ${C.borderLight}`}}><div style={{width:26,height:26,borderRadius:"50%",background:[C.amberBg,C.borderLight,C.borderLight][i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:[C.amber,C.textSub,C.textSub][i]}}>{i+1}</div><div style={{fontSize:20}}>{item.image}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:C.text}}>{item.name}</div><div style={{fontSize:11,color:C.textSub}}>{item.category}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C.primary}}>{item.orderCount} orders</div><div style={{fontSize:11,color:C.textSub}}>{item.price}</div></div></div>)}
        </SectionCard>
        <SectionCard title="📉 Under-Performing Items" subtitle="Least ordered — consider promotions">
          {bottom.map((item,i)=><div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 24px",borderBottom:`1px solid ${C.borderLight}`}}><div style={{width:26,height:26,borderRadius:"50%",background:C.redBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.red}}>{i+1}</div><div style={{fontSize:20}}>{item.image}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:C.text}}>{item.name}</div><div style={{fontSize:11,color:C.textSub}}>{item.category}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:C.red}}>{item.orderCount} orders</div><div style={{fontSize:11,color:C.textSub}}>{item.price}</div></div></div>)}
        </SectionCard>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <SectionCard title="📋 Table Performance" subtitle="Orders and turnover by table">
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.borderLight}}>{["Table","Orders","Turnover","Revenue"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{tableStats.map(t=><TR key={t.table}><TD style={{fontWeight:500,color:C.primary}}>{t.table}</TD><TD>{t.orders}</TD><TD><Badge color="blue" dot={false}>{t.turnover}</Badge></TD><TD style={{fontWeight:600,color:C.green}}>{t.revenue}</TD></TR>)}</tbody>
          </table>
        </SectionCard>
        <SectionCard title="👥 Waiter Performance" subtitle="Weekly summary — exportable">
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.borderLight}}>{["Name","Orders","Avg Response","Revenue Generated"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{waiterStats.map(w=><TR key={w.id}><TD style={{fontWeight:500,color:C.text}}>{w.name}</TD><TD>{w.totalOrders}</TD><TD style={{color:C.textSub}}>{w.avgResponse}</TD><TD style={{fontWeight:600,color:C.green}}>{w.revenue}</TD></TR>)}</tbody>
          </table>
          <div style={{padding:"12px 24px",borderTop:`1px solid ${C.border}`}}><Btn variant="secondary" size="sm"><Ic name="download" size={14}/>Export Waiter Report (CSV)</Btn></div>
        </SectionCard>
      </div>
      {/* Payment split */}
      <SectionCard title="💳 Payment Method Breakdown">
        <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[["Pay Now (Digital)",3000,"60%",C.primary],["Pay After Eating",1500,"30%",C.amber],["Credit Line",500,"10%",C.purple]].map(([l,n,pct,c])=>(
            <div key={l} style={{textAlign:"center",padding:"16px",background:C.bg,borderRadius:12}}>
              <div style={{fontSize:32,fontWeight:700,color:c,marginBottom:4}}>{pct}</div>
              <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:2}}>{l}</div>
              <div style={{fontSize:12,color:C.textSub}}>{n.toLocaleString()} orders</div>
              <div style={{height:6,borderRadius:3,background:C.borderLight,marginTop:10,overflow:"hidden"}}><div style={{height:"100%",width:pct,background:c,borderRadius:3}}/></div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

// ── SETTINGS ──────────────────────────────────────────────────────────────────
const SettingsPage=()=>{
  const [vat,setVat]=useState("7.5");
  const [sc,setSc]=useState("5");
  const [payAfter,setPayAfter]=useState(true);
  const [creditLine,setCreditLine]=useState(false);
  const [countdown,setCountdown]=useState("45");
  const [shutdown,setShutdown]=useState(false);
  const [shutdownConfirm,setShutdownConfirm]=useState(false);
  const [printerStatus,setPrinterStatus]=useState({kitchen:"Online",bar:"Online",receipt:"Offline"});
  const [saved,setSaved]=useState(false);
  const save=()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)};
  const printerColor=s=>s==="Online"?C.green:C.red;
  return(
    <div style={{padding:28,display:"flex",flexDirection:"column",gap:20}}>
      {shutdown&&<div style={{background:C.redBg,border:`1px solid ${C.red}`,borderRadius:10,padding:"14px 20px",display:"flex",alignItems:"center",gap:10}}><Ic name="power" size={18} color={C.red}/><div><div style={{fontWeight:700,fontSize:13,color:C.red}}>EMERGENCY SHUTDOWN ACTIVE</div><div style={{fontSize:12,color:C.red}}>All digital ordering is halted. QR codes now show "Service Temporarily Unavailable".</div></div><Btn variant="secondary" size="sm" style={{marginLeft:"auto"}} onClick={()=>setShutdown(false)}>Resume Operations</Btn></div>}
      {saved&&<div style={{background:C.greenBg,border:`1px solid ${C.green}`,borderRadius:10,padding:"12px 18px",fontSize:13,color:C.green,fontWeight:500}}>✓ Settings saved successfully</div>}

      <SectionCard title="Tax & Financial Configuration" subtitle="These rates auto-calculate on every customer receipt">
        <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          <div><div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>VAT Rate (%)</div><div style={{fontSize:12,color:C.textSub,marginBottom:8}}>Applied to all orders as a separate line item on receipts</div><Input type="number" value={vat} onChange={e=>setVat(e.target.value)} style={{width:"100%"}}/><div style={{fontSize:12,color:C.textSub,marginTop:6}}>Current: {vat}% VAT on a ₦10,000 order = <strong>₦{(10000*Number(vat)/100).toLocaleString()}</strong></div></div>
          <div><div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>Service Charge (%)</div><div style={{fontSize:12,color:C.textSub,marginBottom:8}}>Applied to all orders as a separate line item on receipts</div><Input type="number" value={sc} onChange={e=>setSc(e.target.value)} style={{width:"100%"}}/><div style={{fontSize:12,color:C.textSub,marginTop:6}}>Current: {sc}% SC on a ₦10,000 order = <strong>₦{(10000*Number(sc)/100).toLocaleString()}</strong></div></div>
        </div>
        <div style={{padding:"14px 24px",background:C.bg,borderTop:`1px solid ${C.border}`}}>
          <div style={{fontSize:12,color:C.textSub,marginBottom:2}}>Receipt preview on ₦10,000 order</div>
          <div style={{display:"flex",gap:20,fontSize:13}}>
            {[["Subtotal","₦10,000"],["VAT ("+vat+"%)",`₦${(10000*Number(vat)/100).toLocaleString()}`],["Service Charge ("+sc+"%)",`₦${(10000*Number(sc)/100).toLocaleString()}`],["Grand Total",`₦${(10000*(1+Number(vat)/100+Number(sc)/100)).toLocaleString()}`]].map(([l,v])=><div key={l}><div style={{color:C.textSub,fontSize:11}}>{l}</div><div style={{fontWeight:l==="Grand Total"?700:500,color:l==="Grand Total"?C.primary:C.text}}>{v}</div></div>)}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Payment Controls" subtitle="Master toggles for checkout options shown to diners">
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderRadius:10,border:`1px solid ${C.border}`}}>
            <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>Pay After Eating (Open Tab)</div><div style={{fontSize:12,color:C.textSub,marginTop:2}}>Allows diners to order and pay at the end of their meal. Carries dine-and-dash risk.</div></div>
            <Toggle value={payAfter} onChange={setPayAfter}/>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderRadius:10,border:`1px solid ${C.border}`}}>
            <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>Pay via Credit Line</div><div style={{fontSize:12,color:C.textSub,marginTop:2}}>Enables diners to submit credit requests that go to the Admin approval queue.</div></div>
            <Toggle value={creditLine} onChange={setCreditLine}/>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Safety & Compliance Settings" subtitle="Revenue protection and operational timers">
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:20}}>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Payment Countdown Window (minutes)</div>
            <div style={{fontSize:12,color:C.textSub,marginBottom:10}}>A High-Priority Red Alert is sent to the waiter and supervisor when this timer expires on any unpaid open tab.</div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Input type="number" value={countdown} onChange={e=>setCountdown(e.target.value)} style={{width:100}}/>
              <span style={{fontSize:13,color:C.textSub}}>minutes (PRD default: 45 min)</span>
            </div>
          </div>
          <div style={{padding:14,background:C.amberBg,borderRadius:10,display:"flex",alignItems:"flex-start",gap:10}}>
            <Ic name="warn" size={18} color={C.amber}/>
            <div><div style={{fontSize:13,fontWeight:600,color:C.amber}}>Emergency Shutdown Switch</div><div style={{fontSize:12,color:C.amber,marginTop:2,marginBottom:10}}>Instantly halts ALL digital ordering across the restaurant. QR codes will redirect diners to an "Unavailable" page. Use only in emergencies.</div><Toggle value={shutdown} onChange={v=>{if(v)setShutdownConfirm(true);else setShutdown(false)}} label={shutdown?"Shutdown ACTIVE — tap to resume":"Activate Emergency Shutdown"}/></div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Kitchen Printer Fleet" subtitle="Hardware connection status and routing configuration">
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:12}}>
          {Object.entries(printerStatus).map(([name,status])=>(
            <div key={name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderRadius:10,border:`2px solid ${status==="Online"?C.green:C.red}`,background:status==="Online"?C.greenBg:C.redBg}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><Ic name="printer" size={20} color={printerColor(status)}/><div><div style={{fontSize:13,fontWeight:600,color:C.text,textTransform:"capitalize"}}>{name} Printer</div><div style={{fontSize:12,color:status==="Online"?C.green:C.red,fontWeight:500}}>{status}</div></div></div>
              <div style={{display:"flex",gap:6}}>
                <Btn variant="secondary" size="sm" onClick={()=>setPrinterStatus(p=>({...p,[name]:p[name]==="Online"?"Offline":"Online"}))}>{status==="Online"?"Disconnect":"Reconnect"}</Btn>
                <Btn variant="secondary" size="sm"><Ic name="printer" size={13}/>Test Print</Btn>
              </div>
            </div>
          ))}
          {Object.values(printerStatus).some(s=>s==="Offline")&&<div style={{padding:"12px 16px",background:C.redBg,borderRadius:8,fontSize:13,color:C.red,fontWeight:500,display:"flex",alignItems:"center",gap:8}}><Ic name="warn" size={16} color={C.red}/>⚠ One or more printers are offline. Staff have been notified to use manual order tracking.</div>}
        </div>
      </SectionCard>

      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <Btn variant="primary" style={{padding:"10px 28px"}} onClick={save}><Ic name="check" size={15}/>Save All Settings</Btn>
      </div>

      {shutdownConfirm&&<Confirm title="Activate Emergency Shutdown?" message="This will immediately halt ALL digital ordering. Every QR code across the restaurant will show 'Service Temporarily Unavailable' to diners. This is irreversible until you manually resume." confirmLabel="Shut Down Now" onConfirm={()=>{setShutdown(true);setShutdownConfirm(false)}} onCancel={()=>setShutdownConfirm(false)}/>}
    </div>
  );
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [notifOpen,setNotifOpen]=useState(false);
  const [notifications,setNotifications]=useState(INIT_NOTIFICATIONS);
  const titles={dashboard:"Dashboard",orders:"Orders",menu:"Menu",tables:"Tables",waiter:"Waiter Management",customers:"Customers",credit:"Credit & Pre-Orders",supervisor:"Supervisor View",analytics:"Analytics & Reports",settings:"Settings"};
  const renderPage=()=>{
    if(page==="dashboard")return <DashboardPage setPage={setPage}/>;
    if(page==="orders")return <OrdersPage/>;
    if(page==="menu")return <MenuPage/>;
    if(page==="tables")return <TablesPage/>;
    if(page==="waiter")return <WaiterPage/>;
    if(page==="customers")return <CustomersPage/>;
    if(page==="credit")return <CreditPage/>;
    if(page==="supervisor")return <SupervisorPage/>;
    if(page==="analytics")return <AnalyticsPage/>;
    if(page==="settings")return <SettingsPage/>;
  };
  return(
    <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:C.text}}>
      <Sidebar active={page} setActive={setPage}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <TopBar title={titles[page]} notifications={notifications} onBell={()=>setNotifOpen(v=>!v)}/>
        <div style={{flex:1,overflowY:"auto"}}>{renderPage()}</div>
      </div>
      {notifOpen&&<NotifDrawer notifications={notifications} setNotifications={setNotifications} onClose={()=>setNotifOpen(false)}/>}
    </div>
  );
}
