// ── Shared UI primitives ───────────────────────────────────────────────────────
// Every page imports from here. Change a component once → updates everywhere.
import { useState } from "react";
import { C } from "../tokens";
import Icon from "./Icon";

// ── Badge ─────────────────────────────────────────────────────────────────────
export const Badge = ({ children, color = "green", dot = true }) => {
  const map = {
    green:  [C.greenBg,  C.green],
    red:    [C.redBg,    C.red],
    amber:  [C.amberBg,  C.amber],
    blue:   [C.blueBg,   C.blue],
    purple: [C.purpleBg, C.purple],
    teal:   [C.tealBg,   C.teal],
    gray:   [C.borderLight, C.textSub],
  };
  const [bg, tc] = map[color] || map.gray;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px",
      borderRadius:999, background:bg, color:tc, fontSize:12, fontWeight:500, whiteSpace:"nowrap" }}>
      {dot && <span style={{ width:6, height:6, borderRadius:"50%", background:tc, flexShrink:0 }} />}
      {children}
    </span>
  );
};

// ── Button ────────────────────────────────────────────────────────────────────
export const Btn = ({ children, variant = "primary", size = "md", onClick, disabled, style: sx }) => {
  const base = {
    display:"inline-flex", alignItems:"center", gap:6, borderRadius:8, fontWeight:500,
    cursor: disabled ? "not-allowed" : "pointer", border:"none", transition:"all .15s",
    fontFamily:"inherit", opacity: disabled ? 0.5 : 1,
  };
  const sizes = {
    sm: { padding:"5px 10px", fontSize:13 },
    md: { padding:"8px 14px", fontSize:14 },
    lg: { padding:"10px 18px", fontSize:15 },
  };
  const variants = {
    primary:   { background:C.primary,   color:"#fff" },
    secondary: { background:C.surface,   color:C.text, border:`1px solid ${C.border}` },
    danger:    { background:C.red,        color:"#fff" },
    success:   { background:C.green,      color:"#fff" },
    ghost:     { background:"transparent",color:C.textSub },
    amber:     { background:C.amberBg,    color:C.amber, border:`1px solid ${C.amber}` },
  };
  return (
    <button onClick={disabled ? undefined : onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...sx }}>
      {children}
    </button>
  );
};

// ── Input ─────────────────────────────────────────────────────────────────────
export const Input = ({ placeholder, value, onChange, icon, type = "text", readOnly, style: sx }) => (
  <div style={{ position:"relative", display:"flex", alignItems:"center", width: sx?.width || "auto" }}>
    {icon && (
      <span style={{ position:"absolute", left:10, color:C.textMuted, pointerEvents:"none", display:"flex" }}>
        <Icon name={icon} size={15} />
      </span>
    )}
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} readOnly={readOnly}
      style={{
        width:"100%", padding: icon ? "7px 12px 7px 32px" : "7px 12px",
        border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, color:C.text,
        background: readOnly ? C.borderLight : C.surface,
        outline:"none", fontFamily:"inherit", boxSizing:"border-box", ...sx,
      }}
    />
  </div>
);

// ── Select ────────────────────────────────────────────────────────────────────
export const Sel = ({ value, onChange, options, style: sx }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{
      padding:"7px 28px 7px 10px", border:`1px solid ${C.border}`, borderRadius:8,
      fontSize:13, color:C.text, background:C.surface, outline:"none",
      fontFamily:"inherit", cursor:"pointer", appearance:"none",
      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
      backgroundRepeat:"no-repeat", backgroundPosition:"right 8px center", ...sx,
    }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ── Toggle ────────────────────────────────────────────────────────────────────
export const Toggle = ({ value, onChange, label, sublabel }) => (
  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", userSelect:"none" }}>
    <div onClick={() => onChange(!value)}
      style={{ width:40, height:22, borderRadius:11, background: value ? C.primary : C.border,
        position:"relative", transition:"background .2s", cursor:"pointer", flexShrink:0 }}>
      <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute",
        top:2, left: value ? 20 : 2, transition:"left .2s", boxShadow:"0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
    {label && (
      <div>
        <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{label}</div>
        {sublabel && <div style={{ fontSize:11, color:C.textSub, marginTop:1 }}>{sublabel}</div>}
      </div>
    )}
  </label>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
export const Modal = ({ title, subtitle, onClose, children, width = 480 }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.45)", zIndex:1000,
    display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
    <div style={{ background:C.surface, borderRadius:16, width:"100%", maxWidth:width,
      maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,.18)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"20px 24px", borderBottom:`1px solid ${C.border}`,
        position:"sticky", top:0, background:C.surface, zIndex:1 }}>
        <div>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{title}</div>
          {subtitle && <div style={{ fontSize:12, color:C.textSub, marginTop:2 }}>{subtitle}</div>}
        </div>
        <button onClick={onClose}
          style={{ background:"none", border:"none", cursor:"pointer", color:C.textSub,
            padding:4, borderRadius:6, display:"flex", flexShrink:0 }}>
          <Icon name="x" size={18} />
        </button>
      </div>
      <div style={{ padding:24 }}>{children}</div>
    </div>
  </div>
);

