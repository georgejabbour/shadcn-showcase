import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// HSL to Hex conversion
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Hex to HSL conversion
export function hexToHsl(hex: string): [number, number, number] {
  // Remove the # if present
  hex = hex.replace(/^#/, "")

  // Parse the hex values
  let r = 0,
    g = 0,
    b = 0
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16) / 255
    g = Number.parseInt(hex[1] + hex[1], 16) / 255
    b = Number.parseInt(hex[2] + hex[2], 16) / 255
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16) / 255
    g = Number.parseInt(hex.substring(2, 4), 16) / 255
    b = Number.parseInt(hex.substring(4, 6), 16) / 255
  }

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h = h * 60
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

// Update the generateColorPalette function to ensure it produces more vibrant colors
export function generateColorPalette(primaryHex: string) {
  // Convert primary color to HSL
  const [h, s, l] = hexToHsl(primaryHex)

  // Create light mode palette with more saturation and slightly higher lightness
  const lightPalette = {
    background: `${h} ${Math.min(s * 0.05, 5)}% 99%`,
    foreground: `${h} ${Math.max(5, s - 5)}% 4.5%`,
    card: `${h} ${Math.min(s * 0.05, 5)}% 99%`,
    "card-foreground": `${h} ${Math.max(5, s - 5)}% 4.5%`,
    popover: `${h} ${Math.min(s * 0.05, 5)}% 99%`,
    "popover-foreground": `${h} ${Math.max(5, s - 5)}% 4.5%`,
    primary: `${h} ${Math.min(100, s + 10)}% ${Math.min(60, l + 5)}%`,
    "primary-foreground": `${h} ${Math.max(0, s - 15)}% 98%`,
    secondary: `${h} ${Math.max(5, s - 10)}% 96.5%`,
    "secondary-foreground": `${h} ${Math.min(100, s + 5)}% ${l}%`,
    muted: `${h} ${Math.max(5, s - 10)}% 96.5%`,
    "muted-foreground": `${h} ${Math.max(5, s - 10)}% 48%`,
    accent: `${h} ${Math.min(100, s + 5)}% 96.5%`,
    "accent-foreground": `${h} ${Math.min(100, s + 5)}% ${l}%`,
    destructive: "0 90% 65%",
    "destructive-foreground": "0 0% 98%",
    border: `${h} ${Math.max(5, s - 10)}% 92%`,
    input: `${h} ${Math.max(5, s - 10)}% 92%`,
    ring: `${h} ${Math.min(100, s + 10)}% ${Math.min(90, l + 5)}%`,
    "chart-1": `${(h + 30) % 360} 85% 65%`,
    "chart-2": `${(h + 120) % 360} 70% 45%`,
    "chart-3": `${(h + 180) % 360} 60% 35%`,
    "chart-4": `${(h + 240) % 360} 80% 70%`,
    "chart-5": `${(h + 300) % 360} 90% 70%`,
    "gradient-one": `299 100% 60%`,
    "gradient-two": `181 80% 60%`,
  }

  // Create dark mode palette with more saturation and slightly higher lightness
  const darkPalette = {
    background: `${h} ${Math.max(Math.min(s * 0.15, 20), 5)}% 4.5%`,
    foreground: `${h} ${Math.max(0, s - 15)}% 98%`,
    card: `${h} ${Math.max(Math.min(s * 0.15, 20), 5)}% 4.5%`,
    "card-foreground": `${h} ${Math.max(0, s - 15)}% 98%`,
    popover: `${h} ${Math.max(Math.min(s * 0.15, 20), 5)}% 4.5%`,
    "popover-foreground": `${h} ${Math.max(0, s - 15)}% 98%`,
    primary: `${h} ${Math.min(100, s + 10)}% 80%`,
    "primary-foreground": `${h} ${Math.min(100, s + 5)}% ${Math.max(12, l - 15)}%`,
    secondary: `${h} ${Math.min(100, s + 5)}% 18%`,
    "secondary-foreground": `${h} ${Math.max(0, s - 15)}% 98%`,
    muted: `${h} ${Math.min(100, s + 5)}% 18%`,
    "muted-foreground": `${h} ${Math.max(5, s - 10)}% 68%`,
    accent: `${h} ${Math.min(100, s + 10)}% 18%`,
    "accent-foreground": `${h} ${Math.max(0, s - 15)}% 98%`,
    destructive: "0 70% 35%",
    "destructive-foreground": "0 0% 98%",
    border: `${h} ${Math.min(100, s + 5)}% 18%`,
    input: `${h} ${Math.min(100, s + 5)}% 18%`,
    ring: `${h} ${Math.max(5, s - 10)}% 85%`,
    "chart-1": `${(h + 40) % 360} 80% 55%`,
    "chart-2": `${(h + 100) % 360} 70% 50%`,
    "chart-3": `${(h + 160) % 360} 85% 60%`,
    "chart-4": `${(h + 220) % 360} 75% 65%`,
    "chart-5": `${(h + 280) % 360} 85% 60%`,
    "gradient-one": `299 100% 60%`,
    "gradient-two": `181 80% 60%`,
  }

  return {
    light: lightPalette,
    dark: darkPalette,
  }
}

