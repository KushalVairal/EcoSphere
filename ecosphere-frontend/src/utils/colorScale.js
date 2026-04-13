// Maps CO2 emissions (tonnes per capita) → hex color
// Green = low emissions, Red = high emissions
export function co2ToColor(co2) {
  // Range: 0 (best) → 20 (worst)
  const t = Math.min(co2 / 20, 1)
  if (t < 0.33) {
    // Green → Yellow
    const u = t / 0.33
    const r = Math.round(0 + u * 255)
    const g = Math.round(230 - u * 30)
    const b = Math.round(100 - u * 100)
    return `rgb(${r},${g},${b})`
  } else if (t < 0.66) {
    // Yellow → Orange
    const u = (t - 0.33) / 0.33
    const r = Math.round(255)
    const g = Math.round(200 - u * 100)
    const b = 0
    return `rgb(${r},${g},${b})`
  } else {
    // Orange → Red
    const u = (t - 0.66) / 0.34
    const r = 255
    const g = Math.round(100 - u * 100)
    const b = 0
    return `rgb(${r},${g},${b})`
  }
}

// Converts hex string to Three.js-compatible integer
export function hexToThreeColor(hex) {
  return parseInt(hex.replace('#', ''), 16)
}

// Returns a CSS color for renewable percentage (red → green)
export function renewableToColor(pct) {
  const t = Math.min(pct / 100, 1)
  const r = Math.round(255 * (1 - t))
  const g = Math.round(200 * t + 55)
  const b = Math.round(50 * (1 - t))
  return `rgb(${r},${g},${b})`
}

// Returns label text for a CO2 value
export function co2Label(co2) {
  if (co2 < 3) return { text: 'Very Low', color: '#00e676' }
  if (co2 < 7) return { text: 'Low', color: '#69f0ae' }
  if (co2 < 11) return { text: 'Medium', color: '#ffab40' }
  if (co2 < 15) return { text: 'High', color: '#ff6d00' }
  return { text: 'Very High', color: '#ff1744' }
}
