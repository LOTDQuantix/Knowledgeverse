PROJECT: KNOWLEDGEVERSE
MODE: 3D-FIRST ARCHITECTURE
DEPLOY_TARGET: CLOUDFLARE (Pages + Workers)

============================================================
1. OBJECTIVE
============================================================

Build a fully interactive 3D knowledge universe.
No 2D fallback.
No static site approach.
Must render dynamic 3D spatial knowledge graph from Day 1.

Core Concept:
- Knowledge structured as a spherical universe.
- Nodes positioned using spherical coordinate logic.
- Hierarchy represented via depth-based radius layers.

============================================================
2. RENDERING ENGINE
============================================================

Framework:
- Next.js (App Router, TypeScript)
- React Three Fiber
- Three.js
- Drei utilities

Animation:
- GSAP (camera transitions)
- Framer Motion (UI overlay only)

Strict Requirements:
- WebGL-only rendering
- OrbitControls enabled
- Smooth camera interpolation
- No abrupt jumps

============================================================
3. SPATIAL MODEL
============================================================

Universe Model:
- Root domain = center origin (0,0,0)
- Domains distributed on spherical surface
- Topics distributed around domain nodes using smaller spherical shells
- Subtopics orbit topics
- Blogs orbit subtopics

Coordinate System:
- Use spherical coordinates (radius, theta, phi)
- Convert to cartesian for rendering
- Randomized angular distribution with collision avoidance

Depth Layers:
- Level 0: Core (radius 0)
- Level 1: Domains (radius 30–50)
- Level 2: Topics (radius 10–20 around parent)
- Level 3: Subtopics (radius 5–10 around parent)
- Level 4: Blogs (radius 2–4 around parent)

============================================================
4. NODE DESIGN
============================================================

Node Types:
- domain → large glowing sphere
- topic → medium sphere
- subtopic → smaller sphere
- blog → smallest orb

Visual Rules:
- Size scales by hierarchy
- Glow intensity based on importance_weight
- Color palette:
    Day Mode: Light Blue Spectrum
    Night Mode: Deep Navy + Neon Cyan

Hover:
- Scale increase 1.15x
- Emissive intensity increase

Click:
- Camera fly-to
- Children visibility increase
- Parent nodes fade opacity

============================================================
5. DATA LAYER
============================================================

Phase 1:
- Static JSON file in /data/knowledge.json

Schema:
{
  id: string,
  label: string,
  type: "domain" | "topic" | "subtopic" | "blog",
  description?: string,
  importance_weight?: number,
  children?: Node[]
}

Constraints:
- Tree structure only
- No cyclic references
- Max depth: 4

============================================================
6. CAMERA SYSTEM
============================================================

Default:
- OrbitControls enabled
- Auto slow rotation when idle

On Node Click:
- Animate camera position toward node
- Offset slightly backward along view vector
- Animate lookAt target
- Duration: 0.8–1.2s

On Back:
- Animate camera to parent node

============================================================
7. THEMING SYSTEM
============================================================

Two Worlds:
- Day World
- Night World

Day:
- Background: #EAF6FF
- Ambient light high
- Soft shadows

Night:
- Background: #050B14
- Lower ambient
- Add starfield particle system

Theme Toggle:
- Global state
- Smooth transition of lights and background

============================================================
8. PERFORMANCE REQUIREMENTS
============================================================

- Use instanced meshes if node count > 200
- Frustum culling enabled
- Lazy render children nodes
- Max target FPS: 60
- No blocking synchronous loops

============================================================
9. SPLINE INTEGRATION
============================================================

If 3D models are created in Spline:
- Export as GLTF
- Load via useGLTF
- Optimize poly count
- Reuse materials
- No heavy textures in Phase 1

============================================================
10. FILE STRUCTURE
============================================================

/app
  page.tsx
/components
  GraphScene.tsx
  NodeMesh.tsx
  CameraController.tsx
  UniverseBackground.tsx
/data
  knowledge.json
/lib
  spatialMath.ts
  graphUtils.ts
/styles
  theme.ts

============================================================
11. CLOUDFARE DEPLOYMENT
============================================================

Hosting:
- Cloudflare Pages

Future Backend:
- Cloudflare Workers
- Durable Objects (optional for real-time sync)
- KV for caching graph data

Edge-first architecture required.

============================================================
12. EXECUTION ORDER
============================================================

Step 1:
- Initialize Next.js project with Tailwind.

Step 2:
- Install Three.js stack.

Step 3:
- Create minimal scene with single sphere.

Step 4:
- Implement spherical coordinate generator.

