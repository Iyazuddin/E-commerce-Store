// Temporary script: updates prices and image paths in seed.js by product name.
// Run: node update-seed-data.js
// After use, delete this file.
const fs = require("fs");
const path = require("path");

const seedPath = path.join(__dirname, "seed.js");
let text = fs.readFileSync(seedPath, "utf8");
const crlf = text.includes("\r\n");
if (crlf) text = text.replace(/\r\n/g, "\n");

// price: productName -> new price in INR
const PRICES = {
  "Apple iPhone 15 Pro Max": 124900,
  "Samsung Galaxy S24 Ultra": 94999,
  "Sony WH-1000XM5 Headphones": 24990,
  "Apple AirPods Pro 2": 22900,
  "Samsung Galaxy Buds3 Pro": 19999,
  "MacBook Air M3": 119990,
  "Dell XPS 15": 139990,
  "Apple iPad Pro M4": 114900,
  "JBL Charge 5 Speaker": 12999,
  "Apple Watch Series 9": 39900,
  "boAt Airdopes 141": 1299,
  "OnePlus 12": 64999,
  "Samsung Galaxy Watch 6": 29999,
  "Nothing Phone 2": 44999,
  "Sony LinkBuds S": 14990,
  "JBL Tune 770NC Headphones": 7999,
  "Google Pixel 8 Pro": 79999,
  "Xiaomi 14 Ultra": 69999,
  "Apple MacBook Pro 14 M3": 179900,
  "HP Spectre x360 14": 129990,
  "ASUS ROG Zephyrus G14": 119990,
  "Google Pixel Watch 2": 29999,
  "Garmin Forerunner 265": 47990,
  "Bose QuietComfort Ultra": 39990,
  "Canon EOS R6 Mark II": 189999,
  "Sony Alpha A7 IV": 219999,
  "Sony PlayStation 5": 54990,
  "Nintendo Switch OLED": 26990,
  "Google Pixel 8a": 39999,
  "Samsung Galaxy Z Flip 5": 74999,
  "iQOO 12 5G": 52999,
  "Sennheiser Momentum 4": 29990,
  "Nothing Ear (2)": 9999,
  "Samsung Galaxy Tab S9": 64999,
  "Lenovo ThinkPad X1 Carbon Gen 11": 164990,
  "Marshall Emberton II": 16999,
  "Fitbit Sense 2": 19999,
  "GoPro Hero 12 Black": 44990,
  "Xbox Series X": 56990,
  "Logitech MX Master 3S": 8995,
};

// image: productName -> new image path(s). Fill in after images are downloaded.
const IMAGES = {};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Find the block for a product and replace fields inside it.
function updateProduct(name, mutator) {
  const nameRe = new RegExp(`(^|\\n)  \\{\\n    name: "${escapeRegExp(name)}",`);
  const startMatch = nameRe.exec(text);
  if (!startMatch) {
    console.error(`  !! product not found: ${name}`);
    return false;
  }
  const start = startMatch.index;
  // End of this product block: next top-level "\n  }," or "\n];" at col 0/2
  const after = text.slice(start + startMatch[0].length);
  const endRel = after.search(/\n  \},\n  \{\n    name: |\n  \},\n\];/);
  const end = start + startMatch[0].length + endRel;
  const block = text.slice(start, end);
  const newBlock = mutator(block);
  if (newBlock === block) {
    console.error(`  !! no change made for: ${name}`);
    return false;
  }
  text = text.slice(0, start) + newBlock + text.slice(end);
  return true;
}

let ok = 0;
for (const [name, price] of Object.entries(PRICES)) {
  if (
    updateProduct(name, (block) =>
      block.replace(/(\n\s*price: )\d+,/, `$1${price},`),
    )
  ) {
    ok++;
  }
}
console.log(`Prices updated: ${ok}/${Object.keys(PRICES).length}`);

ok = 0;
for (const [name, imgs] of Object.entries(IMAGES)) {
  const arr = Array.isArray(imgs) ? imgs : [imgs];
  const imageField = `"/products/${arr[0]}"`;
  const imagesField =
    arr.length === 1
      ? `["${arr[0].replace(/"/g, '\\"')}"]`
      : `[${arr.map((i) => `"${i}"`).join(", ")}]`;
  if (
    updateProduct(name, (block) =>
      block
        .replace(/(\n\s*image:\s*).*?,\n/, `$1${imageField},\n`)
        .replace(/(\n\s*images:\s*\[)[^\]]*(\],\n)/, `$1${imagesField}$2`),
    )
  ) {
    ok++;
  }
}
console.log(`Images updated: ${ok}/${Object.keys(IMAGES).length}`);

if (crlf) text = text.replace(/\n/g, "\r\n");
fs.writeFileSync(seedPath, text, "utf8");
console.log("seed.js written.");
