"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Palette, Sparkles } from "lucide-react"
import { ColorPicker as SquareColorPicker } from "./color-picker-square"
import { hslToHex, hexToHsl } from "@/lib/utils"
import { themeColors } from "@/lib/theme-config"

interface ColorPickerProps {
  label: string
  colorKey: string
  defaultValue: string
  onChange: (key: string, value: string) => void
  isDarkMode: boolean
}

export function ColorPicker({ label, colorKey, defaultValue, onChange, isDarkMode }: ColorPickerProps) {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [lightness, setLightness] = useState(0)
  const [hexColor, setHexColor] = useState("#000000")
  const [pickerType, setPickerType] = useState<"hsl" | "square">("hsl")

  // Parse the HSL value on mount or when defaultValue changes
  useEffect(() => {
    if (!defaultValue || typeof defaultValue !== "string") {
      return
    }

    const match = defaultValue.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/)
    if (match) {
      const [_, h, s, l] = match
      setHue(Number.parseFloat(h))
      setSaturation(Number.parseFloat(s))
      setLightness(Number.parseFloat(l))

      // Convert HSL to hex for the color input
      setHexColor(hslToHex(Number.parseFloat(h), Number.parseFloat(s), Number.parseFloat(l)))
    }
  }, [defaultValue])

  // Update the color when sliders change
  const updateColor = (h: number, s: number, l: number) => {
    const hslValue = `${h} ${s}% ${l}%`
    onChange(colorKey, hslValue)
    setHexColor(hslToHex(h, s, l))
  }

  // Handle hex color input change
  const handleHexChange = (hex: string) => {
    setHexColor(hex)

    try {
      const [h, s, l] = hexToHsl(hex)
      setHue(h)
      setSaturation(s)
      setLightness(l)
      updateColor(h, s, l)
    } catch (e) {
      // Invalid hex color
    }
  }

  // Handle square color picker change
  const handleSquareColorChange = (hex: string) => {
    handleHexChange(hex)
  }

  // Toggle between HSL and Square color pickers
  const togglePickerType = () => {
    setPickerType(pickerType === "hsl" ? "square" : "hsl")
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={togglePickerType}
            title={`Switch to ${pickerType === "hsl" ? "square" : "HSL"} picker`}
          >
            <Palette className="h-4 w-4" />
            <span className="sr-only">Toggle color picker type</span>
          </Button>
          <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: hexColor }} />
        </div>
      </div>

      {pickerType === "hsl" ? (
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs w-6 md:w-8">Hue</span>
            <div className="relative flex-1">
              <div
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background:
                    "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
                }}
              />
              <Slider
                value={[hue]}
                min={0}
                max={360}
                step={1}
                className="flex-1"
                onValueChange={(value) => {
                  setHue(value[0])
                  updateColor(value[0], saturation, lightness)
                }}
              />
            </div>
            <span className="text-xs w-8 text-right">{Math.round(hue)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-6 md:w-8">Sat</span>
            <div className="relative flex-1">
              <div
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`,
                }}
              />
              <Slider
                value={[saturation]}
                min={0}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => {
                  setSaturation(value[0])
                  updateColor(hue, value[0], lightness)
                }}
              />
            </div>
            <span className="text-xs w-8 text-right">{Math.round(saturation)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-6 md:w-8">Light</span>
            <div className="relative flex-1">
              <div
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`,
                }}
              />
              <Slider
                value={[lightness]}
                min={0}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => {
                  setLightness(value[0])
                  updateColor(hue, saturation, value[0])
                }}
              />
            </div>
            <span className="text-xs w-8 text-right">{Math.round(lightness)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-6 md:w-8">Hex</span>
            <Input value={hexColor} onChange={(e) => handleHexChange(e.target.value)} className="h-8 text-xs" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 pt-2">
          <SquareColorPicker value={hexColor} onChange={handleSquareColorChange} className="h-8 w-8 mb-2" />
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs w-8">HSL</span>
            <Input
              value={`${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%`}
              readOnly
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface RadiusControlProps {
  value: number
  onChange: (value: number) => void
}

function RadiusControl({ value, onChange }: RadiusControlProps) {
  const handleIncrement = () => {
    const newValue = Math.min(value + 0.125, 2);
    onChange(newValue);
    
    // Apply the change to CSS variables immediately
    const root = document.documentElement;
    root.style.setProperty("--radius", `${newValue}rem`);
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - 0.125, 0);
    onChange(newValue);
    
    // Apply the change to CSS variables immediately
    const root = document.documentElement;
    root.style.setProperty("--radius", `${newValue}rem`);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 2) {
      onChange(newValue);
      
      // Apply the change to CSS variables immediately
      const root = document.documentElement;
      root.style.setProperty("--radius", `${newValue}rem`);
    }
  }

  // Generate smaller preview shapes with the current radius
  const shapes = [
    { size: "w-6 h-6", label: "L" },
    { size: "w-4 h-4", label: "M" },
    { size: "w-3 h-3", label: "S" },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Border Radius</Label>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={handleDecrement} disabled={value <= 0}>
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease</span>
          </Button>
          <Input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="h-6 w-16 text-center text-xs"
            step={0.125}
            min={0}
            max={2}
          />
          <span className="text-xs text-muted-foreground">rem</span>
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={handleIncrement} disabled={value >= 2}>
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Slider
          value={[value]}
          min={0}
          max={2}
          step={0.125}
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />
        <div className="flex items-end gap-2 ml-2">
          {shapes.map((shape, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`${shape.size} bg-primary flex items-center justify-center text-primary-foreground text-[8px]`}
                style={{ borderRadius: `${value}rem` }}
              >
                {shape.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GradientShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm">Gradient Showcase</Label>
        <div className="flex flex-wrap gap-3 mt-2">
          {/* Icon Button with Gradient */}
          <Button
            size="icon"
            className="bg-gradient-to-br from-[hsl(var(--gradient-one))] to-[hsl(var(--gradient-two))] border-0 h-9 w-9"
          >
            <Sparkles className="h-4 w-4 text-white" />
          </Button>

          {/* Text Button with Gradient */}
          <Button className="bg-gradient-to-br text-white from-[hsl(var(--gradient-one))] to-[hsl(var(--gradient-two))] border-0">
            Gradient Button
          </Button>

          {/* Username with Gradient Text */}
          <div className="flex items-center">
            <span className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--gradient-one))] to-[hsl(var(--gradient-two))] bg-clip-text text-transparent">
              @username
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ThemeCustomizerProps {
  isDarkMode: boolean
  onReset: () => void
  lightColors: Record<string, string>
  darkColors: Record<string, string>
  setLightColors: (colors: Record<string, string>) => void
  setDarkColors: (colors: Record<string, string>) => void
  borderRadius: number
  setBorderRadius: (radius: number) => void
}

export function ThemeCustomizer({
  isDarkMode,
  onReset,
  lightColors,
  darkColors,
  setLightColors,
  setDarkColors,
  borderRadius,
  setBorderRadius,
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<string>("light")

  // Handle color change
  const handleColorChange = (mode: "light" | "dark", key: string, value: string) => {
    if (mode === "light") {
      // Create a new object to ensure state update
      const newLightColors = { ...lightColors, [key]: value };
      setLightColors(newLightColors);
      
      // Apply the change to CSS variables immediately
      const root = document.documentElement;
      root.style.setProperty(key, value);
    } else {
      // Create a new object to ensure state update
      const newDarkColors = { ...darkColors, [key]: value };
      setDarkColors(newDarkColors);
      
      // If in dark mode, apply the change to CSS variables immediately
      if (isDarkMode) {
        const root = document.documentElement;
        root.style.setProperty(key, value);
      }
      
      // Update the dark mode style element
      const darkModeStyles = Object.entries({ ...darkColors, [key]: value })
        .map(([k, v]) => `${k}: ${v};`)
        .join(" ");
      
      const styleId = "theme-dark-colors";
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `.dark {\n  ${darkModeStyles}\n}`;
    }
  }

  // Update active tab when dark mode changes
  useEffect(() => {
    setActiveTab(isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  return (
    <Card className="mb-8 max-w-[1000px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Theme Customizer</h2>
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset to Default
          </Button>
        </div>

        {/* Border Radius and Gradient Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <RadiusControl value={borderRadius} onChange={setBorderRadius} />
          <GradientShowcase />
        </div>

        <Separator className="my-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="light">Light Mode</TabsTrigger>
            <TabsTrigger value="dark">Dark Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="light" className="space-y-4">
            <div className="overflow-x-auto pb-4">
              <div className="grid grid-cols-11 gap-6" style={{ minWidth: "2400px" }}>
                {themeColors.map((color) => (
                  <ColorPicker
                    key={color.colorKey}
                    label={color.label}
                    colorKey={color.colorKey}
                    defaultValue={lightColors[color.colorKey]}
                    onChange={(key, value) => handleColorChange("light", key, value)}
                    isDarkMode={false}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dark" className="space-y-4">
            <div className="overflow-x-auto pb-4">
              <div className="grid grid-cols-11 gap-6" style={{ minWidth: "2400px" }}>
                {themeColors.map((color) => (
                  <ColorPicker
                    key={color.colorKey}
                    label={color.label}
                    colorKey={color.colorKey}
                    defaultValue={darkColors[color.colorKey]}
                    onChange={(key, value) => handleColorChange("dark", key, value)}
                    isDarkMode={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

