const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "server/.env") });
const Product = require("./server/models/Product");

// Dummy reviewer ids so seeded reviews render on the product page without
// needing real accounts. Real reviews added later override the aggregate.
const reviewerIds = Array.from({ length: 4 }, () => new mongoose.Types.ObjectId());
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
    price: 159900,
    countInStock: 25,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80"],
    featured: true,
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR, 120Hz ProMotion" },
      { label: "Chipset", value: "Apple A17 Pro" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP Telephoto" },
      { label: "Battery", value: "Up to 29 hours video playback" },
      { label: "Build", value: "Titanium, Ceramic Shield front" },
    ],
    reviews: [
      { user: reviewerIds[0], name: reviewerNames[0], rating: 5, comment: "Absolutely stunning display and the battery easily lasts a full day. Worth every rupee." },
      { user: reviewerIds[1], name: reviewerNames[1], rating: 5, comment: "The titanium build feels premium. Camera is a massive upgrade over my old phone." },
      { user: reviewerIds[2], name: reviewerNames[2], rating: 4, comment: "Great phone, only complaint is the charging speed compared to Android flagships." },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, S Pen included. AI-powered productivity and pro-grade photography.",
    brand: "Samsung",
    category: "Smartphones",
    price: 134999,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "6.8\" Dynamic AMOLED 2X, 120Hz" },
      { label: "Chipset", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "Camera", value: "200MP Main + 50MP Telephoto (5x optical)" },
      { label: "S Pen", value: "Included, integrated silo" },
      { label: "Battery", value: "5000 mAh, 45W fast charging" },
    ],
    reviews: [
      { user: reviewerIds[0], name: reviewerNames[0], rating: 5, comment: "200MP camera is unreal. The S Pen makes note-taking effortless." },
      { user: reviewerIds[2], name: reviewerNames[2], rating: 4, comment: "Brilliant screen and battery, but it's a heavy phone." },
    ],
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling. The benchmark for premium over-ear audio.",
    brand: "Sony",
    category: "Headphones",
    price: 29990,
    countInStock: 50,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"],
    featured: true,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Noise Cancelling", value: "Industry-leading ANC" },
      { label: "Battery", value: "30 hours (ANC on)" },
      { label: "Charging", value: "USB-C, 3 min = 3 hours" },
      { label: "Audio", value: "30mm drivers, Hi-Res certified" },
    ],
    reviews: [
      { user: reviewerIds[1], name: reviewerNames[1], rating: 5, comment: "Noise cancellation is a game changer for flights and open offices." },
      { user: reviewerIds[3], name: reviewerNames[3], rating: 5, comment: "Comfortable for hours, and the sound is incredibly detailed." },
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Excellent, though they don't fold flat like the older model." },
    ],
  },
  {
    name: "Apple AirPods Pro 2",
    description:
      "Active Noise Cancellation, Adaptive Transparency, USB-C charging, up to 6 hours listening time. Seamless with the Apple ecosystem.",
    brand: "Apple",
    category: "Earbuds",
    price: 24900,
    countInStock: 60,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Noise Cancelling", value: "Active ANC + Adaptive Transparency" },
      { label: "Battery", value: "6h buds, 30h with case" },
      { label: "Chip", value: "Apple H2" },
      { label: "Water Resistance", value: "IPX4" },
    ],
    reviews: [
      { user: reviewerIds[2], name: reviewerNames[2], rating: 5, comment: "ANC rivals over-ears twice the size. The case is now USB-C, finally!" },
      { user: reviewerIds[1], name: reviewerNames[1], rating: 4, comment: "Great sound and fit. Wish the case had a findable speaker by default." },
    ],
  },
  {
    name: "Samsung Galaxy Buds3 Pro",
    description:
      "Intelligent ANC, 360 Audio, Hi-Fi 24-bit audio, IP57 water resistance. Flagship sound tuned for the Galaxy ecosystem.",
    brand: "Samsung",
    category: "Earbuds",
    price: 17999,
    countInStock: 40,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Audio", value: "Hi-Fi 24-bit, 360 Audio" },
      { label: "Battery", value: "6h buds, 26h with case" },
      { label: "Water Resistance", value: "IP57" },
      { label: "ANC", value: "Intelligent Active Noise Cancelling" },
    ],
    reviews: [
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Rich, punchy bass and great call quality. Software polish is top notch." },
    ],
  },
  {
    name: "MacBook Air M3",
    description:
      "15.3-inch Liquid Retina display, M3 chip, 18-hour battery, 8GB RAM, 256GB SSD. Ultra-portable performance in a thin, fanless design.",
    brand: "Apple",
    category: "Laptops",
    price: 134900,
    countInStock: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"],
    featured: true,
    specs: [
      { label: "Display", value: "15.3\" Liquid Retina" },
      { label: "Chipset", value: "Apple M3" },
      { label: "Memory", value: "8GB unified" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    reviews: [
      { user: reviewerIds[3], name: reviewerNames[3], rating: 5, comment: "Silent, fast and feather light. The best laptop I've owned for travel." },
      { user: reviewerIds[2], name: reviewerNames[2], rating: 5, comment: "Battery truly lasts a full work day with screen at 80%." },
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Fantastic machine, just note 8GB RAM fills up fast with many tabs." },
    ],
  },
  {
    name: "Dell XPS 15",
    description:
      "15.6-inch OLED 3.5K display, Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX. Creator-grade power with a cinema-quality screen.",
    brand: "Dell",
    category: "Laptops",
    price: 149990,
    countInStock: 10,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "15.6\" 3.5K OLED touch" },
      { label: "CPU", value: "Intel Core i7-13700H" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4060" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "512GB NVMe SSD" },
    ],
    reviews: [
      { user: reviewerIds[1], name: reviewerNames[1], rating: 4, comment: "OLED screen is jaw-dropping. Runs warm under load but never throttles hard." },
    ],
  },
  {
    name: "Apple iPad Pro M4",
    description:
      "13-inch Ultra Retina XDR, M4 chip, Thunderbolt, Face ID, Wi-Fi 6E. Desktop-class power that fits in your backpack.",
    brand: "Apple",
    category: "Tablets",
    price: 119900,
    countInStock: 20,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "13\" Ultra Retina XDR, 120Hz" },
      { label: "Chipset", value: "Apple M4" },
      { label: "Connectivity", value: "Thunderbolt 4, Wi-Fi 6E" },
      { label: "Security", value: "Face ID" },
      { label: "Colors", value: "Silver, Space Black" },
    ],
    reviews: [
      { user: reviewerIds[2], name: reviewerNames[2], rating: 5, comment: "This tablet replaced my laptop. Procreate and editing run buttery smooth." },
      { user: reviewerIds[3], name: reviewerNames[3], rating: 5, comment: "The XDR display is the best screen I have ever used, period." },
    ],
  },
  {
    name: "JBL Charge 5 Speaker",
    description:
      "Portable Bluetooth speaker, IP67 waterproof, 20-hour playtime, PartyBoost. Deep bass for poolside, camping and backyard parties.",
    brand: "JBL",
    category: "Speakers",
    price: 14999,
    countInStock: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "Portable Bluetooth" },
      { label: "Battery", value: "20 hours playtime" },
      { label: "Water Resistance", value: "IP67" },
      { label: "Extra", value: "Powerbank feature (USB-A out)" },
      { label: "Connectivity", value: "Bluetooth 5.1, PartyBoost" },
    ],
    reviews: [
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Bass is surprisingly deep for the size. Survived a dunk in the pool." },
      { user: reviewerIds[1], name: reviewerNames[1], rating: 5, comment: "Perfect party speaker, pairs easily with a second one." },
    ],
  },
  {
    name: "Apple Watch Series 9",
    description:
      "45mm, Always-On Retina LTPO display, S9 SiP, blood oxygen, ECG app. Your health and fitness companion on your wrist.",
    brand: "Apple",
    category: "Smartwatches",
    price: 44900,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&q=80"],
    featured: true,
    specs: [
      { label: "Display", value: "Always-On Retina LTPO" },
      { label: "Chipset", value: "Apple S9 SiP" },
      { label: "Health", value: "ECG, Blood Oxygen, Sleep" },
      { label: "Durability", value: "50m water resistance" },
      { label: "Case", value: "Aluminium, 45mm" },
    ],
    reviews: [
      { user: reviewerIds[2], name: reviewerNames[2], rating: 5, comment: "ECG and sleep tracking are spot on. Double-tap gesture feels futuristic." },
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Great watch, wish it lasted two days instead of one." },
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
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Battery", value: "42 hours with case" },
      { label: "Noise Cancelling", value: "ENx (call) noise cancellation" },
      { label: "Water Resistance", value: "IPX4" },
      { label: "Mode", value: "BEAST mode (low latency)" },
    ],
    reviews: [
      { user: reviewerIds[3], name: reviewerNames[3], rating: 4, comment: "Insane value. Battery lasts for days and the sound is decent." },
      { user: reviewerIds[1], name: reviewerNames[1], rating: 4, comment: "Great budget pick. Bass-heavy signature, ideal for music on the go." },
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
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "6.82\" 2K LTPO, 120Hz" },
      { label: "Chipset", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "50MP Hasselblad Main" },
      { label: "Charging", value: "100W SUPERVOOC wired" },
      { label: "Battery", value: "5400 mAh" },
    ],
    reviews: [
      { user: reviewerIds[2], name: reviewerNames[2], rating: 5, comment: "100W charging is life changing — full battery in under 30 minutes." },
      { user: reviewerIds[3], name: reviewerNames[3], rating: 4, comment: "Fast, smooth, great cameras for the price." },
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
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "1.5\" Super AMOLED" },
      { label: "Sensor", value: "Samsung BioActive" },
      { label: "Battery", value: "Up to 40 hours" },
      { label: "Fitness", value: "100+ workout tracking" },
      { label: "Compatibility", value: "Android 10+, iOS limited" },
    ],
    reviews: [
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Sleep coaching is genuinely useful. Battery easily lasts a day and a half." },
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
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Display", value: "6.7\" LTPO OLED, 120Hz" },
      { label: "Chipset", value: "Snapdragon 8+ Gen 1" },
      { label: "Camera", value: "50MP main + 50MP ultrawide" },
      { label: "Interface", value: "Glyph LED light interface" },
      { label: "Battery", value: "4700 mAh, 45W charging" },
    ],
    reviews: [
      { user: reviewerIds[1], name: reviewerNames[1], rating: 4, comment: "The Glyph lights are a great conversation starter. Clean software, no bloat." },
    ],
  },
  {
    name: "Sony LinkBuds S",
    description:
      "Feather-light earbuds with adaptive noise cancellation, crystal-clear calls and spatial sound. Wear them all day without noticing.",
    brand: "Sony",
    category: "Earbuds",
    price: 19990,
    countInStock: 45,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "In-ear TWS" },
      { label: "Weight", value: "4.8g per bud" },
      { label: "ANC", value: "Adaptive Sound Control" },
      { label: "Battery", value: "6h buds, 20h with case" },
      { label: "Audio", value: "Spatial Sound, Hi-Res" },
    ],
    reviews: [
      { user: reviewerIds[3], name: reviewerNames[3], rating: 5, comment: "So light I forget I'm wearing them. ANC adapts automatically." },
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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],
    featured: false,
    specs: [
      { label: "Type", value: "Over-ear, wireless" },
      { label: "Battery", value: "70 hours (ANC on)" },
      { label: "Noise Cancelling", value: "Adaptive ANC" },
      { label: "Sound", value: "JBL Pure Bass" },
      { label: "Extra", value: "Multi-point Bluetooth" },
    ],
    reviews: [
      { user: reviewerIds[2], name: reviewerNames[2], rating: 4, comment: "Seventy hours is no joke — I charge it once a fortnight." },
      { user: reviewerIds[0], name: reviewerNames[0], rating: 4, comment: "Excellent value, comfy pads, decent ANC for the price." },
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
