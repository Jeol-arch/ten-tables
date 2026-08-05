// ── Seed / mock data ──────────────────────────────────────────────────────────
// When you connect a real backend, delete this file and replace the imports
// in each page with real API calls.

export const INIT_MENU = [
  { id:1, name:"Strawberry Oatmeal Pancakes With Honey Syrup", type:"Appetizer", category:"Starter", price:"₦5,000", rawPrice:5000, orderCount:347, availability:"Available", image:"🥞", prepTime:"15", description:"Golden oatmeal pancakes layered with fresh strawberries and drizzled with honey syrup.", allergens:["Gluten","Dairy"] },
  { id:2, name:"Strawberry Milkshake", type:"Drink", category:"Drink", price:"₦3,500", rawPrice:3500, orderCount:220, availability:"Available", image:"🥤", prepTime:"8", description:"A thick, creamy milkshake blended with real strawberries.", allergens:["Dairy"] },
  { id:3, name:"Manhattan", type:"Drink", category:"Drink", price:"₦45,370", rawPrice:45370, orderCount:1639, availability:"Available", image:"🍹", prepTime:"5", description:"A classic whiskey cocktail stirred with sweet vermouth and bitters.", allergens:[] },
  { id:4, name:"Spicy Jollof Rice and Chicken", type:"Food", category:"Main", price:"₦3,200", rawPrice:3200, orderCount:18, availability:"Out of Stock", image:"🍛", prepTime:"25", description:"Smoky jollof rice served with crispy fried chicken and coleslaw.", allergens:[] },
  { id:5, name:"Spicy Chicken", type:"Food", category:"Main", price:"₦7,000", rawPrice:7000, orderCount:224, availability:"Available", image:"🍗", prepTime:"20", description:"Marinated chicken thighs coated in a fiery spice blend, grilled to perfection.", allergens:[] },
  { id:6, name:"Chocolate Cake", type:"Dessert", category:"Dessert", price:"₦3,500", rawPrice:3500, orderCount:89, availability:"Available", image:"🍰", prepTime:"5", description:"Rich three-layer chocolate cake with ganache frosting.", allergens:["Gluten","Dairy","Eggs"] },
  { id:7, name:"Grilled Salmon", type:"Food", category:"Main", price:"₦12,000", rawPrice:12000, orderCount:156, availability:"Available", image:"🐟", prepTime:"22", description:"Atlantic salmon fillet grilled with lemon butter and herbs.", allergens:["Fish"] },
  { id:8, name:"Caesar Salad", type:"Food", category:"Starter", price:"₦4,500", rawPrice:4500, orderCount:201, availability:"Available", image:"🥗", prepTime:"10", description:"Crisp romaine, parmesan, croutons and house Caesar dressing.", allergens:["Gluten","Dairy","Eggs"] },
];

export const INIT_ORDERS = [
  { id:"#23456", customer:"Alexis Flores",       items:3, price:"₦9,500",  rawPrice:9500,  table:"Table 7", tableNum:7, waiter:"Bukayo Saka",    prepTime:"00:30", status:"Preparing", payType:"Pay Now",   orderItems:["Chicken skewers","Strawberry shake","Caesar salad"] },
  { id:"#23457", customer:"Chukwueke Lakhini",    items:2, price:"₦5,000",  rawPrice:5000,  table:"Table 5", tableNum:5, waiter:"Bukayo Saka",    prepTime:"02:00", status:"Delayed",   payType:"Pay Later", orderItems:["Jollof Rice","Milkshake"] },
  { id:"#23458", customer:"Brown-Hancock",        items:3, price:"₦7,000",  rawPrice:7000,  table:"Table 5", tableNum:5, waiter:"Tunde Adeyemi",  prepTime:"05:30", status:"Ready",     payType:"Pay Now",   orderItems:["Grilled Salmon","Salad","Juice"] },
  { id:"#23459", customer:"Vale Scott",           items:1, price:"₦2,500",  rawPrice:2500,  table:"Table 3", tableNum:3, waiter:"Tunde Adeyemi",  prepTime:"10:00", status:"Paid",      payType:"Pay Now",   orderItems:["Chocolate Cake"] },
  { id:"#23460", customer:"Clifford Milo",        items:4, price:"₦15,000", rawPrice:15000, table:"Table 7", tableNum:7, waiter:"Bukayo Saka",    prepTime:"02:00", status:"Served",    payType:"Pay Later", orderItems:["Steak","Wine","Salad","Bread"] },
  { id:"#23461", customer:"Roland Ollie",         items:2, price:"₦8,000",  rawPrice:8000,  table:"Table 3", tableNum:3, waiter:"Ngozi Okafor",   prepTime:"08:00", status:"Served",    payType:"Pay Now",   orderItems:["Salmon","Cocktail"] },
  { id:"#23462", customer:"Maria Santos",         items:5, price:"₦22,000", rawPrice:22000, table:"Table 2", tableNum:2, waiter:"Ngozi Okafor",   prepTime:"03:00", status:"Preparing", payType:"Pay Now",   orderItems:["5 items"] },
  { id:"#23463", customer:"Ahmed Yusuf",          items:1, price:"₦4,500",  rawPrice:4500,  table:"Table 9", tableNum:9, waiter:"Tunde Adeyemi",  prepTime:"01:30", status:"Delayed",   payType:"Pay Later", orderItems:["Spicy Chicken"] },
];

