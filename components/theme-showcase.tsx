"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThemeCustomizer } from "./color-picker"
import { ColorPaletteGenerator } from "./color-palette-generator"
import { BarChartDemo } from "./charts/bar-chart"
import { LineChartDemo } from "./charts/line-chart"
import { PieChartDemo } from "./charts/pie-chart"
import { DemoNavbar } from "./demo-navbar"
import { DemoSidebar } from "./demo-sidebar"
import { DemoPagination } from "./demo-pagination"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { Toaster } from "./ui/toaster"
import { generateColorPalette } from "@/lib/utils"
import { getDefaultColors } from "@/lib/theme-config"

export default function ThemeShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [placeholderDialogOpen, setPlaceholderDialogOpen] = useState(false)
  const [lightColors, setLightColors] = useState(() => {
    const defaults = getDefaultColors("light")
    return defaults || {} // Ensure we never have undefined
  })
  const [darkColors, setDarkColors] = useState(() => {
    const defaults = getDefaultColors("dark")
    return defaults || {} // Ensure we never have undefined
  })
  const [borderRadius, setBorderRadius] = useState(0.5)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const applyGeneratedPalette = async (primaryColor: string) => {
    const palette = generateColorPalette(primaryColor)

    // Convert palette format to match the format used by ThemeCustomizer
    const newLightColors = Object.entries(palette.light).reduce(
      (acc, [key, value]) => {
        acc[`--${key}`] = value
        return acc
      },
      {} as Record<string, string>,
    )

    const newDarkColors = Object.entries(palette.dark).reduce(
      (acc, [key, value]) => {
        acc[`--${key}`] = value
        return acc
      },
      {} as Record<string, string>,
    )

    // Update state
    setLightColors(newLightColors)
    setDarkColors(newDarkColors)

    // Apply colors to CSS variables
    const root = document.documentElement

    // First, clear any existing inline styles to ensure clean application
    root.style.cssText = ""

    // Apply border radius
    root.style.setProperty("--radius", `${borderRadius}rem`)

    // Apply BOTH light and dark colors to ensure they're available when toggling
    Object.entries(newLightColors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply dark colors inside the .dark selector scope
    const darkModeStyles = Object.entries(newDarkColors)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")

    // Create and append a style element with dark mode colors
    const styleId = "theme-dark-colors"
    let styleEl = document.getElementById(styleId) as HTMLStyleElement
    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = `.dark {\n  ${darkModeStyles}\n}`

    // Force a re-render by quickly toggling the theme class
    const currentThemeState = isDarkMode

    // Toggle theme state and class
    document.documentElement.classList.toggle("dark")
    setIsDarkMode(!currentThemeState)

    // Wait for a microtask to complete
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Restore original theme state and class
    if (currentThemeState) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setIsDarkMode(currentThemeState)
  }

  const resetTheme = () => {
    // Reset to default colors
    const defaultLightColors = getDefaultColors("light")
    const defaultDarkColors = getDefaultColors("dark")

    setLightColors(defaultLightColors)
    setDarkColors(defaultDarkColors)
    setBorderRadius(0.5)

    // Reset CSS variables
    const root = document.documentElement
    root.style.cssText = ""

    // Remove the dark mode style element if it exists
    const styleEl = document.getElementById("theme-dark-colors")
    if (styleEl) {
      styleEl.remove()
    }
  }

  useEffect(() => {
    const root = document.documentElement
    const colors = isDarkMode ? darkColors : lightColors

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply border radius
    root.style.setProperty("--radius", `${borderRadius}rem`)
  }, [isDarkMode, lightColors, darkColors, borderRadius])

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-background text-foreground">
        <div className="flex">
          <SidebarProvider>
            <DemoSidebar />
            <div className="flex-1 p-8 pt-0">
              <DemoNavbar>
                <SidebarTrigger className="mr-2" />
              </DemoNavbar>
              <header className="flex justify-between items-center mb-8 mt-4">
                <h1 className="text-3xl font-bold">Shadcn UI Theme Showcase</h1>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </header>

              <div className="container mx-auto px-0 max-w-[1200px]">
                <Tabs defaultValue="customizer" className="w-full mb-8">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="customizer">Theme Customizer</TabsTrigger>
                    <TabsTrigger value="generator">Palette Generator</TabsTrigger>
                  </TabsList>
                  <TabsContent value="customizer">
                    <ThemeCustomizer
                      isDarkMode={isDarkMode}
                      onReset={resetTheme}
                      lightColors={lightColors}
                      darkColors={darkColors}
                      setLightColors={setLightColors}
                      setDarkColors={setDarkColors}
                      borderRadius={borderRadius}
                      setBorderRadius={setBorderRadius}
                    />
                  </TabsContent>
                  <TabsContent value="generator">
                    <Card>
                      <CardHeader>
                        <CardTitle>Color Palette Generator</CardTitle>
                        <CardDescription>Generate a complete theme from a single color</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ColorPaletteGenerator onApplyPalette={applyGeneratedPalette} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <Tabs defaultValue="buttons" className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
                    <TabsTrigger value="buttons">Buttons</TabsTrigger>
                    <TabsTrigger value="inputs">Inputs</TabsTrigger>
                    <TabsTrigger value="cards">Cards</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="charts">Charts</TabsTrigger>
                    <TabsTrigger value="navigation">Navigation</TabsTrigger>
                    <TabsTrigger value="misc">Misc</TabsTrigger>
                  </TabsList>

                  <TabsContent value="buttons" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Default</h3>
                          <div className="flex flex-col gap-2">
                            <Button>Default Button</Button>
                            <Button className="hover:bg-primary/90">Hovered (Simulated)</Button>
                            <Button disabled>Disabled</Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Secondary</h3>
                          <div className="flex flex-col gap-2">
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="secondary" className="hover:bg-secondary/80">
                              Hovered (Simulated)
                            </Button>
                            <Button variant="secondary" disabled>
                              Disabled
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Destructive</h3>
                          <div className="flex flex-col gap-2">
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="destructive" className="hover:bg-destructive/90">
                              Hovered (Simulated)
                            </Button>
                            <Button variant="destructive" disabled>
                              Disabled
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Outline</h3>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline">Outline</Button>
                            <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground">
                              Hovered (Simulated)
                            </Button>
                            <Button variant="outline" disabled>
                              Disabled
                            </Button>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
                      <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button>Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon">
                          <Sun className="h-4 w-4" />
                        </Button>
                      </div>
                    </section>
                  </TabsContent>

                  <TabsContent value="inputs" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Form Elements</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="default-input">Default Input</Label>
                            <Input id="default-input" placeholder="Default input" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="focused-input">Focused Input (Simulated)</Label>
                            <Input
                              id="focused-input"
                              placeholder="Focused input"
                              className="ring-2 ring-ring ring-offset-2 ring-offset-background"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="disabled-input">Disabled Input</Label>
                            <Input id="disabled-input" placeholder="Disabled input" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="with-value">Input with Value</Label>
                            <Input id="with-value" value="This is a value" />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label>Checkbox</Label>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Accept terms and conditions
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms-disabled" disabled />
                              <label
                                htmlFor="terms-disabled"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Disabled checkbox
                              </label>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label>Radio Group</Label>
                            <RadioGroup defaultValue="option-one">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Option One</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Option Two</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three" disabled />
                                <Label htmlFor="option-three" className="opacity-70">
                                  Disabled Option
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-4">
                            <Label>Switch</Label>
                            <div className="flex items-center space-x-2">
                              <Switch id="airplane-mode" />
                              <Label htmlFor="airplane-mode">Airplane Mode</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="disabled-switch" disabled />
                              <Label htmlFor="disabled-switch" className="opacity-70">
                                Disabled Switch
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Select & Slider</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label>Select</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="option1">Option 1</SelectItem>
                              <SelectItem value="option2">Option 2</SelectItem>
                              <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <Label>Slider</Label>
                          <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                      </div>
                    </section>
                  </TabsContent>

                  <TabsContent value="cards" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Cards</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Default Card</CardTitle>
                            <CardDescription>This is a default card component</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Card content goes here. This shows the default styling of the card component.</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Submit</Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-primary">
                          <CardHeader className="bg-primary/5">
                            <CardTitle>Primary Accent</CardTitle>
                            <CardDescription>Card with primary color accent</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card has a primary color border and header background.</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Submit</Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-destructive">
                          <CardHeader className="bg-destructive/5">
                            <CardTitle>Destructive Accent</CardTitle>
                            <CardDescription>Card with destructive color accent</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card has a destructive color border and header background.</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Delete</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4">Card with Placeholder Data</h2>
                      <Card className="max-w-md">
                        <CardHeader>
                          <CardTitle>Project Statistics</CardTitle>
                          <CardDescription>Overview of your project metrics for the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Total Views</span>
                              <span className="font-bold">12,543</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Conversion Rate</span>
                              <span className="font-bold">3.2%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "32%" }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Active Users</span>
                              <span className="font-bold">1,832</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "48%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Export Data</Button>
                          <Button onClick={() => setPlaceholderDialogOpen(true)}>View Details</Button>
                        </CardFooter>
                      </Card>
                    </section>
                  </TabsContent>

                  <TabsContent value="feedback" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
                      <div className="space-y-4">
                        <Alert>
                          <AlertTitle>Default Alert</AlertTitle>
                          <AlertDescription>This is a default alert component.</AlertDescription>
                        </Alert>

                        <Alert variant="destructive">
                          <AlertTitle>Destructive Alert</AlertTitle>
                          <AlertDescription>This is a destructive alert component.</AlertDescription>
                        </Alert>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
                      <div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>Open Dialog</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Dialog Title</DialogTitle>
                              <DialogDescription>
                                This is a dialog component. It appears in a modal overlay.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p>Dialog content goes here. This shows how the colors work in a dialog context.</p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setDialogOpen(false)}>Continue</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </section>
                  </TabsContent>

                  <TabsContent value="charts" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
                      <Card>
                        <CardHeader>
                          <CardTitle>Monthly Revenue</CardTitle>
                          <CardDescription>Revenue breakdown by month</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <BarChartDemo />
                        </CardContent>
                      </Card>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
                      <Card>
                        <CardHeader>
                          <CardTitle>Website Analytics</CardTitle>
                          <CardDescription>Traffic and conversion metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <LineChartDemo />
                        </CardContent>
                      </Card>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
                      <Card>
                        <CardHeader>
                          <CardTitle>Device Distribution</CardTitle>
                          <CardDescription>User device breakdown</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <PieChartDemo />
                        </CardContent>
                      </Card>
                    </section>
                  </TabsContent>

                  <TabsContent value="navigation" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Pagination</h2>
                      <Card>
                        <CardHeader>
                          <CardTitle>Pagination Examples</CardTitle>
                          <CardDescription>Different pagination styles and states</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DemoPagination />
                        </CardContent>
                      </Card>
                    </section>
                  </TabsContent>

                  <TabsContent value="misc" className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Badges</h2>
                      <div className="flex flex-wrap gap-4">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Dropdown Menu (Open by Default)</h2>
                      <div className="relative">
                        <Button variant="outline" className="w-[200px] justify-between">
                          Open Menu
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                        <div className="absolute top-full left-0 z-10 mt-2 w-[200px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                          <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
                          <div className="h-px my-1 bg-muted"></div>
                          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                            Profile
                          </button>
                          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                            Billing
                          </button>
                          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                            Team
                          </button>
                          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                            Subscription
                          </button>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Tooltip</h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover Me</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is a tooltip</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">Separator</h2>
                      <div className="space-y-4">
                        <div>Above separator</div>
                        <Separator />
                        <div>Below separator</div>
                      </div>
                    </section>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>

      <Dialog open={placeholderDialogOpen} onOpenChange={setPlaceholderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
            <DialogDescription>Detailed statistics and information about your project.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name" className="text-right">
                Project Name
              </Label>
              <Input id="project-name" value="Marketing Dashboard" className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="created-date" className="text-right">
                Created
              </Label>
              <Input id="created-date" value="March 22, 2023" className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3 flex items-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Active
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team-members" className="text-right">
                Team
              </Label>
              <div className="col-span-3 flex -space-x-2">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                  JD
                </div>
                <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  TK
                </div>
                <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  AS
                </div>
                <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                  +2
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlaceholderDialogOpen(false)}>
              Close
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

