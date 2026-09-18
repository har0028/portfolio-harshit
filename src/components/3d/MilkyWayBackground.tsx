import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Deep Space Milky Way Environment
 * - Logarithmic spiral galaxy arms with spectral-class stellar colors
 * - Dense galactic core bulge
 * - Multi-layer depth starfield (far, mid, near)
 * - Volumetric nebulae (emission, reflection, absorption)
 * - Dark interstellar dust lanes
 * - Distant gas giant with ring system, atmosphere rim, and moon
 * - Second distant rocky planet
 * - Procedural asteroid belt with realistic tumbling
 * - Cosmic dust particle sheets
 */

interface StarFieldData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

interface AsteroidItem {
  pos: [number, number, number];
  scale: [number, number, number];
  rotSpeed: [number, number, number];
  initRot: [number, number, number];
}

let cachedGalaxyData: [StarFieldData, StarFieldData, StarFieldData, StarFieldData, StarFieldData] | null = null;
let cachedAsteroidData: AsteroidItem[] | null = null;

function getGalaxyData(): [StarFieldData, StarFieldData, StarFieldData, StarFieldData, StarFieldData] {
  if (cachedGalaxyData) return cachedGalaxyData;

  const tempCol = new THREE.Color();

  // --- Spiral Arms ---
  const armCount = 10000;
  const armPos = new Float32Array(armCount * 3);
  const armCol = new Float32Array(armCount * 3);
  const armSiz = new Float32Array(armCount);

  const spectral = [
    new THREE.Color('#a5b4fc'), // O/B blue
    new THREE.Color('#bfdbfe'), // A white-blue
    new THREE.Color('#f0f4f8'), // F white
    new THREE.Color('#fef08a'), // G yellow
    new THREE.Color('#fdba74'), // K orange
    new THREE.Color('#fca5a5'), // M red
  ];

  const arms = 2;
  for (let i = 0; i < armCount; i++) {
    const r = Math.pow(Math.random(), 1.5) * 48 + 3;
    const spin = r * 0.20;
    const armOff = ((i % arms) * Math.PI * 2) / arms;
    const spread = Math.pow(Math.random(), 2) * (r * 0.20 + 1.5);
    const scat = Math.random() * Math.PI * 2;

    armPos[i * 3]     = Math.cos(spin + armOff) * r + Math.cos(scat) * spread;
    armPos[i * 3 + 1] = (Math.sin(spin + armOff) * r + Math.sin(scat) * spread) * 0.42;
    armPos[i * 3 + 2] = (Math.random() - 0.5) * (r * 0.14 + 4) - 32;

    const c = spectral[Math.floor(Math.random() * spectral.length)];
    armCol[i * 3] = c.r; armCol[i * 3 + 1] = c.g; armCol[i * 3 + 2] = c.b;
    armSiz[i] = 0.04 + Math.pow(Math.random(), 3) * 0.15;
  }

  // --- Core Bulge ---
  const coreCount = 5000;
  const corePos = new Float32Array(coreCount * 3);
  const coreCol = new Float32Array(coreCount * 3);
  const coreSiz = new Float32Array(coreCount);
  const coreColors = [
    new THREE.Color('#fef3c7'),
    new THREE.Color('#fde68a'),
    new THREE.Color('#fff7ed'),
  ];
  for (let i = 0; i < coreCount; i++) {
    const rad = Math.pow(Math.random(), 2.8) * 13;
    const th = Math.random() * Math.PI * 2;
    const ph = (Math.random() - 0.5) * Math.PI * 0.75;
    corePos[i * 3]     = rad * Math.cos(ph) * Math.cos(th);
    corePos[i * 3 + 1] = rad * Math.sin(ph) * 0.55;
    corePos[i * 3 + 2] = rad * Math.cos(ph) * Math.sin(th) - 34;
    const cc = coreColors[Math.floor(Math.random() * coreColors.length)];
    coreCol[i * 3] = cc.r; coreCol[i * 3 + 1] = cc.g; coreCol[i * 3 + 2] = cc.b;
    coreSiz[i] = 0.05 + Math.random() * 0.13;
  }

  // --- Far background stars (deep, dense, faint) ---
  const farCount = 4000;
  const farPos = new Float32Array(farCount * 3);
  const farCol = new Float32Array(farCount * 3);
  const farSiz = new Float32Array(farCount);
  for (let i = 0; i < farCount; i++) {
    farPos[i * 3]     = (Math.random() - 0.5) * 160;
    farPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
    farPos[i * 3 + 2] = -40 - Math.random() * 60;
    tempCol.setHSL(0.6 + Math.random() * 0.15, 0.2 + Math.random() * 0.3, 0.7 + Math.random() * 0.3);
    farCol[i * 3] = tempCol.r; farCol[i * 3 + 1] = tempCol.g; farCol[i * 3 + 2] = tempCol.b;
    farSiz[i] = 0.03 + Math.random() * 0.06;
  }

  // --- Foreground bright stars (varied) ---
  const brtCount = 400;
  const brtPos = new Float32Array(brtCount * 3);
  const brtCol = new Float32Array(brtCount * 3);
  const brtSiz = new Float32Array(brtCount);
  const brightColors = [
    new THREE.Color('#93c5fd'),
    new THREE.Color('#fef08a'),
    new THREE.Color('#fca5a5'),
    new THREE.Color('#f0f4f8'),
  ];
  for (let i = 0; i < brtCount; i++) {
    brtPos[i * 3]     = (Math.random() - 0.5) * 90;
    brtPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
    brtPos[i * 3 + 2] = -10 - Math.random() * 30;
    const roll = Math.random();
    const bc = roll < 0.3 ? brightColors[0]
             : roll < 0.5 ? brightColors[1]
             : roll < 0.7 ? brightColors[2]
             : brightColors[3];
    brtCol[i * 3] = bc.r; brtCol[i * 3 + 1] = bc.g; brtCol[i * 3 + 2] = bc.b;
    brtSiz[i] = 0.14 + Math.pow(Math.random(), 2) * 0.28;
  }

  // --- Cosmic dust sheet ---
  const dustCount = 2500;
  const dstPos = new Float32Array(dustCount * 3);
  const dstCol = new Float32Array(dustCount * 3);
  const dstSiz = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dstPos[i * 3]     = (Math.random() - 0.5) * 80;
    dstPos[i * 3 + 1] = (Math.random() - 0.5) * 6 - 2;
    dstPos[i * 3 + 2] = -18 - Math.random() * 25;
    tempCol.setHSL(0.58 + Math.random() * 0.08, 0.3, 0.35 + Math.random() * 0.15);
    dstCol[i * 3] = tempCol.r; dstCol[i * 3 + 1] = tempCol.g; dstCol[i * 3 + 2] = tempCol.b;
    dstSiz[i] = 0.06 + Math.random() * 0.08;
  }

  cachedGalaxyData = [
    { positions: armPos, colors: armCol, sizes: armSiz },
    { positions: corePos, colors: coreCol, sizes: coreSiz },
    { positions: farPos, colors: farCol, sizes: farSiz },
    { positions: brtPos, colors: brtCol, sizes: brtSiz },
    { positions: dstPos, colors: dstCol, sizes: dstSiz },
  ];
  return cachedGalaxyData;
}

