
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation, providing an immersive audio experience. Features 30-hour battery life and comfortable over-ear design.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    subcategory: "Audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2068&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 101,
        name: "Black",
        color: "#000000",
        stock: 25,
        price: 299.99,
      },
      {
        id: 102,
        name: "White",
        color: "#FFFFFF",
        stock: 15,
        price: 299.99,
      },
      {
        id: 103,
        name: "Blue",
        color: "#0047AB",
        stock: 10,
        price: 319.99,
      }
    ],
    tags: ["wireless", "noise-cancelling", "premium", "bluetooth"],
    rating: 4.8,
    reviewCount: 256,
    stock: 50,
    isNew: false,
    isFeatured: true,
    onSale: true,
    salePercentage: 25,
    brand: "AudioTech",
    sku: "AT-WNC-001"
  },
  {
    id: 2,
    name: "Ultra HD 4K Smart TV 55\"",
    description: "Stunning 55-inch 4K Ultra HD display with smart functionality, HDR support, and built-in streaming apps for an enhanced viewing experience.",
    price: 799.99,
    originalPrice: 999.99,
    category: "Electronics",
    subcategory: "TVs",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["4k", "smart tv", "ultra hd", "hdr"],
    rating: 4.6,
    reviewCount: 189,
    stock: 35,
    isFeatured: true,
    onSale: true,
    salePercentage: 20,
    brand: "VisionTech",
    sku: "VT-TV-4K55"
  },
  {
    id: 3,
    name: "Professional Camera DSLR Kit",
    description: "High-performance DSLR camera with 24.1MP sensor, 4K video capability, 3-inch LCD screen, and includes 18-55mm lens kit.",
    price: 1299.99,
    category: "Electronics",
    subcategory: "Cameras",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1770&auto=format&fit=crop"
    ],
    tags: ["camera", "dslr", "professional", "4k video"],
    rating: 4.9,
    reviewCount: 120,
    stock: 15,
    isNew: true,
    brand: "ProCapture",
    sku: "PC-DSLR-PRO"
  },
  {
    id: 4,
    name: "Smartphone Pro Max",
    description: "Latest flagship smartphone with 6.7-inch Super Retina display, triple-camera system, 5G connectivity, and all-day battery life.",
    price: 1099.99,
    category: "Electronics",
    subcategory: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1829&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2044&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 401,
        name: "Black 128GB",
        color: "#000000",
        stock: 20,
        price: 1099.99,
      },
      {
        id: 402,
        name: "Black 256GB",
        color: "#000000",
        stock: 15,
        price: 1199.99,
      },
      {
        id: 403,
        name: "Silver 128GB",
        color: "#C0C0C0",
        stock: 18,
        price: 1099.99,
      },
      {
        id: 404,
        name: "Silver 256GB",
        color: "#C0C0C0",
        stock: 12,
        price: 1199.99,
      }
    ],
    tags: ["smartphone", "5G", "pro", "flagship"],
    rating: 4.7,
    reviewCount: 342,
    stock: 65,
    isNew: true,
    isFeatured: true,
    brand: "TechGiant",
    sku: "TG-SPM-5G"
  },
  {
    id: 5,
    name: "Ultra-thin Laptop Pro",
    description: "Powerful and sleek laptop with 14-inch 4K display, 16GB RAM, 1TB SSD, and the latest processor for ultimate performance.",
    price: 1499.99,
    originalPrice: 1699.99,
    category: "Electronics",
    subcategory: "Laptops",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 501,
        name: "Silver 16GB/1TB",
        color: "#C0C0C0",
        stock: 10,
        price: 1499.99,
      },
      {
        id: 502,
        name: "Silver 32GB/1TB",
        color: "#C0C0C0",
        stock: 5,
        price: 1799.99,
      },
      {
        id: 503,
        name: "Space Gray 16GB/1TB",
        color: "#8A8D8F",
        stock: 8,
        price: 1499.99,
      }
    ],
    tags: ["laptop", "ultrabook", "premium", "high-performance"],
    rating: 4.8,
    reviewCount: 178,
    stock: 23,
    onSale: true,
    salePercentage: 12,
    brand: "ComputeTech",
    sku: "CT-ULP-16G"
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound, virtual assistant capabilities, and smart home control features.",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    subcategory: "Smart Home",
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=1782&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 601,
        name: "Charcoal",
        color: "#36454F",
        stock: 30,
        price: 149.99,
      },
      {
        id: 602,
        name: "Sandstone",
        color: "#F5DEB3",
        stock: 25,
        price: 149.99,
      },
    ],
    tags: ["smart speaker", "voice assistant", "smart home", "wifi"],
    rating: 4.5,
    reviewCount: 215,
    stock: 55,
    onSale: true,
    salePercentage: 25,
    brand: "SmartLife",
    sku: "SL-HSP-01"
  },
  {
    id: 7,
    name: "Fitness Smartwatch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, water resistance, and a battery life of up to 7 days.",
    price: 249.99,
    category: "Electronics",
    subcategory: "Wearables",
    images: [
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2027&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 701,
        name: "Black",
        color: "#000000",
        stock: 20,
        price: 249.99,
      },
      {
        id: 702,
        name: "Silver",
        color: "#C0C0C0",
        stock: 15,
        price: 249.99,
      },
      {
        id: 703,
        name: "Rose Gold",
        color: "#B76E79",
        stock: 12,
        price: 269.99,
      }
    ],
    tags: ["smartwatch", "fitness tracker", "heart rate", "gps"],
    rating: 4.6,
    reviewCount: 167,
    stock: 47,
    isNew: true,
    brand: "FitTech",
    sku: "FT-FSW-HR"
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    description: "Compact waterproof Bluetooth speaker with 20-hour battery life, 360° sound, and built-in microphone for calls.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    subcategory: "Audio",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=1936&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 801,
        name: "Black",
        color: "#000000",
        stock: 35,
        price: 79.99,
      },
      {
        id: 802,
        name: "Blue",
        color: "#0000FF",
        stock: 20,
        price: 79.99,
      },
      {
        id: 803,
        name: "Red",
        color: "#FF0000",
        stock: 15,
        price: 79.99,
      }
    ],
    tags: ["bluetooth speaker", "portable", "waterproof", "wireless"],
    rating: 4.4,
    reviewCount: 231,
    stock: 70,
    onSale: true,
    salePercentage: 20,
    brand: "AudioTech",
    sku: "AT-BTS-WP"
  },
  {
    id: 9,
    name: "Gaming Console Pro",
    description: "Next-generation gaming console with 4K gaming, ray tracing, super-fast loading times, and a vast game library.",
    price: 499.99,
    category: "Electronics",
    subcategory: "Gaming",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop"
    ],
    tags: ["gaming", "console", "4k", "entertainment"],
    rating: 4.9,
    reviewCount: 305,
    stock: 10,
    isNew: true,
    isFeatured: true,
    brand: "GameSphere",
    sku: "GS-CNSL-PRO"
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    description: "True wireless earbuds with noise isolation, touch controls, and up to 24 hours of battery life with the charging case.",
    price: 129.99,
    originalPrice: 159.99,
    category: "Electronics",
    subcategory: "Audio",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?q=80&w=1936&auto=format&fit=crop"
    ],
    variants: [
      {
        id: 1001,
        name: "Black",
        color: "#000000",
        stock: 40,
        price: 129.99,
      },
      {
        id: 1002,
        name: "White",
        color: "#FFFFFF",
        stock: 35,
        price: 129.99,
      }
    ],
    tags: ["earbuds", "wireless", "bluetooth", "noise isolation"],
    rating: 4.5,
    reviewCount: 278,
    stock: 75,
    onSale: true,
    salePercentage: 19,
    brand: "AudioTech",
    sku: "AT-TWE-24"
  },
  {
    id: 11,
    name: "Premium Coffee Maker",
    description: "Programmable coffee maker with thermal carafe, brew strength control, and built-in grinder for the freshest coffee.",
    price: 199.99,
    category: "Home",
    subcategory: "Appliances",
    images: [
      "https://images.unsplash.com/photo-1576298907093-1965c89b785c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
    ],
    tags: ["coffee maker", "kitchen appliance", "programmable", "grinder"],
    rating: 4.7,
    reviewCount: 123,
    stock: 28,
    brand: "BrewMaster",
    sku: "BM-PCM-GR"
  },
  {
    id: 12,
    name: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology, powerful suction, app control, and automatic recharging.",
    price: 349.99,
    originalPrice: 399.99,
    category: "Home",
    subcategory: "Appliances",
    images: [
      "https://images.unsplash.com/photo-1620910430596-4f7f79067e28?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605292356936-160339f35ab5?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["robot vacuum", "smart home", "cleaning", "automated"],
    rating: 4.6,
    reviewCount: 187,
    stock: 32,
    onSale: true,
    salePercentage: 13,
    brand: "CleanTech",
    sku: "CT-RVC-MAP"
  }
];

