import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { CinematicWorkspaceScene } from './CinematicWorkspaceScene';
import { MilkyWayBackground } from './MilkyWayBackground';
import { WebGLFallback } from './WebGLFallback';

interface Workspace3DProps {
  onSelectObject: (target: string) => void;
  onUserInteract?: () => void;
}

export const Workspace3D: React.FC<Workspace3DProps> = ({ onSelectObject, onUserInteract }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Lightweight WebGL check without allocating and destroying a heavy throwaway WebGL context
    if (typeof window !== 'undefined' && !window.WebGLRenderingContext) {
      setHasWebGL(false);
      return;
    }
    // Defer 3D Canvas initialization by one animation frame so HTML/CSS DOM paints instantly
    const handle = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback onSelectObject={onSelectObject} />;
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#050713] pointer-events-none">
      {isReady && (
        <Canvas
          dpr={[1, 1.5]}
          eventSource={typeof document !== 'undefined' ? document.body : undefined}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          className="w-full h-full"
        >
          <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={40} />

          {/* Deep Space Background */}
          <MilkyWayBackground />

          {/* ───────────────────────────────────────────────────────────── */}
          {/* CINEMATIC LIGHTING — tuned for multi-metallic spacecraft */}
          {/* ───────────────────────────────────────────────────────────── */}

          {/* Soft cool blue ambient starlight fill */}
          <ambientLight intensity={0.30} color="#0f172a" />

          {/* 1. Primary Key Light — crisp stellar radiance from upper-left */}
          <directionalLight
            position={[-5, 7, 6]}
            intensity={4.2}
            color="#f8fafc"
          />

          {/* 2. Secondary Fill — distant starlight fill from opposite side */}
          <directionalLight
            position={[6, 4, 4]}
            intensity={1.6}
            color="#94a3b8"
          />

          {/* 3. Cool Blue/Cyan Rim Light — backlighting defines silhouette edges */}
          <pointLight position={[5, 5, -5]} intensity={4.6} color="#38bdf8" />

          {/* 4. Subtle Cyan Reflected Underside — cosmic nebula bounce light */}
          <directionalLight position={[3, -4, 3]} intensity={1.4} color="#0284c7" />

          {/* 5. Distant Amber Star Accent — complementary warmth */}
          <pointLight position={[-4, -2, -4]} intensity={1.6} color="#f59e0b" />

          <Suspense fallback={null}>
            {/* Environment map inside Suspense so starfield and scene render immediately */}
            <Environment preset="city" environmentIntensity={1.6} />
            <CinematicWorkspaceScene onSelectObject={onSelectObject} onUserInteract={onUserInteract} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
