import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export const MilkyWayBackground: React.FC = () => {
  const galaxyRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Generate realistic dense starfield & galactic core particles
  const [galaxyPositions, galaxyColors] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorCore = new THREE.Color('#38bdf8'); // Cool blue
    const colorDust = new THREE.Color('#f59e0b'); // Warm amber dust
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Create galactic arch curve
      const u = Math.random();
      const radius = 15 + Math.random() * 25;
      const angle = (u - 0.5) * Math.PI * 1.2;

      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      const y = Math.sin(angle) * radius * 0.5 + 4 + (Math.random() - 0.5) * 4;
      const z = -15 - Math.random() * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color distribution: core warm amber, edges cool blue/white
      let mixedColor = colorWhite;
      const mixRatio = Math.random();
      if (mixRatio < 0.4) {
        mixedColor = colorCore;
      } else if (mixRatio < 0.7) {
        mixedColor = colorDust;
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* Deep Space Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

      {/* Galactic Arch Dust & Nebula Stars */}
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[galaxyPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[galaxyColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Earth Horizon Curvature Light (Right Side) */}
      <mesh position={[12, -4, -18]} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[14, 64, 64]} />
        <meshBasicMaterial color="#0284c7" wireframe={false} transparent opacity={0.35} />
      </mesh>

      <mesh position={[12, -4, -17.9]} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[14.1, 64, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};
