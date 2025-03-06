"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { usePaletteStore } from "@/lib/store";
import { Palette } from "@/lib/db";
import {
  Download,
  Upload,
  Save,
  Trash2,
  Palette as PaletteIcon,
  X,
  FileJson,
  Copy,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { hslToHex } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Debug utility function
const debugPalette = (palette: Palette) => {
  console.group(`Palette: ${palette.name}`);
  console.log("ID:", palette.id);
  console.log("Created At:", palette.createdAt);
  console.log("Border Radius:", palette.borderRadius);

  console.group("Light Colors:");
  console.log(palette.lightColors);
  console.groupEnd();

  console.group("Dark Colors:");
  console.log(palette.darkColors);
  console.groupEnd();

  console.groupEnd();
};

export function PaletteManager() {
  const {
    lightColors,
    darkColors,
    borderRadius,
    savedPalettes,
    savePalette,
    loadPalette,
    loadSavedPalettes,
    deletePalette,
    setLightColors,
    setDarkColors,
    setBorderRadius,
    setShowActionsContainer,
    showActionsContainer,
    saveDialogOpen,
    setSaveDialogOpen,
  } = usePaletteStore();

  const [paletteName, setPaletteName] = useState("");
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [importError, setImportError] = useState("");
  const [editingPaletteId, setEditingPaletteId] = useState<number | undefined>(
    undefined
  );
  const { toast } = useToast();

  // Load saved palettes on component mount
  useEffect(() => {
    loadSavedPalettes().then(() => {
      // Log the loaded palettes for debugging
      if (savedPalettes.length > 0) {
        console.log(`Loaded ${savedPalettes.length} palettes`);
        savedPalettes.forEach(debugPalette);
      } else {
        console.log("No saved palettes found");
      }
    });
  }, [loadSavedPalettes, savedPalettes.length]);

  // Handle saving a palette
  const handleSavePalette = async () => {
    if (!paletteName.trim()) {
      return;
    }

    if (paletteName.trim() === "Default Palette") {
      toast({
        title: "Cannot save as 'Default Palette'",
        description:
          "Can't save item with name 'Default Palette'. Save as a palette with a new name instead.",
      });
      return;
    }

    try {
      // Get the current state directly from the store to ensure we're saving the latest values
      console.log("Saving palette with name:", paletteName.trim());

      // Log the current state for debugging
      const currentState = usePaletteStore.getState();
      console.log("Current light colors:", currentState.lightColors);
      console.log("Current dark colors:", currentState.darkColors);
      console.log("Current border radius:", currentState.borderRadius);

      const id = await savePalette(paletteName.trim(), editingPaletteId);

      // If id is -1, the user cancelled the confirmation
      if (id === -1) {
        return;
      }

      setPaletteName("");
      setSaveDialogOpen(false);
      setEditingPaletteId(undefined);

      toast({
        title: editingPaletteId ? "Palette updated" : "Palette saved",
        description: `"${paletteName}" has been ${
          editingPaletteId ? "updated" : "saved"
        } to your collection.`,
      });
    } catch (error) {
      console.error("Error saving palette:", error);
      toast({
        title: "Error",
        description: "There was an error saving your palette.",
        variant: "destructive",
      });
    }
  };

  // Handle loading a palette
  const handleLoadPalette = async (id: number) => {
    try {
      console.log(`Loading palette with ID: ${id}`);
      await loadPalette(id);

      toast({
        title: "Palette loaded",
        description: "The selected palette has been applied.",
      });
    } catch (error) {
      console.error("Error loading palette:", error);
      toast({
        title: "Error loading palette",
        description:
          "There was an error loading the palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a palette
  const handleDeletePalette = async (id: number, name: string) => {
    try {
      await deletePalette(id);

      toast({
        title: "Palette deleted",
        description: `"${name}" has been removed from your collection.`,
      });
    } catch (error) {
      toast({
        title: "Error deleting palette",
        description:
          "There was an error deleting the palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export palette to JSON
  const handleExportPalette = (palette: Palette) => {
    try {
      const exportData = JSON.stringify(palette, null, 2);
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${palette.name
        .replace(/\s+/g, "-")
        .toLowerCase()}-palette.json`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Palette exported",
        description: "Your palette has been exported as a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Error exporting palette",
        description:
          "There was an error exporting your palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export current palette
  const handleExportCurrentPalette = () => {
    try {
      // Get the current colors from the store instead of using local variables
      const currentLightColors = usePaletteStore.getState().lightColors;
      const currentDarkColors = usePaletteStore.getState().darkColors;
      const currentBorderRadius = usePaletteStore.getState().borderRadius;

      const currentPalette: Omit<Palette, "id"> = {
        name: "Current Palette",
        createdAt: new Date(),
        lightColors: currentLightColors,
        darkColors: currentDarkColors,
        borderRadius: currentBorderRadius,
      };

      const exportData = JSON.stringify(currentPalette, null, 2);
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "current-palette.json";
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Current palette exported",
        description: "Your current palette has been exported as a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Error exporting palette",
        description:
          "There was an error exporting your palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Import palette from JSON
  const handleImportPalette = async () => {
    try {
      setImportError("");

      if (!importData.trim()) {
        setImportError("Please enter JSON data");
        return;
      }

      let paletteData;
      try {
        paletteData = JSON.parse(importData);
      } catch (e) {
        setImportError("Invalid JSON format");
        return;
      }

      // Check if this is the format from the screenshot (with name, lightColors, darkColors properties)
      if (
        paletteData.name &&
        (paletteData.lightColors || paletteData.darkColors)
      ) {
        // This is already in the expected format
      }
      // Check if this is a direct palette object from localStorage/IndexedDB
      else if (typeof paletteData === "object" && paletteData !== null) {
        // Try to convert it to the expected format
        const name = paletteData.name || "Imported Palette";
        const lightColors: Record<string, any> = {};
        const darkColors: Record<string, any> = {};
        const borderRadius = paletteData.borderRadius || 0.5;

        // Extract color properties
        Object.entries(paletteData).forEach(([key, value]) => {
          if (
            key === "name" ||
            key === "id" ||
            key === "borderRadius" ||
            key === "createdAt"
          ) {
            return; // Skip non-color properties
          }

          if (typeof value === "object" && value !== null) {
            // This might be a color object like in the screenshot
            if ("name" in value) {
              // This is likely a color object
              if (key.startsWith("light") || !key.startsWith("dark")) {
                lightColors[key] = value;
              }
              if (key.startsWith("dark")) {
                darkColors[key.replace("dark", "")] = value;
              }
            }
          }
        });

        // Create the palette data in the expected format
        paletteData = {
          name,
          lightColors,
          darkColors,
          borderRadius,
        };
      } else {
        setImportError("Invalid palette data format");
        return;
      }

      // Validate the imported data
      if (
        !paletteData.name ||
        (!paletteData.lightColors && !paletteData.darkColors)
      ) {
        setImportError("Invalid palette data format");
        return;
      }

      // Ensure we have both light and dark colors
      if (!paletteData.lightColors) {
        paletteData.lightColors = {};
      }
      if (!paletteData.darkColors) {
        paletteData.darkColors = {};
      }

      // Create a new palette object with the imported data
      const newPalette = {
        name: paletteData.name as string,
        lightColors: paletteData.lightColors,
        darkColors: paletteData.darkColors,
        borderRadius:
          typeof paletteData.borderRadius === "number"
            ? paletteData.borderRadius
            : 0.5,
      };

      // Apply the imported palette data to the store
      setLightColors(newPalette.lightColors);
      setDarkColors(newPalette.darkColors);
      setBorderRadius(newPalette.borderRadius);

      // Apply colors to CSS variables
      const root = document.documentElement;
      const isDarkModeActive =
        document.documentElement.classList.contains("dark");
      const colors = isDarkModeActive
        ? newPalette.darkColors
        : newPalette.lightColors;

      // First, clear any existing inline styles to ensure clean application
      root.style.cssText = "";

      // Apply border radius
      root.style.setProperty("--radius", `${newPalette.borderRadius}rem`);

      // Apply colors based on current theme
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value as string);
      });

      // Apply dark colors inside the .dark selector scope
      const darkModeStyles = Object.entries(newPalette.darkColors)
        .map(([key, value]) => `${key}: ${value as string};`)
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

      // Save the palette to the database
      const id = await savePalette(newPalette.name);

      // Close the dialog and reset the import data
      setImportDialogOpen(false);
      setImportData("");

      toast({
        title: "Palette imported",
        description: `"${newPalette.name}" has been imported and applied.`,
      });
    } catch (error) {
      console.error("Error importing palette:", error);
      setImportError("An error occurred while importing the palette");
    }
  };

  // Handle copying color value to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: `${label} has been copied to your clipboard.`,
          duration: 2000,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
    );
  };

  // Handle editing a palette name
  const handleEditPalette = (palette: Palette) => {
    setPaletteName(palette.name);
    setEditingPaletteId(palette.id);
    setSaveDialogOpen(true);
  };

  // Handle overwriting an existing palette with current settings
  const handleOverwritePalette = async (palette: Palette) => {
    try {
      setPaletteName(palette.name);
      setEditingPaletteId(palette.id);

      // Get the current state directly from the store to ensure we're saving the latest values
      console.log("Overwriting palette:", palette.name);

      // Log the current state for debugging
      const currentState = usePaletteStore.getState();
      console.log("Current light colors:", currentState.lightColors);
      console.log("Current dark colors:", currentState.darkColors);
      console.log("Current border radius:", currentState.borderRadius);

      const id = await savePalette(palette.name, palette.id);

      // If id is -1, the user cancelled the confirmation
      if (id === -1) {
        setEditingPaletteId(undefined);
        setPaletteName("");
        return;
      }

      setEditingPaletteId(undefined);
      setPaletteName("");

      toast({
        title: "Palette updated",
        description: `"${palette.name}" has been updated with your current settings.`,
      });
    } catch (error) {
      console.error("Error overwriting palette:", error);
      toast({
        title: "Error",
        description: "There was an error updating your palette.",
        variant: "destructive",
      });
      setEditingPaletteId(undefined);
      setPaletteName("");
    }
  };

  // Define palette actions as a constant object
  const paletteActions = [
    {
      id: "load",
      label: "Load palette",
      icon: PaletteIcon,
      onClick: (palette: Palette) => handleLoadPalette(palette.id!),
    },
    {
      id: "edit",
      label: "Edit palette name",
      icon: Pencil,
      onClick: (palette: Palette) => handleEditPalette(palette),
    },
    {
      id: "overwrite",
      label: "Overwrite with current settings",
      icon: Save,
      onClick: (palette: Palette) => handleOverwritePalette(palette),
    },
    {
      id: "export",
      label: "Export palette",
      icon: Download,
      onClick: (palette: Palette) => handleExportPalette(palette),
    },
    {
      id: "delete",
      label: "Delete palette",
      icon: Trash2,
      onClick: (palette: Palette) => {
        // Prevent deletion of the default palette
        if (palette.name === "Default Palette" || savedPalettes.length === 1) {
          toast({
            title: "Cannot Delete Default Palette",
            description:
              "The default palette cannot be deleted. You can modify it or create new palettes instead.",
            variant: "destructive",
          });
          return;
        }
        handleDeletePalette(palette.id!, palette.name);
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center justify-between group cursor-pointer"
          onClick={() => setShowActionsContainer(!showActionsContainer)}
        >
          Palette Manager
          <Button variant="ghost" size="icon" className="group-hover:bg-accent">
            {showActionsContainer ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardTitle>
        <CardDescription>
          Save, load, and manage your color palettes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showActionsContainer && (
          <Tabs defaultValue="saved">
            <TabsList className="flex w-fit">
              <TabsTrigger value="saved">Saved Palettes</TabsTrigger>
              <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Your Palettes</h3>
                  <Dialog
                    open={saveDialogOpen}
                    onOpenChange={setSaveDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save Current
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingPaletteId ? "Edit Palette" : "Save Palette"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingPaletteId
                            ? "Edit the palette name and save your changes."
                            : "Give your palette a name to save it to your collection."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="palette-name">Palette Name</Label>
                        <Input
                          id="palette-name"
                          maxLength={40}
                          value={paletteName}
                          onChange={(e) => setPaletteName(e.target.value.trim())}
                          placeholder="My Awesome Theme"
                        />
                        {paletteName.length > 20 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {paletteName.length} / 40
                          </p>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSaveDialogOpen(false);
                            setEditingPaletteId(undefined);
                            setPaletteName("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSavePalette}>
                          {editingPaletteId ? "Update" : "Save"} Palette
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {savedPalettes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You haven't saved any palettes yet.</p>
                    <p className="text-sm mt-2">
                      Save your current theme to start building your collection.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {savedPalettes.map((palette) => (
                        <div
                          key={palette.id}
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center w-full justify-between space-x-3 gap-3">
                            <div className="flex items-center gap-5">
                              <div className="flex flex-col gap-1">
                                <div className="flex space-x-2 items-center">
                                  {Object.entries(palette.lightColors)
                                    .filter(
                                      ([key]) =>
                                        key === "--primary" ||
                                        key === "--secondary" ||
                                        key === "--accent"
                                    )
                                    .map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="w-4 h-4 rounded-full border"
                                        style={{
                                          backgroundColor: `hsl(${value})`,
                                        }}
                                        title={key.replace("--", "")}
                                      />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{palette.name}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(
                                    palette.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              {Object.entries(palette.lightColors)
                                .filter(
                                  ([key]) =>
                                    key === "--primary" ||
                                    (key === "--secondary" && palette.isDuoTone)
                                )
                                .map(([key, value]) => {
                                  // Parse HSL values correctly
                                  const hslParts = value.split(" ");
                                  const h = parseFloat(hslParts[0]);
                                  const s = parseFloat(
                                    hslParts[1].replace("%", "")
                                  );
                                  const l = parseFloat(
                                    hslParts[2].replace("%", "")
                                  );

                                  const hexValue = `#${hslToHex(h, s, l)}`;
                                  const hslValue = value;
                                  const colorName = key.replace("--", "");

                                  return (
                                    <div
                                      key={key}
                                      className="text-xs flex flex-col gap-1"
                                      title={colorName}
                                    >
                                      <span className="text-xs text-muted-foreground">
                                        {key}
                                      </span>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span
                                            className="font-medium cursor-pointer hover:text-primary transition-colors duration-200 hover:underline"
                                            onClick={() =>
                                              copyToClipboard(
                                                hexValue,
                                                `Hex color (${colorName})`
                                              )
                                            }
                                          >
                                            {hexValue}
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Click to copy hex value</p>
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span
                                            className="text-muted-foreground ml-1 cursor-pointer hover:text-muted-foreground/80 transition-colors duration-200 hover:underline"
                                            onClick={() =>
                                              copyToClipboard(
                                                `hsl(${hslValue})`,
                                                `HSL color (${colorName})`
                                              )
                                            }
                                          >
                                            (hsl: {value})
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Click to copy HSL value</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="flex gap-2">
                              {/* Desktop view - show buttons with tooltips */}
                              <div className="hidden md:flex space-x-2">
                                {paletteActions
                                  .filter(
                                    (_action, index) =>
                                      (palette.name == "Default Palette" &&
                                        index == 0) ||
                                      (palette.name !== "Default Palette" &&
                                        index > 0)
                                  )
                                  .map((action) => (
                                    <Tooltip key={action.id}>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            action.onClick(palette)
                                          }
                                          title={action.label}
                                        >
                                          <action.icon className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{action.label}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ))}
                              </div>

                              {/* Mobile view - show dropdown menu */}
                              {palette.name !== "Default Palette" && (
                                <div className="md:hidden">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Palette Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      {paletteActions.map((action) => (
                                        <DropdownMenuItem
                                          key={action.id}
                                          onClick={() =>
                                            action.onClick(palette)
                                          }
                                        >
                                          <action.icon className="mr-2 h-4 w-4" />
                                          {action.label}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </TabsContent>

            <TabsContent value="import-export">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Export Current Palette
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your current palette as a JSON file that you can
                    share or import later.
                  </p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleExportCurrentPalette}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Current Palette
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save your current palette as a JSON file</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Import Palette</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import a palette from a JSON file or paste JSON data
                    directly.
                  </p>
                  <Dialog
                    open={importDialogOpen}
                    onOpenChange={setImportDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button>
                            <Upload className="h-4 w-4 mr-2" />
                            Import Palette
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Load a palette from a JSON file</p>
                        </TooltipContent>
                      </Tooltip>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Import Palette</DialogTitle>
                        <DialogDescription>
                          Paste the JSON data of a palette to import it.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="import-data">Palette JSON Data</Label>
                        <Textarea
                          id="import-data"
                          className="w-full h-[200px] p-2 border rounded-md font-mono text-sm mt-2"
                          value={importData}
                          onChange={(e) => setImportData(e.target.value.trim())}
                          placeholder='{"name":"My Theme","lightColors":{"--primary":"222.2 47.4% 11.2%"},"darkColors":{"--primary":"210 40% 98%"},"borderRadius":0.5}'
                        />
                        {importError && (
                          <p className="text-sm text-destructive mt-2">
                            {importError}
                          </p>
                        )}
                      </div>
                      <DialogFooter>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => setImportDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Close without importing</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={handleImportPalette}>
                              Import
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Import the palette from JSON</p>
                          </TooltipContent>
                        </Tooltip>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
