import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveObjectProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  glowColor?: string;
}

export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  children,
  label,
  onClick,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  glowColor = '#6366f1',
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle float & scale interpolation on hover
      const targetScale = hovered ? 1.08 : 1.0;
      meshRef.current.scale.lerp(
        new THREE.Vector3(scale[0] * targetScale, scale[1] * targetScale, scale[2] * targetScale),
        delta * 8
      );
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}

      {/* Tooltip on Hover */}
      {hovered && (
        <Html position={[0, 0.8, 0]} center distanceFactor={10}>
          <div className="px-3 py-1.5 rounded-xl bg-card/90 text-foreground border border-primary/40 shadow-xl text-xs font-heading font-semibold tracking-wide whitespace-nowrap backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};