function getAsteroidData(): AsteroidItem[] {
  if (cachedAsteroidData) return cachedAsteroidData;
  const items: AsteroidItem[] = [];
  for (let i = 0; i < 28; i++) {
    items.push({
      pos: [
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 18,
        -8 - Math.random() * 22,
      ],
      scale: [
        0.10 + Math.random() * 0.24,
        0.08 + Math.random() * 0.20,
        0.12 + Math.random() * 0.26,
      ],
      rotSpeed: [
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
      ],
      initRot: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ],
    });
  }
  cachedAsteroidData = items;
  return cachedAsteroidData;
}

export const MilkyWayBackground: React.FC = () => {
  const galaxyCoreRef = useRef<THREE.Points>(null);
  const galaxyArmsRef = useRef<THREE.Points>(null);
  const farStarsRef = useRef<THREE.Points>(null);
  const brightStarsRef = useRef<THREE.Points>(null);
  const dustSheetRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const planet2Ref = useRef<THREE.Mesh>(null);
  const asteroidGroupRef = useRef<THREE.Group>(null);
  const [galaxyData, coreData, farData, brightData, dustData] = useMemo(() => getGalaxyData(), []);
  const asteroids = useMemo(() => getAsteroidData(), []);

  // ─────────────────────────────────────────────────────────────────────────
  // FRAME ANIMATION
  // ─────────────────────────────────────────────────────────────────────────
  useFrame((_, delta) => {
    if (galaxyArmsRef.current) galaxyArmsRef.current.rotation.z += delta * 0.003;
    if (galaxyCoreRef.current) galaxyCoreRef.current.rotation.z += delta * 0.005;
    if (farStarsRef.current) farStarsRef.current.rotation.z += delta * 0.0008;
    if (brightStarsRef.current) brightStarsRef.current.rotation.z += delta * 0.001;
    if (dustSheetRef.current) dustSheetRef.current.rotation.z += delta * 0.002;
    if (nebulaRef.current) nebulaRef.current.rotation.y += delta * 0.0012;
    if (planetGroupRef.current) planetGroupRef.current.rotation.y += delta * 0.005;
    if (planet2Ref.current) planet2Ref.current.rotation.y += delta * 0.008;

    if (asteroidGroupRef.current) {
      asteroidGroupRef.current.children.forEach((child, i) => {
        const a = asteroids[i];
        if (a && child) {
          child.rotation.x += delta * a.rotSpeed[0];
          child.rotation.y += delta * a.rotSpeed[1];
          child.rotation.z += delta * a.rotSpeed[2];
        }
      });
    }
  });

  return (
    <group position={[0, 0, -4]}>
      {/* ═══ LAYERED STARFIELD ═══ */}

      {/* Far deep background stars */}
      <points ref={farStarsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[farData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[farData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.75}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Spiral Arms */}
      <points ref={galaxyArmsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galaxyData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[galaxyData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.11} vertexColors transparent opacity={0.82}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Galactic Core */}
      <points ref={galaxyCoreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[coreData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[coreData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.13} vertexColors transparent opacity={0.90}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Foreground bright stars */}
      <points ref={brightStarsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[brightData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[brightData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.20} vertexColors transparent opacity={0.92}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Cosmic dust sheet */}
      <points ref={dustSheetRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.50}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* ═══ VOLUMETRIC NEBULAE ═══ */}
      <group ref={nebulaRef}>
        {/* Blue emission nebula */}
        <mesh position={[15, 7, -28]} scale={[28, 20, 18]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#0369a1" transparent opacity={0.11}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* Violet hydrogen-alpha nebula */}
        <mesh position={[-18, -9, -32]} scale={[30, 22, 20]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#6d28d9" transparent opacity={0.07}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* Warm interstellar dust */}
        <mesh position={[7, -12, -24]} scale={[22, 16, 14]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#b45309" transparent opacity={0.055}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* Cyan reflection nebula */}
        <mesh position={[-10, 12, -35]} scale={[18, 14, 12]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#0891b2" transparent opacity={0.06}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* Dark dust absorption lane */}
        <mesh position={[2, 1, -26]} rotation={[0, 0, 0.35]} scale={[36, 5, 9]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.40} depthWrite={false} />
        </mesh>
        {/* Secondary dust lane */}
        <mesh position={[-5, -4, -28]} rotation={[0, 0, -0.25]} scale={[28, 3.5, 7]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#030712" transparent opacity={0.30} depthWrite={false} />
        </mesh>
      </group>

      {/* ═══ DISTANT GAS GIANT + RINGS ═══ */}
      <group ref={planetGroupRef} position={[12, -5, -24]}>
        <mesh>
          <sphereGeometry args={[2.8, 48, 48]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} metalness={0.15} />
        </mesh>
        {/* Atmosphere Fresnel rim */}
        <mesh scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25}
            blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        {/* Ice dust rings */}
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <ringGeometry args={[3.4, 5.6, 64]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.38}
            side={THREE.DoubleSide} roughness={0.75} metalness={0.2} />
        </mesh>
        {/* Moon */}
        <group position={[-6, 2.5, 2.5]}>
          <mesh scale={0.38}>
            <dodecahedronGeometry args={[1, 2]} />
            <meshStandardMaterial color="#64748b" roughness={0.88} metalness={0.12} />
          </mesh>
        </group>
      </group>

      {/* ═══ SECOND DISTANT ROCKY PLANET ═══ */}
      <mesh ref={planet2Ref} position={[-14, 8, -38]}>
        <sphereGeometry args={[1.4, 28, 28]} />
        <meshStandardMaterial color="#78350f" roughness={0.80} metalness={0.10} />
      </mesh>
      <mesh position={[-14, 8, -38]} scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[1.4, 20, 20]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.12}
          blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* ═══ ASTEROID FIELD ═══ */}
      <group ref={asteroidGroupRef}>
        {asteroids.map((ast, i) => (
          <mesh key={i} position={ast.pos} scale={ast.scale} rotation={ast.initRot}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#334155" roughness={0.82} metalness={0.22} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
