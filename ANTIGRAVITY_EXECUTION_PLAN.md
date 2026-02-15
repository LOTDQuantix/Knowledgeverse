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

PHASE 5: SYSTEM MATURITY

OBJECTIVE:
Stabilize engine for long-term scalability and future DevVerse expansion.

============================================================
1. NODE METADATA SUPPORT
============================================================

Extend node schema:

- description?: string
- tags?: string[]
- difficulty?: number
- energyLevel?: number

Do not render UI yet.
Just support in data model and typing.

============================================================
2. UNIVERSE MEMORY STATE
============================================================

Each universe maintains:

- focusPath
- navigationStack
- currentDepth

When switching universes:
- Preserve previous state.
- Restore state when returning.

============================================================
3. SCALABILITY VALIDATION
============================================================

- Test 100+ nodes.
- 4 depth levels.
- Orbit drift active.
- Connection lines active.

Ensure stable 60 FPS.

Optimize if needed:
- Memoization
- Instancing
- Controlled re-renders

============================================================
SUCCESS CRITERIA:

- State restoration works.
- No memory leak.
- No frame drops.
- Engine remains modular.

PHASE 6: DEVVERSE LEARNING ENGINE (FOUNDATION)

OBJECTIVE:
Turn DevVerse into structured learning system.

============================================================
1. EXTEND NODE SCHEMA
============================================================

Add:

- progress?: number (0–100)
- completed?: boolean
- resources?: string[]
- repoLink?: string

No UI yet.
Just data structure.

============================================================
2. VISUAL PROGRESS INDICATOR (SUBTLE)
============================================================

- Node emissive intensity based on progress.
- Completed nodes glow slightly stronger.
- Optional faint ring around completed nodes.

Do not add progress bars UI.

============================================================
3. DIFFICULTY VISUALIZATION
============================================================

Map difficulty (1–5) to:

- Node size modifier
OR
- Slight color intensity shift.

============================================================
4. STATE PERSISTENCE (LOCAL)
============================================================

Store DevVerse progress in:

localStorage.

Restore on reload.

============================================================
SUCCESS CRITERIA:
- GitHub learning branch exists.
- Progress affects visuals.
- No performance drop.

PHASE 7: GITHUB INTEGRATION LAYER

OBJECTIVE:
Integrate GitHub repository metadata into DevVerse learning nodes.

============================================================
1. NODE SCHEMA EXTENSION
============================================================

Add:

- githubRepo?: string
- githubType?: "repo" | "org" | "user"

============================================================
2. CLOUDFLARE WORKER SETUP
============================================================

Create Worker endpoint:

GET /github/repo/:name

Worker must:
- Use GitHub token from environment.
- Fetch repo data from GitHub API.
- Return simplified JSON:
    - stars
    - forks
    - lastCommitDate
    - openIssues
- Cache response for 5 minutes.

============================================================
3. FRONTEND INTEGRATION
============================================================

When node with githubRepo is active:

- Fetch repo metadata.
- Store in local state.
- Display minimal tooltip addition:
    ⭐ Stars
    🍴 Forks
    🕒 Last commit

Do NOT build a dashboard.
Keep minimal.

============================================================
4. PERFORMANCE
============================================================

- Lazy load GitHub metadata only when node focused.
- No prefetch for entire graph.
- Avoid blocking render.

============================================================
SUCCESS CRITERIA:
- GitHub data appears for relevant nodes.
- No token leakage.
- No performance degradation.
- Works on Cloudflare deployment.

PHASE 7: GITHUB INTEGRATION LAYER

OBJECTIVE:
Integrate GitHub repository metadata into DevVerse learning nodes.

============================================================
1. NODE SCHEMA EXTENSION
============================================================

Add:

- githubRepo?: string
- githubType?: "repo" | "org" | "user"

============================================================
2. CLOUDFLARE WORKER SETUP
============================================================

Create Worker endpoint:

GET /github/repo/:name

Worker must:
- Use GitHub token from environment.
- Fetch repo data from GitHub API.
- Return simplified JSON:
    - stars
    - forks
    - lastCommitDate
    - openIssues
- Cache response for 5 minutes.

============================================================
3. FRONTEND INTEGRATION
============================================================

When node with githubRepo is active:

- Fetch repo metadata.
- Store in local state.
- Display minimal tooltip addition:
    ⭐ Stars
    🍴 Forks
    🕒 Last commit

Do NOT build a dashboard.
Keep minimal.

============================================================
4. PERFORMANCE
============================================================

- Lazy load GitHub metadata only when node focused.
- No prefetch for entire graph.
- Avoid blocking render.

