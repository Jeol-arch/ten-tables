import { useState } from "react";
import { C } from "../tokens";
import { Btn, Input, Toggle, Confirm, SectionCard } from "../components/UI";
import Icon from "../components/Icon";

export default function Settings() {
  const [vat, setVat] = useState("7.5");
  const [sc, setSc] = useState("5");
  const [payAfter, setPayAfter] = useState(true);
  const [creditLine, setCreditLine] = useState(false);
  const [countdown, setCountdown] = useState("45");
  const [shutdown, setShutdown] = useState(false);
  const [shutdownConfirm, setShutdownConfirm] = useState(false);
  const [printerStatus, setPrinterStatus] = useState({ kitchen:"Online", bar:"Online", receipt:"Offline" });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20 }}>
      {shutdown && (
        <div style={{ background:C.redBg, border:`1px solid ${C.red}`, borderRadius:10, padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
          <Icon name="power" size={18} color={C.red} />
          <div>
            <div style={{ fontWeight:700, fontSize:13, color:C.red }}>EMERGENCY SHUTDOWN ACTIVE</div>
            <div style={{ fontSize:12, color:C.red }}>All digital ordering is halted. QR codes now show "Service Temporarily Unavailable".</div>
          </div>
          <Btn variant="secondary" size="sm" style={{ marginLeft:"auto" }} onClick={() => setShutdown(false)}>Resume Operations</Btn>
        </div>
      )}

      {saved && (
        <div style={{ background:C.greenBg, border:`1px solid ${C.green}`, borderRadius:10, padding:"12px 18px", fontSize:13, color:C.green, fontWeight:500 }}>✓ Settings saved successfully</div>
      )}

      <SectionCard title="Tax & Financial Configuration" subtitle="These rates auto-calculate on every customer receipt">
        <div style={{ padding:"20px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:4 }}>VAT Rate (%)</div>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:8 }}>Applied to all orders as a separate line item on receipts</div>
            <Input type="number" value={vat} onChange={e => setVat(e.target.value)} style={{ width:"100%" }} />
            <div style={{ fontSize:12, color:C.textSub, marginTop:6 }}>Current: {vat}% VAT on a ₦10,000 order = <strong>₦{(10000*Number(vat)/100).toLocaleString()}</strong></div>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:4 }}>Service Charge (%)</div>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:8 }}>Applied to all orders as a separate line item on receipts</div>
            <Input type="number" value={sc} onChange={e => setSc(e.target.value)} style={{ width:"100%" }} />
            <div style={{ fontSize:12, color:C.textSub, marginTop:6 }}>Current: {sc}% SC on a ₦10,000 order = <strong>₦{(10000*Number(sc)/100).toLocaleString()}</strong></div>
          </div>
        </div>
        <div style={{ padding:"14px 24px", background:C.bg, borderTop:`1px solid ${C.border}` }}>
          <div style={{ fontSize:12, color:C.textSub, marginBottom:6 }}>Receipt preview on ₦10,000 order</div>
          <div style={{ display:"flex", gap:24 }}>
            {[["Subtotal","₦10,000"],["VAT ("+vat+"%)",`₦${(10000*Number(vat)/100).toLocaleString()}`],["Service Charge ("+sc+"%)",`₦${(10000*Number(sc)/100).toLocaleString()}`],["Grand Total",`₦${(10000*(1+Number(vat)/100+Number(sc)/100)).toLocaleString()}`]].map(([l,v]) => (
              <div key={l}>
                <div style={{ color:C.textSub, fontSize:11 }}>{l}</div>
                <div style={{ fontWeight:l==="Grand Total"?700:500, color:l==="Grand Total"?C.primary:C.text, fontSize:13 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Payment Controls" subtitle="Master toggles for checkout options shown to diners">
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:16 }}>
          {[
            [payAfter, setPayAfter, "Pay After Eating (Open Tab)", "Allows diners to order and pay at the end of their meal. Carries dine-and-dash risk."],
            [creditLine, setCreditLine, "Pay via Credit Line", "Enables diners to submit credit requests that go to the Admin approval queue."],
          ].map(([val, setter, label, desc]) => (
            <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderRadius:10, border:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{label}</div>
                <div style={{ fontSize:12, color:C.textSub, marginTop:2 }}>{desc}</div>
              </div>
              <Toggle value={val} onChange={setter} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Safety & Compliance Settings" subtitle="Revenue protection and operational timers">
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:4 }}>Payment Countdown Window (minutes)</div>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:10 }}>A High-Priority Red Alert is sent to the waiter and supervisor when this timer expires on any unpaid open tab.</div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Input type="number" value={countdown} onChange={e => setCountdown(e.target.value)} style={{ width:100 }} />
              <span style={{ fontSize:13, color:C.textSub }}>minutes (PRD default: 45 min)</span>
            </div>
          </div>
          <div style={{ padding:14, background:C.amberBg, borderRadius:10, display:"flex", alignItems:"flex-start", gap:10 }}>
            <Icon name="warn" size={18} color={C.amber} />
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:C.amber }}>Emergency Shutdown Switch</div>
              <div style={{ fontSize:12, color:C.amber, marginTop:2, marginBottom:10 }}>Instantly halts ALL digital ordering. QR codes will show "Service Temporarily Unavailable". Use only in emergencies.</div>
              <Toggle value={shutdown} onChange={v => { if(v) setShutdownConfirm(true); else setShutdown(false); }} label={shutdown ? "Shutdown ACTIVE — tap to resume" : "Activate Emergency Shutdown"} />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Kitchen Printer Fleet" subtitle="Hardware connection status and routing configuration">
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:12 }}>
          {Object.entries(printerStatus).map(([name, status]) => (
            <div key={name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderRadius:10, border:`2px solid ${status==="Online"?C.green:C.red}`, background:status==="Online"?C.greenBg:C.redBg }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Icon name="printer" size={20} color={status==="Online"?C.green:C.red} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text, textTransform:"capitalize" }}>{name} Printer</div>
                  <div style={{ fontSize:12, color:status==="Online"?C.green:C.red, fontWeight:500 }}>{status}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <Btn variant="secondary" size="sm" onClick={() => setPrinterStatus(p => ({...p,[name]:p[name]==="Online"?"Offline":"Online"}))}>{status==="Online"?"Disconnect":"Reconnect"}</Btn>
                <Btn variant="secondary" size="sm"><Icon name="printer" size={13} />Test Print</Btn>
              </div>
            </div>
          ))}
          {Object.values(printerStatus).some(s => s==="Offline") && (
            <div style={{ padding:"12px 16px", background:C.redBg, borderRadius:8, fontSize:13, color:C.red, fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
              <Icon name="warn" size={16} color={C.red} />⚠ One or more printers are offline. Staff have been notified to use manual order tracking.
            </div>
          )}
        </div>
      </SectionCard>

      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <Btn variant="primary" style={{ padding:"10px 28px" }} onClick={save}><Icon name="check" size={15} />Save All Settings</Btn>
      </div>

      {shutdownConfirm && (
        <Confirm
          title="Activate Emergency Shutdown?"
          message="This will immediately halt ALL digital ordering. Every QR code across the restaurant will show 'Service Temporarily Unavailable' to diners."
          confirmLabel="Shut Down Now"
          onConfirm={() => { setShutdown(true); setShutdownConfirm(false); }}
          onCancel={() => setShutdownConfirm(false)}
        />
      )}
    </div>
  );
}
