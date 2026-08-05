// ── App.jsx ────────────────────────────────────────────────────────────────────
// The root of the app. Owns global state (page, notifications) and renders
// the Sidebar + TopBar shell around whichever page is active.
//
// To add a new page:
//   1. Create src/pages/YourPage.jsx
//   2. Import it here
//   3. Add an entry to the PAGES map below
//   4. Add an entry to data/seed.js NAV array
import { useState } from "react";
import { C } from "./tokens";
import { Sidebar, TopBar, NotifDrawer } from "./components/Layout";
import { INIT_NOTIFICATIONS } from "./data/seed";

// Pages
import Dashboard  from "./pages/Dashboard";
import Orders     from "./pages/Orders";
import Menu       from "./pages/Menu";
import Tables     from "./pages/Tables";
import Waiters    from "./pages/Waiters";
import Customers  from "./pages/Customers";
import Credit     from "./pages/Credit";
import Supervisor from "./pages/Supervisor";
import Analytics  from "./pages/Analytics";
import Settings   from "./pages/Settings";

const PAGES = {
  dashboard:  { title:"Dashboard",           component: (props) => <Dashboard  {...props} /> },
  orders:     { title:"Orders",              component: ()      => <Orders     /> },
  menu:       { title:"Menu",               component: ()      => <Menu       /> },
  tables:     { title:"Tables",             component: ()      => <Tables     /> },
  waiter:     { title:"Waiter Management",  component: ()      => <Waiters    /> },
  customers:  { title:"Customers",          component: ()      => <Customers  /> },
  credit:     { title:"Credit & Pre-Orders",component: ()      => <Credit     /> },
  supervisor: { title:"Supervisor View",    component: ()      => <Supervisor /> },
  analytics:  { title:"Analytics & Reports",component: ()      => <Analytics  /> },
  settings:   { title:"Settings",           component: ()      => <Settings   /> },
};

export default function App() {
  const [page, setPage]             = useState("dashboard");
  const [notifOpen, setNotifOpen]   = useState(false);
  const [notifications, setNotifs]  = useState(INIT_NOTIFICATIONS);

  const current = PAGES[page];

  return (
    <div style={{
      display:"flex", minHeight:"100vh", background:C.bg,
      fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color:C.text,
    }}>
      <Sidebar active={page} setActive={setPage} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <TopBar
          title={current.title}
          notifications={notifications}
          onBell={() => setNotifOpen(v => !v)}
        />
        <div style={{ flex:1, overflowY:"auto" }}>
          {current.component({ setPage })}
        </div>
      </div>

      {notifOpen && (
        <NotifDrawer
          notifications={notifications}
          setNotifications={setNotifs}
          onClose={() => setNotifOpen(false)}
        />
      )}
    </div>
  );
}