// Generate a duotone color palette based on primary and secondary colors
export function generateDuotoneColorPalette(primaryHex: string, secondaryHex: string) {
  // Convert colors to HSL
  const [primaryH, primaryS, primaryL] = hexToHsl(primaryHex)
  const [secondaryH, secondaryS, secondaryL] = hexToHsl(secondaryHex)

  // Create light mode palette
  const lightPalette = {
    background: `${primaryH} ${Math.min(primaryS * 0.05, 5)}% 99%`,
    foreground: `${primaryH} ${Math.max(5, primaryS - 5)}% 4.5%`,
    card: `${primaryH} ${Math.min(primaryS * 0.05, 5)}% 99%`,
    "card-foreground": `${primaryH} ${Math.max(5, primaryS - 5)}% 4.5%`,
    popover: `${primaryH} ${Math.min(primaryS * 0.05, 5)}% 99%`,
    "popover-foreground": `${primaryH} ${Math.max(5, primaryS - 5)}% 4.5%`,
    primary: `${primaryH} ${Math.min(100, primaryS + 10)}% ${Math.min(60, primaryL + 5)}%`,
    "primary-foreground": `${primaryH} ${Math.max(0, primaryS - 15)}% 98%`,
    secondary: `${secondaryH} ${Math.min(100, secondaryS + 5)}% ${Math.min(90, secondaryL + 5)}%`,
    "secondary-foreground": `${secondaryH} ${Math.max(5, secondaryS - 5)}% 10%`,
    muted: `${secondaryH} ${Math.max(5, secondaryS - 10)}% 96.5%`,
    "muted-foreground": `${secondaryH} ${Math.max(5, secondaryS - 10)}% 48%`,
    accent: `${secondaryH} ${Math.max(5, secondaryS - 5)}% 90%`,
    "accent-foreground": `${secondaryH} ${Math.max(5, secondaryS - 5)}% 10%`,
    destructive: "0 90% 65%",
    "destructive-foreground": "0 0% 98%",
    border: `${primaryH} ${Math.max(5, primaryS - 10)}% 92%`,
    input: `${primaryH} ${Math.max(5, primaryS - 10)}% 92%`,
    ring: `${primaryH} ${Math.min(100, primaryS + 10)}% ${Math.min(90, primaryL + 5)}%`,
    "chart-1": `${primaryH} 85% 65%`,
    "chart-2": `${secondaryH} 70% 45%`,
    "chart-3": `${(primaryH + 180) % 360} 60% 35%`,
    "chart-4": `${(secondaryH + 180) % 360} 80% 70%`,
    "chart-5": `${(primaryH + secondaryH) / 2} 90% 70%`,
    "gradient-one": `${primaryH} 100% 60%`,
    "gradient-two": `${secondaryH} 80% 60%`,
  }

  // Create dark mode palette
  const darkPalette = {
    background: `${primaryH} ${Math.max(Math.min(primaryS * 0.15, 20), 5)}% 4.5%`,
    foreground: `${primaryH} ${Math.max(0, primaryS - 15)}% 98%`,
    card: `${primaryH} ${Math.max(Math.min(primaryS * 0.15, 20), 5)}% 4.5%`,
    "card-foreground": `${primaryH} ${Math.max(0, primaryS - 15)}% 98%`,
    popover: `${primaryH} ${Math.max(Math.min(primaryS * 0.15, 20), 5)}% 4.5%`,
    "popover-foreground": `${primaryH} ${Math.max(0, primaryS - 15)}% 98%`,
    primary: `${primaryH} ${Math.min(100, primaryS + 10)}% 80%`,
    "primary-foreground": `${primaryH} ${Math.min(100, primaryS + 5)}% ${Math.max(12, primaryL - 15)}%`,
    secondary: `${secondaryH} ${Math.min(100, secondaryS + 10)}% 70%`,
    "secondary-foreground": `${secondaryH} ${Math.max(0, secondaryS - 15)}% 98%`,
    muted: `${secondaryH} ${Math.min(100, secondaryS + 5)}% 18%`,
    "muted-foreground": `${secondaryH} ${Math.max(5, secondaryS - 10)}% 68%`,
    accent: `${secondaryH} ${Math.min(100, secondaryS + 5)}% 25%`,
    "accent-foreground": `${secondaryH} ${Math.max(0, secondaryS - 15)}% 98%`,
    destructive: "0 70% 35%",
    "destructive-foreground": "0 0% 98%",
    border: `${primaryH} ${Math.min(100, primaryS + 5)}% 18%`,
    input: `${primaryH} ${Math.min(100, primaryS + 5)}% 18%`,
    ring: `${primaryH} ${Math.max(5, primaryS - 10)}% 85%`,
    "chart-1": `${primaryH} 80% 55%`,
    "chart-2": `${secondaryH} 70% 50%`,
    "chart-3": `${(primaryH + 180) % 360} 85% 60%`,
    "chart-4": `${(secondaryH + 180) % 360} 75% 65%`,
    "chart-5": `${(primaryH + secondaryH) / 2} 85% 60%`,
    "gradient-one": `${primaryH} 100% 60%`,
    "gradient-two": `${secondaryH} 80% 60%`,
  }

  return {
    light: lightPalette,
    dark: darkPalette,
  }
}

