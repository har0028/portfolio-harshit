import * as THREE from 'three';

/**
 * Procedural PBR Texture Generator (High Performance & Cached)
 * Generates lightweight, seamless normal, roughness, and panel textures
 * with singleton caching to prevent main-thread freezing on page load.
 */

const textureCache: Record<string, THREE.CanvasTexture> = {};

// 1. Brushed Titanium / Machined Metal Normal Map
export function createBrushedMetalNormalMap(width = 128, height = 128): THREE.CanvasTexture {
  const cacheKey = `brushed_${width}_${height}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const noise1D: number[] = new Array(height);
  for (let y = 0; y < height; y++) {
    noise1D[y] = (Math.random() - 0.5) * 0.4;
  }

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    const nyBase = noise1D[y] + Math.sin(y * 0.8) * 0.15;

    for (let x = 0; x < width; x++) {
      const idx = (rowOffset + x) * 4;
      const groove = nyBase + (Math.random() - 0.5) * 0.08;
      const dx = (Math.random() - 0.5) * 0.15;
      const dy = groove * 0.8;

      data[idx] = Math.max(0, Math.min(255, Math.floor(128 + dx * 127)));
      data[idx + 1] = Math.max(0, Math.min(255, Math.floor(128 + dy * 127)));
      data[idx + 2] = 245;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  textureCache[cacheKey] = texture;
  return texture;
}

// 2. Sci-Fi Armor Plating & Seams Normal Map
export function createPanelNormalMap(width = 128, height = 128): THREE.CanvasTexture {
  const cacheKey = `panel_${width}_${height}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  const step = width / 4;

  for (let i = 0; i <= width; i += step) {
    ctx.strokeStyle = 'rgb(80, 128, 250)';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();

    ctx.strokeStyle = 'rgb(176, 128, 250)';
    ctx.beginPath();
    ctx.moveTo(i + 1.5, 0);
    ctx.lineTo(i + 1.5, height);
    ctx.stroke();

    ctx.strokeStyle = 'rgb(128, 80, 250)';
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();

    ctx.strokeStyle = 'rgb(128, 176, 250)';
    ctx.beginPath();
    ctx.moveTo(0, i + 1.5);
    ctx.lineTo(width, i + 1.5);
    ctx.stroke();
  }

  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      ctx.fillStyle = 'rgb(90, 90, 250)';
      ctx.beginPath();
      ctx.arc(x, y, 2.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgb(165, 165, 250)';
      ctx.beginPath();
      ctx.arc(x - 0.6, y - 0.6, 1.0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  textureCache[cacheKey] = texture;
  return texture;
}

// 3. Metallic Surface Micro-Roughness Map
export function createRoughnessMap(width = 128, height = 128): THREE.CanvasTexture {
  const cacheKey = `roughness_${width}_${height}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      const idx = (rowOffset + x) * 4;
      const base = 48;
      const noise = (Math.random() - 0.5) * 24;
      const panelMod = ((x % 32 < 2 || y % 32 < 2) ? 40 : 0);
      const val = Math.max(20, Math.min(180, Math.floor(base + noise + panelMod)));

      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.needsUpdate = true;
  textureCache[cacheKey] = texture;
  return texture;
}

// 4. Aerospace Twill Weave Carbon-Fiber Normal Map
export function createCarbonFiberNormalMap(width = 128, height = 128): THREE.CanvasTexture {
  const cacheKey = `carbon_${width}_${height}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;
  const tileSize = 8;

  for (let y = 0; y < height; y++) {
    const tileY = Math.floor(y / tileSize);
    const subY = (y % tileSize) / tileSize - 0.5;
    const rowOffset = y * width;

    for (let x = 0; x < width; x++) {
      const tileX = Math.floor(x / tileSize);
      const subX = (x % tileSize) / tileSize - 0.5;
      const idx = (rowOffset + x) * 4;
      const isHorizontalWeave = ((tileX + tileY) % 4 < 2);

      let nx = 128;
      let ny = 128;

      if (isHorizontalWeave) {
        ny = Math.floor(128 + subY * 110);
        nx = Math.floor(128 + (Math.random() - 0.5) * 16);
      } else {
        nx = Math.floor(128 + subX * 110);
        ny = Math.floor(128 + (Math.random() - 0.5) * 16);
      }

      data[idx] = Math.max(0, Math.min(255, nx));
      data[idx + 1] = Math.max(0, Math.min(255, ny));
      data[idx + 2] = 240;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.needsUpdate = true;
  textureCache[cacheKey] = texture;
  return texture;
}

// 5. Thermal Protection System (TPS) Hex/Square Tile Normal Map
export function createThermalTileNormalMap(width = 128, height = 128): THREE.CanvasTexture {
  const cacheKey = `tps_${width}_${height}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, width, height);

  const tileSize = 16;
  ctx.lineWidth = 1.2;

  for (let y = 0; y < height; y += tileSize) {
    const row = Math.floor(y / tileSize);
    const offsetX = (row % 2) * (tileSize / 2);

    for (let x = -tileSize; x < width + tileSize; x += tileSize) {
      const tileX = x + offsetX;
      ctx.strokeStyle = 'rgb(75, 128, 240)';
      ctx.strokeRect(tileX + 1, y + 1, tileSize - 2, tileSize - 2);

      ctx.strokeStyle = 'rgb(175, 128, 255)';
      ctx.beginPath();
      ctx.moveTo(tileX + tileSize - 1, y + 1);
      ctx.lineTo(tileX + tileSize - 1, y + tileSize - 1);
      ctx.lineTo(tileX + 1, y + tileSize - 1);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  textureCache[cacheKey] = texture;
  return texture;
}
