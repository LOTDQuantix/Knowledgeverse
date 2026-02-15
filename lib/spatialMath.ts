/**
 * Converts spherical coordinates to Cartesian coordinates.
 * @param radius Distance from origin
 * @param theta Polar angle (0 to PI)
 * @param phi Azimuthal angle (0 to 2PI)
 * @returns [x, y, z] coordinates
 */
export function sphericalToCartesian(radius: number, theta: number, phi: number): [number, number, number] {
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.cos(theta);
  const z = radius * Math.sin(theta) * Math.sin(phi);
  return [x, y, z];
}

/**
 * Generates a random point on a sphere surface with given radius.
 * Uses uniform distribution to avoid clustering at poles.
 * @param radius Radius of the sphere
 * @returns [x, y, z] coordinates
 */
export function randomPointOnSphere(radius: number): [number, number, number] {
  const u = Math.random();
  const v = Math.random();
  const theta = Math.acos(2 * u - 1);
  const phi = 2 * Math.PI * v;
  return sphericalToCartesian(radius, theta, phi);
}

/**
 * Generates a random point within a spherical shell.
 * @param minRadius Inner radius
 * @param maxRadius Outer radius
 * @returns [x, y, z] coordinates
 */
export function randomPointInShell(minRadius: number, maxRadius: number): [number, number, number] {
  const radius = minRadius + Math.random() * (maxRadius - minRadius);
  return randomPointOnSphere(radius);
}

/**
 * Generates a position for a child node relative to its parent.
 * Uses a Fibonacci sphere-like distribution for stability.
 * @param parentPos Parent's [x,y,z]
 * @param index Index of the child
 * @param total Total number of siblings
 * @param radius Radius of the shell around parent
 * @returns [x, y, z] coordinates
 */
export function getChildPosition(
  parentPos: [number, number, number],
  index: number,
  total: number,
  radius: number
): [number, number, number] {
  // Angle distribution using Fibonacci sphere concept
  const phi = Math.acos(-1 + (2 * (index + 0.5)) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  const x = parentPos[0] + radius * Math.sin(phi) * Math.cos(theta);
  const y = parentPos[1] + radius * Math.sin(phi) * Math.sin(theta);
  const z = parentPos[2] + radius * Math.cos(phi);

  return [x, y, z];
}
