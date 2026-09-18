import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RobotModelProps {
  isHovered: boolean;
}

// Cached Robot Materials
let cachedRobotMaterials: ReturnType<typeof createRobotMaterials> | null = null;

function createRobotMaterials() {
  return {
    // 1. White/silver pearlescent ceramic hull
    whiteChassis: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#dce6f2'),
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
    }),
    // 2. Dark graphite mechanical frame
    graphiteMetal: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#151b24'),
      metalness: 0.92,
      roughness: 0.32,
      clearcoat: 0.3,
    }),
    // 3. Brushed titanium accents & pylons
    titanium: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#475569'),
      metalness: 0.95,
      roughness: 0.20,
    }),
    // 4. Glossy sensor visor faceplate
    sensorVisor: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#060910'),
      metalness: 0.90,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    }),
    // 5. Glowing cyan sensor / visor slit
    cyanGlow: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38bdf8'),
    }),
    // 6. Thruster core exhaust glow
    hoverCoreGlow: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00e5ff'),
      transparent: true,
      opacity: 0.85,
    }),
  };
}

function getRobotMaterials() {
  if (!cachedRobotMaterials) {
    cachedRobotMaterials = createRobotMaterials();
  }
  return cachedRobotMaterials;
}

const RobotModel: React.FC<RobotModelProps> = ({ isHovered }) => {
  const robotGroupRef = useRef<THREE.Group>(null);
  const leftHoverGlowRef = useRef<THREE.Mesh>(null);
  const rightHoverGlowRef = useRef<THREE.Mesh>(null);
  const eyeGlowRef = useRef<THREE.Mesh>(null);

  // Aerospace PBR Materials
  const materials = useMemo(() => getRobotMaterials(), []);

  // Frame animation: smooth hovering, micro bank, and subtle mouse interaction
  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.05);

    // Subtle sinusoidal vertical hover (butter smooth)
    const hoverY = Math.sin(time * 2.0) * 0.09;
    const hoverRotZ = Math.cos(time * 1.2) * 0.04;
    const hoverRotY = Math.sin(time * 0.8) * 0.10;
    const hoverRotX = Math.sin(time * 1.5) * 0.03;

    // Pointer influence (subtly tilts toward cursor when hovered)
    const targetRotX = hoverRotX - state.pointer.y * 0.25;
    const targetRotY = hoverRotY + state.pointer.x * 0.35;

    robotGroupRef.current.position.y = THREE.MathUtils.damp(robotGroupRef.current.position.y, hoverY, 6.0, clampedDelta);
    robotGroupRef.current.rotation.x = THREE.MathUtils.damp(robotGroupRef.current.rotation.x, targetRotX, 5.0, clampedDelta);
    robotGroupRef.current.rotation.y = THREE.MathUtils.damp(robotGroupRef.current.rotation.y, targetRotY, 5.0, clampedDelta);
    robotGroupRef.current.rotation.z = THREE.MathUtils.damp(robotGroupRef.current.rotation.z, hoverRotZ, 5.0, clampedDelta);

    // Thruster pulse
    const pulse = 0.8 + Math.sin(time * 8.0) * 0.2;
    if (leftHoverGlowRef.current && rightHoverGlowRef.current) {
      leftHoverGlowRef.current.scale.set(pulse, pulse, pulse);
      rightHoverGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={robotGroupRef} scale={isHovered ? 1.08 : 1.0}>
      {/* ── Central Aerodynamic Chassis ── */}
      <mesh material={materials.whiteChassis} castShadow receiveShadow>
        <sphereGeometry args={[0.78, 32, 32]} />
      </mesh>

      {/* ── Dark Graphite Equatorial Seam Ring ── */}
      <mesh material={materials.graphiteMetal} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.80, 0.80, 0.12, 32]} />
      </mesh>

      {/* ── Front Sensor Visor ── */}
      <mesh material={materials.sensorVisor} position={[0, 0.12, 0.62]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.72, 0.28, 0.24]} />
      </mesh>

      {/* ── Glowing Cyan Visor Eyes / Sensor Slit ── */}
      <mesh ref={eyeGlowRef} material={materials.cyanGlow} position={[0, 0.13, 0.74]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.54, 0.07, 0.05]} />
      </mesh>

      {/* ── Top Sensor Antenna & Beacon ── */}
      <mesh material={materials.titanium} position={[0, 0.90, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.25, 16]} />
      </mesh>
      <mesh material={materials.cyanGlow} position={[0, 1.04, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
      </mesh>

      {/* ── Left Hover Engine / Thruster Pod ── */}
      <group position={[-1.02, -0.05, 0]}>
        {/* Connecting strut pylon */}
        <mesh material={materials.titanium} position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.44, 16]} />
        </mesh>
        {/* Thruster nacelle shell */}
        <mesh material={materials.graphiteMetal}>
          <cylinderGeometry args={[0.22, 0.20, 0.58, 24]} />
        </mesh>
        {/* Accent ring */}
        <mesh material={materials.whiteChassis} position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.08, 24]} />
        </mesh>
        {/* Exhaust nozzle */}
        <mesh material={materials.titanium} position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.16, 0.12, 0.14, 24]} />
        </mesh>
        {/* Hover flame / energy glow */}
        <mesh ref={leftHoverGlowRef} material={materials.hoverCoreGlow} position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.15, 24]} />
        </mesh>
      </group>

      {/* ── Right Hover Engine / Thruster Pod ── */}
      <group position={[1.02, -0.05, 0]}>
        {/* Connecting strut pylon */}
        <mesh material={materials.titanium} position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.44, 16]} />
        </mesh>
        {/* Thruster nacelle shell */}
        <mesh material={materials.graphiteMetal}>
          <cylinderGeometry args={[0.22, 0.20, 0.58, 24]} />
        </mesh>
        {/* Accent ring */}
        <mesh material={materials.whiteChassis} position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.08, 24]} />
        </mesh>
        {/* Exhaust nozzle */}
        <mesh material={materials.titanium} position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.16, 0.12, 0.14, 24]} />
        </mesh>
        {/* Hover flame / energy glow */}
        <mesh ref={rightHoverGlowRef} material={materials.hoverCoreGlow} position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.15, 24]} />
        </mesh>
      </group>
    </group>
  );
};

