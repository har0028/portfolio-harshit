import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from './InteractiveObject';
import { toast } from 'sonner';

interface WorkspaceSceneProps {
  onSelectObject: (target: string) => void;
  onUserInteract?: () => void;
}

export const WorkspaceScene: React.FC<WorkspaceSceneProps> = ({ onSelectObject, onUserInteract }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [coffeeClickCount, setCoffeeClickCount] = useState(0);

  // Terminal screen animation text state
  const [terminalLine, setTerminalLine] = useState(0);
  const terminalLines = [
    'harshit@dev:~$ whoami',
    'Java Backend Developer',
    'harshit@dev:~$ skills',
    'Java • Spring Boot • REST APIs • MySQL • React',
    'harshit@dev:~$ status',
    'Ready for Backend / Software Engineer Roles ✓',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLine((prev) => (prev + 1) % terminalLines.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [terminalLines.length]);

  // Gentle camera parallax tracking
  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.2;
      const mouseY = state.pointer.y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
    }
  });

  const handleCoffeeClick = () => {
    onUserInteract?.();
    const newCount = coffeeClickCount + 1;
    setCoffeeClickCount(newCount);
    if (newCount >= 3) {
      toast.success('☕ Developer fuel activated! Harshit is now operating at 200% efficiency!');
      setCoffeeClickCount(0);
    } else {
      toast('☕ Drinking coffee... Click again for extra fuel!', { duration: 1500 });
    }
  };

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Floating Particles in Environment */}
      <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.6} color="#6366f1" />

      {/* --- DESK STRUCTURE --- */}
      {/* Tabletop */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.15, 3]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Metal Trim */}
      <mesh position={[0, 0.08, 1.48]}>
        <boxGeometry args={[6, 0.02, 0.04]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      {/* Desk Legs */}
      <mesh position={[-2.8, -1.5, -1.2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#111116" metalness={0.9} />
      </mesh>
      <mesh position={[2.8, -1.5, -1.2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#111116" metalness={0.9} />
      </mesh>
      <mesh position={[-2.8, -1.5, 1.2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#111116" metalness={0.9} />
      </mesh>
      <mesh position={[2.8, -1.5, 1.2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#111116" metalness={0.9} />
      </mesh>

      {/* --- MONITOR (CENTER) → GITHUB --- */}
      <InteractiveObject
        label="GitHub"
        position={[0, 1.1, -0.6]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('github');
        }}
      >
        {/* Monitor Base */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.05, 32]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.8} />
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.8} />
        </mesh>
        {/* Monitor Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.5, 0.08]} />
          <meshStandardMaterial color="#121216" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Monitor Screen displaying animated terminal */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.5, 1.4]} />
          <meshBasicMaterial color="#080810" />
        </mesh>

        {/* Live Terminal Screen Overlay */}
        <Html transform position={[0, 0, 0.05]} distanceFactor={2.2} style={{ width: '360px', height: '200px' }}>
          <div className="w-full h-full bg-[#0a0b10] border border-primary/40 rounded-lg p-3 font-mono text-[11px] text-green-400 shadow-2xl flex flex-col justify-between overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[9px] text-gray-400">harshit@backend-dev ~ </span>
            </div>
            <div className="space-y-1 leading-snug">
              <p className="text-gray-400">$ cat profile.json</p>
              <p className="text-primary font-semibold">{terminalLines[0]}</p>
              <p className="text-white">{terminalLines[1]}</p>
              <p className="text-primary font-semibold">{terminalLines[(terminalLine + 2) % terminalLines.length]}</p>
              <p className="text-green-300 animate-pulse">{terminalLines[(terminalLine + 3) % terminalLines.length]}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1 border-t border-gray-900">
              <span>Click monitor to visit GitHub</span>
              <span className="text-primary font-bold">github.com/har0028</span>
            </div>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- LAPTOP (LEFT) → PROJECTS --- */}
      <InteractiveObject
        label="Projects"
        position={[-1.6, 0.15, 0.3]}
        rotation={[0, 0.3, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('projects');
        }}
      >
        {/* Laptop Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.04, 0.9]} />
          <meshStandardMaterial color="#2d2d35" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Laptop Keyboard surface */}
        <mesh position={[0, 0.025, 0.1]}>
          <boxGeometry args={[1.1, 0.01, 0.5]} />
          <meshStandardMaterial color="#1a1a20" />
        </mesh>
        {/* Laptop Screen */}
        <mesh position={[0, 0.45, -0.42]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.3, 0.8, 0.03]} />
          <meshStandardMaterial color="#121216" metalness={0.9} />
        </mesh>
        {/* Laptop Screen Display */}
        <mesh position={[0, 0.45, -0.4]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.2, 0.72]} />
          <meshBasicMaterial color="#1e1b4b" />
        </mesh>
        <Html transform position={[0, 0.45, -0.39]} rotation={[-0.2, 0, 0]} distanceFactor={3}>
          <div className="w-[200px] h-[120px] bg-gradient-to-br from-indigo-950 to-slate-950 p-2 rounded text-[10px] text-white flex flex-col justify-between border border-indigo-500/30">
            <span className="font-bold text-indigo-400">🚀 Projects Workspace</span>
            <div className="text-[9px] text-gray-300">
              <p>• SmartJobPortal AI</p>
              <p>• Secure Exam System</p>
            </div>
            <span className="text-[8px] text-indigo-300 underline font-semibold">Click to Explore Projects</span>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- MECHANICAL KEYBOARD & MOUSE --- */}
      <mesh position={[0, 0.12, 0.7]} castShadow>
        <boxGeometry args={[1.4, 0.04, 0.45]} />
        <meshStandardMaterial color="#1c1c22" roughness={0.4} />
      </mesh>
      {/* Keycaps */}
      <mesh position={[0, 0.15, 0.7]}>
        <boxGeometry args={[1.3, 0.02, 0.38]} />
        <meshStandardMaterial color="#312e81" roughness={0.2} emissive="#312e81" emissiveIntensity={0.2} />
      </mesh>
      {/* Mouse */}
      <mesh position={[1.1, 0.12, 0.7]} castShadow>
        <boxGeometry args={[0.22, 0.08, 0.35]} />
        <meshStandardMaterial color="#22222a" metalness={0.7} />
      </mesh>

      {/* --- BOOKS (RIGHT BACK) → SKILLS --- */}
      <InteractiveObject
        label="Skills"
        position={[1.8, 0.3, -0.4]}
        rotation={[0, -0.2, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('skills');
        }}
      >
        {/* Stack of Technical Books */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 0.9]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0, 0.12, 0.05]} rotation={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.65, 0.1, 0.85]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, 0.22, -0.02]} rotation={[0, -0.08, 0]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.8]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
      </InteractiveObject>

      {/* --- SMARTPHONE (RIGHT FRONT) → CONTACT --- */}
      <InteractiveObject
        label="Contact"
        position={[1.5, 0.12, 0.6]}
        rotation={[-0.1, -0.4, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('contact');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.02, 0.55]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <planeGeometry args={[0.25, 0.5]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </InteractiveObject>

      {/* --- DEVELOPER ID CARD (LEFT FRONT) → ABOUT --- */}
      <InteractiveObject
        label="About Harshit"
        position={[-0.9, 0.1, 0.8]}
        rotation={[0, 0.2, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('about');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.01, 0.3]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0.008, 0]}>
          <planeGeometry args={[0.42, 0.27]} />
          <meshBasicMaterial color="#6366f1" />
        </mesh>
      </InteractiveObject>

      {/* --- ROBOT (FLOATING TOP RIGHT) → ASK HARSHIT AI --- */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <InteractiveObject
          label="Ask Harshit AI"
          position={[2.2, 1.4, 0.2]}
          onClick={() => {
            onUserInteract?.();
            onSelectObject('ai');
          }}
        >
          {/* Robot Head */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.35, 0.35]} />
            <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Robot Eyes (Glowing) */}
          <mesh position={[-0.09, 0.04, 0.18]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.09, 0.04, 0.18]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Robot Antenna */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0, 0.29, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </InteractiveObject>
      </Float>

      {/* --- COFFEE CUP (EASTER EGG) --- */}
      <InteractiveObject
        label="Coffee Cup (Easter Egg)"
        position={[-1.2, 0.22, -0.4]}
        onClick={handleCoffeeClick}
      >
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Hot Coffee Liquid */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 32]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
      </InteractiveObject>

      {/* --- DESK LAMP & PLANT --- */}
      {/* Desk Lamp */}
      <mesh position={[-2.3, 0.6, -0.8]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[-2.1, 1.1, -0.7]} rotation={[0, 0, -0.4]}>
        <coneGeometry args={[0.2, 0.3, 32]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[-2.1, 1.0, -0.7]} intensity={2.5} distance={4} color="#a5b4fc" />

      {/* Plant */}
      <mesh position={[2.4, 0.25, -0.8]}>
        <cylinderGeometry args={[0.18, 0.12, 0.3, 32]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[2.4, 0.45, -0.8]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
    </group>
  );
};
