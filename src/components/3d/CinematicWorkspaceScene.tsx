import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from './InteractiveObject';
import { toast } from 'sonner';

interface CinematicWorkspaceSceneProps {
  onSelectObject: (target: string) => void;
  onUserInteract?: () => void;
}

export const CinematicWorkspaceScene: React.FC<CinematicWorkspaceSceneProps> = ({
  onSelectObject,
  onUserInteract,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('21:06');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Subtle camera parallax tracking
  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.18;
      const mouseY = state.pointer.y * 0.12;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.04);
    }
  });

  const handleCoffeeClick = () => {
    onUserInteract?.();
    const count = coffeeCount + 1;
    setCoffeeCount(count);
    if (count >= 3) {
      toast.success('☕ Developer fuel activated! Good Code, Good Life!');
      setCoffeeCount(0);
    } else {
      toast('☕ Coffee fuel refilling...', { duration: 1500 });
    }
  };

  return (
    <group ref={groupRef} position={[0.2, -0.65, 0]}>
      {/* --- DESK & DESK MAT --- */}
      {/* Wooden Desk Surface */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[7, 0.16, 3.2]} />
        <meshStandardMaterial color="#1a1410" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Front Bevel Trim */}
      <mesh position={[0, -0.01, 1.58]}>
        <boxGeometry args={[7.02, 0.14, 0.04]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} roughness={0.3} />
      </mesh>
      {/* Large Black Desk Mat */}
      <mesh position={[0.4, 0.09, 0.4]} receiveShadow>
        <boxGeometry args={[4.2, 0.01, 1.8]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.7} />
      </mesh>

      {/* --- WARM DESK LAMP & LIGHT (LEFT) --- */}
      <mesh position={[-2.4, 0.5, -0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[-2.2, 0.9, -0.7]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.18, 0.1, 0.25, 32]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} />
      </mesh>

      {/* --- WARM AMBER DESK LIGHT SOURCE --- */}
      <pointLight position={[-2.2, 0.8, -0.7]} intensity={3.5} distance={5} color="#fbbf24" castShadow />

      {/* --- LARGE MONITOR (CENTER RIGHT) → GITHUB --- */}
      <InteractiveObject
        label="GitHub"
        position={[1.1, 1.05, -0.4]}
        rotation={[0, -0.12, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('github');
        }}
      >
        {/* Stand & Base */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.4, -0.05]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.8, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Monitor Screen Glass */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[3.1, 1.7]} />
          <meshBasicMaterial color="#0b0f19" />
        </mesh>

        {/* Photorealistic Monitor OS UI */}
        <Html transform position={[0, 0, 0.05]} distanceFactor={2.0} style={{ width: '460px', height: '250px' }}>
          <div className="w-full h-full bg-[#0b0f19] border border-sky-500/30 rounded-xl p-4 text-white font-sans flex flex-col justify-between shadow-2xl overflow-hidden select-none">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-sky-400 font-mono pl-2">harshit@dev-os</span>
              </div>
              <div className="text-[11px] font-mono font-bold text-amber-400">
                {currentTime} <span className="text-[9px] text-gray-500">Tue, 16 Sep</span>
              </div>
            </div>

            {/* Widget Content */}
            <div className="grid grid-cols-12 gap-3 items-center py-1">
              <div className="col-span-7 bg-slate-900/80 p-3 rounded-xl border border-sky-500/20 space-y-1">
                <h4 className="font-bold text-sm text-sky-300">Good to see you, Harshit 👋</h4>
                <p className="text-[10px] text-gray-400">Java Backend Developer • COER University</p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[9px] font-semibold">
                    Spring Boot
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-semibold">
                    REST APIs
                  </span>
                </div>
              </div>

              <div className="col-span-5 bg-slate-900/80 p-2.5 rounded-xl border border-amber-500/20 space-y-1 text-[10px]">
                <p className="font-bold text-amber-400 text-[9px] uppercase tracking-wider mb-1">Today Checklist</p>
                <p className="text-green-400 flex items-center gap-1">✓ Build something amazing</p>
                <p className="text-green-400 flex items-center gap-1">✓ Push to GitHub</p>
                <p className="text-green-400 flex items-center gap-1">✓ Learn something new</p>
                <p className="text-gray-400 flex items-center gap-1">▢ Stay consistent</p>
              </div>
            </div>

            {/* Dock Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-800/80 text-[10px] text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>GitHub Repository: <strong className="text-sky-400">har0028</strong></span>
              </div>
              <span className="text-xs text-sky-400 font-semibold underline">Click Monitor to Visit</span>
            </div>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- LAPTOP (CENTER LEFT) → PROJECTS --- */}
      <InteractiveObject
        label="Projects"
        position={[-1.3, 0.25, 0.1]}
        rotation={[0, 0.25, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('projects');
        }}
      >
        {/* Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.04, 1.0]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.55, -0.48]} rotation={[-0.22, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.95, 0.03]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Display */}
        <mesh position={[0, 0.55, -0.46]} rotation={[-0.22, 0, 0]}>
          <planeGeometry args={[1.4, 0.88]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <Html transform position={[0, 0.55, -0.45]} rotation={[-0.22, 0, 0]} distanceFactor={2.4}>
          <div className="w-[240px] h-[140px] bg-[#0d1117] p-2.5 rounded-lg border border-sky-500/30 font-mono text-[9px] text-gray-300 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[8px] text-sky-400 border-b border-gray-800 pb-1">
              <span>VSCode — SmartJobPortal.java</span>
              <span className="text-green-400">Spring Boot</span>
            </div>
            <div className="space-y-0.5 text-[8px]">
              <p className="text-purple-400">@RestController</p>
              <p className="text-blue-400">public class <span className="text-yellow-300">JobPortalController</span> &#123;</p>
              <p className="pl-2 text-gray-400">// AI Recommendation Engine</p>
              <p className="pl-2 text-green-400">@GetMapping("/recommendations")</p>
              <p className="pl-2 text-white">public ResponseEntity getJobs() &#123; ... &#125;</p>
              <p className="text-blue-400">&#125;</p>
            </div>
            <div className="text-[8px] text-sky-400 underline font-semibold text-right">Click Laptop for Projects</div>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- MECHANICAL KEYBOARD & MOUSE --- */}
      <mesh position={[0.4, 0.13, 0.8]} castShadow>
        <boxGeometry args={[1.6, 0.05, 0.5]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      {/* Glowing RGB Keycaps */}
      <mesh position={[0.4, 0.16, 0.8]}>
        <boxGeometry args={[1.5, 0.02, 0.44]} />
        <meshStandardMaterial color="#1e1b4b" emissive="#3b82f6" emissiveIntensity={0.25} />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.6, 0.13, 0.8]} castShadow>
        <boxGeometry args={[0.24, 0.08, 0.38]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      <mesh position={[1.6, 0.17, 0.75]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* --- BOOKS STACK (LEFT) → SKILLS --- */}
      <InteractiveObject
        label="Skills"
        position={[-2.3, 0.28, -0.1]}
        rotation={[0, 0.15, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('skills');
        }}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.12, 1.1]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0, 0.12, 0.02]} rotation={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 1.05]} />
          <meshStandardMaterial color="#065f46" />
        </mesh>
        <mesh position={[0, 0.22, -0.02]} rotation={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[0.75, 0.1, 1.0]} />
          <meshStandardMaterial color="#7c2d12" />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.7, 0.09, 0.95]} />
          <meshStandardMaterial color="#4c1d95" />
        </mesh>
        <Html transform position={[0.2, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]} distanceFactor={3.5}>
          <div className="bg-slate-900/90 text-[9px] text-amber-300 font-bold p-1 rounded border border-amber-500/40 select-none">
            Clean Code • Spring Boot • System Design
          </div>
        </Html>
      </InteractiveObject>

      {/* --- SMARTPHONE (CENTER-LEFT STAND) → CONTACT --- */}
      <InteractiveObject
        label="Contact"
        position={[-0.4, 0.28, 0.2]}
        rotation={[-0.2, 0.3, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('contact');
        }}
      >
        {/* Phone Stand */}
        <mesh position={[0, -0.1, -0.05]}>
          <boxGeometry args={[0.2, 0.25, 0.2]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Smartphone Body */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.02, 0.58]} />
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <planeGeometry args={[0.27, 0.54]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
        <Html transform position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} distanceFactor={3}>
          <div className="w-[120px] h-[200px] bg-slate-950 p-2 rounded-lg border border-sky-400/40 text-white flex flex-col justify-between text-[8px]">
            <span className="font-bold text-sky-300">📱 Contact Harshit</span>
            <div className="space-y-1 text-[7px] text-gray-300">
              <p className="font-bold text-amber-300">"Discipline Creates Freedom."</p>
              <p>Email: harshitsati30@gmail.com</p>
              <p>Phone: +91 8755776798</p>
            </div>
            <span className="text-[7px] text-sky-400 font-semibold underline">Click to Reach Out</span>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- OPEN NOTEBOOK / ID CARD → ABOUT --- */}
      <InteractiveObject
        label="About Harshit"
        position={[-0.4, 0.1, 0.9]}
        rotation={[0, 0.1, 0]}
        onClick={() => {
          onUserInteract?.();
          onSelectObject('about');
        }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.02, 0.5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} />
        </mesh>
        <Html transform position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} distanceFactor={3.2}>
          <div className="w-[180px] h-[120px] p-2 bg-white text-slate-900 font-sans text-[8px] flex flex-col justify-between select-none">
            <span className="font-bold text-indigo-700 border-b pb-1">HARSHIT SATTI — ID CARD</span>
            <div className="italic text-slate-600 font-serif text-[9px] text-center">
              "Ideas Build Improve Repeat."
            </div>
            <span className="text-right text-indigo-600 font-bold text-[7px]">COER University CSE</span>
          </div>
        </Html>
      </InteractiveObject>

      {/* --- COFFEE MUG (RIGHT) — EASTER EGG --- */}
      <InteractiveObject
        label="Coffee Mug (Easter Egg)"
        position={[2.4, 0.25, 0.6]}
        onClick={handleCoffeeClick}
      >
        {/* Coaster */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Ceramic Mug Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.15, 0.32, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <Html transform position={[0, 0, 0.19]} distanceFactor={3.5}>
          <div className="bg-slate-950 text-amber-400 font-bold text-[8px] px-1 py-0.5 rounded border border-amber-500/40 select-none">
            Good Code Good Life
          </div>
        </Html>
      </InteractiveObject>

      {/* --- ASTRONAUT / ROBOT (RIGHT ON BOOKS) → ASK HARSHIT AI --- */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <InteractiveObject
          label="Ask Harshit AI"
          position={[2.5, 0.8, -0.3]}
          onClick={() => {
            onUserInteract?.();
            onSelectObject('ai');
          }}
        >
          {/* Astronaut Suit Helmet */}
          <mesh castShadow>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Visor */}
          <mesh position={[0, 0.02, 0.16]}>
            <sphereGeometry args={[0.18, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} emissive="#0284c7" emissiveIntensity={0.4} />
          </mesh>
          {/* Suit Body */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.4, 32]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
        </InteractiveObject>
      </Float>

      {/* --- HEADPHONES & STAND (LEFT BACK) --- */}
      <mesh position={[-2.4, 0.4, 0.6]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* --- DIGITAL LED CLOCK (UNDER MONITOR) --- */}
      <mesh position={[0.2, 0.12, -0.2]} castShadow>
        <boxGeometry args={[0.6, 0.16, 0.2]} />
        <meshStandardMaterial color="#090d16" />
      </mesh>
      <Html transform position={[0.2, 0.12, -0.09]} distanceFactor={3.2}>
        <div className="font-mono font-bold text-amber-400 text-sm tracking-wider bg-black px-2 py-0.5 rounded border border-amber-500/40 select-none">
          {currentTime}
        </div>
      </Html>

      {/* --- POTTED PLANT (LEFT CENTER) --- */}
      <mesh position={[-2.2, 0.22, -0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.12, 0.3, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[-2.2, 0.45, -0.7]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
};
