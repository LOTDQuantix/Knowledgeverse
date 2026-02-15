"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Html } from "@react-three/drei";

interface NodeMeshProps {
  position: [number, number, number];
  color: string;
  size?: number;
  label?: string;
  opacity?: number;
  difficulty?: number;
  progress?: number;
  completed?: boolean;
  githubStats?: {
    stars: number;
    forks: number;
    lastCommitDate: string;
  };
  onClick?: () => void;
}

export default function NodeMesh({
  position,
  color,
  size = 1,
  label,
  opacity = 1,
  difficulty = 1,
  progress = 0,
  completed = false,
  githubStats,
  onClick
}: NodeMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [initialScale, setInitialScale] = useState(0);

  // Difficulty-based size modifier (1.0 to 1.5)
  const difficultyModifier = 1 + (Math.max(1, Math.min(5, difficulty)) - 1) * 0.125;
  const finalSize = size * difficultyModifier;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;

      // Entrance scale-up
      if (initialScale < 1) {
        setInitialScale((prev) => Math.min(1, prev + delta * 1.5));
      }

      const hoverScale = hovered ? 1.2 : 1;
      const targetScale = initialScale * hoverScale;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);

      if (meshRef.current.material) {
        // @ts-ignore
        meshRef.current.material.opacity = meshRef.current.material.opacity + (opacity - meshRef.current.material.opacity) * 0.1;
      }
    }
  });

  // emissiveIntensity: 0.2 (0%) to 1.0 (100%)
  const baseEmissiveIntensity = 0.2 + (progress / 100) * 0.6;
  const finalEmissiveIntensity = completed ? 1.2 : baseEmissiveIntensity;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[finalSize, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={opacity}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : finalEmissiveIntensity}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Completion Halo Ring */}
      {completed && opacity > 0.5 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[finalSize + 0.5, finalSize + 0.7, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.4 * opacity} side={2} />
        </mesh>
      )}

      {label && (hovered || opacity > 0.5) && (
        <Html distanceFactor={100} position={[0, finalSize + 2, 0]} center pointerEvents="none">
          <div className="bg-black/50 border border-white/20 backdrop-blur-md px-3 py-1 rounded text-white text-xs whitespace-nowrap opacity-100 transition-opacity pointer-events-none flex flex-col items-center gap-1">
            <span className="font-semibold">{label}</span>
            
            {githubStats && (
              <div className="flex items-center gap-3 text-[10px] text-white/80 py-1 border-t border-white/10 mt-1 w-full justify-center">
                <span className="flex items-center gap-1">⭐ {githubStats.stars}</span>
                <span className="flex items-center gap-1">🍴 {githubStats.forks}</span>
                <span className="flex items-center gap-1 opacity-60">🕒 {new Date(githubStats.lastCommitDate).toLocaleDateString()}</span>
              </div>
            )}

            {progress > 0 && !completed && (
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/60" style={{ width: `${progress}%` }} />
              </div>
            )}
            {completed && <span className="text-[10px] text-green-400">Completed Mastery</span>}
          </div>
        </Html>
      )}
    </group>
  );
}
