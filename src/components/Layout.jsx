// ── Layout components ─────────────────────────────────────────────────────────
// Sidebar, TopBar and the notifications drawer.
// App.jsx imports these and wraps every page with them.
import { C } from "../tokens";
import Icon from "./Icon";
import { Btn, Input } from "./UI";
import { NAV } from "../data/seed";

// ── Sidebar ───────────────────────────────────────────────────────────────────
export const Sidebar = ({ active, setActive }) => (
  <div style={{
    width:228, flexShrink:0, background:C.surface,
    borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column",
    height:"100vh", position:"sticky", top:0, overflowY:"auto",
  }}>
    {/* Logo */}
    <div style={{ padding:"22px 20px 16px", borderBottom:`1px solid ${C.borderLight}` }}>
      <div style={{ fontFamily:"'Georgia',serif", fontWeight:700, fontSize:21, color:C.text, letterSpacing:"-.5px" }}>
        10<span style={{ color:C.primary }}>tables</span>.
      </div>
      <div style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>Restaurant Admin</div>
    </div>

    {/* Nav links */}
    <nav style={{ flex:1, padding:"10px 8px" }}>
      {NAV.map(({ key, label, icon }) => {
        const on = active === key;
        return (
          <button key={key} onClick={() => setActive(key)} style={{
            display:"flex", alignItems:"center", gap:9, width:"100%",
            padding:"8px 11px", borderRadius:8, border:"none",
            background: on ? C.primaryLight : "transparent",
            color: on ? C.primary : C.textSub,
            fontSize:13, fontWeight: on ? 600 : 400,
            cursor:"pointer", marginBottom:1, textAlign:"left",
            fontFamily:"inherit", transition:"all .12s",
          }}>
            <Icon name={icon} size={15} color={on ? C.primary : C.textSub} />
            {label}
          </button>
        );
      })}
    </nav>

    {/* Admin badge */}
    <div style={{ padding:"10px 8px 18px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:9, padding:"10px 11px",
        borderRadius:8, background:C.borderLight }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:C.primary,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize:12, fontWeight:700, flexShrink:0 }}>R</div>
        <div>
          <div style={{ fontSize:12, fontWeight:600, color:C.text }}>Restaurant Admin</div>
          <div style={{ fontSize:11, color:C.textSub }}>Admin</div>
        </div>
      </div>
    </div>
  </div>
);

// ── TopBar ────────────────────────────────────────────────────────────────────
export const TopBar = ({ title, notifications, onBell }) => {
  const unread = notifications.filter(n => !n.read).length;
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"14px 28px", background:C.surface,
      borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100,
    }}>
      <span style={{ fontWeight:700, fontSize:19, color:C.text }}>{title}</span>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <Input placeholder="Smart search..." icon="search" value="" onChange={() => {}} style={{ width:200 }} />
        <button onClick={onBell} style={{
          position:"relative", background:"none", border:`1px solid ${C.border}`,
          borderRadius:8, padding:7, cursor:"pointer", display:"flex", color:C.textSub,
        }}>
          <Icon name="bell" size={16} />
          {unread > 0 && (
            <span style={{
              position:"absolute", top:-4, right:-4, width:16, height:16,
              borderRadius:"50%", background:C.red, color:"#fff",
              fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
            }}>{unread}</span>
          )}
        </button>
      </div>
    </div>
  );
};

// ── Notifications drawer ──────────────────────────────────────────────────────
export const NotifDrawer = ({ notifications, setNotifications, onClose }) => (
  <div style={{ position:"fixed", inset:0, zIndex:900 }} onClick={onClose}>
    <div style={{
      position:"absolute", right:0, top:0, bottom:0, width:380,
      background:C.surface, boxShadow:"-4px 0 30px rgba(0,0,0,.12)",
      display:"flex", flexDirection:"column",
    }} onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"20px 22px", borderBottom:`1px solid ${C.border}` }}>
        <div>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Notifications</div>
          <div style={{ fontSize:12, color:C.textSub }}>
            {notifications.filter(n => !n.read).length} unread
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn variant="ghost" size="sm"
            onClick={() => setNotifications(n => n.map(x => ({ ...x, read:true })))}>
            Mark all read
          </Btn>
          <button onClick={onClose}
            style={{ background:"none", border:"none", cursor:"pointer", color:C.textSub, display:"flex" }}>
            <Icon name="x" size={18} />
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {notifications.map(n => (
          <div key={n.id}
            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read:true } : x))}
            style={{
              padding:"14px 22px", borderBottom:`1px solid ${C.borderLight}`,
              background: n.read ? "transparent" : "rgba(37,99,235,.03)",
              cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start",
            }}>
            <div style={{
              width:36, height:36, borderRadius:10, flexShrink:0,
              background: n.read ? C.borderLight : `${n.color}18`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <Icon name={n.icon} size={16} color={n.read ? C.textMuted : n.color} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight: n.read ? 400 : 600, fontSize:13, color:C.text }}>{n.title}</div>
              <div style={{ fontSize:12, color:C.textSub, marginTop:2, lineHeight:1.5 }}>{n.message}</div>
              <div style={{ fontSize:11, color:C.textMuted, marginTop:4 }}>{n.time}</div>
            </div>
            {!n.read && (
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.primary, flexShrink:0, marginTop:4 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