export const INIT_TABLES = [
  { id:"T01", number:"01", type:"2 seater", capacity:2, status:"Vacant",          zone:"Oak Wood 1", mergedWith:[] },
  { id:"T02", number:"02", type:"4 seater", capacity:4, status:"Occupied",         zone:"Oak Wood 1", mergedWith:[] },
  { id:"T03", number:"03", type:"4 seater", capacity:4, status:"Pending Payment",  zone:"Oak Wood 2", mergedWith:[] },
  { id:"T04", number:"04", type:"2 seater", capacity:2, status:"Vacant",           zone:"Oak Wood 2", mergedWith:[] },
  { id:"T05", number:"05", type:"6 seater", capacity:6, status:"Occupied",         zone:"Oak Wood 1", mergedWith:[] },
  { id:"T06", number:"06", type:"2 seater", capacity:2, status:"Vacant",           zone:"Oak Wood 3", mergedWith:[] },
  { id:"T07", number:"07", type:"8 seater", capacity:8, status:"Occupied",         zone:"Oak Wood 3", mergedWith:[] },
  { id:"T08", number:"08", type:"4 seater", capacity:4, status:"Pending Payment",  zone:"Oak Wood 2", mergedWith:[] },
];

export const INIT_WAITERS = [
  { id:1, name:"Bukayo Saka",    tables:["Table 05","Table 07"], availability:"Available",   zone:"Oak Wood 1", status:"Clocked In",  clockIn:"08:00", clockOut:"—",    totalOrders:34, avgResponse:"4.2 min" },
  { id:2, name:"Tunde Adeyemi",  tables:["Table 03","Table 05","Table 08"], availability:"Available", zone:"Oak Wood 2", status:"Clocked In",  clockIn:"08:15", clockOut:"—",    totalOrders:28, avgResponse:"5.1 min" },
  { id:3, name:"Ngozi Okafor",   tables:["Table 02","Table 04"], availability:"Unavailable", zone:"Oak Wood 3", status:"Clocked Out", clockIn:"07:30", clockOut:"14:00",totalOrders:12, avgResponse:"6.4 min" },
  { id:4, name:"Emeka Diala",    tables:["Table 01","Table 06"], availability:"Available",   zone:"Oak Wood 1", status:"Clocked In",  clockIn:"09:00", clockOut:"—",    totalOrders:19, avgResponse:"3.9 min" },
  { id:5, name:"Fatima Bello",   tables:["Table 07"],            availability:"Available",   zone:"Oak Wood 3", status:"Clocked In",  clockIn:"08:45", clockOut:"—",    totalOrders:22, avgResponse:"4.7 min" },
  { id:6, name:"Chidi Okeke",    tables:["Table 02","Table 08"], availability:"Available",   zone:"Oak Wood 2", status:"Clocked Out", clockIn:"—",     clockOut:"—",    totalOrders:0,  avgResponse:"—" },
];

