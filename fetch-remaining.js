// Fetch remaining product images from TechRadar (futurecdn) review og:images.
const https = require("https");
const fs = require("fs");
const dir = "C:/Users/Admin/Documents/-CodeAlpha_task1_Simple-E-commerce-Store/client/public/products/";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const targets = [
  ["apple watch series 9", "apple-watch-series-9", ["apple-watch-series-9"]],
  ["fitbit sense 2", "fitbit-sense-2", ["fitbit-sense-2"]],
  ["dell xps 15", "dell-xps-15", ["dell-xps-15"]],
  ["hp spectre x360", "hp-spectre-x360-14", ["hp-spectre-x360"]],
  ["thinkpad x1 carbon", "thinkpad-x1-carbon", ["thinkpad-x1-carbon"]],
  ["bose quietcomfort ultra headphones", "bose-qc-ultra", ["bose-quietcomfort-ultra-headphones"]],
  ["sennheiser momentum 4 wireless", "sennheiser-momentum-4", ["sennheiser-momentum-4"]],
  ["marshall emberton ii", "marshall-emberton-2", ["marshall-emberton", "emberton-ii"]],
  ["jbl charge 5", "jbl-charge-5", ["jbl-charge-5"]],
  ["jbl tune 770nc", "jbl-tune-770nc", ["jbl-tune-770"]],
  ["sony linkbuds s", "sony-linkbuds-s", ["linkbuds-s"]],
  ["samsung galaxy buds 3 pro", "samsung-galaxy-buds3-pro", ["galaxy-buds-3", "galaxy-buds3"]],
];

function get(url, isJson = false) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": UA, "Accept-Language": "en" } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        resolve(get(r.headers.location, isJson));
        return;
      }
      if (r.statusCode !== 200) { resolve(null); return; }
      const chunks = [];
      r.on("data", (c) => chunks.push(c));
      r.on("end", () => {
        const buf = Buffer.concat(chunks);
        resolve(isJson ? JSON.parse(buf.toString("utf8")) : buf.toString("utf8"));
      });
    });
    req.on("error", () => resolve(null));
    req.setTimeout(20000, () => { req.destroy(); resolve(null); });
  });
}

async function download(url, out) {
  const bin = await get(url);
  if (!bin || !Buffer.isBuffer(bin)) return false;
  fs.writeFileSync(out, bin);
  const magic = bin.slice(0, 4).toString("hex");
  return (bin.length > 15000) && (magic.startsWith("ffd8") || magic.startsWith("89504e47") || magic.startsWith("52494646"));
}

(async () => {
  for (const [query, slug, keys] of targets) {
    const searchUrl = `https://www.techradar.com/search?searchTerm=${encodeURIComponent(query)}`;
    const html = await get(searchUrl);
    let ok = false;
    let scored = [];
    if (html) {
      // collect candidate article urls (absolute or relative) that match keys
      const hrefs = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))]
        .filter((h) => keys.some((k) => h.includes(k)))
        .filter((h) => !h.includes("#"));
      const scored = hrefs
        .map((h) => {
          let score = 0;
          keys.forEach((k) => { if (h.includes(k)) score += 3; });
          if (/review/.test(h)) score += 2;
          if (/deals?|black-friday|price|vs-|best-/.test(h)) score -= 3;
          return { h, score };
        })
        .sort((a, b) => b.score - a.score);
      const best = scored[0];
      if (best && best.score >= 3) {
        const articleUrl = best.h.startsWith("http") ? best.h : `https://www.techradar.com${best.h}`;
        const art = await get(articleUrl);
        if (art) {
          const og = art.match(/property="og:image"\s+content="([^"]+)"/) || art.match(/content="([^"]+)"\s+property="og:image"/);
          if (og) {
            const imgUrl = og[1];
            const sized = imgUrl.replace(/-\d+-\d+(\.(?:jpg|jpeg|png|webp))$/, "-750-80$1");
            const ext = sized.match(/\.(jpg|jpeg|png|webp)/i)?.[0] || ".jpg";
            ok = await download(sized, dir + slug + ext);
          }
        }
      }
    }
    console.log(slug.padEnd(26), ok ? "OK  " : "FAIL", ok ? "" : `(url=${scored?.[0]?.h || "none"})`);
  }
})();
