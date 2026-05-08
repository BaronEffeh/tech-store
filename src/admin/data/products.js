import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const products = [
  {
    id: 1,
    name: 'MacBook Pro M3 16"',
    sku: "LAP-001",
    category: "Laptops",
    price: 2499,
    stock: 45,
    sales: 145,
    status: "In Stock",
    image: LaptopMacIcon
  },

  {
    id: 2,
    name: "iPhone 15 Pro Max",
    sku: "PHN-001",
    category: "Phones",
    price: 1199,
    stock: 12,
    sales: 220,
    status: "Low Stock",
    image: PhoneIphoneIcon
  },

  {
    id: 3,
    name: "Dell XPS 15",
    sku: "LAP-002",
    category: "Laptops",
    price: 1899,
    stock: 32,
    sales: 98,
    status: "In Stock",
    image: LaptopMacIcon
  },

  {
    id: 4,
    name: 'iPad Pro 12.9"',
    sku: "TAB-001",
    category: "Tablets",
    price: 999,
    stock: 56,
    sales: 156,
    status: "In Stock",
    image: TabletMacIcon
  },

  {
    id: 5,
    name: "Samsung Galaxy S24",
    sku: "PHN-002",
    category: "Phones",
    price: 899,
    stock: 8,
    sales: 187,
    status: "Low Stock",
    image: PhoneIphoneIcon
  },

  {
    id: 6,
    name: "Logitech MX Master 3S",
    sku: "ACC-001",
    category: "Accessories",
    price: 99,
    stock: 124,
    sales: 342,
    status: "In Stock",
    image: HeadphonesIcon
  }
];

export default products;





// import LaptopMacIcon from "@mui/icons-material/LaptopMac";
// import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
// import TabletMacIcon from "@mui/icons-material/TabletMac";
// import HeadphonesIcon from "@mui/icons-material/Headphones";

// const products = [
//   {
//     id: 1,
//     name: 'MacBook Pro M3 16"',
//     sku: "LAP-001",
//     category: "Laptops",
//     price: 2499,
//     stock: 45,
//     sales: 145,
//     status: "In Stock",
//     image: <LaptopMacIcon sx={{ fontSize: 50 }} />
//   },

//   {
//     id: 2,
//     name: "iPhone 15 Pro Max",
//     sku: "PHN-001",
//     category: "Phones",
//     price: 1199,
//     stock: 12,
//     sales: 220,
//     status: "Low Stock",
//     image: PhoneIphoneIcon
//   },

//   {
//     id: 3,
//     name: "Dell XPS 15",
//     sku: "LAP-002",
//     category: "Laptops",
//     price: 1899,
//     stock: 32,
//     sales: 98,
//     status: "In Stock",
//     image: LaptopMacIcon
//   },

//   {
//     id: 4,
//     name: 'iPad Pro 12.9"',
//     sku: "TAB-001",
//     category: "Tablets",
//     price: 999,
//     stock: 56,
//     sales: 156,
//     status: "In Stock",
//     image: TabletMacIcon
//   },

//   {
//     id: 5,
//     name: "Samsung Galaxy S24",
//     sku: "PHN-002",
//     category: "Phones",
//     price: 899,
//     stock: 8,
//     sales: 187,
//     status: "Low Stock",
//     image: PhoneIphoneIcon
//   },

//   {
//     id: 6,
//     name: "Logitech MX Master 3S",
//     sku: "ACC-001",
//     category: "Accessories",
//     price: 99,
//     stock: 124,
//     sales: 342,
//     status: "In Stock",
//     image: HeadphonesIcon
//   }
// ];

// export default products;