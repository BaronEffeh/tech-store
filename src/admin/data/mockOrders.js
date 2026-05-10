export const mockOrders = [
  {
    id: "ORD-2024-1245",
    customer: "John Doe",
    email: "john.doe@email.com",
    date: "2026-05-05",
    total: 2578,
    status: "Delivered",
    payment: "Paid",
    shippingAddress: "12 Gwarinpa Estate, Abuja",
    items: [
      {
        product: 'MacBook Pro M3 16"',
        quantity: 1,
        price: 2499,
      },
      {
        product: "Magic Mouse",
        quantity: 1,
        price: 79,
      },
    ],
  },

  {
    id: "ORD-2024-1244",
    customer: "Sarah Wilson",
    email: "sarah.w@email.com",
    date: "2026-05-05",
    total: 2398,
    status: "Processing",
    payment: "Paid",
    shippingAddress: "Lugbe, Abuja",
    items: [
      {
        product: "iPhone 15 Pro",
        quantity: 1,
        price: 1899,
      },
      {
        product: "AirPods Pro",
        quantity: 1,
        price: 499,
      },
    ],
  },

  {
    id: "ORD-2024-1243",
    customer: "Mike Johnson",
    email: "mike.j@email.com",
    date: "2026-05-04",
    total: 1998,
    status: "Shipped",
    payment: "Paid",
    shippingAddress: "Wuse 2, Abuja",
    items: [
      {
        product: "Samsung Galaxy S25",
        quantity: 2,
        price: 999,
      },
    ],
  },

  {
    id: "ORD-2024-1242",
    customer: "Emma Brown",
    email: "emma.b@email.com",
    date: "2026-05-04",
    total: 728,
    status: "Delivered",
    payment: "Paid",
    shippingAddress: "Maitama, Abuja",
    items: [
      {
        product: "PlayStation Controller",
        quantity: 2,
        price: 120,
      },
      {
        product: "Gaming Headset",
        quantity: 1,
        price: 488,
      },
    ],
  },

  {
    id: "ORD-2024-1241",
    customer: "David Lee",
    email: "david.lee@email.com",
    date: "2026-05-03",
    total: 747,
    status: "Processing",
    payment: "Paid",
    shippingAddress: "Asokoro, Abuja",
    items: [
      {
        product: "Smart Watch",
        quantity: 1,
        price: 347,
      },
      {
        product: "Bluetooth Speaker",
        quantity: 2,
        price: 200,
      },
    ],
  },

  {
    id: "ORD-2024-1240",
    customer: "Lisa Anderson",
    email: "lisa.a@email.com",
    date: "2026-05-03",
    total: 899,
    status: "Pending",
    payment: "Pending",
    shippingAddress: "Jabi, Abuja",
    items: [
      {
        product: "Dell Monitor 27-inch",
        quantity: 1,
        price: 599,
      },
      {
        product: "Mechanical Keyboard",
        quantity: 1,
        price: 300,
      },
    ],
  },

  {
    id: "ORD-2024-1239",
    customer: "Robert Taylor",
    email: "robert.t@email.com",
    date: "2026-05-02",
    total: 1599,
    status: "Cancelled",
    payment: "Failed",
    shippingAddress: "Kubwa, Abuja",
    items: [
      {
        product: "Xbox Series X",
        quantity: 1,
        price: 1599,
      },
    ],
  },
];