import * as THREE from 'three';

/**
 * Premium Compact Deep-Space Spacecraft Geometry Factory
 * Creates a muscular, volumetric, aerodynamic spacecraft with faceted lifting-body hull,
 * integrated cockpit, thick structural side sponsons, and compact propulsion block.
 * ZERO airplane wings, ZERO flat planks, ZERO oversized container boxes.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. COMPACT AERODYNAMIC SCI-FI FUSELAGE (Volumetric Lifting-Body Hull)
// ─────────────────────────────────────────────────────────────────────────────

export function createCompactFuselageGeometry(): THREE.BufferGeometry {
  const stations = [
    // z, halfWidth, topApexY, botKeelY, chineY, topPower, botPower
    { z:  0.64, w: 0.014, topY: 0.010, botY: -0.010, chineY:  0.000, topP: 1.0, botP: 1.0 }, // Pointed rounded nose tip
    { z:  0.56, w: 0.060, topY: 0.040, botY: -0.034, chineY:  0.002, topP: 1.2, botP: 1.2 }, // Forward radome cone
    { z:  0.44, w: 0.125, topY: 0.082, botY: -0.060, chineY:  0.008, topP: 1.4, botP: 1.3 }, // Cockpit forward slope
    { z:  0.28, w: 0.190, topY: 0.128, botY: -0.084, chineY:  0.012, topP: 1.6, botP: 1.5 }, // Cockpit crest / shoulder flare
    { z:  0.10, w: 0.230, topY: 0.122, botY: -0.096, chineY:  0.006, topP: 1.8, botP: 1.6 }, // Cockpit aft bulkhead
    { z: -0.08, w: 0.248, topY: 0.108, botY: -0.102, chineY:  0.000, topP: 2.0, botP: 1.7 }, // Mid fuselage core
    { z: -0.26, w: 0.238, topY: 0.096, botY: -0.098, chineY: -0.006, topP: 2.0, botP: 1.7 }, // Aft waist / engine deck
    { z: -0.40, w: 0.215, topY: 0.085, botY: -0.088, chineY: -0.008, topP: 1.9, botP: 1.6 }, // Nacelle integration shroud
    { z: -0.50, w: 0.178, topY: 0.074, botY: -0.076, chineY: -0.006, topP: 1.7, botP: 1.5 }, // Aft thrust bulkhead
  ];

  const radialSegments = 36;
  const numStations = stations.length;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < numStations; i++) {
    const st = stations[i];
    const u = i / (numStations - 1);

    for (let j = 0; j < radialSegments; j++) {
      const v = j / radialSegments;
      const phi = (j / radialSegments) * Math.PI * 2;

      let x = 0;
      let y = 0;

      if (phi <= Math.PI) {
        // Top half
        const t = Math.cos(phi);
        x = -st.w * t;
        const sinPhi = Math.max(0, Math.sin(phi));
        const curve = Math.pow(sinPhi, st.topP);
        y = st.chineY + (st.topY - st.chineY) * curve;
      } else {
        // Bottom half
        const t = Math.cos(phi);
        x = -st.w * t;
        const sinPhi = Math.max(0, -Math.sin(phi));
        const curve = Math.pow(sinPhi, st.botP);
        y = st.chineY - (st.chineY - st.botY) * curve;
      }

      positions.push(x, y, st.z);
      uvs.push(u, v);
    }
  }

  // Connect quad rings with outward counter-clockwise winding
  for (let i = 0; i < numStations - 1; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const nextJ = (j + 1) % radialSegments;

      const p0 = i * radialSegments + j;
      const p1 = i * radialSegments + nextJ;
      const p2 = (i + 1) * radialSegments + j;
      const p3 = (i + 1) * radialSegments + nextJ;

      // Outward facing triangles
      indices.push(p0, p1, p2);
      indices.push(p1, p3, p2);
    }
  }

  // Cap front nose tip (outward normal)
  const tipIndex = positions.length / 3;
  positions.push(0, 0, stations[0].z + 0.015);
  uvs.push(0, 0.5);
  for (let j = 0; j < radialSegments; j++) {
    const nextJ = (j + 1) % radialSegments;
    indices.push(tipIndex, nextJ, j);
  }

  // Cap rear bulkhead (outward normal)
  const rearIndex = positions.length / 3;
  positions.push(0, 0, stations[numStations - 1].z - 0.01);
  uvs.push(1, 0.5);
  const lastRowStart = (numStations - 1) * radialSegments;
  for (let j = 0; j < radialSegments; j++) {
    const nextJ = (j + 1) % radialSegments;
    indices.push(rearIndex, lastRowStart + j, lastRowStart + nextJ);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMPACT INTEGRATED COCKPIT CANOPY (Curved Dark Glass Bubble)
// ─────────────────────────────────────────────────────────────────────────────

export function createCompactCanopyGeometry(): THREE.BufferGeometry {
  const canopyStations = [
    { z:  0.48, w: 0.028, h: 0.016, y0: 0.090 },
    { z:  0.38, w: 0.075, h: 0.044, y0: 0.110 },
    { z:  0.26, w: 0.108, h: 0.056, y0: 0.122 },
    { z:  0.14, w: 0.100, h: 0.042, y0: 0.118 },
    { z:  0.04, w: 0.078, h: 0.024, y0: 0.108 },
  ];

  const segs = 18;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < canopyStations.length; i++) {
    const st = canopyStations[i];
    const u = i / (canopyStations.length - 1);

    for (let j = 0; j <= segs; j++) {
      const v = j / segs;
      const angle = Math.PI * v;
      const x = -st.w * Math.cos(angle);
      const y = st.y0 + st.h * Math.sin(angle);

      positions.push(x, y, st.z);
      uvs.push(u, v);
    }
  }

  const cols = segs + 1;
  for (let i = 0; i < canopyStations.length - 1; i++) {
    for (let j = 0; j < segs; j++) {
      const p0 = i * cols + j;
      const p1 = i * cols + j + 1;
      const p2 = (i + 1) * cols + j;
      const p3 = (i + 1) * cols + j + 1;

      // Outward facing triangles
      indices.push(p0, p1, p2);
      indices.push(p1, p3, p2);
    }
  }

  // Cap front canopy arch
  const frontCapCenter = positions.length / 3;
  positions.push(0, canopyStations[0].y0, canopyStations[0].z);
  uvs.push(0, 0.5);
  for (let j = 0; j < segs; j++) {
    indices.push(frontCapCenter, j + 1, j);
  }

  // Cap rear canopy bulkhead
  const rearCapCenter = positions.length / 3;
  const lastCanopyRow = (canopyStations.length - 1) * cols;
  positions.push(0, canopyStations[canopyStations.length - 1].y0, canopyStations[canopyStations.length - 1].z);
  uvs.push(1, 0.5);
  for (let j = 0; j < segs; j++) {
    indices.push(rearCapCenter, lastCanopyRow + j, lastCanopyRow + j + 1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. INTEGRATED STRUCTURAL SIDE SPONSONS (Thick Armored Outriggers)
// Compact sci-fi outriggers with RCS thrusters — Solid watertight geometry
// ─────────────────────────────────────────────────────────────────────────────

export function createSideSponsonGeometry(side: number): THREE.BufferGeometry {
  const spanStations = [
    // Root blend to outrigger tip: x, leZ, teZ, thickness, centerY
    { x: side * 0.20, leZ:  0.22, teZ: -0.42, thick: 0.048, y: -0.005 },
    { x: side * 0.32, leZ:  0.08, teZ: -0.44, thick: 0.040, y: -0.010 },
    { x: side * 0.44, leZ: -0.06, teZ: -0.45, thick: 0.030, y: -0.012 },
    { x: side * 0.52, leZ: -0.18, teZ: -0.45, thick: 0.022, y: -0.014 },
  ];

  const chordSegments = 14;
  const numSpan = spanStations.length;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < numSpan; i++) {
    const st = spanStations[i];
    const u = i / (numSpan - 1);

    for (let j = 0; j < chordSegments; j++) {
      const theta = (j / chordSegments) * Math.PI * 2;
      const s = 0.5 * (1 - Math.cos(theta));
      const z = st.leZ + s * (st.teZ - st.leZ);

      // Faceted structural thickness
      const halfThick = st.thick * Math.sqrt(Math.max(0, s)) * (1 - s * 0.7);
      const isUpper = theta <= Math.PI;
      const y = st.y + (isUpper ? halfThick : -halfThick);

      positions.push(st.x, y, z);
      uvs.push(u, j / chordSegments);
    }
  }

  for (let i = 0; i < numSpan - 1; i++) {
    for (let j = 0; j < chordSegments; j++) {
      const nextJ = (j + 1) % chordSegments;
      const p0 = i * chordSegments + j;
      const p1 = i * chordSegments + nextJ;
      const p2 = (i + 1) * chordSegments + j;
      const p3 = (i + 1) * chordSegments + nextJ;

      if (side > 0) {
        indices.push(p0, p1, p2);
        indices.push(p1, p3, p2);
      } else {
        indices.push(p0, p2, p1);
        indices.push(p1, p2, p3);
      }
    }
  }

  // Cap sponson tip
  const tipStart = (numSpan - 1) * chordSegments;
  const tipCenterIndex = positions.length / 3;
  const tipSt = spanStations[numSpan - 1];
  positions.push(tipSt.x, tipSt.y, (tipSt.leZ + tipSt.teZ) * 0.5);
  uvs.push(1, 0.5);

  for (let j = 0; j < chordSegments; j++) {
    const nextJ = (j + 1) % chordSegments;
    if (side > 0) {
      indices.push(tipCenterIndex, tipStart + j, tipStart + nextJ);
    } else {
      indices.push(tipCenterIndex, tipStart + nextJ, tipStart + j);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. COMPACT CANTED STABILIZER FINS (Outrigger Winglets)
// ─────────────────────────────────────────────────────────────────────────────

export function createCompactWingletGeometry(side: number): THREE.BufferGeometry {
  const heightStations = [
    // y, x, leZ, teZ, thickness
    { y: -0.014, x: side * 0.52, leZ: -0.18, teZ: -0.45, thick: 0.022 },
    { y:  0.040, x: side * 0.56, leZ: -0.22, teZ: -0.44, thick: 0.018 },
    { y:  0.095, x: side * 0.60, leZ: -0.26, teZ: -0.43, thick: 0.014 },
    { y:  0.140, x: side * 0.63, leZ: -0.30, teZ: -0.42, thick: 0.010 },
  ];

  const chordSegments = 10;
  const numH = heightStations.length;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < numH; i++) {
    const st = heightStations[i];
    const u = i / (numH - 1);

    for (let j = 0; j < chordSegments; j++) {
      const theta = (j / chordSegments) * Math.PI * 2;
      const s = 0.5 * (1 - Math.cos(theta));
      const z = st.leZ + s * (st.teZ - st.leZ);

      const halfThick = st.thick * Math.sqrt(Math.max(0, s)) * (1 - s);
      const isOutboard = theta <= Math.PI;
      const x = st.x + (isOutboard ? side * halfThick : -side * halfThick);

      positions.push(x, st.y, z);
      uvs.push(u, j / chordSegments);
    }
  }

  for (let i = 0; i < numH - 1; i++) {
    for (let j = 0; j < chordSegments; j++) {
      const nextJ = (j + 1) % chordSegments;
      const p0 = i * chordSegments + j;
      const p1 = i * chordSegments + nextJ;
      const p2 = (i + 1) * chordSegments + j;
      const p3 = (i + 1) * chordSegments + nextJ;

      if (side > 0) {
        indices.push(p0, p1, p2);
        indices.push(p1, p3, p2);
      } else {
        indices.push(p0, p2, p1);
        indices.push(p1, p2, p3);
      }
    }
  }

  const tipStart = (numH - 1) * chordSegments;
  const tipIndex = positions.length / 3;
  const tipSt = heightStations[numH - 1];
  positions.push(tipSt.x, tipSt.y + 0.005, (tipSt.leZ + tipSt.teZ) * 0.5);
  uvs.push(1, 0.5);

  for (let j = 0; j < chordSegments; j++) {
    const nextJ = (j + 1) % chordSegments;
    if (side > 0) {
      indices.push(tipIndex, tipStart + nextJ, tipStart + j);
    } else {
      indices.push(tipIndex, tipStart + j, tipStart + nextJ);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}