Step 5:
- Render domain layer.

Step 6:
- Add click-to-focus camera animation.

Step 7:
- Implement Day/Night world toggle.

Only after these are complete:
- Add UI overlays.

============================================================
13. PROHIBITIONS
============================================================

- No CSS-only fake 3D.
- No premature UI design.
- No static placeholder layout.
- No chat interface.
- No blog page templates yet.

This is a spatial engine first.

============================================================
14. SUCCESS CRITERIA
============================================================

Phase 1 complete when:
- 3D universe renders.
- Nodes are spatially distributed.
- Camera transitions are smooth.
- Theme toggle works.
- Deployable on Cloudflare.

End of instructions.
Generate task list and begin execution.

Phase 2:

Implement hierarchical expansion.

Requirements:
- When a node is clicked, render its children in a smaller spherical shell around it.
- Parent remains visible.
- Sibling branches fade opacity to 0.2.
- Camera transitions inward smoothly.
- Children are removed when navigating back.
- Maintain performance.
- No UI panels yet.
- No layout redesign.

Generate task list.
Begin implementation.

PHASE 3: MULTIVERSE SYSTEM

OBJECTIVE:
Transform KnowledgeVerse from single graph into multi-universe architecture.

============================================================
1. UNIVERSE CONTAINER SYSTEM
============================================================

Create top-level state:

activeUniverse: string

Supported universes (initial):
- knowledgeverse
- profileverse
- devverse

Each universe must:
- Have independent JSON dataset.
- Maintain independent navigation stack.
- Preserve state when switching (optional Phase 3.5).

============================================================
2. DATA STRUCTURE
============================================================

/data/
  knowledgeverse.json
  profileverse.json
  devverse.json

Each follows existing tree schema.

Do NOT merge universes into one graph.

============================================================
3. UNIVERSE SELECTOR UI
============================================================

Landing behavior:

- Show 3 large universe spheres in a wide shell.
- Each labeled.
- Clicking a universe:
    - Camera fly-to.
    - Load respective dataset.
    - Initialize graph engine with that dataset.

No page reload.
No route change.
Single canvas instance.

============================================================
4. ENGINE REFACTOR
============================================================

GraphScene must:
- Accept graphData prop.
- Reset focusPath when universe changes.
- Recompute spatial layout.

No global static data usage allowed.

============================================================
5. PROFILEVERSE SPEC
============================================================

Profileverse contains:
- About
- Projects
- Skills
- Timeline
- Achievements

Structured as conceptual graph.

No CV page.
No scrolling UI.
All spatial.

============================================================
6. DEVVERSE SPEC (PREPARATION ONLY)
============================================================

DevVerse structure placeholder:

- GitHub Learning
- System Design
- Algorithms
- Tools

Do not integrate GitHub API yet.
Static conceptual nodes only.

============================================================
7. VISUAL DIFFERENTIATION
============================================================

Each universe has subtle visual identity:

Knowledgeverse:
- Blue / Cyan theme

Profileverse:
- Softer neutral / white glow

DevVerse:
- Slight green / tech tint

Do not over-style.
Keep engine consistent.

============================================================
8. SUCCESS CRITERIA
============================================================

Phase 3 complete when:

- Landing shows multiple universes.
- Clicking one loads its graph.
- Engine resets correctly.
- No hydration errors.
- No memory leaks.
- No performance degradation.

End of Phase 3 instructions.
Generate task list and begin implementation.

PHASE 4: IMMERSION LAYER

OBJECTIVE:
Increase spatial depth, realism, and motion identity.

============================================================
1. DEPTH FOG
============================================================

- Add scene fog.
- Adjust density based on depth level.
- Fog color matches theme background.
- Must not affect performance.

============================================================
2. ORBITAL DRIFT
============================================================

- Children nodes slowly rotate around parent.
- Use group rotation.
- Very slow speed.
- Randomize slightly per shell.

============================================================
3. CAMERA POLISH
============================================================

- Add ease-out overshoot to fly-to.
- Scale camera distance by node size.
- Slight zoom damping at deeper levels.

============================================================
4. UNIVERSE ENTRY TRANSITION
============================================================

When selecting a universe from Lobby:
- Animate camera toward universe.
- Slight scale-up effect.
- Spawn children after transition completes.

============================================================
5. HIERARCHY VISUAL ENHANCEMENT
============================================================

Choose one:
A) Thin glowing connection lines
OR
B) Active parent halo ring

Implement only one.

============================================================
SUCCESS CRITERIA:

- Universe feels dynamic.
- No FPS drop.
- Transitions smooth.
- No code duplication.
