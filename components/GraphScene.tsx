"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import NodeMesh from "./NodeMesh";
import CameraController from "./CameraController";
import UniverseSelector from "./UniverseSelector";
import { getChildPosition } from "@/lib/spatialMath";
import { KnowledgeNode } from "@/types";
import { useTheme } from "@/lib/ThemeContext";
import { useProgress } from "@/lib/useProgress";
import InteractivePanel from "./InteractivePanel";

interface GraphSceneProps {
  data: KnowledgeNode | null;
}

export default function GraphScene({ data }: GraphSceneProps) {
  const { mode, config, activeUniverse, setUniverse } = useTheme();
  const { progressMap, updateProgress, isPrerequisiteMet } = useProgress();
  const [ready, setReady] = useState(false);
  const [activeInteractiveNode, setActiveInteractiveNode] = useState<KnowledgeNode | null>(null);

  // Persistent memory for each universe
  const [universeStates, setUniverseStates] = useState<Record<string, { path: string[], cameraTarget: [number, number, number] | null }>>({
    knowledgeverse: { path: [], cameraTarget: null },
    profileverse: { path: [], cameraTarget: null },
  });

  const { path, cameraTarget } = universeStates[activeUniverse] || { path: [], cameraTarget: null };

  // Universe Entry Transition
  useEffect(() => {
    if (activeUniverse !== 'lobby') {
      setReady(false);
      const timer = setTimeout(() => setReady(true), 1500); // Wait for fly-in
      return () => clearTimeout(timer);
    }
  }, [activeUniverse]);

  const handleNodeClick = (node: KnowledgeNode, position: [number, number, number]) => {

    setUniverseStates((prev) => {
      const currentState = prev[activeUniverse] || { path: [], cameraTarget: null };
      const currentPath = currentState.path;
      const index = currentPath.indexOf(node.id);
      let newPath: string[];
      if (index !== -1) {
        newPath = currentPath.slice(0, index + 1);
      } else {
        newPath = [...currentPath, node.id];
      }
      return {
        ...prev,
        [activeUniverse]: { path: newPath, cameraTarget: position }
      };
    });
  };

  const setPath = (newPath: string[]) => {
    setUniverseStates(prev => ({
      ...prev,
      [activeUniverse]: { ...prev[activeUniverse], path: newPath }
    }));
  };

  /**
   * Component for rotating groups to implement Orbital Drift
   */
  const FloatingGroup = ({ children, speed = 0.1, depth }: { children: React.ReactNode, speed?: number, depth: number }) => {
    const groupRef = useRef<Group>(null);
    useFrame((state, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * speed * (1 / (depth + 1));
      }
    });
    return <group ref={groupRef}>{children}</group>;
  };

  const renderTree = (node: KnowledgeNode, parentPos: [number, number, number] = [0, 0, 0], depth: number = 0, parentId: string | null = null) => {
    if (!node) return [];
    const isRoot = depth === 0;
    const children = node.children || [];
    const elements: React.ReactNode[] = [];

    if (depth <= path.length + 1) {
      let size = 1;
      switch (node.type) {
        case "domain": size = 3; break;
        case "topic": size = 2; break;
        case "subtopic": size = 1; break;
        case "blog": size = 0.5; break;
        case "concept": size = 0.8; break;
        case "interactive": size = 1.2; break;
        case "project": size = 1.5; break;
      }
      if (isRoot) size = 5;

      let opacity = 1;
      if (path.length > 0) {
        const isInPath = path.includes(node.id);
        const activeNodeId = path[path.length - 1];
        if (!isInPath && depth <= path.length && parentId !== activeNodeId) {
          opacity = 0.2;
        }
      }

      const nodeProgress = progressMap[node.id] || { progress: node.progress || 0, completed: node.completed || false };
      const isLocked = !isPrerequisiteMet(node.prerequisites);
      const isTracked = !!node.track; // In future, this could be filtered by an "Active Track" state

      elements.push(
        <NodeMesh
          key={node.id}
          position={parentPos}
          color={config.primaryNodeColor}
          size={size}
          label={node.label}
          opacity={opacity}
          difficulty={node.difficulty}
          progress={nodeProgress.progress}
          completed={nodeProgress.completed}
          isLocked={isLocked}
          isTracked={isTracked}
          onActivate={node.type === 'interactive' || node.contentType === 'quiz' || node.type === 'concept' ? () => setActiveInteractiveNode(node) : undefined}
          onClick={() => handleNodeClick(node, parentPos)}
        />
      );

      if (ready && (isRoot || path.includes(node.id))) {
        const childElements: React.ReactNode[] = [];
        children.forEach((child, index) => {
          const childRadius = depth === 0 ? 40 : 15 / depth;
          const childPos = getChildPosition(parentPos, index, children.length, childRadius);

          if (opacity > 0.5) {
            childElements.push(
              <Line
                key={`line-${child.id}`}
                points={[parentPos, childPos]}
                color={config.primaryNodeColor}
                lineWidth={0.5}
                transparent
                opacity={0.3}
              />
            );
          }

          childElements.push(...renderTree(child, childPos, depth + 1, node.id));
        });

        elements.push(
          <FloatingGroup key={`group-${node.id}`} depth={depth} speed={0.05}>
            {childElements}
          </FloatingGroup>
        );
      }
    }

    return elements;
  };

  const graphElements = useMemo(() => {
    if (!data) return null;
    return renderTree(data);
  }, [data, path, config.primaryNodeColor, ready, progressMap]);

  const activeNodeSize = useMemo(() => {
    if (path.length === 0) return 5;
    const depth = path.length;
    if (depth === 1) return 3;
    if (depth === 2) return 2;
    return 1;
  }, [path]);

  return (
    <div className={`w-full h-screen transition-all duration-700 ${activeInteractiveNode ? 'scale-[0.98]' : 'scale-100'}`}>
      <Canvas 
        camera={{ position: [0, 0, 100], fov: 60 }}
        style={{ filter: activeInteractiveNode ? 'blur(10px)' : 'none' }}
        className="transition-all duration-700"
      >
        <color attach="background" args={[config.background]} />
        <fog attach="fog" args={[config.background, 10, 150 + path.length * 20]} />
        <ambientLight intensity={config.ambientLightIntensity} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={null}>
          {mode === "night" && (
            <Stars
              radius={300}
              depth={50}
              count={(config as any).starCount || 5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}
          <OrbitControls 
            makeDefault 
            enablePan={!activeInteractiveNode} 
            enableZoom={!activeInteractiveNode} 
            enableRotate={!activeInteractiveNode} 
          />

          <CameraController
            targetPosition={cameraTarget}
            reset={path.length === 0 && activeUniverse !== 'lobby'}
            targetSize={activeNodeSize}
          />

          {activeUniverse === 'lobby' ? (
            <UniverseSelector onSelect={(id) => setUniverse(id)} />
          ) : (
            <group>
              {graphElements}
            </group>
          )}
        </Suspense>
      </Canvas>

      {activeInteractiveNode && (
        <InteractivePanel 
          node={activeInteractiveNode} 
          onClose={() => setActiveInteractiveNode(null)}
          onProgressUpdate={(id, progress, completed) => {
            updateProgress(id, { progress, completed });
          }}
        />
      )}

      {activeUniverse !== 'lobby' && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl transition-all ${activeInteractiveNode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={() => setUniverse('lobby')}
            className="px-3 py-1 rounded-full text-sm font-medium hover:bg-white/10 text-white/60 transition-colors"
          >
            Lobby
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setPath([])}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${path.length === 0 ? 'bg-white/20' : 'hover:bg-white/10 text-white/60'}`}
          >
            Home
          </button>
          {path.map((nodeId, idx) => (
            <React.Fragment key={nodeId}>
              <span className="text-white/20">/</span>
              <button
                onClick={() => setPath(path.slice(0, idx + 1))}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${idx === path.length - 1 ? 'bg-white/20' : 'hover:bg-white/10 text-white/60'}`}
              >
                {nodeId}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
