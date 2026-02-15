"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface CameraControllerProps {
  targetPosition: [number, number, number] | null;
  reset?: boolean;
  targetSize?: number;
}

export default function CameraController({ targetPosition, reset, targetSize = 5 }: CameraControllerProps) {
  const { camera, controls } = useThree();
  const orbitControls = controls as OrbitControlsImpl;

  useEffect(() => {
    if (targetPosition && orbitControls) {
      const target = new Vector3(...targetPosition);

      // Calculate camera target position (offset slightly back)
      // Base distance 15 + 3x node size for comfortable view
      const distance = 15 + (targetSize * 3);
      const direction = camera.position.clone().sub(target).normalize();
      const cameraTargetPos = target.clone().add(direction.multiplyScalar(distance));

      // Animate Camera Position
      gsap.to(camera.position, {
        x: cameraTargetPos.x,
        y: cameraTargetPos.y,
        z: cameraTargetPos.z,
        duration: 1.5,
        ease: "back.out(1.2)", // Subtle overshoot
      });

      // Animate OrbitControls Target
      gsap.to(orbitControls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => orbitControls.update(),
      });
    } else if (reset && orbitControls) {
      // Return to home
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 100,
        duration: 2,
        ease: "power3.inOut"
      });
      gsap.to(orbitControls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: () => orbitControls.update()
      });
    }
  }, [targetPosition, reset, camera, orbitControls, targetSize]);

  return null;
}
