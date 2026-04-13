/**
 * Convert geographic coordinates to 3D cartesian (on a sphere of given radius).
 * Used to position markers, camera focus points, etc.
 */
export function latLonToVec3(lat, lon, radius = 1.05) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }
}

/**
 * Compute the rotation (y-axis) needed to face a given longitude.
 * Used to smoothly rotate the globe to show a selected country.
 */
export function lonToRotationY(lon) {
  return (-lon * Math.PI) / 180
}

/**
 * Linear interpolation between two numbers
 */
export function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Clamp a value between min and max
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

/**
 * Format a large number for display (e.g. 1400000000 → "1.4B")
 */
export function formatNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}
