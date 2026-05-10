const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 701 292-8822",
    location: "12 Gwarinpa Estate, Abuja",
    avatar: "🧑",
    status: "VIP",
    orders: 24,
    spent: 12850,
    avgOrder: "$535.42",
    joined: "2025-01-15",
    lastOrder: "2026-05-05",
    customerId: "CUST-001",

    recentOrders: [
      {
        id: "#ORD-2024-1245",
        date: "2026-05-05",
        items: "2 items",
        total: "$2,578",
        status: "Delivered"
      },
      {
        id: "#ORD-2024-1198",
        date: "2026-04-28",
        items: "1 item",
        total: "$1,299",
        status: "Delivered"
      },
      {
        id: "#ORD-2024-1152",
        date: "2026-04-15",
        items: "3 items",
        total: "$899",
        status: "Delivered"
      }
    ]
  },

  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    phone: "+234 701 292-8822",
    location: "Lugbe, Abuja",
    avatar: "👩",
    status: "Active",
    orders: 18,
    spent: 8920,
    avgOrder: "$535.42",
    joined: "2025-03-10",
    lastOrder: "2026-05-02",
    customerId: "CUST-002",

    recentOrders: [
      {
        id: "#ORD-2024-1202",
        date: "2026-05-02",
        items: "2 items",
        total: "$799",
        status: "Delivered"
      },
      {
        id: "#ORD-2024-1171",
        date: "2026-04-20",
        items: "1 item",
        total: "$1,499",
        status: "Delivered"
      }
    ]
  },

  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+234 701 292-8822",
    location: "Wuse 2, Abuja",
    avatar: "🧑",
    status: "VIP",
    orders: 32,
    spent: 18500,
    avgOrder: "$535.42",
    joined: "2024-11-20",
    lastOrder: "2026-05-01",
    customerId: "CUST-003",

    recentOrders: [
      {
        id: "#ORD-2024-1218",
        date: "2026-05-01",
        items: "4 items",
        total: "$3,200",
        status: "Delivered"
      },
      {
        id: "#ORD-2024-1184",
        date: "2026-04-18",
        items: "2 items",
        total: "$1,150",
        status: "Delivered"
      }
    ]
  },

  {
    id: 4,
    name: "Emma Brown",
    email: "emma.b@email.com",
    phone: "+234 701 292-8822",
    location: "Maitama, Abuja",
    avatar: "👩‍💻",
    status: "Active",
    orders: 15,
    spent: 6750,
    avgOrder: "$535.42",
    joined: "2025-06-01",
    lastOrder: "2026-04-30",
    customerId: "CUST-004",

    recentOrders: [
      {
        id: "#ORD-2024-1225",
        date: "2026-04-30",
        items: "1 item",
        total: "$599",
        status: "Delivered"
      }
    ]
  },

  {
    id: 5,
    name: "David Lee",
    email: "david.l@email.com",
    phone: "+234 701 292-8822",
    location: "Asokoro, Abuja",
    avatar: "🧔",
    status: "Inactive",
    orders: 9,
    spent: 3200,
    avgOrder: "$535.42",
    joined: "2025-08-12",
    lastOrder: "2026-03-15",
    customerId: "CUST-005",

    recentOrders: [
      {
        id: "#ORD-2024-1115",
        date: "2026-03-15",
        items: "2 items",
        total: "$420",
        status: "Delivered"
      }
    ]
  }
];

export default customers;