// ── Design tokens ─────────────────────────────────────────────────────────────
// One place to change any colour, font or spacing across the whole app.
export const C = {
  bg:          "#F8F9FB",
  surface:     "#FFFFFF",
  primary:     "#2563EB",
  primaryLight:"#EFF6FF",
  primaryDark: "#1D4ED8",
  text:        "#111827",
  textSub:     "#6B7280",
  textMuted:   "#9CA3AF",
  border:      "#E5E7EB",
  borderLight: "#F3F4F6",
  green:       "#10B981", greenBg:  "#ECFDF5",
  red:         "#EF4444", redBg:    "#FEF2F2",
  amber:       "#F59E0B", amberBg:  "#FFFBEB",
  blue:        "#3B82F6", blueBg:   "#EFF6FF",
  purple:      "#8B5CF6", purpleBg: "#F5F3FF",
  teal:        "#14B8A6", tealBg:   "#F0FDFA",
};

export const statusColor = (s) => {
  if (["Paid","Available","Successful","Served","Approved"].includes(s)) return "green";
  if (["Delayed","Cancelled","Out of Stock","Unavailable","Rejected"].includes(s)) return "red";
  if (["Preparing","Pending Payment","Occupied","Pending","Clocked In"].includes(s)) return "blue";
  if (["Ready","Awaiting Approval"].includes(s)) return "teal";
  if (["Pay Later","Unpaid","Clocked Out"].includes(s)) return "amber";
  return "gray";
};
