import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. The Master SVG for Oikyo Brand Icon
// Uses emerald/teal civic gradient and white interlocking community nodes
const oikyoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="oikyoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
  </defs>
  <!-- Rounded Squircle Badge -->
  <rect x="4" y="4" width="120" height="120" rx="28" fill="url(#oikyoGrad)" />
  <!-- Scaled Inner Emblem from BrandLogo component -->
  <g transform="translate(12.8, 11.2) scale(3.2)" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
    <!-- Interlocking Unity Nodes: Community Gathering & Solidarity -->
    <circle cx="16" cy="8" r="3.2" stroke="none" fill="#ffffff" />
    <circle cx="9" cy="20" r="3.2" stroke="none" fill="#ffffff" />
    <circle cx="23" cy="20" r="3.2" stroke="none" fill="#ffffff" />
    <!-- Connecting bridges -->
    <path
      d="M16 11.5 V15.5 M16 15.5 L11 18.5 M16 15.5 L21 18.5"
      stroke="#ffffff"
      stroke-width="2.4"
      fill="none"
    />
    <!-- Solidarity cradle / foundation arc -->
    <path
      d="M6.5 24 C8.5 26.8 12 28.5 16 28.5 C20 28.5 23.5 26.8 25.5 24"
      stroke="#ffffff"
      stroke-width="2.4"
      stroke-opacity="0.95"
      fill="none"
    />
  </g>
</svg>
`;

/**
 * Packs raw PNG buffers into standard Windows/Browser ICO format.
 * Works seamlessly across Chrome, Edge, Firefox, Safari, and Windows taskbars.
 */
function packIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color count (0 = no palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of PNG data
    entry.writeUInt32LE(offset, 12); // Offset in file
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((img) => img.buffer)]);
}

async function main() {
  console.log("🚀 Generating Oikyo Brand Favicons and App Icons...");
  const svgBuffer = Buffer.from(oikyoSvg.trim(), "utf-8");

  // 1. Write SVG icons
  const appIconSvgPath = path.join(rootDir, "src", "app", "icon.svg");
  const publicFaviconSvgPath = path.join(rootDir, "public", "favicon.svg");
  fs.writeFileSync(appIconSvgPath, svgBuffer);
  fs.writeFileSync(publicFaviconSvgPath, svgBuffer);
  console.log("✅ Wrote src/app/icon.svg and public/favicon.svg");

  // 2. Generate PNG sizes with sharp
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    pngBuffers[size] = await sharp(svgBuffer)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();
    console.log(`✅ Rendered ${size}x${size} PNG (${pngBuffers[size].length} bytes)`);
  }

  // 3. Apple Touch Icons (180x180)
  fs.writeFileSync(path.join(rootDir, "src", "app", "apple-icon.png"), pngBuffers[180]);
  fs.writeFileSync(path.join(rootDir, "public", "apple-touch-icon.png"), pngBuffers[180]);
  console.log("✅ Wrote apple-icon.png (180x180) in src/app and public");

  // 4. Web App Manifest Icons (192x192 & 512x512)
  fs.writeFileSync(path.join(rootDir, "public", "icon-192.png"), pngBuffers[192]);
  fs.writeFileSync(path.join(rootDir, "public", "icon-512.png"), pngBuffers[512]);
  console.log("✅ Wrote icon-192.png and icon-512.png in public");

  // 5. Multi-resolution ICO (16, 32, 48)
  const icoData = packIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] },
  ]);

  fs.writeFileSync(path.join(rootDir, "src", "app", "favicon.ico"), icoData);
  fs.writeFileSync(path.join(rootDir, "public", "favicon.ico"), icoData);
  console.log(`✅ Wrote multi-resolution favicon.ico (${icoData.length} bytes) in src/app and public`);

  console.log("🎉 All favicons and application icons successfully generated!");
}

main().catch((err) => {
  console.error("❌ Failed to generate favicons:", err);
  process.exit(1);
});

