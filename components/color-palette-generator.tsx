"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ColorPalette {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
}

// Update the ColorPaletteGenerator component to accept the onApplyPalette prop
interface ColorPaletteGeneratorProps {
  onApplyPalette: (primaryColor: string) => void
}

export function ColorPaletteGenerator({ onApplyPalette }: ColorPaletteGeneratorProps) {
  const [primaryColor, setPrimaryColor] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Try to get the saved color from localStorage
      const savedColor = localStorage.getItem("shadcn-theme-primary-color")
      // Return the saved color or default to black
      return savedColor || "#000000"
    }
    return "#000000"
  })
  const [lightPalette, setLightPalette] = useState<ColorPalette | null>(null)
  const [darkPalette, setDarkPalette] = useState<ColorPalette | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (primaryColor) {
      generatePalettes(primaryColor)
    }
  }, [primaryColor])

  // Add an effect to save the color to localStorage when it changes
  useEffect(() => {
    if (primaryColor && typeof window !== "undefined") {
      localStorage.setItem("shadcn-theme-primary-color", primaryColor)
    }
  }, [primaryColor])

  // Update the generatePalettes function to ensure it produces more vibrant colors
  const generatePalettes = (color: string) => {
    try {
      // Convert hex to HSL
      const hsl = hexToHSL(color)

      // Generate light palette
      const light = {
        background: `${hsl.h} ${Math.min(hsl.s * 0.05, 5)}% 99%`,
        foreground: `${hsl.h} 10% 6.9%`,
        card: `${hsl.h} ${Math.min(hsl.s * 0.05, 5)}% 99%`,
        cardForeground: `${hsl.h} 10% 6.9%`,
        popover: `${hsl.h} ${Math.min(hsl.s * 0.05, 5)}% 99%`,
        popoverForeground: `${hsl.h} 10% 6.9%`,
        primary: `${hsl.h} ${Math.min(hsl.s + 10, 100)}% ${Math.min(hsl.l + 5, 60)}%`,
        primaryForeground: "0 0% 98%",
        secondary: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 95.9%`,
        secondaryForeground: `${hsl.h} ${hsl.s}% 10%`,
        muted: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 95.9%`,
        mutedForeground: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 46.1%`,
        accent: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 95.9%`,
        accentForeground: `${hsl.h} ${hsl.s}% 10%`,
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
        border: `${hsl.h} ${Math.max(hsl.s - 25, 0)}% 90%`,
        input: `${hsl.h} ${Math.max(hsl.s - 25, 0)}% 90%`,
        ring: `${hsl.h} ${hsl.s}% 10%`,
        chart1: `${(hsl.h + 30) % 360} 76% 61%`,
        chart2: `${(hsl.h + 120) % 360} 58% 39%`,
        chart3: `${(hsl.h + 180) % 360} 37% 24%`,
        chart4: `${(hsl.h + 240) % 360} 74% 66%`,
        chart5: `${(hsl.h + 300) % 360} 87% 67%`,
      }

      // Generate dark palette
      const dark = {
        background: `${hsl.h} ${Math.max(Math.min(hsl.s * 0.15, 20), 5)}% 6.9%`,
        foreground: "0 0% 98%",
        card: `${hsl.h} ${Math.max(Math.min(hsl.s * 0.15, 20), 5)}% 6.9%`,
        cardForeground: "0 0% 98%",
        popover: `${hsl.h} ${Math.max(Math.min(hsl.s * 0.15, 20), 5)}% 6.9%`,
        popoverForeground: "0 0% 98%",
        primary: `${hsl.h} ${Math.min(hsl.s + 10, 100)}% 80%`,
        primaryForeground: `${hsl.h} ${hsl.s}% 10%`,
        secondary: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 15.9%`,
        secondaryForeground: "0 0% 98%",
        muted: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 15.9%`,
        mutedForeground: `${hsl.h} ${Math.max(hsl.s - 25, 0)}% 64.9%`,
        accent: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 15.9%`,
        accentForeground: "0 0% 98%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "0 0% 98%",
        border: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 15.9%`,
        input: `${hsl.h} ${Math.max(hsl.s - 30, 0)}% 15.9%`,
        ring: `${hsl.h} ${Math.max(hsl.s - 10, 0)}% 86.9%`,
        chart1: `${(hsl.h + 40) % 360} 70% 50%`,
        chart2: `${(hsl.h + 100) % 360} 60% 45%`,
        chart3: `${(hsl.h + 160) % 360} 80% 55%`,
        chart4: `${(hsl.h + 220) % 360} 65% 60%`,
        chart5: `${(hsl.h + 280) % 360} 75% 55%`,
      }

      setLightPalette(light)
      setDarkPalette(dark)
    } catch (error) {
      console.error("Error generating palettes:", error)
    }
  }

  // Add this function to apply the palette to the theme customizer
  const applyPalette = () => {
    if (primaryColor && primaryColor.startsWith("#")) {
      onApplyPalette(primaryColor)
      toast({
        title: "Applied!",
        description: "Color palette applied to theme customizer",
      })
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid hex color",
        variant: "destructive",
      })
    }
  }

  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
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

    // Find the min and max values to calculate the lightness
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

      h = Math.round(h * 60)
    }

    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return { h, s, l }
  }

  const generateCSS = () => {
    if (!lightPalette || !darkPalette) return ""

    return `@layer base {
  :root {
    --background: ${lightPalette.background};
    --foreground: ${lightPalette.foreground};
    --card: ${lightPalette.card};
    --card-foreground: ${lightPalette.cardForeground};
    --popover: ${lightPalette.popover};
    --popover-foreground: ${lightPalette.popoverForeground};
    --primary: ${lightPalette.primary};
    --primary-foreground: ${lightPalette.primaryForeground};
    --secondary: ${lightPalette.secondary};
    --secondary-foreground: ${lightPalette.secondaryForeground};
    --muted: ${lightPalette.muted};
    --muted-foreground: ${lightPalette.mutedForeground};
    --accent: ${lightPalette.accent};
    --accent-foreground: ${lightPalette.accentForeground};
    --destructive: ${lightPalette.destructive};
    --destructive-foreground: ${lightPalette.destructiveForeground};
    --border: ${lightPalette.border};
    --input: ${lightPalette.input};
    --ring: ${lightPalette.ring};
    --radius: 0.5rem;
    --chart-1: ${lightPalette.chart1};
    --chart-2: ${lightPalette.chart2};
    --chart-3: ${lightPalette.chart3};
    --chart-4: ${lightPalette.chart4};
    --chart-5: ${lightPalette.chart5};
  }
  .dark {
    --background: ${darkPalette.background};
    --foreground: ${darkPalette.foreground};
    --card: ${darkPalette.card};
    --card-foreground: ${darkPalette.cardForeground};
    --popover: ${darkPalette.popover};
    --popover-foreground: ${darkPalette.popoverForeground};
    --primary: ${darkPalette.primary};
    --primary-foreground: ${darkPalette.primaryForeground};
    --secondary: ${darkPalette.secondary};
    --secondary-foreground: ${darkPalette.secondaryForeground};
    --muted: ${darkPalette.muted};
    --muted-foreground: ${darkPalette.mutedForeground};
    --accent: ${darkPalette.accent};
    --accent-foreground: ${darkPalette.accentForeground};
    --destructive: ${darkPalette.destructive};
    --destructive-foreground: ${darkPalette.destructiveForeground};
    --border: ${darkPalette.border};
    --input: ${darkPalette.input};
    --ring: ${darkPalette.ring};
    --chart-1: ${darkPalette.chart1};
    --chart-2: ${darkPalette.chart2};
    --chart-3: ${darkPalette.chart3};
    --chart-4: ${darkPalette.chart4};
    --chart-5: ${darkPalette.chart5};
  }
}`
  }

  const copyToClipboard = () => {
    const css = generateCSS()
    navigator.clipboard.writeText(css)
    toast({
      title: "Copied!",
      description: "CSS variables copied to clipboard",
    })
  }

  const randomizeColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    setPrimaryColor(randomColor)
  }

  const ColorSwatch = ({ color, name }: { color: string; name: string }) => {
    return (
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded border" style={{ background: `hsl(${color})` }} />
        <div className="flex-1 text-sm">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{color}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add a button to apply the palette */}
      {/* Add this after the randomize button in the top section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              id="primary-color"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={randomizeColor} title="Randomize">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-end">
          <Button className="w-full" onClick={applyPalette}>
            Apply to Theme Customizer
          </Button>
        </div>
      </div>

      {lightPalette && darkPalette && (
        <>
          <Tabs defaultValue="preview" className="mt-6">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Light Mode</CardTitle>
                    <CardDescription>Light mode color palette</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <ColorSwatch color={lightPalette.primary} name="Primary" />
                    <ColorSwatch color={lightPalette.secondary} name="Secondary" />
                    <ColorSwatch color={lightPalette.accent} name="Accent" />
                    <ColorSwatch color={lightPalette.muted} name="Muted" />
                    <ColorSwatch color={lightPalette.background} name="Background" />
                    <ColorSwatch color={lightPalette.foreground} name="Foreground" />
                    <ColorSwatch color={lightPalette.border} name="Border" />
                    <ColorSwatch color={lightPalette.ring} name="Ring" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Dark Mode</CardTitle>
                    <CardDescription>Dark mode color palette</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <ColorSwatch color={darkPalette.primary} name="Primary" />
                    <ColorSwatch color={darkPalette.secondary} name="Secondary" />
                    <ColorSwatch color={darkPalette.accent} name="Accent" />
                    <ColorSwatch color={darkPalette.muted} name="Muted" />
                    <ColorSwatch color={darkPalette.background} name="Background" />
                    <ColorSwatch color={darkPalette.foreground} name="Foreground" />
                    <ColorSwatch color={darkPalette.border} name="Border" />
                    <ColorSwatch color={darkPalette.ring} name="Ring" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="css" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>CSS Variables</CardTitle>
                    <CardDescription>Copy these to your globals.css file</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 rounded-md bg-muted overflow-auto text-sm">{generateCSS()}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

