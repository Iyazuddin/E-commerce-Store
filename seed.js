const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "server/.env") });
const Product = require("./server/models/Product");

const reviewerIds = Array.from(
  { length: 4 },
  () => new mongoose.Types.ObjectId(),
);
const reviewerNames = [
  "Verified Buyer",
  "Arjun Mehta",
  "Priya Sharma",
  "Rohan Verma",
];

const products = [
  {
    name: "Apple iPhone 15 Pro Max",
    description:
      "6.7-inch Super Retina XDR display, A17 Pro chip, 48MP camera system, Titanium design. The ultimate iPhone for creators and power users.",
    brand: "Apple",
    category: "Smartphones",
    price: 124900,
    countInStock: 25,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Display", value: '6.7" Super Retina XDR, 120Hz ProMotion' },
      { label: "Chipset", value: "Apple A17 Pro" },
      {
        label: "Camera",
        value: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      },
      { label: "Battery", value: "Up to 29 hours video playback" },
      { label: "Build", value: "Titanium, Ceramic Shield front" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment:
          "Absolutely stunning display and the battery easily lasts a full day. Worth every rupee.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "The titanium build feels premium. Camera is a massive upgrade over my old phone.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment:
          "Great phone, only complaint is the charging speed compared to Android flagships.",
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, S Pen included. AI-powered productivity and pro-grade photography.",
    brand: "Samsung",
    category: "Smartphones",
    price: 94999,
    countInStock: 30,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.8" Dynamic AMOLED 2X, 120Hz' },
      { label: "Chipset", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "Camera", value: "200MP Main + 50MP Telephoto (5x optical)" },
      { label: "S Pen", value: "Included, integrated silo" },
      { label: "Battery", value: "5000 mAh, 45W fast charging" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment:
          "200MP camera is unreal. The S Pen makes note-taking effortless.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment: "Brilliant screen and battery, but it's a heavy phone.",
      },
    ],
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling. The benchmark for premium over-ear audio.",
    brand: "Sony",
    category: "Headphones",
    price: 24990,
    countInStock: 50,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Noise Cancelling", value: "Industry-leading ANC" },
      { label: "Battery", value: "30 hours (ANC on)" },
      { label: "Charging", value: "USB-C, 3 min = 3 hours" },
      { label: "Audio", value: "30mm drivers, Hi-Res certified" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "Noise cancellation is a game changer for flights and open offices.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment: "Comfortable for hours, and the sound is incredibly detailed.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Excellent, though they don't fold flat like the older model.",
      },
    ],
  },
  {
    name: "Apple AirPods Pro 2",
    description:
      "Active Noise Cancellation, Adaptive Transparency, USB-C charging, up to 6 hours listening time. Seamless with the Apple ecosystem.",
    brand: "Apple",
    category: "Earbuds",
    price: 22900,
    countInStock: 60,
    image:
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      {
        label: "Noise Cancelling",
        value: "Active ANC + Adaptive Transparency",
      },
      { label: "Battery", value: "6h buds, 30h with case" },
      { label: "Chip", value: "Apple H2" },
      { label: "Water Resistance", value: "IPX4" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "ANC rivals over-ears twice the size. The case is now USB-C, finally!",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "Great sound and fit. Wish the case had a findable speaker by default.",
      },
    ],
  },
  {
    name: "Samsung Galaxy Buds3 Pro",
    description:
      "Intelligent ANC, 360 Audio, Hi-Fi 24-bit audio, IP57 water resistance. Flagship sound tuned for the Galaxy ecosystem.",
    brand: "Samsung",
    category: "Earbuds",
    price: 19999,
    countInStock: 40,
    image: "/buds1.jpg",
    images: ["/buds1.jpg", "/buds2.jpg"],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Audio", value: "Hi-Fi 24-bit, 360 Audio" },
      { label: "Battery", value: "6h buds, 26h with case" },
      { label: "Water Resistance", value: "IP57" },
      { label: "ANC", value: "Intelligent Active Noise Cancelling" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Rich, punchy bass and great call quality. Software polish is top notch.",
      },
    ],
  },
  {
    name: "MacBook Air M3",
    description:
      "15.3-inch Liquid Retina display, M3 chip, 18-hour battery, 8GB RAM, 256GB SSD. Ultra-portable performance in a thin, fanless design.",
    brand: "Apple",
    category: "Laptops",
    price: 119990,
    countInStock: 15,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Display", value: '15.3" Liquid Retina' },
      { label: "Chipset", value: "Apple M3" },
      { label: "Memory", value: "8GB unified" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "Silent, fast and feather light. The best laptop I've owned for travel.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment: "Battery truly lasts a full work day with screen at 80%.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Fantastic machine, just note 8GB RAM fills up fast with many tabs.",
      },
    ],
  },
  {
    name: "Dell XPS 15",
    description:
      "15.6-inch OLED 3.5K display, Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX. Creator-grade power with a cinema-quality screen.",
    brand: "Dell",
    category: "Laptops",
    price: 139990,
    countInStock: 10,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '15.6" 3.5K OLED touch' },
      { label: "CPU", value: "Intel Core i7-13700H" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4060" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "512GB NVMe SSD" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "OLED screen is jaw-dropping. Runs warm under load but never throttles hard.",
      },
    ],
  },
  {
    name: "Apple iPad Pro M4",
    description:
      "13-inch Ultra Retina XDR, M4 chip, Thunderbolt, Face ID, Wi-Fi 6E. Desktop-class power that fits in your backpack.",
    brand: "Apple",
    category: "Tablets",
    price: 114900,
    countInStock: 20,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '13" Ultra Retina XDR, 120Hz' },
      { label: "Chipset", value: "Apple M4" },
      { label: "Connectivity", value: "Thunderbolt 4, Wi-Fi 6E" },
      { label: "Security", value: "Face ID" },
      { label: "Colors", value: "Silver, Space Black" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "This tablet replaced my laptop. Procreate and editing run buttery smooth.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment: "The XDR display is the best screen I have ever used, period.",
      },
    ],
  },
  {
    name: "JBL Charge 5 Speaker",
    description:
      "Portable Bluetooth speaker, IP67 waterproof, 20-hour playtime, PartyBoost. Deep bass for poolside, camping and backyard parties.",
    brand: "JBL",
    category: "Speakers",
    price: 12999,
    countInStock: 35,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "Portable Bluetooth" },
      { label: "Battery", value: "20 hours playtime" },
      { label: "Water Resistance", value: "IP67" },
      { label: "Extra", value: "Powerbank feature (USB-A out)" },
      { label: "Connectivity", value: "Bluetooth 5.1, PartyBoost" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Bass is surprisingly deep for the size. Survived a dunk in the pool.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment: "Perfect party speaker, pairs easily with a second one.",
      },
    ],
  },
  {
    name: "Apple Watch Series 9",
    description:
      "45mm, Always-On Retina LTPO display, S9 SiP, blood oxygen, ECG app. Your health and fitness companion on your wrist.",
    brand: "Apple",
    category: "Smartwatches",
    price: 39900,
    countInStock: 30,
    image: "/smartwatch.jpg",
    images: ["/smartwatch.jpg", "/watch2.jpg"],
    featured: true,
    specs: [
      { label: "Display", value: "Always-On Retina LTPO" },
      { label: "Chipset", value: "Apple S9 SiP" },
      { label: "Health", value: "ECG, Blood Oxygen, Sleep" },
      { label: "Durability", value: "50m water resistance" },
      { label: "Case", value: "Aluminium, 45mm" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "ECG and sleep tracking are spot on. Double-tap gesture feels futuristic.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Great watch, wish it lasted two days instead of one.",
      },
    ],
  },
  {
    name: "boAt Airdopes 141",
    description:
      "TWS earbuds, 42-hour playback, ENx noise cancellation, IPX4 sweat resistance, BEAST mode. Massive battery life on a budget.",
    brand: "boAt",
    category: "Earbuds",
    price: 1299,
    countInStock: 100,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Battery", value: "42 hours with case" },
      { label: "Noise Cancelling", value: "ENx (call) noise cancellation" },
      { label: "Water Resistance", value: "IPX4" },
      { label: "Mode", value: "BEAST mode (low latency)" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment:
          "Insane value. Battery lasts for days and the sound is decent.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "Great budget pick. Bass-heavy signature, ideal for music on the go.",
      },
    ],
  },
  {
    name: "OnePlus 12",
    description:
      "6.82-inch 2K LTPO display, Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC. Blazing fast charging and clean OxygenOS.",
    brand: "OnePlus",
    category: "Smartphones",
    price: 64999,
    countInStock: 25,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.82" 2K LTPO, 120Hz' },
      { label: "Chipset", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "50MP Hasselblad Main" },
      { label: "Charging", value: "100W SUPERVOOC wired" },
      { label: "Battery", value: "5400 mAh" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "100W charging is life changing — full battery in under 30 minutes.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment: "Fast, smooth, great cameras for the price.",
      },
    ],
  },
  {
    name: "Samsung Galaxy Watch 6",
    description:
      "44mm Super AMOLED display, BioActive sensor, sleep coaching, and robust fitness tracking. A complete health dashboard on your wrist.",
    brand: "Samsung",
    category: "Smartwatches",
    price: 29999,
    countInStock: 22,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '1.5" Super AMOLED' },
      { label: "Sensor", value: "Samsung BioActive" },
      { label: "Battery", value: "Up to 40 hours" },
      { label: "Fitness", value: "100+ workout tracking" },
      { label: "Compatibility", value: "Android 10+, iOS limited" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Sleep coaching is genuinely useful. Battery easily lasts a day and a half.",
      },
    ],
  },
  {
    name: "Nothing Phone 2",
    description:
      "6.7-inch LTPO OLED, Snapdragon 8+ Gen 1, 50MP dual camera, Glyph Interface. A distinctive, design-first smartphone.",
    brand: "Nothing",
    category: "Smartphones",
    price: 44999,
    countInStock: 18,
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.7" LTPO OLED, 120Hz' },
      { label: "Chipset", value: "Snapdragon 8+ Gen 1" },
      { label: "Camera", value: "50MP main + 50MP ultrawide" },
      { label: "Interface", value: "Glyph LED light interface" },
      { label: "Battery", value: "4700 mAh, 45W charging" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "The Glyph lights are a great conversation starter. Clean software, no bloat.",
      },
    ],
  },
  {
    name: "Sony LinkBuds S",
    description:
      "Feather-light earbuds with adaptive noise cancellation, crystal-clear calls and spatial sound. Wear them all day without noticing.",
    brand: "Sony",
    category: "Earbuds",
    price: 14990,
    countInStock: 45,
    image:
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Weight", value: "4.8g per bud" },
      { label: "ANC", value: "Adaptive Sound Control" },
      { label: "Battery", value: "6h buds, 20h with case" },
      { label: "Audio", value: "Spatial Sound, Hi-Res" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "So light I forget I'm wearing them. ANC adapts automatically.",
      },
    ],
  },
  {
    name: "JBL Tune 770NC Headphones",
    description:
      "Adaptive noise cancelling, 70-hour battery, JBL Pure Bass sound, comfortable foldable design. All-day audio without recharging.",
    brand: "JBL",
    category: "Headphones",
    price: 7999,
    countInStock: 55,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Battery", value: "70 hours (ANC on)" },
      { label: "Noise Cancelling", value: "Adaptive ANC" },
      { label: "Sound", value: "JBL Pure Bass" },
      { label: "Extra", value: "Multi-point Bluetooth" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment: "Seventy hours is no joke — I charge it once a fortnight.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Excellent value, comfy pads, decent ANC for the price.",
      },
    ],
  },
  {
    name: "Google Pixel 8 Pro",
    description:
      "6.7-inch Super Actua OLED, Google Tensor G3, 50MP pro camera with Magic Editor, 7 years of updates. Pure Android intelligence with a pro-grade camera.",
    brand: "Google",
    category: "Smartphones",
    price: 79999,
    countInStock: 20,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.7" Super Actua OLED, 120Hz' },
      { label: "Chipset", value: "Google Tensor G3" },
      {
        label: "Camera",
        value: "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      },
      { label: "Updates", value: "7 years of OS and security updates" },
      { label: "Battery", value: "5050 mAh, 30W wired charging" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment:
          "The camera is the best I've used — Magic Editor is genuinely magic.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment: "Buttery smooth, clean Android. Wish it charged faster.",
      },
    ],
  },
  {
    name: "Xiaomi 14 Ultra",
    description:
      "6.73-inch 2K AMOLED, Snapdragon 8 Gen 3, 50MP quad Leica optics, 5300 mAh battery. A photography-first flagship with Leica engineering.",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 69999,
    countInStock: 24,
    image:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.73" 2K AMOLED, 120Hz' },
      { label: "Chipset", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "50MP Quad, Leica optics" },
      { label: "Charging", value: "90W wired, 80W wireless" },
      { label: "Battery", value: "5300 mAh" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment: "Leica photos look incredible straight out of the camera.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment: "Huge battery and fast charging. MIUI has minor bloat.",
      },
    ],
  },
  {
    name: "Apple MacBook Pro 14 M3",
    description:
      "14.2-inch Liquid Retina XDR, M3 Pro chip, 18GB RAM, 512GB SSD, 18-hour battery. Pro-level power with an immersive HDR display.",
    brand: "Apple",
    category: "Laptops",
    price: 179900,
    countInStock: 12,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Display", value: '14.2" Liquid Retina XDR, 120Hz' },
      { label: "Chipset", value: "Apple M3 Pro" },
      { label: "Memory", value: "18GB unified" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "XDR display and M3 Pro handle 4K editing without breaking a sweat.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment: "Silent under load and the battery genuinely lasts all day.",
      },
    ],
  },
  {
    name: "HP Spectre x360 14",
    description:
      "14-inch 2.8K OLED touch, Intel Core Ultra 7, 16GB RAM, 1TB SSD, Windows 11. A 2-in-1 convertible with AI-enhanced performance and a stunning OLED panel.",
    brand: "HP",
    category: "Laptops",
    price: 129990,
    countInStock: 16,
    image:
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '14" 2.8K OLED touch' },
      { label: "CPU", value: "Intel Core Ultra 7" },
      { label: "Memory", value: "16GB LPDDR5X" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Form", value: "360° 2-in-1 convertible" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment:
          "OLED is gorgeous and the 360 hinge feels premium. Fans spin up occasionally.",
      },
    ],
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description:
      "14-inch 3K OLED 120Hz, AMD Ryzen 9, NVIDIA RTX 4060, 16GB RAM, 1TB SSD. Ultra-portable gaming laptop with flagship performance.",
    brand: "ASUS",
    category: "Laptops",
    price: 119990,
    countInStock: 14,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '14" 3K OLED, 120Hz' },
      { label: "CPU", value: "AMD Ryzen 9 8945HS" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4060" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment: "Runs everything I throw at it and still fits in a backpack.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "Great screen and performance. Gets warm under long gaming sessions.",
      },
    ],
  },
  {
    name: "Google Pixel Watch 2",
    description:
      "41mm AMOLED display, Fitbit health tracking, Wear OS 4, safety features. Google's smartwatch, powered by Fitbit insights.",
    brand: "Google",
    category: "Smartwatches",
    price: 29999,
    countInStock: 28,
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: "41mm AMOLED" },
      { label: "OS", value: "Wear OS 4" },
      { label: "Health", value: "Fitbit heart, sleep, stress tracking" },
      { label: "Safety", value: "Fall detection, Safety Check" },
      { label: "Battery", value: "Up to 24 hours" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Fitbit insights are excellent. Design is elegant, battery is one-day.",
      },
    ],
  },
  {
    name: "Garmin Forerunner 265",
    description:
      "1.3-inch AMOLED touchscreen, GPS, HR sensor, training readiness, 13-day battery. Serious running watch with daily suggested workouts.",
    brand: "Garmin",
    category: "Smartwatches",
    price: 47990,
    countInStock: 20,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '1.3" AMOLED touchscreen' },
      { label: "Battery", value: "Up to 13 days smartwatch mode" },
      { label: "GPS", value: "Multi-band GPS, all-systems" },
      { label: "Training", value: "Daily suggested workouts" },
      { label: "Compatibility", value: "Android and iOS" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "Training readiness changed how I run. Battery lasts almost two weeks.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment: "Brilliant GPS accuracy. Setup takes a bit of patience.",
      },
    ],
  },
  {
    name: "Bose QuietComfort Ultra",
    description:
      "World-class noise cancellation, Spatial Audio, 24-hour battery, immersive wireless sound. The best-sounding QuietComfort ever made.",
    brand: "Bose",
    category: "Headphones",
    price: 39990,
    countInStock: 32,
    image:
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Noise Cancelling", value: "World-class ANC" },
      { label: "Battery", value: "24 hours (ANC on)" },
      { label: "Audio", value: "Spatial Audio, Immersion mode" },
      { label: "Charging", value: "USB-C, 15 min = 2.5 hours" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "ANC is unreal and Spatial Audio makes everything feel cinematic.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Superb comfort for long flights. Pricey but worth it.",
      },
    ],
  },
  {
    name: "Canon EOS R6 Mark II",
    description:
      "24.2MP full-frame sensor, 4K 60p video, 40fps burst, Dual Pixel AF. A hybrid mirrorless camera for photography and filmmaking.",
    brand: "Canon",
    category: "Cameras",
    price: 189999,
    countInStock: 8,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Sensor", value: "24.2MP full-frame CMOS" },
      { label: "Video", value: "4K 60p, 10-bit" },
      { label: "Burst", value: "40 fps electronic shutter" },
      { label: "AF", value: "Dual Pixel CMOS AF II" },
      { label: "Build", value: "Weather-sealed body" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "Eye-tracking AF is flawless even at 40fps. Video and stills both superb.",
      },
    ],
  },
  {
    name: "Sony Alpha A7 IV",
    description:
      "33MP full-frame sensor, 4K 60p, 10-bit S-Log3, 759-point AF, real-time tracking. The all-rounder mirrorless for serious creators.",
    brand: "Sony",
    category: "Cameras",
    price: 219999,
    countInStock: 6,
    image:
      "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Sensor", value: "33MP full-frame Exmor R CMOS" },
      { label: "Video", value: "4K 60p, 10-bit S-Log3" },
      { label: "AF", value: "759-point hybrid, real-time tracking" },
      { label: "Stabilization", value: "5-axis in-body" },
      { label: "Viewfinder", value: "3.69M-dot OLED EVF" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "Perfect hybrid camera. AF locks on instantly and colors are gorgeous.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "Upgraded from an A7 III — huge leap in resolution and video features.",
      },
    ],
  },
  {
    name: "Sony PlayStation 5",
    description:
      "4K 120fps gaming, ultra-fast SSD, DualSense wireless controller with haptics and adaptive triggers. Next-gen console, backward compatible with PS4.",
    brand: "Sony",
    category: "Gaming",
    price: 54990,
    countInStock: 40,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Performance", value: "4K 120fps, Ray tracing" },
      { label: "Storage", value: "825GB ultra-fast SSD" },
      { label: "Controller", value: "DualSense with haptics" },
      { label: "Media", value: "Ultra HD Blu-ray drive" },
      { label: "Backward Compatible", value: "PS4 game library" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment:
          "The SSD load times and DualSense haptics are a generational leap.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment: "Incredible console, just wish the storage filled up slower.",
      },
    ],
  },
  {
    name: "Nintendo Switch OLED",
    description:
      "7-inch OLED screen, docked 1080p, handheld gaming anywhere, Joy-Con controllers. The definitive way to play Mario, Zelda and more.",
    brand: "Nintendo",
    category: "Gaming",
    price: 26990,
    countInStock: 50,
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '7" OLED, 720p handheld' },
      { label: "Docked", value: "1080p HD output" },
      { label: "Storage", value: "64GB + microSD" },
      { label: "Battery", value: "4.5–9 hours" },
      { label: "Controllers", value: "Joy-Con, motion controls" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "The OLED screen makes handheld play look stunning. Perfect family console.",
      },
    ],
  },
  {
    name: "Google Pixel 8a",
    description:
      "6.1-inch Actua OLED, Google Tensor G3, 64MP dual camera, 7 years of updates. Flagship smarts at a mid-range price, in a compact body.",
    brand: "Google",
    category: "Smartphones",
    price: 39999,
    countInStock: 45,
    image:
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.1" Actua OLED, 120Hz' },
      { label: "Chipset", value: "Google Tensor G3" },
      { label: "Camera", value: "64MP Main + 13MP Ultra Wide" },
      { label: "Updates", value: "7 years of OS and security updates" },
      { label: "Battery", value: "4492 mAh, 18W wired charging" },
    ],
    reviews: [
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 5,
        comment:
          "Compact, clean Android, and the camera punches way above its price.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment:
          "Best value Pixel in years. Battery could be bigger but it lasts the day.",
      },
    ],
  },
  {
    name: "Samsung Galaxy Z Flip 5",
    description:
      "6.7-inch Dynamic AMOLED foldable, Snapdragon 8 Gen 2, 3.4-inch Flex Window cover screen, Flex Mode camera. Pocketable style that folds flat.",
    brand: "Samsung",
    category: "Smartphones",
    price: 74999,
    countInStock: 15,
    image:
      "https://images.unsplash.com/photo-1565849904461-56822589df05?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1565849904461-56822589df05?w=500&q=80",
    ],
    featured: true,
    specs: [
      { label: "Display", value: '6.7" Dynamic AMOLED 2X, 120Hz' },
      { label: "Cover Screen", value: '3.4" Flex Window' },
      { label: "Chipset", value: "Snapdragon 8 Gen 2 for Galaxy" },
      { label: "Camera", value: "50MP Main + 12MP Ultra Wide" },
      { label: "Battery", value: "3700 mAh, 25W fast charging" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "The Flex Window is genuinely useful and it finally folds completely flat.",
      },
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment: "Gorgeous phone, just mind the crease and the modest battery.",
      },
    ],
  },
  {
    name: "iQOO 12 5G",
    description:
      "6.78-inch 144Hz LTPO display, Snapdragon 8 Gen 3, 50MP triple camera, 120W FlashCharge. A gaming-grade flagship that charges in minutes.",
    brand: "iQOO",
    category: "Smartphones",
    price: 52999,
    countInStock: 30,
    image:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '6.78" 2K LTPO AMOLED, 144Hz' },
      { label: "Chipset", value: "Snapdragon 8 Gen 3" },
      {
        label: "Camera",
        value: "50MP Main + 50MP Ultra Wide + 64MP Telephoto",
      },
      { label: "Charging", value: "120W FlashCharge" },
      { label: "Battery", value: "5000 mAh" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "120W charging is ridiculous — full battery in around 20 minutes.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Buttery 144Hz screen and superb performance for the money.",
      },
    ],
  },
  {
    name: "Sennheiser Momentum 4",
    description:
      "60-hour battery, adaptive noise cancellation, aptX Adaptive, ultra-comfortable memory foam. Premium sound with class-leading endurance.",
    brand: "Sennheiser",
    category: "Headphones",
    price: 29990,
    countInStock: 18,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Battery", value: "60 hours (ANC on)" },
      { label: "Noise Cancelling", value: "Adaptive ANC" },
      { label: "Audio", value: "42mm drivers, aptX Adaptive" },
      { label: "Extra", value: "Multi-point Bluetooth, touch controls" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "Sixty hours of battery is unreal, and the sound is warm and detailed.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "Most comfortable headphones I own. ANC is excellent on commutes.",
      },
    ],
  },
  {
    name: "Nothing Ear (2)",
    description:
      "Transparent design, 11mm custom driver, LHDC 5.0 Hi-Res audio, adaptive ANC, 36-hour battery. Earbuds that look as good as they sound.",
    brand: "Nothing",
    category: "Earbuds",
    price: 9999,
    countInStock: 60,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Audio", value: "11mm custom driver, LHDC 5.0" },
      { label: "ANC", value: "Adaptive ANC, Transparency" },
      { label: "Battery", value: "6h buds, 36h with case" },
      { label: "Design", value: "Transparent, IP54 rated" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment:
          "Stunning design and clean bass. The Glyph case lights are a nice touch.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Great value TWS with solid ANC and a distinctive look.",
      },
    ],
  },
  {
    name: "Samsung Galaxy Tab S9",
    description:
      "11-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, S Pen included, IP68 water resistance. The Android tablet for work, watch and everything between.",
    brand: "Samsung",
    category: "Tablets",
    price: 64999,
    countInStock: 22,
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '11" Dynamic AMOLED 2X, 120Hz' },
      { label: "Chipset", value: "Snapdragon 8 Gen 2 for Galaxy" },
      { label: "S Pen", value: "Included, low latency" },
      { label: "Durability", value: "IP68 water and dust resistance" },
      { label: "Battery", value: "8400 mAh, 45W charging" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "The AMOLED panel and included S Pen make it perfect for notes and media.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "Fast and beautiful. DeX mode genuinely replaces a laptop for light work.",
      },
    ],
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    description:
      "14-inch 2.8K OLED, Intel Core i7, 16GB RAM, 1TB SSD, legendary keyboard. The classic ultrabook, refreshed with a stunning display.",
    brand: "Lenovo",
    category: "Laptops",
    price: 164990,
    countInStock: 9,
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '14" 2.8K OLED, anti-glare' },
      { label: "CPU", value: "Intel Core i7-1355U" },
      { label: "Memory", value: "16GB LPDDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Weight", value: "1.12 kg, MIL-SPEC durable" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "That keyboard is still the best in the business, and the OLED is gorgeous.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Feather light and built like a tank. Battery easily covers a work day.",
      },
    ],
  },
  {
    name: "Marshall Emberton II",
    description:
      "Portable Bluetooth speaker with signature Marshall design, True Stereophonic sound, 30-hour playtime, IP67 dust and water resistance.",
    brand: "Marshall",
    category: "Speakers",
    price: 16999,
    countInStock: 25,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Type", value: "Portable Bluetooth" },
      { label: "Battery", value: "30 hours playtime" },
      { label: "Sound", value: "True Stereophonic, 360°" },
      { label: "Durability", value: "IP67 dust and water resistant" },
      { label: "Extra", value: "Stack mode, multi-host pairing" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "Looks iconic and sounds huge for its size. 30-hour battery is no exaggeration.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment:
          "Excellent build and sound. Wish it came with a proper carrying case.",
      },
    ],
  },
  {
    name: "Fitbit Sense 2",
    description:
      "Advanced health smartwatch with cEDA stress tracking, ECG, EDA scan, skin temperature, GPS, 6+ day battery. Wellness insights beyond the wrist.",
    brand: "Fitbit",
    category: "Smartwatches",
    price: 19999,
    countInStock: 26,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Display", value: '1.58" AMOLED, always-on' },
      { label: "Health", value: "cEDA, ECG, EDA scan, SpO2" },
      { label: "GPS", value: "Built-in, with route tracking" },
      { label: "Battery", value: "6+ days typical" },
      { label: "Compatibility", value: "Android and iOS" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 4,
        comment:
          "Stress tracking and ECG are surprisingly insightful. Battery lasts all week.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment:
          "Great health data and a comfortable band. App subscription is a downside.",
      },
    ],
  },
  {
    name: "GoPro Hero 12 Black",
    description:
      "5.3K60 video, HyperSmooth 6.0 stabilization, waterproof to 10m, 27MP photos, 8x slo-mo. The action camera for every adventure.",
    brand: "GoPro",
    category: "Cameras",
    price: 44990,
    countInStock: 20,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Video", value: "5.3K60, 4K120" },
      { label: "Stabilization", value: "HyperSmooth 6.0" },
      { label: "Photos", value: "27MP, 8x Slo-mo" },
      { label: "Durability", value: "Waterproof to 10m, no housing" },
      { label: "Extras", value: "10-bit HDR video, Night effects" },
    ],
    reviews: [
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 5,
        comment:
          "HyperSmooth 6.0 is witchcraft — footage looks like it's on a gimbal.",
      },
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 4,
        comment:
          "Tough, tiny and incredible in bright daylight. Low light is just okay.",
      },
    ],
  },
  {
    name: "Xbox Series X",
    description:
      "12 TFLOPS of GPU power, 4K 120fps gaming, ultra-fast SSD, Smart Delivery, Quick Resume. The most powerful Xbox ever, backward compatible.",
    brand: "Microsoft",
    category: "Gaming",
    price: 56990,
    countInStock: 35,
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Performance", value: "4K 120fps, 8K ready" },
      { label: "GPU", value: "12 TFLOPS RDNA 2" },
      { label: "Storage", value: "1TB ultra-fast SSD" },
      { label: "Features", value: "Quick Resume, Smart Delivery" },
      { label: "Backward Compatible", value: "4 generations of games" },
    ],
    reviews: [
      {
        user: reviewerIds[2],
        name: reviewerNames[2],
        rating: 5,
        comment:
          "Quiet, powerful and Quick Resume is the best next-gen feature, period.",
      },
      {
        user: reviewerIds[0],
        name: reviewerNames[0],
        rating: 4,
        comment: "Great console and Game Pass makes it unbeatable value.",
      },
    ],
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "8K DPI sensor, quiet clicks, MagSpeed electromagnetic scroll, USB-C fast charging, 70-day battery. The ultimate productivity mouse.",
    brand: "Logitech",
    category: "Accessories",
    price: 8995,
    countInStock: 40,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    ],
    featured: false,
    specs: [
      { label: "Sensor", value: "8K DPI, tracks on glass" },
      { label: "Scroll", value: "MagSpeed electromagnetic" },
      { label: "Battery", value: "Up to 70 days, USB-C" },
      { label: "Clicks", value: "Silent, quiet-click buttons" },
      { label: "Connectivity", value: "Bluetooth + Logi Bolt, 3 devices" },
    ],
    reviews: [
      {
        user: reviewerIds[1],
        name: reviewerNames[1],
        rating: 5,
        comment:
          "The scroll wheel alone is worth it. Ergonomics are superb for long days.",
      },
      {
        user: reviewerIds[3],
        name: reviewerNames[3],
        rating: 4,
        comment:
          "Flawless across Windows and Mac. Quiet clicks are a blessing in offices.",
      },
    ],
  },
];

const computeRating = (reviews) => {
  if (!reviews.length) return { rating: 0, numReviews: 0 };
  const rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { rating: Math.round(rating * 10) / 10, numReviews: reviews.length };
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    await Product.deleteMany({});
    console.log("Cleared existing products 🗑️");

    const docs = products.map(({ reviews, ...p }) => ({
      ...p,
      reviews,
      ...computeRating(reviews),
    }));

    const created = await Product.insertMany(docs);
    console.log(`Seeded ${created.length} products ✅`);

    console.log("\nProducts added:");
    created.forEach((p, i) => {
      console.log(
        `  ${i + 1}. ${p.name} — ₹${p.price.toLocaleString()} — ⭐${p.rating} (${p.numReviews})`,
      );
    });

    await mongoose.connection.close();
    console.log("\nDone! Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
