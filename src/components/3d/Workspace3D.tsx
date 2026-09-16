import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { WorkspaceScene } from './WorkspaceScene';
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
    <div className="w-full h-[500px] sm:h-[600px] md:h-[650px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 2.2, 5.2]} fov={50} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          rotateSpeed={0.5}
        />

        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.6} />
        {/* Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Fill Light */}
        <directionalLight position={[-5, 4, 3]} intensity={0.8} color="#818cf8" />
        {/* Rim Light */}
        <pointLight position={[0, 4, -4]} intensity={2} color="#6366f1" />

        {/* Workspace 3D Scene */}
        <WorkspaceScene onSelectObject={onSelectObject} onUserInteract={onUserInteract} />
      </Canvas>
    </div>
  );
};