// ── Confirm dialog ────────────────────────────────────────────────────────────
export const Confirm = ({ title, message, confirmLabel = "Delete", confirmVariant = "danger", onConfirm, onCancel }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:1100,
    display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
    <div style={{ background:C.surface, borderRadius:16, width:"100%", maxWidth:380,
      padding:28, boxShadow:"0 20px 60px rgba(0,0,0,.2)", textAlign:"center" }}>
      <div style={{ width:50, height:50, borderRadius:"50%",
        background: confirmVariant === "danger" ? C.redBg : C.amberBg,
        display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <Icon name="warn" size={24} color={confirmVariant === "danger" ? C.red : C.amber} />
      </div>
      <div style={{ fontWeight:700, fontSize:16, color:C.text, marginBottom:8 }}>{title || "Are you sure?"}</div>
      <div style={{ fontSize:13.5, color:C.textSub, marginBottom:24, lineHeight:1.6 }}>{message}</div>
      <div style={{ display:"flex", gap:10 }}>
        <Btn variant="secondary" style={{ flex:1, justifyContent:"center" }} onClick={onCancel}>Cancel</Btn>
        <Btn variant={confirmVariant} style={{ flex:1, justifyContent:"center" }} onClick={onConfirm}>{confirmLabel}</Btn>
      </div>
    </div>
  </div>
);

// ── Filter dropdown panel ─────────────────────────────────────────────────────
export const FilterPanel = ({ filters, values, onChange, onApply, onReset }) => (
  <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", background:C.surface,
    border:`1px solid ${C.border}`, borderRadius:12, padding:20, zIndex:300,
    boxShadow:"0 8px 30px rgba(0,0,0,.12)", minWidth:260 }}>
    <div style={{ fontWeight:600, fontSize:13, color:C.text, marginBottom:14 }}>Filter</div>
    {filters.map(f => (
      <div key={f.key} style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:500, color:C.textSub, marginBottom:5 }}>{f.label}</div>
        <Sel
          value={values[f.key] || ""}
          onChange={v => onChange(f.key, v)}
          options={[{ value:"", label:"All" }, ...f.options.map(o => ({ value:o, label:o }))]}
          style={{ width:"100%" }}
        />
      </div>
    ))}
    <div style={{ display:"flex", gap:8, marginTop:8 }}>
      <Btn variant="secondary" size="sm" style={{ flex:1, justifyContent:"center" }} onClick={onReset}>Reset</Btn>
      <Btn variant="primary"   size="sm" style={{ flex:1, justifyContent:"center" }} onClick={onApply}>Apply</Btn>
    </div>
  </div>
);

// ── Pagination bar ────────────────────────────────────────────────────────────
export const Pager = ({ count }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
    padding:"12px 24px", borderTop:`1px solid ${C.border}` }}>
    <span style={{ fontSize:12, color:C.textSub }}>{count} result{count !== 1 ? "s" : ""}</span>
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,"...",8,9].map((p, i) => (
        <button key={i} style={{ width:28, height:28, borderRadius:6,
          border:`1px solid ${C.border}`, background: p === 1 ? C.primary : C.surface,
          color: p === 1 ? "#fff" : C.text, fontSize:12, cursor:"pointer" }}>{p}</button>
      ))}
    </div>
  </div>
);

// ── Table primitives ──────────────────────────────────────────────────────────
export const TH = ({ children, style: sx }) => (
  <th style={{ padding:"10px 16px", textAlign:"left", fontWeight:500,
    color:C.textSub, whiteSpace:"nowrap", fontSize:13, ...sx }}>
    {children}
  </th>
);

export const TD = ({ children, style: sx }) => (
  <td style={{ padding:"12px 16px", fontSize:13, ...sx }}>{children}</td>
);

export const TR = ({ children, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        borderBottom:`1px solid ${C.borderLight}`,
        background: hover && onClick ? C.bg : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition:"background .1s",
      }}
    >
      {children}
    </tr>
  );
};

// ── Section card (page-level content container) ───────────────────────────────
export const SectionCard = ({ title, subtitle, children, action }) => (
  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
    <div style={{ padding:"18px 24px", borderBottom:`1px solid ${C.border}`,
      display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div>
        <div style={{ fontWeight:600, fontSize:15, color:C.text }}>{title}</div>
        {subtitle && <div style={{ fontSize:12, color:C.textSub, marginTop:2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

// ── Info row (label + value, used in detail panels) ───────────────────────────
export const InfoRow = ({ label, value, mono }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"10px 0", borderBottom:`1px solid ${C.borderLight}` }}>
    <span style={{ fontSize:13, color:C.textSub }}>{label}</span>
    <span style={{ fontSize:13, fontWeight:500, color:C.text,
      fontFamily: mono ? "monospace" : "inherit" }}>{value}</span>
  </div>
);
