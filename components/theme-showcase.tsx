"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, ChevronDown, ChevronUp, Computer, SlidersHorizontal, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeCustomizer } from "./color-picker";
import { ColorPaletteGenerator } from "./color-palette-generator";
import { PaletteManager } from "./palette-manager";
import { BarChartDemo } from "./charts/bar-chart";
import { LineChartDemo } from "./charts/line-chart";
import { PieChartDemo } from "./charts/pie-chart";
import { DemoNavbar } from "./demo-navbar";
import { DemoSidebar } from "./demo-sidebar";
import { DemoPagination } from "./demo-pagination";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Toaster } from "./ui/toaster";
import { generateColorPalette, generateDuotoneColorPalette } from "@/lib/utils";
import { getDefaultColors } from "@/lib/theme-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaletteStore, initializePaletteStore } from "@/lib/store";

// Import our new category components
import {
  InputControls,
  CardComponents,
  FeedbackComponents,
  ChartComponents,
  NavigationComponents,
  MiscComponents,
} from "./showcase-categories";

export default function ThemeShowcase() {
  const {
    isDarkMode,
    setIsDarkMode,
    lightColors,
    darkColors,
    borderRadius,
    setLightColors,
    setDarkColors,
    setBorderRadius,
    resetTheme: storeResetTheme,
    savedPalettes,
    loadSavedPalettes,
    showActionsContainer,
    setShowActionsContainer,
    tabValue,
    setTabValue,
  } = usePaletteStore();

  // Initialize the palette store once when the component mounts
  useEffect(() => {
    // Initialize the palette database and load saved palettes
    initializePaletteStore().catch((error) => {
      console.error("Failed to initialize palette store:", error);
    });
  }, []); // Empty dependency array ensures this only runs once

  // Handle dark mode class toggling separately
  useEffect(() => {
    // Set the dark mode class based on the store value
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const applyGeneratedPalette = async (
    primaryColor: string,
    secondaryColor?: string,
    mode?: "single" | "duotone"
  ) => {
    // Generate the appropriate palette based on mode
    const palette =
      mode === "duotone" && secondaryColor
        ? generateDuotoneColorPalette(primaryColor, secondaryColor)
        : generateColorPalette(primaryColor);

    // Convert palette format to match the format used by ThemeCustomizer
    const newLightColors = Object.entries(palette.light).reduce(
      (acc, [key, value]) => {
        acc[`--${key}`] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const newDarkColors = Object.entries(palette.dark).reduce(
      (acc, [key, value]) => {
        acc[`--${key}`] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    // Update store state
    setLightColors(newLightColors);
    setDarkColors(newDarkColors);

    // Apply colors to CSS variables
    const root = document.documentElement;

    // First, clear any existing inline styles to ensure clean application
    root.style.cssText = "";

    // Apply border radius
    root.style.setProperty("--radius", `${borderRadius}rem`);

    // Apply BOTH light and dark colors to ensure they're available when toggling
    Object.entries(newLightColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply dark colors inside the .dark selector scope
    const darkModeStyles = Object.entries(newDarkColors)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    // Create and append a style element with dark mode colors
    const styleId = "theme-dark-colors";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `.dark {\n  ${darkModeStyles}\n}`;

    // Force a re-render by quickly toggling the theme class
    const currentThemeState = isDarkMode;

    // Toggle theme state and class
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!currentThemeState);

    // Wait for a microtask to complete
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Restore original theme state and class
    if (currentThemeState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(currentThemeState);
  };

  // Use the store's reset function
  const resetTheme = async () => {
    await storeResetTheme();
  };

  useEffect(() => {
    const root = document.documentElement;
    const colors = isDarkMode ? darkColors : lightColors;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply border radius
    root.style.setProperty("--radius", `${borderRadius}rem`);
  }, [isDarkMode, lightColors, darkColors, borderRadius]);

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
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </header>

              <div className="container mx-auto px-0 max-w-[1200px]">
                <Tabs
                  onValueChange={(value) => {
                    setTabValue(value);
                  }}
                  value={tabValue}
                  className="w-full mb-8"
                >
                  <div className="flex flex-wrap items-center gap-4 justify-between pb-2 mb-2">
                    <TabsList className="flex w-fit">
                      <TabsTrigger value="generator" className="flex items-center">
                        <Computer className="w-4 h-4 mr-2" />
                        <span className="hidden md:block">
                          Palette Generator
                        </span>
                        <span className="block md:hidden">Palet. Gen.</span>
                      </TabsTrigger>
                      <TabsTrigger value="customizer" className="flex items-center">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        <span className="hidden md:block">
                          Theme Customizer
                        </span>
                        <span className="block md:hidden">Theme Cust.</span>
                      </TabsTrigger>
                      <TabsTrigger value="manager" className="flex items-center">
                        <Folder className="w-4 h-4 mr-2" />
                        <span className="hidden md:block">Palette Manager</span>
                        <span className="block md:hidden">Palet. Mgr</span>
                      </TabsTrigger>
                    </TabsList>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={resetTheme}
                    >
                      Reset to Default
                    </Button>
                  </div>
                  <TabsContent value="customizer">
                    <ThemeCustomizer
                      isDarkMode={isDarkMode}
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
                        <CardTitle
                          className="flex items-center justify-between group cursor-pointer"
                          onClick={() =>
                            setShowActionsContainer(!showActionsContainer)
                          }
                        >
                          Palette Generator{" "}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="group-hover:bg-accent"
                          >
                            {!showActionsContainer ? (
                              <ChevronDown />
                            ) : (
                              <ChevronUp />
                            )}
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          Generate a complete theme from a single color
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {showActionsContainer && (
                          <ColorPaletteGenerator
                            onApplyPalette={applyGeneratedPalette}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="manager">
                    <PaletteManager />
                  </TabsContent>
                </Tabs>

                <Card>
                  <CardHeader>
                    <CardTitle>Theme Showcase</CardTitle>
                    <CardDescription>
                      Sample Shadcn UI components to showcase the color palette
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="buttons" className="w-full">
                      <div className="overflow-x-auto pb-2 mb-6">
                        <TabsList className="flex flex-wrap h-fit w-fit items-center justify-start">
                          <TabsTrigger value="buttons">Buttons</TabsTrigger>
                          <TabsTrigger value="cards">Cards</TabsTrigger>
                          <TabsTrigger value="feedback">Feedback</TabsTrigger>
                          <TabsTrigger value="charts">Charts</TabsTrigger>
                          <TabsTrigger value="navigation">
                            Navigation
                          </TabsTrigger>
                          <TabsTrigger value="misc">Misc</TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="buttons" className="space-y-8">
                        <InputControls />
                      </TabsContent>

                      <TabsContent value="inputs" className="space-y-8">
                        <InputControls />
                      </TabsContent>

                      <TabsContent value="cards" className="space-y-8">
                        <CardComponents />
                      </TabsContent>

                      <TabsContent value="feedback" className="space-y-8">
                        <FeedbackComponents />
                      </TabsContent>

                      <TabsContent value="charts" className="space-y-8">
                        <ChartComponents />
                      </TabsContent>

                      <TabsContent value="navigation" className="space-y-8">
                        <NavigationComponents />
                      </TabsContent>

                      <TabsContent value="misc" className="space-y-8">
                        <MiscComponents />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
