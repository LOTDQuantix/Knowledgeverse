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
  onClick?: () => void;
}

export default function NodeMesh({ position, color, size = 1, label, opacity = 1, onClick }: NodeMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [initialScale, setInitialScale] = useState(0);

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
        // @ts-expect-error - material might not have opacity property depending on type
        meshRef.current.material.opacity = meshRef.current.material.opacity + (opacity - meshRef.current.material.opacity) * 0.1;
      }
    }
  });

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
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={opacity}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {label && (hovered || opacity > 0.5) && (
        <Html distanceFactor={100} position={[0, size + 2, 0]} center pointerEvents="none">
          <div className="bg-black/50 border border-white/20 backdrop-blur-md px-3 py-1 rounded text-white text-xs whitespace-nowrap opacity-100 transition-opacity pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
