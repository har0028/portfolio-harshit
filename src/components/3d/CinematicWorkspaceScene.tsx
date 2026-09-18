import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { toast } from 'sonner';
import {
  createBrushedMetalNormalMap,
  createPanelNormalMap,
  createRoughnessMap,
  createCarbonFiberNormalMap,
  createThermalTileNormalMap,
} from './pbrTextures';
import {
  createCompactFuselageGeometry,
  createCompactCanopyGeometry,
  createSideSponsonGeometry,
  createCompactWingletGeometry,
} from './spacecraftGeometry';

interface CinematicWorkspaceSceneProps {
  onSelectObject: (target: string) => void;
  onUserInteract?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PBR MATERIAL FACTORY — Next-Gen Deep-Space Aerospace Palette
// ─────────────────────────────────────────────────────────────────────────────

interface SharedMaterials {
  satinTitanium: THREE.MeshPhysicalMaterial;
  graphite: THREE.MeshPhysicalMaterial;
  brushedAluminum: THREE.MeshPhysicalMaterial;
  gunmetal: THREE.MeshPhysicalMaterial;
  darkSteel: THREE.MeshPhysicalMaterial;
  carbonFiber: THREE.MeshPhysicalMaterial;
  thermalTile: THREE.MeshPhysicalMaterial;
  copper: THREE.MeshPhysicalMaterial;
  champagne: THREE.MeshPhysicalMaterial;
  glass: THREE.MeshPhysicalMaterial;
  panelLine: THREE.MeshStandardMaterial;
  cyanEmit: THREE.MeshPhysicalMaterial;
  engineHousing: THREE.MeshPhysicalMaterial;
  engineNozzle: THREE.MeshPhysicalMaterial;
  engineAmberRing: THREE.MeshPhysicalMaterial;
  boosterCore: THREE.MeshBasicMaterial;
  boosterGlow: THREE.MeshBasicMaterial;
  boosterOuterGlow: THREE.MeshBasicMaterial;
}

function createMaterials(
  brushedNormal: THREE.Texture,
  panelNormal: THREE.Texture,
  roughnessMap: THREE.Texture,
  carbonNormal: THREE.Texture,
  thermalTileNormal: THREE.Texture,
): SharedMaterials {
  return {
    // 1. Primary hull — satin titanium with rich metallic depth (100% Solid & Opaque)
    satinTitanium: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#323c4a'),
      metalness: 0.90,
      roughness: 0.26,
      roughnessMap,
      normalMap: brushedNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      clearcoat: 0.35,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.8,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 2. Large panels & structural keel — dark graphite metallic (100% Solid & Opaque)
    graphite: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#161c24'),
      metalness: 0.85,
      roughness: 0.36,
      roughnessMap,
      normalMap: panelNormal,
      normalScale: new THREE.Vector2(0.40, 0.40),
      clearcoat: 0.25,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.5,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 3. Leading edges & structural framing — brushed aluminum (100% Solid & Opaque)
    brushedAluminum: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#58687e'),
      metalness: 0.94,
      roughness: 0.18,
      roughnessMap,
      normalMap: brushedNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      clearcoat: 0.45,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.8,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 4. Secondary panels & articulation joints — dark gunmetal (100% Solid & Opaque)
    gunmetal: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#222a36'),
      metalness: 0.90,
      roughness: 0.30,
      roughnessMap,
      normalMap: panelNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      clearcoat: 0.30,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 5. Structural parts — dark steel pylons, actuators & mounting ribs (100% Solid & Opaque)
    darkSteel: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#181f28'),
      metalness: 0.94,
      roughness: 0.22,
      roughnessMap,
      normalMap: brushedNormal,
      normalScale: new THREE.Vector2(0.30, 0.30),
      clearcoat: 0.35,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.5,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 6. Advanced aerospace carbon-fiber composites (100% Solid & Opaque)
    carbonFiber: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#11151c'),
      metalness: 0.35,
      roughness: 0.38,
      normalMap: carbonNormal,
      normalScale: new THREE.Vector2(0.60, 0.60),
      clearcoat: 0.25,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.2,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 7. Ventral Thermal Protection System (TPS) ceramic heat-shield tiles (100% Solid & Opaque)
    thermalTile: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#14181f'),
      metalness: 0.20,
      roughness: 0.65,
      normalMap: thermalTileNormal,
      normalScale: new THREE.Vector2(0.50, 0.50),
      clearcoat: 0.10,
      clearcoatRoughness: 0.40,
      envMapIntensity: 1.0,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // 8. Subtle champagne-metal accents — canopy framing, spine trim, sponson caps (100% Solid & Opaque)
    champagne: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c2a77a'),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.45,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.8,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Muted anodized copper — hydraulic pivots, fuel feeds & telemetry fittings (100% Solid & Opaque)
    copper: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#a66440'),
      metalness: 0.90,
      roughness: 0.26,
      clearcoat: 0.40,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.5,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Cockpit anti-reflective multi-layer tinted canopy glass (window only, with solid tub beneath)
    glass: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#08121f'),
      metalness: 0.15,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.92,
      depthWrite: true,
      depthTest: true,
      envMapIntensity: 3.2,
      side: THREE.DoubleSide,
    }),
    // Recessed panel line seams (100% Solid & Opaque)
    panelLine: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#05080d'),
      metalness: 0.4,
      roughness: 0.70,
      transparent: false,
      opacity: 1.0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Small technical accents — restrained cyan navigation indicators (100% Solid & Opaque)
    cyanEmit: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#05121c'),
      emissive: new THREE.Color('#00e5ff'),
      emissiveIntensity: 1.3,
      metalness: 0.85,
      roughness: 0.20,
      transparent: false,
      opacity: 1.0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Engine housing — dark heat-resistant ceramic aerospace alloy (100% Solid & Opaque)
    engineHousing: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#131820'),
      metalness: 0.94,
      roughness: 0.20,
      clearcoat: 0.45,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.8,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Engine nozzle bell — heat-treated titanium alloy (100% Solid & Opaque)
    engineNozzle: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#323c4a'),
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.55,
      clearcoatRoughness: 0.10,
      envMapIntensity: 2.0,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Engine throat ring — warm amber/copper heat-anodized alloy (100% Solid & Opaque)
    engineAmberRing: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8b552e'),
      metalness: 0.92,
      roughness: 0.24,
      clearcoat: 0.45,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.6,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Booster inner combustion core — subtle warm amber disc (100% Solid & Opaque)
    boosterCore: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffaa3b'),
      transparent: false,
      opacity: 1.0,
      depthWrite: true,
      depthTest: true,
      side: THREE.DoubleSide,
    }),
    // Soft yellow-orange exhaust glow (compact plume, zero wobble)
    boosterGlow: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#f59e0b'),
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
    // Soft outer exhaust halo
    boosterOuterGlow: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ea580c'),
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  };
}

