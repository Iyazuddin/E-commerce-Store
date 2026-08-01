const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "server/.env") });
const Product = require("./server/models/Product");

const products = [
  {
    name: "Apple iPhone 15 Pro Max",
    description: "6.7-inch Super Retina XDR display, A17 Pro chip, 48MP camera system, Titanium design",
    brand: "Apple",
    category: "Smartphones",
    price: 159900,
    countInStock: 25,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, S Pen included",
    brand: "Samsung",
    category: "Smartphones",
    price: 134999,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling",
    brand: "Sony",
    category: "Headphones",
    price: 29990,
    countInStock: 50,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
  },
  {
    name: "Apple AirPods Pro 2",
    description: "Active Noise Cancellation, Adaptive Transparency, USB-C charging, up to 6 hours listening time",
    brand: "Apple",
    category: "Earbuds",
    price: 24900,
    countInStock: 60,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&q=80",
  },
  {
    name: "Samsung Galaxy Buds3 Pro",
    description: "Intelligent ANC, 360 Audio, Hi-Fi 24-bit audio, IP57 water resistance",
    brand: "Samsung",
    category: "Earbuds",
    price: 17999,
    countInStock: 40,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&q=80",
  },
  {
    name: "MacBook Air M3",
    description: "15.3-inch Liquid Retina display, M3 chip, 18-hour battery, 8GB RAM, 256GB SSD",
    brand: "Apple",
    category: "Laptops",
    price: 134900,
    countInStock: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
  },
  {
    name: "Dell XPS 15",
    description: "15.6-inch OLED 3.5K display, Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX",
    brand: "Dell",
    category: "Laptops",
    price: 149990,
    countInStock: 10,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
  },
  {
    name: "Apple iPad Pro M4",
    description: "13-inch Ultra Retina XDR, M4 chip, Thunderbolt, Face ID, Wi-Fi 6E",
    brand: "Apple",
    category: "Tablets",
    price: 119900,
    countInStock: 20,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
  },
  {
    name: "JBL Charge 5 Speaker",
    description: "Portable Bluetooth speaker, IP67 waterproof, 20-hour playtime, PartyBoost",
    brand: "JBL",
    category: "Speakers",
    price: 14999,
    countInStock: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
  },
  {
    name: "Apple Watch Series 9",
    description: "45mm, Always-On Retina LTPO display, S9 SiP, blood oxygen, ECG app",
    brand: "Apple",
    category: "Smartwatches",
    price: 44900,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&q=80",
  },
  {
    name: "boAt Airdopes 141",
    description: "TWS earbuds, 42-hour playback, ENx noise cancellation, IPX4 sweat resistance, BEAST mode",
    brand: "boAt",
    category: "Earbuds",
    price: 1299,
    countInStock: 100,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
  },
  {
    name: "OnePlus 12",
    description: "6.82-inch 2K LTPO display, Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC",
    brand: "OnePlus",
    category: "Smartphones",
    price: 64999,
    countInStock: 25,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products 🗑️");

    // Insert new products
    const created = await Product.insertMany(products);
    console.log(`Seeded ${created.length} products ✅`);

    console.log("\nProducts added:");
    created.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} — ₹${p.price.toLocaleString()}`);
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