============================================================
SUCCESS CRITERIA:
- GitHub data appears for relevant nodes.
- No token leakage.
- No performance degradation.
- Works on Cloudflare deployment.

REFACTOR: STRUCTURE CLEANUP

OBJECTIVE:
Simplify universe structure and align with project vision.

============================================================
1. REMOVE DEVVERSE
============================================================

- Delete devverse.json.
- Remove DevVerse universe from lobby.
- Merge its nodes into knowledgeverse.json under:
    "Git & GitHub"
    "System Design"
    "Algorithms"
    etc.

============================================================
2. RENAME MAIN UNIVERSE
============================================================

Ensure:
- Only one learning universe: KnowledgeVerse.
- ProfileVerse remains separate.

============================================================
3. REMOVE GITHUB API LAYER
============================================================

- Delete /api/github route.
- Remove useGitHubStats hook.
- Remove GitHub metadata tooltips.
- Remove server-side token usage.

============================================================
4. PRESERVE LEARNING ENGINE
============================================================

Keep:
- progress
- difficulty
- energyLevel
- completion rings
- localStorage persistence

============================================================
SUCCESS CRITERIA:
- Only 2 universes visible in Lobby.
- KnowledgeVerse contains Git & GitHub as conceptual branch.
- No backend/API logic remains.
- Clean build.

PHASE 8: INTERACTIVE LEARNING CORE

OBJECTIVE:
Introduce interactive node types without breaking spatial engine.

============================================================
1. NODE TYPE EXTENSION
============================================================

Add new node types:
- concept
- interactive
- project

Add contentType and contentId fields.

============================================================
2. INTERACTIVE PANEL SYSTEM
============================================================

When interactive node is activated:

- Freeze camera orbit.
- Slight background blur.
- Open floating content panel.
- Allow exit back to graph.

No route change.

============================================================
3. QUIZ ENGINE (PHASE 8A)
============================================================

Implement minimal quiz system:

- Multiple choice.
- Correct/incorrect feedback.
- Progress update.
- Persist in localStorage.

============================================================
4. PERFORMANCE
============================================================

- Lazy load interactive modules.
- Keep 3D engine mounted.
- No FPS drop when panel closed.

============================================================
SUCCESS CRITERIA:
- Interactive node opens panel.
- Quiz works.
- Progress updates.
- 3D scene remains stable.

PHASE 8B: HYBRID PROGRESSION SYSTEM

OBJECTIVE:
Implement structured but non-restrictive learning progression.

============================================================
1. NODE SCHEMA EXTENSION
============================================================

Add:
- prerequisites?: string[]
- recommendedNext?: string[]
- learningOrder?: number
- track?: string

============================================================
2. VISUAL GUIDANCE
============================================================

If node in active track:
- Add subtle glow.

If prerequisites incomplete:
- Slight desaturation.
- Small lock icon overlay.
- Still clickable.

============================================================
3. TRACK PROGRESS
============================================================

Calculate:
- Completion % per track.
- Store in localStorage.

============================================================
4. COMPLETION RULES
============================================================

Concept node:
- Manual mark complete.

Quiz node:
- Auto complete on pass threshold.

Interactive node:
- Complete on task success.

============================================================
SUCCESS CRITERIA:
- Hybrid progression works.
- No hard locking.
- Visual guidance subtle.
- No performance degradation.

PHASE 9: INTERACTIVE SIMULATION ENGINE

OBJECTIVE:
Create reusable simulation container and implement 3 Git simulations.

============================================================
1. SIMULATION HOST
============================================================

Create SimulationHost component:
- Receives contentId.
- Lazy loads correct simulation.
- Handles mount/unmount.
- Keeps 3D scene mounted behind.

============================================================
2. GIT COMMIT SIMULATION
============================================================

Features:
- Add file.
- Stage file.
- Commit file.
- Show commit node in visual tree.
- Reset option.

No real git execution.
Pure simulated state.

============================================================
3. BRANCHING VISUALIZER
============================================================

Features:
- Create branch.
- Switch branch.
- Make commits.
- Merge branch.
- Visual tree updates dynamically.

============================================================
4. MERGE CONFLICT SIMULATION
============================================================

Features:
- Predefined conflict scenario.
- Show diff.
- User resolves conflict.
- Show correct resolution feedback.

============================================================
5. PERFORMANCE
============================================================

- Simulations mounted only when active.
- No blocking render.
- Clean unmount on exit.

============================================================
SUCCESS CRITERIA:
- All 3 simulations functional.
- 3D engine unaffected.
- State isolated per simulation.