let cachedMaterials: SharedMaterials | null = null;
let cachedFuselageGeo: THREE.BufferGeometry | null = null;
let cachedCanopyGeo: THREE.BufferGeometry | null = null;
let cachedLeftSponsonGeo: THREE.BufferGeometry | null = null;
let cachedRightSponsonGeo: THREE.BufferGeometry | null = null;
let cachedLeftWingletGeo: THREE.BufferGeometry | null = null;
let cachedRightWingletGeo: THREE.BufferGeometry | null = null;

function getSharedMaterials(): SharedMaterials {
  if (!cachedMaterials) {
    const brushedNormal = createBrushedMetalNormalMap(128, 128);
    const panelNormal = createPanelNormalMap(128, 128);
    const roughnessMap = createRoughnessMap(128, 128);
    const carbonNormal = createCarbonFiberNormalMap(128, 128);
    const thermalTileNormal = createThermalTileNormalMap(128, 128);
    cachedMaterials = createMaterials(brushedNormal, panelNormal, roughnessMap, carbonNormal, thermalTileNormal);
  }
  return cachedMaterials;
}

function getSharedGeometries() {
  if (!cachedFuselageGeo) {
    cachedFuselageGeo = createCompactFuselageGeometry();
    cachedCanopyGeo = createCompactCanopyGeometry();
    cachedLeftSponsonGeo = createSideSponsonGeometry(-1);
    cachedRightSponsonGeo = createSideSponsonGeometry(1);
    cachedLeftWingletGeo = createCompactWingletGeometry(-1);
    cachedRightWingletGeo = createCompactWingletGeometry(1);
  }
  return {
    fuselageGeo: cachedFuselageGeo,
    canopyGeo: cachedCanopyGeo!,
    leftSponsonGeo: cachedLeftSponsonGeo!,
    rightSponsonGeo: cachedRightSponsonGeo!,
    leftWingletGeo: cachedLeftWingletGeo!,
    rightWingletGeo: cachedRightWingletGeo!,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPACT NEXT-GEN DEEP-SPACE SPACECRAFT
// Volumetric Lifting-Body Hull • Sculpted Sponsons • Integrated Propulsion
// ─────────────────────────────────────────────────────────────────────────────

const ProceduralSpacecraft: React.FC = () => {
  const shipRef = useRef<THREE.Group>(null);
  const leftBoosterLightRef = useRef<THREE.PointLight>(null);
  const rightBoosterLightRef = useRef<THREE.PointLight>(null);

  const M = useMemo(() => getSharedMaterials(), []);
  const {
    fuselageGeo,
    canopyGeo,
    leftSponsonGeo,
    rightSponsonGeo,
    leftWingletGeo,
    rightWingletGeo,
  } = useMemo(() => getSharedGeometries(), []);

  // Frame loop: strictly subtle internal engine glow modulation ONLY
  // Zero geometry translation, zero group scaling, zero independent movement!
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Microscopic combustion intensity shimmer (±4% variation)
    const engineGlowPulse = 1.35 + Math.sin(time * 5.0) * 0.05;

    if (leftBoosterLightRef.current) {
      leftBoosterLightRef.current.intensity = engineGlowPulse;
    }
    if (rightBoosterLightRef.current) {
      rightBoosterLightRef.current.intensity = engineGlowPulse;
    }
  });

  return (
    <group ref={shipRef} rotation={[0, -Math.PI / 2, 0]} scale={2.8} renderOrder={10}>
      {/* ═══════════════════════════════════════════════════════════════════
          A — COMPACT VOLUMETRIC LIFTING-BODY FUSELAGE
          Muscular diamond-chined core with satin titanium armor
          ═══════════════════════════════════════════════════════════════════ */}
      <mesh geometry={fuselageGeo} material={M.satinTitanium} castShadow receiveShadow />

      {/* A1 — Dorsal Armor Spine Rail (Brushed Aluminum & Champagne Trim) */}
      <group position={[0, 0.092, -0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.042, 0.024, 0.62]} />
          <primitive object={M.brushedAluminum} attach="material" />
        </mesh>
        <mesh position={[0, 0.013, 0]}>
          <boxGeometry args={[0.012, 0.005, 0.62]} />
          <primitive object={M.champagne} attach="material" />
        </mesh>
        {/* Recessed dorsal data bus line */}
        <mesh position={[0, 0.014, 0.0]}>
          <boxGeometry args={[0.003, 0.002, 0.58]} />
          <primitive object={M.cyanEmit} attach="material" />
        </mesh>
      </group>

      {/* A2 — Ventral Thermal Protection System (TPS) Ceramic Belly Tiles */}
      <group position={[0, -0.078, 0.02]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.012, 0.70]} />
          <primitive object={M.thermalTile} attach="material" />
        </mesh>
        {/* Forward chine heat-shield chamfer */}
        <mesh position={[0, 0.004, 0.36]} rotation={[-0.18, 0, 0]}>
          <boxGeometry args={[0.12, 0.010, 0.16]} />
          <primitive object={M.thermalTile} attach="material" />
        </mesh>
      </group>

      {/* A3 — Upper Shoulder Layered Armor Plates (Dark Graphite & Carbon Fiber) */}
      {[-1, 1].map((side) => (
        <group key={`shoulder-armor-${side}`}>
          {/* Graphite mid-hull reinforcement plate */}
          <mesh
            position={[side * 0.12, 0.082, -0.06]}
            rotation={[0, side * -0.08, side * 0.22]}
            castShadow
          >
            <boxGeometry args={[0.10, 0.012, 0.38]} />
            <primitive object={M.graphite} attach="material" />
          </mesh>
          {/* Carbon-fiber technical insert panel */}
          <mesh
            position={[side * 0.125, 0.088, -0.04]}
            rotation={[0, side * -0.08, side * 0.22]}
          >
            <boxGeometry args={[0.075, 0.004, 0.28]} />
            <primitive object={M.carbonFiber} attach="material" />
          </mesh>

          {/* A4 — Recessed Thermal Dissipation Louvers / Cooling Gills (3D Angled Slats) */}
          <group position={[side * 0.115, 0.092, -0.18]} rotation={[0, side * -0.05, side * 0.22]}>
            {/* Dark radiator recess cavity */}
            <mesh position={[0, -0.004, 0]}>
              <boxGeometry args={[0.045, 0.008, 0.14]} />
              <primitive object={M.panelLine} attach="material" />
            </mesh>
            {/* Angled ventilation louver slats */}
            {[-0.05, -0.025, 0.0, 0.025, 0.05].map((lz, li) => (
              <mesh key={`louver-${li}`} position={[0, 0.001, lz]} rotation={[0.42, 0, 0]}>
                <boxGeometry args={[0.040, 0.004, 0.012]} />
                <primitive object={M.darkSteel} attach="material" />
              </mesh>
            ))}
          </group>

          {/* A5 — Lateral Knife-Edge Chine Trim (Champagne & Carbon Fiber) */}
          <mesh position={[side * 0.16, 0.005, 0.26]} rotation={[0, side * -0.22, 0]}>
            <boxGeometry args={[0.006, 0.006, 0.42]} />
            <primitive object={M.champagne} attach="material" />
          </mesh>
          <mesh position={[side * 0.17, 0.003, 0.22]} rotation={[0, side * -0.22, 0]} castShadow>
            <boxGeometry args={[0.028, 0.006, 0.38]} />
            <primitive object={M.carbonFiber} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          B — INTEGRATED COMMAND COCKPIT CANOPY
          Solid interior floor tub + tinted anti-reflective canopy window
          ═══════════════════════════════════════════════════════════════════ */}
      {/* B0 — Solid Opaque Cockpit Interior Floor / Tub — Blocks background stars completely */}
      <mesh position={[0, 0.088, 0.26]} castShadow receiveShadow>
        <boxGeometry args={[0.20, 0.024, 0.44]} />
        <primitive object={M.darkSteel} attach="material" />
      </mesh>

      {/* B1 — Aerodynamic Curved Cockpit Glass Bubble */}
      <mesh geometry={canopyGeo} material={M.glass} castShadow />

      {/* B2 — Champagne Titanium Structural Frame Ribs */}
      {[-0.065, 0.065].map((x, i) => (
        <mesh key={`canopy-arch-${i}`} position={[x, 0.125, 0.26]} castShadow>
          <boxGeometry args={[0.006, 0.034, 0.26]} />
          <primitive object={M.champagne} attach="material" />
        </mesh>
      ))}
      <mesh position={[0, 0.128, 0.18]} castShadow>
        <boxGeometry args={[0.14, 0.030, 0.008]} />
        <primitive object={M.champagne} attach="material" />
      </mesh>
      {/* Longitudinal canopy centerline frame rib */}
      <mesh position={[0, 0.138, 0.26]} castShadow>
        <boxGeometry args={[0.006, 0.012, 0.28]} />
        <primitive object={M.brushedAluminum} attach="material" />
      </mesh>

      {/* B3 — Interior Pilot HUD Telemetry & Instrument Readouts */}
      <mesh position={[0, 0.104, 0.32]}>
        <boxGeometry args={[0.065, 0.004, 0.008]} />
        <primitive object={M.cyanEmit} attach="material" />
      </mesh>
      <mesh position={[0, 0.100, 0.28]}>
        <boxGeometry args={[0.045, 0.003, 0.005]} />
        <meshBasicMaterial color="#ffaa3b" />
      </mesh>
      {/* Cockpit internal avionics glow */}
      <pointLight position={[0, 0.10, 0.27]} intensity={0.30} distance={0.6} color="#38bdf8" />

      {/* ═══════════════════════════════════════════════════════════════════
          C — INTEGRATED STRUCTURAL SIDE SPONSONS (Thick Armored Outriggers)
          Thick faceted modules with carbon composite armor & RCS clusters
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Port Sponson */}
      <mesh geometry={leftSponsonGeo} material={M.satinTitanium} castShadow receiveShadow />
      {/* Starboard Sponson */}
      <mesh geometry={rightSponsonGeo} material={M.satinTitanium} castShadow receiveShadow />

      {[-1, 1].map((side) => (
        <group key={`sponson-accents-${side}`}>
          {/* C1 — Carbon-Fiber Leading-Edge Armor Slat */}
          <mesh
            position={[side * 0.36, -0.010, -0.08]}
            rotation={[0, side * -0.52, side * -0.02]}
            castShadow
          >
            <boxGeometry args={[0.26, 0.014, 0.022]} />
            <primitive object={M.carbonFiber} attach="material" />
          </mesh>
          {/* Champagne Highlight Slat */}
          <mesh
            position={[side * 0.36, -0.008, -0.072]}
            rotation={[0, side * -0.52, side * -0.02]}
          >
            <boxGeometry args={[0.26, 0.004, 0.004]} />
            <primitive object={M.champagne} attach="material" />
          </mesh>

          {/* C2 — Dark Graphite Thermal Radiator Inset with Cooling Slots */}
          <mesh
            position={[side * 0.34, -0.008, -0.28]}
            rotation={[0, side * -0.15, side * -0.02]}
            castShadow
          >
            <boxGeometry args={[0.16, 0.008, 0.22]} />
            <primitive object={M.graphite} attach="material" />
          </mesh>
          {/* Radiator surface panel lines */}
          {[-0.06, 0.0, 0.06].map((rz, ri) => (
            <mesh
              key={`rad-line-${ri}`}
              position={[side * 0.34, -0.003, -0.28 + rz]}
              rotation={[0, side * -0.15, side * -0.02]}
            >
              <boxGeometry args={[0.14, 0.003, 0.006]} />
              <primitive object={M.panelLine} attach="material" />
            </mesh>
          ))}

          {/* C3 — Gunmetal Trailing Elevon Control Flaps */}
          <mesh
            position={[side * 0.36, -0.014, -0.44]}
            rotation={[0, side * -0.05, side * -0.02]}
            castShadow
          >
            <boxGeometry args={[0.26, 0.010, 0.032]} />
            <primitive object={M.gunmetal} attach="material" />
          </mesh>

          {/* C4 — Compact Canted Outrigger Winglets */}
          <group position={[0, 0, 0]}>
            {side > 0 ? (
              <mesh geometry={rightWingletGeo} material={M.satinTitanium} castShadow receiveShadow />
            ) : (
              <mesh geometry={leftWingletGeo} material={M.satinTitanium} castShadow receiveShadow />
            )}
            {/* Winglet carbon fiber tip cap */}
            <mesh position={[side * 0.63, 0.14, -0.34]}>
              <boxGeometry args={[0.012, 0.010, 0.06]} />
              <primitive object={M.carbonFiber} attach="material" />
            </mesh>
            {/* Winglet Formation Strobe Beacon (Cyan) */}
            <mesh position={[side * 0.632, 0.145, -0.36]}>
              <sphereGeometry args={[0.007, 8, 8]} />
              <primitive object={M.cyanEmit} attach="material" />
            </mesh>
          </group>

          {/* C5 — Multi-Axis Reaction Control System (RCS) Quad Thruster Blocks */}
          <group position={[side * 0.52, 0.0, -0.16]}>
            <mesh castShadow>
              <boxGeometry args={[0.018, 0.018, 0.024]} />
              <primitive object={M.darkSteel} attach="material" />
            </mesh>
            {/* RCS Micro Nozzles (4 orthogonal axes) */}
            {[
              [0, 0.010, 0],
              [0, -0.010, 0],
              [side * 0.010, 0, 0],
              [0, 0, 0.012],
            ].map((rcsPos, rcsIdx) => (
              <mesh key={`rcs-${rcsIdx}`} position={rcsPos as [number, number, number]}>
                <cylinderGeometry args={[0.002, 0.0035, 0.006, 6]} />
                <primitive object={M.copper} attach="material" />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          D — VENTRAL SUPERSONIC CARET COOLANT INTAKES
          Angled ram scoops feeding internal auxiliary heat exchangers
          ═══════════════════════════════════════════════════════════════════ */}
      {[-1, 1].map((side) => (
        <group key={`intake-${side}`} position={[side * 0.155, -0.068, -0.06]}>
          <mesh castShadow>
            <boxGeometry args={[0.054, 0.038, 0.22]} />
            <primitive object={M.graphite} attach="material" />
          </mesh>
          {/* Titanium Intake Lip */}
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[0.058, 0.040, 0.008]} />
            <primitive object={M.brushedAluminum} attach="material" />
          </mesh>
          {/* Splitter Plate */}
          <mesh position={[side * -0.029, 0.010, 0]}>
            <boxGeometry args={[0.005, 0.046, 0.18]} />
            <primitive object={M.darkSteel} attach="material" />
          </mesh>
          {/* Internal Compression Slats */}
          {[0, 1, 2].map((k) => (
            <mesh key={k} position={[0, -0.008 + k * 0.010, 0.03]}>
              <boxGeometry args={[0.046, 0.002, 0.06]} />
              <primitive object={M.panelLine} attach="material" />
            </mesh>
          ))}
        </group>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          E — REAR PROPULSION BOOSTERS — RIGIDLY LOCKED
          Direct static children of the spacecraft hierarchy.
          NEVER wobble, float, bounce, or detach!
          ═══════════════════════════════════════════════════════════════════ */}
      {/* E0 — Heavy-Duty Aft Thrust Bulkhead & Mounting Gussets */}
      <group position={[0, -0.005, -0.47]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.14, 0.06]} />
          <primitive object={M.darkSteel} attach="material" />
        </mesh>
        {/* Central thrust frame tie rod */}
        <mesh position={[0, 0.0, -0.035]}>
          <boxGeometry args={[0.06, 0.08, 0.015]} />
          <primitive object={M.gunmetal} attach="material" />
        </mesh>
      </group>

      {/* E1 — Twin Primary Deep-Space Engines (Port & Starboard) */}
      {[-1, 1].map((side) => (
        <group key={`main-eng-${side}`} position={[side * 0.11, -0.005, -0.48]}>
          {/* E1.1 — Outer Cylindrical Nacelle Housing */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.060, 0.070, 0.16, 24]} />
            <primitive object={M.engineHousing} attach="material" />
          </mesh>

          {/* E1.2 — Nacelle Heat-Shield Reinforcement Ring */}
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.072, 0.072, 0.022, 24]} />
            <primitive object={M.darkSteel} attach="material" />
          </mesh>

          {/* E1.3 — Hydraulic Gimbal Actuator Links connecting to fuselage */}
          {[-0.045, 0.045].map((gx, gi) => (
            <mesh key={`gimbal-${gi}`} position={[gx, 0.040, -0.02]} rotation={[0.3, 0, 0]}>
              <cylinderGeometry args={[0.004, 0.004, 0.05, 8]} />
              <primitive object={M.copper} attach="material" />
            </mesh>
          ))}

          {/* E1.4 — Convergent-Divergent Titanium Nozzle Bell */}
          <mesh position={[0, 0, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.070, 0.052, 0.075, 24, 1, true]} />
            <primitive object={M.engineNozzle} attach="material" />
          </mesh>

          {/* E1.5 — Segmented Reheat Petal Rim */}
          <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.068, 0.005, 12, 24]} />
            <primitive object={M.engineAmberRing} attach="material" />
          </mesh>

          {/* E1.6 — Internal Turbine Stator Vane Assembly (8 radial vanes) */}
          {[0, 45, 90, 135].map((ang) => (
            <mesh key={`vane-${ang}`} position={[0, 0, -0.05]} rotation={[0, 0, (ang * Math.PI) / 180]}>
              <boxGeometry args={[0.09, 0.003, 0.022]} />
              <primitive object={M.darkSteel} attach="material" />
            </mesh>
          ))}
          {/* Aerodynamic Center Spinner Cone */}
          <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.018, 0.040, 16]} />
            <primitive object={M.copper} attach="material" />
          </mesh>

          {/* E1.7 — Internal Amber Ceramic Throat Ring */}
          <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.050, 0.007, 10, 24]} />
            <primitive object={M.engineAmberRing} attach="material" />
          </mesh>

          {/* E1.8 — Combustion Energy Core (Subtle Warm Amber Disc) */}
          <mesh position={[0, 0, -0.08]}>
            <circleGeometry args={[0.048, 24]} />
            <primitive object={M.boosterCore} attach="material" />
          </mesh>

          {/* E1.9 — Soft Compact Exhaust Plume (Rigid static child, NO group scaling) */}
          <mesh position={[0, 0, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.044, 0.15, 16]} />
            <primitive object={M.boosterGlow} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.062, 0.12, 16]} />
            <primitive object={M.boosterOuterGlow} attach="material" />
          </mesh>
        </group>
      ))}

      {/* E2 — Auxiliary Vector Thrusters (Flanking Outer Nozzles) */}
      {[-1, 1].map((side) => (
        <group key={`aux-thruster-${side}`} position={[side * 0.23, -0.015, -0.46]} scale={[0.58, 0.58, 0.58]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.046, 0.055, 0.10, 18]} />
            <primitive object={M.engineHousing} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.040, 0.055, 18, 1, true]} />
            <primitive object={M.engineNozzle} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.06]}>
            <circleGeometry args={[0.038, 18]} />
            <primitive object={M.boosterCore} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.034, 0.10, 14]} />
            <primitive object={M.boosterGlow} attach="material" />
          </mesh>
        </group>
      ))}

      {/* E3 — Aft Heat Shield Fairing */}
      <mesh position={[0, -0.040, -0.52]} castShadow>
        <boxGeometry args={[0.16, 0.020, 0.06]} />
        <primitive object={M.darkSteel} attach="material" />
      </mesh>

      {/* E4 — Integrated Warm Amber Rear Booster Illumination */}
      <pointLight
        ref={leftBoosterLightRef}
        position={[-0.11, -0.005, -0.56]}
        intensity={1.35}
        distance={1.2}
        color="#f59e0b"
      />
      <pointLight
        ref={rightBoosterLightRef}
        position={[0.11, -0.005, -0.56]}
        intensity={1.35}
        distance={1.2}
        color="#f59e0b"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          F — AVIONICS, SENSORS & MECHANICAL GREEBLES
          Precision aerospace instrumentation
          ═══════════════════════════════════════════════════════════════════ */}
      {/* F1 — Forward Nose Pitot Boom / Sensor Probe */}
      <group position={[0, 0, 0.64]}>
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.002, 0.004, 0.08, 8]} />
          <primitive object={M.darkSteel} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.085]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <primitive object={M.champagne} attach="material" />
        </mesh>
      </group>

      {/* F2 — Forward FLIR Optical Targeting Sensor Dome */}
      <mesh position={[0, -0.022, 0.54]}>
        <sphereGeometry args={[0.016, 14, 14]} />
        <primitive object={M.glass} attach="material" />
      </mesh>
      <mesh position={[0, -0.022, 0.552]}>
        <torusGeometry args={[0.012, 0.003, 8, 16]} />
        <primitive object={M.champagne} attach="material" />
      </mesh>

      {/* F3 — Dorsal Communication Blade Antenna Mast */}
      <group position={[0, 0.110, -0.02]}>
        <mesh>
          <cylinderGeometry args={[0.003, 0.002, 0.08, 6]} />
          <primitive object={M.darkSteel} attach="material" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.004, 8, 8]} />
          <primitive object={M.copper} attach="material" />
        </mesh>
      </group>

      {/* F4 — Belly Reconnaissance Sensor Blister */}
      <mesh position={[0, -0.096, 0.08]}>
        <sphereGeometry args={[0.020, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={M.glass} attach="material" />
      </mesh>

      {/* F5 — Star-Tracker Optical Navigation Ports */}
      {[-0.08, 0.08].map((sx, si) => (
        <group key={`star-tracker-${si}`} position={[sx, 0.095, 0.12]}>
          <mesh rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.008, 12]} />
            <primitive object={M.darkSteel} attach="material" />
          </mesh>
          <mesh position={[0, 0.004, 0]} rotation={[0.4, 0, 0]}>
            <circleGeometry args={[0.005, 12]} />
            <primitive object={M.glass} attach="material" />
          </mesh>
        </group>
      ))}

      {/* F6 — Titanium Flush Fasteners & Structural Rivets */}
      {[
        [-0.10, 0.10, 0.28], [0.10, 0.10, 0.28],
        [-0.12, 0.09, 0.06], [0.12, 0.09, 0.06],
        [-0.13, 0.08, -0.14], [0.13, 0.08, -0.14],
        [-0.12, 0.07, -0.32], [0.12, 0.07, -0.32],
        [-0.09, -0.082, 0.16], [0.09, -0.082, 0.16],
        [-0.09, -0.082, -0.12], [0.09, -0.082, -0.12],
      ].map((pos, i) => (
        <mesh key={`bolt-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.004, 0.004, 0.005, 6]} />
          <primitive object={M.darkSteel} attach="material" />
        </mesh>
      ))}

      {/* F7 — Retractable Landing Gear Bay Doors (Outlined Panels) */}
      {[-0.055, 0.055].map((x, i) => (
        <group key={`lgbay-${i}`} position={[x, -0.090, 0.16]}>
          <mesh>
            <boxGeometry args={[0.050, 0.003, 0.10]} />
            <primitive object={M.graphite} attach="material" />
          </mesh>
          <mesh position={[0, 0.002, 0]}>
            <boxGeometry args={[0.055, 0.001, 0.105]} />
            <primitive object={M.panelLine} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FLIGHT TRAJECTORY KEYFRAME DATASET
// Compact exploration spacecraft — framed at cinematic 3/4 angle in right 35–45%
// ─────────────────────────────────────────────────────────────────────────────

const flightTrajectory = [
  { p: 0.00, x:  1.00, y:  0.00, z:  0.10, rotX:  0.14, rotY: -0.42, rotZ: -0.06, scale: 1.00 }, // Hero (Right 40%)
  { p: 0.16, x: -0.95, y:  0.08, z: -0.15, rotX:  0.12, rotY:  0.85, rotZ: -0.08, scale: 0.95 }, // About (Left)
  { p: 0.32, x:  0.95, y: -0.08, z: -0.20, rotX: -0.08, rotY:  1.85, rotZ:  0.06, scale: 0.98 }, // Experience (Right)
  { p: 0.48, x: -0.90, y:  0.10, z: -0.10, rotX:  0.10, rotY:  2.90, rotZ: -0.08, scale: 0.94 }, // Skills (Left)
  { p: 0.65, x:  0.15, y:  0.12, z:  0.25, rotX:  0.06, rotY:  3.90, rotZ:  0.02, scale: 1.02 }, // Projects (Center-Right)
  { p: 0.82, x:  1.00, y: -0.06, z: -0.15, rotX: -0.06, rotY:  4.85, rotZ:  0.05, scale: 0.96 }, // Achievements (Right)
  { p: 1.00, x:  0.20, y: -0.05, z:  0.15, rotX:  0.04, rotY:  5.80, rotZ:  0.02, scale: 1.00 }, // Contact (Center-Right)
];

function interpolateFlight(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1);

  let idx = 0;
  for (let i = 0; i < flightTrajectory.length - 1; i++) {
    if (clamped >= flightTrajectory[i].p) {
      idx = i;
    }
  }

  const k1 = flightTrajectory[idx];
  const k2 = flightTrajectory[Math.min(idx + 1, flightTrajectory.length - 1)];

  if (k1.p === k2.p) return k1;

  const factor = (clamped - k1.p) / (k2.p - k1.p);
  const t = factor < 0.5 ? 2 * factor * factor : 1 - Math.pow(-2 * factor + 2, 2) / 2;

  return {
    x: THREE.MathUtils.lerp(k1.x, k2.x, t),
    y: THREE.MathUtils.lerp(k1.y, k2.y, t),
    z: THREE.MathUtils.lerp(k1.z, k2.z, t),
    rotX: THREE.MathUtils.lerp(k1.rotX, k2.rotX, t),
    rotY: THREE.MathUtils.lerp(k1.rotY, k2.rotY, t),
    rotZ: THREE.MathUtils.lerp(k1.rotZ, k2.rotZ, t),
    scale: THREE.MathUtils.lerp(k1.scale, k2.scale, t),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCENE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const CinematicWorkspaceScene: React.FC<CinematicWorkspaceSceneProps> = ({
  onSelectObject,
  onUserInteract,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const scrollProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  const screenStateRef = useRef({
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false,
  });

  // Track window scroll progress and screen size without layout thrashing
  useEffect(() => {
    let maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    const updateMetrics = () => {
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const w = window.innerWidth;
      screenStateRef.current = {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isMobile: w < 768,
        isTablet: w < 1024,
      };
    };

    const handleScroll = () => {
      scrollProgressRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    updateMetrics();
    handleScroll();

    window.addEventListener('resize', updateMetrics, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Frame loop: smooth scroll flight scrubbing + micro mouse parallax
  useFrame((state, delta) => {
    if (groupRef.current) {
      const { prefersReducedMotion, isMobile, isTablet } = screenStateRef.current;
      const safeDelta = Math.min(delta, 0.05);

      // Smooth progress interpolation to eliminate micro-steps during scroll
      smoothProgressRef.current = THREE.MathUtils.damp(
        smoothProgressRef.current,
        scrollProgressRef.current,
        6.5,
        safeDelta
      );

      // Mouse micro parallax offsets
      const mouseX = prefersReducedMotion ? 0 : state.pointer.x * (isMobile ? 0.03 : 0.12);
      const mouseY = prefersReducedMotion ? 0 : state.pointer.y * (isMobile ? 0.02 : 0.08);

      // Interpolate flight trajectory target using smoothly scrubbed progress
      const target = interpolateFlight(smoothProgressRef.current);

      // Responsive adjustments
      const mobilePosX = isMobile ? 0 : target.x;
      const mobilePosY = isMobile ? -0.3 : target.y;
      const mobilePosZ = isMobile ? -0.5 : target.z;
      const mobileScale = (isMobile ? 0.55 : (isTablet ? 0.80 : 1.0)) * target.scale;

      const targetRotY = prefersReducedMotion ? mouseX : target.rotY + mouseX;
      const targetRotX = prefersReducedMotion ? -mouseY : target.rotX - mouseY;
      const targetRotZ = prefersReducedMotion ? 0 : target.rotZ + mouseX * 0.3;

      // Framerate-independent dampening scrub (butter-smooth response)
      const dampFactor = 6.0;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, dampFactor, safeDelta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, dampFactor, safeDelta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, dampFactor, safeDelta);

      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, mobilePosX, dampFactor, safeDelta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, mobilePosY, dampFactor, safeDelta);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, mobilePosZ, dampFactor, safeDelta);

      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.damp(currentScale, mobileScale, dampFactor, safeDelta);
      groupRef.current.scale.set(nextScale, nextScale, nextScale);

      // Camera micro dolly
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mouseX * 0.4, dampFactor, safeDelta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, mouseY * 0.4, dampFactor, safeDelta);
    }
  });

  const handleSpaceshipClick = () => {
    onUserInteract?.();
    const count = coffeeCount + 1;
    setCoffeeCount(count);
    if (count >= 3) {
      toast.success('🚀 Quantum Thrusters Engaged! High Performance Mode Active.');
      setCoffeeCount(0);
    } else {
      toast('🚀 Spaceship Quantum Drive Synchronized!', { duration: 1500 });
    }
  };

  return (
    <group ref={groupRef} position={[1.0, 0, 0.1]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          handleSpaceshipClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Main Procedural Compact Hard-Sci-Fi Spacecraft — Rigidly Unified Hierarchy */}
        <ProceduralSpacecraft />
      </group>
    </group>
  );
};