interface FlyingAssistantRobotProps {
  onClick: () => void;
  isChatOpen: boolean;
}

export const FlyingAssistantRobot: React.FC<FlyingAssistantRobotProps> = ({ onClick, isChatOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (isChatOpen) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center group cursor-pointer select-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Harshit AI Assistant • Click to chat"
      aria-label="Harshit AI Assistant"
      role="button"
    >
      {/* Sleek contextual badge/tooltip on hover */}
      <div
        className={`hidden sm:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-sky-500/40 text-xs font-medium text-foreground shadow-2xl transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span className="font-heading font-semibold text-sky-400">AI Assistant</span>
        <span className="text-slate-400">• Click to talk</span>
      </div>

      {/* 3D Robot Canvas container */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-transform duration-300 group-hover:scale-105">
        {/* Ambient background aura glow */}
        <div className="absolute inset-2 rounded-full bg-sky-500/10 blur-xl group-hover:bg-sky-500/25 transition-colors" />

        {isMounted && (
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
            camera={{ position: [0, 0, 3.2], fov: 42 }}
            className="w-full h-full pointer-events-none"
          >
            {/* Studio Lights for 3D robot */}
            <ambientLight intensity={0.8} color="#e0f2fe" />
            <directionalLight position={[2, 3, 3]} intensity={2.8} color="#ffffff" />
            <directionalLight position={[-2, -1, 1]} intensity={1.2} color="#38bdf8" />
            <pointLight position={[0, -1, 0]} intensity={1.5} color="#00e5ff" distance={2} />

            <RobotModel isHovered={isHovered} />
          </Canvas>
        )}
      </div>
    </div>
  );
};