export const categories = [
  { name: "Electronics", subcategories: ["Audio", "TVs", "Cameras", "Smartphones", "Laptops", "Smart Home", "Wearables", "Gaming"] },
  { name: "Home", subcategories: ["Appliances", "Furniture", "Decor", "Bedding", "Bath"] },
  { name: "Fashion", subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"] },
  { name: "Sports", subcategories: ["Fitness Equipment", "Outdoor Gear", "Team Sports", "Water Sports"] },
  { name: "Beauty", subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrance"] }
];

export const brands = [
  { name: "AudioTech", logo: "https://placehold.co/200x80?text=AudioTech" },
  { name: "VisionTech", logo: "https://placehold.co/200x80?text=VisionTech" },
  { name: "ProCapture", logo: "https://placehold.co/200x80?text=ProCapture" },
  { name: "TechGiant", logo: "https://placehold.co/200x80?text=TechGiant" },
  { name: "ComputeTech", logo: "https://placehold.co/200x80?text=ComputeTech" },
  { name: "SmartLife", logo: "https://placehold.co/200x80?text=SmartLife" },
  { name: "FitTech", logo: "https://placehold.co/200x80?text=FitTech" },
  { name: "GameSphere", logo: "https://placehold.co/200x80?text=GameSphere" },
  { name: "BrewMaster", logo: "https://placehold.co/200x80?text=BrewMaster" },
  { name: "CleanTech", logo: "https://placehold.co/200x80?text=CleanTech" }
];

export const popularSearches = [
  "wireless headphones",
  "smartphone",
  "laptop",
  "smartwatch",
  "4k tv",
  "bluetooth speaker",
  "gaming console",
  "coffee maker",
  "robot vacuum",
  "fitness tracker"
];
