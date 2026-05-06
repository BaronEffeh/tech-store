import MacBookPro16 from "../../assets/products/macBookPro16.png";
import MacBookPro16_2 from "../../assets/products/macBookPro16_2.jpg";
import MacBookPro16_3 from "../../assets/products/macBookPro16_3.jpg";
import MacBookPro16_4 from "../../assets/products/macBookPro16_4.jpg";

import DellXPS15Intel from "../../assets/products/DellXPS15Intel.png";
import DellXPS15Intel_2 from "../../assets/products/DellXPS15Intel_2.png";
import DellXPS15Intel_3 from "../../assets/products/DellXPS15Intel_3.png";
import DellXPS15Intel_4 from "../../assets/products/DellXPS15Intel_4.png";

import iPhone_15_promax from "../../assets/products/iPhone-15-promax.jpeg";
import iPhone_15_Pro_Max2 from "../../assets/products/iPhone_15_Pro_Max2.png";
import iPhone_15_Pro_Max3 from "../../assets/products/iPhone_15_Pro_Max3.jpg";
import iPhone_15_Pro_Max4 from "../../assets/products/iPhone_15_Pro_Max4.png";

import Samsung_Galaxy_S24_Ultra from "../../assets/products/Samsung_Galaxy_S24_Ultra.png";
import Samsung_Galaxy_S24_Ultra2 from "../../assets/products/Samsung_Galaxy_S24_Ultra2.png";
import Samsung_Galaxy_S24_Ultra3 from "../../assets/products/Samsung_Galaxy_S24_Ultra3.png";
import Samsung_Galaxy_S24_Ultra4 from "../../assets/products/Samsung_Galaxy_S24_Ultra4.jpg";

import iPadPro from "../../assets/products/iPad_Pro.png";
import iPadPro2 from "../../assets/products/iPad_Pro2.png";
import iPadPro3 from "../../assets/products/iPad_Pro3.png";
import iPadPro4 from "../../assets/products/iPad_Pro4.jpg";

import WirelessHeadphones from "../../assets/products/Wireless_Headphones.png";
import WirelessHeadphones2 from "../../assets/products/Wireless_Headphones2.jpg";
import WirelessHeadphones3 from "../../assets/products/Wireless_Headphones3.jpg";
import WirelessHeadphones4 from "../../assets/products/Wireless_Headphones4.jpg";

export const products = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max 2024',
    category: "Laptops",
    price: 819999.99,
    oldPrice: 821999.99,
    discount: "-17%",
    tag: "Best Seller",
    rating: 4.5,
    reviews: 342,
    image: MacBookPro16,
    images: [
      MacBookPro16,
      MacBookPro16_2,
      MacBookPro16_3,
      MacBookPro16_4
    ],
    description: "The MacBook Pro with M3 Max chip delivers exceptional performance for professionals. With up to 128GB of unified memory and an advanced thermal design, it handles the most demanding workflows with ease. Features a stunning Liquid Retina XDR display, longest battery life ever in a Mac, and extensive connectivity options.",
    specs: {
      Processor: "Apple M3 Max 16-core CPU",
      Graphics: "40-core GPU",
      Memory: "48GB Unified Memory",
      Storage: "1TB SSD",
      Display: '16.2" Liquid Retina XDR (3456 x 2234)',
      "Battery Life": "Up to 22 hours",
      Weight: "4.8 lbs (2.16 kg)",
      Ports: "3x Thunderbolt 4, HDMI, SD card slot, MagSafe 3"
    },
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
  {
    id: 2,
    name: "Dell XPS 15 Intel i9 32GB RAM",
    category: "Laptops",
    price: 1899.99,
    rating: 4,
    reviews: 218,
    image: DellXPS15Intel,
    images: [
      DellXPS15Intel,
      DellXPS15Intel_2,
      DellXPS15Intel_3,
      DellXPS15Intel_4,
    ],
    description: "Premium performance meets stunning design in the Dell XPS 15. Featuring a powerful Intel i9 processor and NVIDIA RTX graphics, this laptop excels at creative work, gaming, and multitasking. The InfinityEdge display maximizes screen space while maintaining a compact footprint.",
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max 256GB",
    category: "Phones",
    price: 1199.99,
    oldPrice: 1299.99,
    discount: "-8%",
    tag: "New",
    rating: 4.5,
    reviews: 521,
    image: iPhone_15_Pro_Max2,
    images: [
      iPhone_15_Pro_Max2,
      iPhone_15_promax,
      iPhone_15_Pro_Max3,
      iPhone_15_Pro_Max4,
    ],
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra 512GB",
    category: "Phones",
    price: 1099.99,
    rating: 4.5,
    reviews: 389,
    image: Samsung_Galaxy_S24_Ultra,
    images: [
      Samsung_Galaxy_S24_Ultra,
      Samsung_Galaxy_S24_Ultra2,
      Samsung_Galaxy_S24_Ultra3,
      Samsung_Galaxy_S24_Ultra4,
    ],
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M2 Chip 256GB',
    category: "Tablets",
    price: 1099.99,
    oldPrice: 1199.99,
    rating: 4,
    reviews: 276,
    image: iPadPro,
    images: [
      iPadPro,
      iPadPro2,
      iPadPro3,
      iPadPro4,
    ],
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
  {
    id: 6,
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Accessories",
    price: 1099.99,
    oldPrice: 1199.99,
    rating: 4.9,
    reviews: 892,
    image: WirelessHeadphones,
    images: [
      WirelessHeadphones,
      WirelessHeadphones2,
      WirelessHeadphones3,
      WirelessHeadphones4,
    ],
    reviewsData: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing performance! Worth every penny.",
        date: "2025-01-12"
      },
      {
        name: "Sarah K.",
        rating: 4,
        comment: "Great laptop but quite expensive.",
        date: "2025-02-03"
      }
    ]
  },
];