export const INIT_CUSTOMERS = [
  { id:1, name:"Joel Oluwatamilore Salem", email:"joel.s@domain.com",   totalOrders:100, spent:"₦200,000", rawSpent:200000, dateJoined:"12 Oct, 2026", payLater:false, blacklisted:false },
  { id:2, name:"Chioma Obi",               email:"chioma.o@domain.com", totalOrders:200, spent:"₦380,000", rawSpent:380000, dateJoined:"14 Oct, 2026", payLater:true,  blacklisted:false },
  { id:3, name:"Adaeze Nwosu",             email:"adaeze.n@domain.com", totalOrders:10,  spent:"₦45,000",  rawSpent:45000,  dateJoined:"15 Oct, 2026", payLater:false, blacklisted:false },
  { id:4, name:"Seun Adesola",             email:"seun.a@domain.com",   totalOrders:56,  spent:"₦120,000", rawSpent:120000, dateJoined:"15 Oct, 2026", payLater:false, blacklisted:false },
  { id:5, name:"Kemi Lawal",               email:"kemi.l@domain.com",   totalOrders:19,  spent:"₦60,000",  rawSpent:60000,  dateJoined:"16 Oct, 2026", payLater:true,  blacklisted:true  },
];

export const INIT_CREDIT_REQUESTS = [
  { id:"CR001", customer:"Chioma Obi",               email:"chioma.o@domain.com", table:"Table 5", amount:"₦15,000", rawAmount:15000, requestedAt:"12:30 PM", status:"Awaiting Approval" },
  { id:"CR002", customer:"Joel Oluwatamilore Salem", email:"joel.s@domain.com",   table:"Table 2", amount:"₦8,500",  rawAmount:8500,  requestedAt:"01:05 PM", status:"Awaiting Approval" },
  { id:"CR003", customer:"Fatou Diallo",             email:"fatou.d@domain.com",  table:"Table 9", amount:"₦22,000", rawAmount:22000, requestedAt:"01:40 PM", status:"Approved" },
];

export const INIT_PREORDERS = [
  { id:"PO001", customer:"Emeka Eze",       phone:"+234 801 234 5678", items:"Grilled Salmon, Caesar Salad",    total:"₦16,500", rawTotal:16500, scheduledFor:"07:30 PM", status:"Holding", notes:"Window seat if possible" },
  { id:"PO002", customer:"Sandra Okonkwo",  phone:"+234 703 987 6543", items:"Spicy Chicken x2, Milkshake",    total:"₦17,500", rawTotal:17500, scheduledFor:"08:00 PM", status:"Arrived", notes:"Allergy: no dairy" },
];

export const INIT_NOTIFICATIONS = [
  { id:1, type:"warning", icon:"warn",    color:"#F59E0B", title:"45-min Payment Alert",    message:"Table 5 (Chukwueke Lakhini) — open tab unpaid for 45 minutes.",              time:"2 min ago",  read:false },
  { id:2, type:"info",    icon:"clock",   color:"#3B82F6", title:"Order Ready for Pickup",  message:"Order #23458 (Brown-Hancock, Table 5) is ready at the pass.",               time:"5 min ago",  read:false },
  { id:3, type:"error",   icon:"warn",    color:"#EF4444", title:"Delayed Order",           message:"Order #23457 (Chukwueke Lakhini) exceeded prep time by 5 min.",              time:"8 min ago",  read:false },
  { id:4, type:"error",   icon:"printer", color:"#EF4444", title:"Printer Offline",         message:"Kitchen printer lost connection. Switch to manual order tracking.",          time:"12 min ago", read:false },
  { id:5, type:"success", icon:"check",   color:"#10B981", title:"Payment Confirmed",       message:"Table 3 (Vale Scott) — ₦2,500 digital payment received.",                   time:"15 min ago", read:true  },
  { id:6, type:"warning", icon:"credit",  color:"#F59E0B", title:"Credit Request",          message:"Chioma Obi (Table 5) is requesting ₦15,000 credit payment.",                time:"20 min ago", read:true  },
];

export const BAR_DATA = [28,45,32,60,48,72,55,80,65,90,70,95,75,85,60,78,55,68,82,70,58,75,88,65,72,80,68,90,75,85];

export const NAV = [
  { key:"dashboard",  label:"Dashboard",          icon:"dashboard"  },
  { key:"orders",     label:"Orders",             icon:"orders"     },
  { key:"menu",       label:"Menu",               icon:"menu"       },
  { key:"tables",     label:"Tables",             icon:"tables"     },
  { key:"waiter",     label:"Waiter Management",  icon:"waiter"     },
  { key:"customers",  label:"Customers",          icon:"customers"  },
  { key:"credit",     label:"Credit & Pre-Orders",icon:"credit"     },
  { key:"supervisor", label:"Supervisor View",    icon:"supervisor" },
  { key:"analytics",  label:"Analytics & Reports",icon:"analytics"  },
  { key:"settings",   label:"Settings",           icon:"settings"   },
];
