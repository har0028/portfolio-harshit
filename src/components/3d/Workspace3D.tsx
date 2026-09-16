import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { CinematicWorkspaceScene } from './CinematicWorkspaceScene';
import { MilkyWayBackground } from './MilkyWayBackground';
import { WebGLFallback } from './WebGLFallback';

interface Workspace3DProps {
  onSelectObject: (target: string) => void;
  onUserInteract?: () => void;
}

export const Workspace3D: React.FC<Workspace3DProps> = ({ onSelectObject, onUserInteract }) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback onSelectObject={onSelectObject} />;
  }

  return (
    <div className="w-full h-[550px] sm:h-[650px] md:h-[720px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-sky-500/20 shadow-2xl bg-[#060813]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 2.1, 5.2]} fov={48} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 4.5}
          maxAzimuthAngle={Math.PI / 3.5}
          minAzimuthAngle={-Math.PI / 3.5}
          rotateSpeed={0.4}
        />

        {/* Realistic Milky Way & Space Environment */}
        <MilkyWayBackground />

        {/* Balanced Dual Lighting Scheme: Warm Amber + Cool Space Blue */}
        <ambientLight intensity={0.4} />

        {/* Warm Desk Amber Key Light (Left) */}
        <directionalLight
          position={[-4, 6, 4]}
          intensity={1.8}
          color="#fbbf24"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Cool Blue Space Light (Right) */}
        <directionalLight position={[6, 4, 3]} intensity={1.2} color="#38bdf8" />

        {/* Soft Blue Rim Light */}
        <pointLight position={[0, 4, -4]} intensity={2.2} color="#0284c7" />

        {/* Cinematic Workspace 3D Scene */}
        <CinematicWorkspaceScene onSelectObject={onSelectObject} onUserInteract={onUserInteract} />
      </Canvas>
    </div>
  );
};
