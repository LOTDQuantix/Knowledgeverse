"use client";

import React from "react";
import NodeMesh from "./NodeMesh";
import { useTheme, UniverseId } from "@/lib/ThemeContext";

interface UniverseSelectorProps {
    onSelect: (id: UniverseId) => void;
}

export default function UniverseSelector({ onSelect }: UniverseSelectorProps) {
    const { mode } = useTheme();

    const universes: { id: UniverseId; label: string; color: string; pos: [number, number, number] }[] = [
        { id: 'knowledgeverse', label: "KnowledgeVerse", color: '#4A90E2', pos: [-20, 0, 0] },
        { id: 'profileverse', label: "ProfileVerse", color: '#FF69B4', pos: [20, 0, 0] },
    ];

    return (
        <>
            {universes.map((u) => (
                <NodeMesh
                    key={u.id}
                    position={u.pos}
                    color={u.color}
                    size={10}
                    label={u.label}
                    onClick={() => onSelect(u.id)}
                />
            ))}
        </>
    );
}
