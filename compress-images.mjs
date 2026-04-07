import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join, extname, basename } from 'path';

const FOLDERS = [
  './src/assets/services',
  './src/assets/catalogue',
  './src/assets',
];

const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

let totalSavedKB = 0;
let count = 0;

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTS.includes(ext)) return;

  const stat = statSync(filePath);
  const originalKB = Math.round(stat.size / 1024);

  // Skip tiny files already optimized
  if (originalKB < 100) return;

  const tmpPath = filePath + '.tmp';

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    // Resize if extremely large (>2500px wide/tall)
    let pipeline = img;
    if (meta.width > 2000 || meta.height > 2000) {
      pipeline = pipeline.resize({
        width: 1800,
        height: 1800,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(tmpPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: 75, compressionLevel: 9 }).toFile(tmpPath);
    } else if (ext === '.webp') {
      await pipeline.webp({ quality: 75 }).toFile(tmpPath);
    } else if (ext === '.avif') {
      await pipeline.avif({ quality: 65 }).toFile(tmpPath);
    }

    const newStat = statSync(tmpPath);
    const newKB = Math.round(newStat.size / 1024);
    const savedKB = originalKB - newKB;

    if (savedKB > 0) {
      renameSync(tmpPath, filePath);
      totalSavedKB += savedKB;
      count++;
      console.log(`✓ ${basename(filePath).padEnd(50)} ${originalKB} kB → ${newKB} kB  (saved ${savedKB} kB)`);
    } else {
      // New file is larger, keep original
      renameSync(tmpPath, filePath + '.discard');
      try { renameSync(filePath + '.discard', filePath); } catch {}
      console.log(`  ${basename(filePath).padEnd(50)} already optimal (${originalKB} kB)`);
    }
  } catch (err) {
    console.error(`✗ Error on ${basename(filePath)}: ${err.message}`);
    try { renameSync(tmpPath, tmpPath.replace('.tmp', '.failed')); } catch {}
  }
}

async function processFolder(folder) {
  let files;
  try {
    files = readdirSync(folder);
  } catch {
    return; // folder doesn't exist or is empty
  }

  for (const file of files) {
    const fullPath = join(folder, file);
    const stat = statSync(fullPath);
    if (stat.isFile()) {
      await compressImage(fullPath);
    }
  }
}

console.log('🔧  Compressing images...\n');
for (const folder of FOLDERS) {
  console.log(`\n📁  ${folder}`);
  await processFolder(folder);
}

console.log(`\n✅  Done! Compressed ${count} images. Total saved: ${Math.round(totalSavedKB / 1024 * 10) / 10} MB`);
