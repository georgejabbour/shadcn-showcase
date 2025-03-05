"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePaletteStore } from "@/lib/store"
import { Palette } from "@/lib/db"
import { Download, Upload, Save, Trash2, Check, X, FileJson } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function PaletteManager() {
  const { 
    lightColors, 
    darkColors, 
    borderRadius, 
    savedPalettes, 
    savePalette, 
    loadPalette, 
    loadSavedPalettes, 
    deletePalette 
  } = usePaletteStore()
  
  const [paletteName, setPaletteName] = useState("")
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [importData, setImportData] = useState("")
  const [importError, setImportError] = useState("")
  const { toast } = useToast()

  // Load saved palettes on component mount
  useEffect(() => {
    loadSavedPalettes()
  }, [loadSavedPalettes])

  // Handle saving a palette
  const handleSavePalette = async () => {
    if (!paletteName.trim()) {
      return
    }
    
    try {
      await savePalette(paletteName.trim())
      setPaletteName("")
      setSaveDialogOpen(false)
      
      toast({
        title: "Palette saved",
        description: `"${paletteName}" has been saved to your collection.`,
      })
    } catch (error) {
      toast({
        title: "Error saving palette",
        description: "There was an error saving your palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle loading a palette
  const handleLoadPalette = async (id: number) => {
    try {
      await loadPalette(id)
      
      toast({
        title: "Palette loaded",
        description: "The selected palette has been applied.",
      })
    } catch (error) {
      toast({
        title: "Error loading palette",
        description: "There was an error loading the palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle deleting a palette
  const handleDeletePalette = async (id: number, name: string) => {
    try {
      await deletePalette(id)
      
      toast({
        title: "Palette deleted",
        description: `"${name}" has been removed from your collection.`,
      })
    } catch (error) {
      toast({
        title: "Error deleting palette",
        description: "There was an error deleting the palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Export palette to JSON
  const handleExportPalette = (palette: Palette) => {
    try {
      const exportData = JSON.stringify(palette, null, 2)
      const blob = new Blob([exportData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement("a")
      a.href = url
      a.download = `${palette.name.replace(/\s+/g, "-").toLowerCase()}-palette.json`
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: "Palette exported",
        description: "Your palette has been exported as a JSON file.",
      })
    } catch (error) {
      toast({
        title: "Error exporting palette",
        description: "There was an error exporting your palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Export current palette
  const handleExportCurrentPalette = () => {
    try {
      const currentPalette: Omit<Palette, 'id'> = {
        name: "Current Palette",
        createdAt: new Date(),
        lightColors,
        darkColors,
        borderRadius
      }
      
      const exportData = JSON.stringify(currentPalette, null, 2)
      const blob = new Blob([exportData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement("a")
      a.href = url
      a.download = "current-palette.json"
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: "Current palette exported",
        description: "Your current palette has been exported as a JSON file.",
      })
    } catch (error) {
      toast({
        title: "Error exporting palette",
        description: "There was an error exporting your palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Import palette from JSON
  const handleImportPalette = async () => {
    try {
      setImportError("")
      
      if (!importData.trim()) {
        setImportError("Please enter JSON data")
        return
      }
      
      const paletteData = JSON.parse(importData)
      
      // Validate the imported data
      if (!paletteData.name || !paletteData.lightColors || !paletteData.darkColors || typeof paletteData.borderRadius !== 'number') {
        setImportError("Invalid palette data format")
        return
      }
      
      // Save the imported palette with the data from the JSON
      const newPalette = {
        name: paletteData.name as string,
        lightColors: paletteData.lightColors as Record<string, string>,
        darkColors: paletteData.darkColors as Record<string, string>,
        borderRadius: paletteData.borderRadius as number
      }
      
      // Save the palette to the database
      await savePalette(newPalette.name)
      
      // Apply the imported palette
      usePaletteStore.setState({
        lightColors: newPalette.lightColors,
        darkColors: newPalette.darkColors,
        borderRadius: newPalette.borderRadius
      })
      
      // Apply to CSS variables
      const isDarkMode = usePaletteStore.getState().isDarkMode
      const colors = isDarkMode ? newPalette.darkColors : newPalette.lightColors
      const root = document.documentElement
      
      // Apply border radius
      root.style.setProperty("--radius", `${newPalette.borderRadius}rem`)
      
      // Apply colors
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
      
      // Apply dark colors inside the .dark selector scope
      const darkModeStyles = Object.entries(newPalette.darkColors)
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
      
      // Reset and close dialog
      setImportData("")
      setImportDialogOpen(false)
      
      toast({
        title: "Palette imported",
        description: `"${paletteData.name}" has been imported to your collection.`,
      })
    } catch (error) {
      setImportError("Invalid JSON format")
      
      toast({
        title: "Error importing palette",
        description: "There was an error importing the palette. Please check the JSON format.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Palette Manager</CardTitle>
        <CardDescription>Save, load, and manage your color palettes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="saved">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="saved">Saved Palettes</TabsTrigger>
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Palettes</h3>
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Current
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Palette</DialogTitle>
                      <DialogDescription>
                        Give your palette a name to save it to your collection.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="palette-name">Palette Name</Label>
                      <Input 
                        id="palette-name" 
                        value={paletteName} 
                        onChange={(e) => setPaletteName(e.target.value)}
                        placeholder="My Awesome Theme"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleSavePalette}>Save Palette</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {savedPalettes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't saved any palettes yet.</p>
                  <p className="text-sm mt-2">Save your current theme to start building your collection.</p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {savedPalettes.map((palette) => (
                      <div key={palette.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            {Object.entries(palette.lightColors)
                              .filter(([key]) => key === '--primary' || key === '--secondary' || key === '--accent')
                              .map(([key, value]) => (
                                <div 
                                  key={key} 
                                  className="w-4 h-4 rounded-full border" 
                                  style={{ backgroundColor: `hsl(${value})` }}
                                  title={key.replace('--', '')}
                                />
                              ))}
                          </div>
                          <div>
                            <p className="font-medium">{palette.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(palette.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleLoadPalette(palette.id!)}
                            title="Load palette"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleExportPalette(palette)}
                            title="Export palette"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeletePalette(palette.id!, palette.name)}
                            title="Delete palette"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                <h3 className="text-lg font-medium mb-2">Export Current Palette</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your current palette as a JSON file that you can share or import later.
                </p>
                <Button onClick={handleExportCurrentPalette}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Current Palette
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Import Palette</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Import a palette from a JSON file or paste JSON data directly.
                </p>
                <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Palette
                    </Button>
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
                      <textarea
                        id="import-data"
                        className="w-full h-[200px] p-2 border rounded-md font-mono text-sm mt-2"
                        value={importData}
                        onChange={(e) => setImportData(e.target.value)}
                        placeholder='{"name":"My Theme","lightColors":{"--primary":"222.2 47.4% 11.2%"},"darkColors":{"--primary":"210 40% 98%"},"borderRadius":0.5}'
                      />
                      {importError && (
                        <p className="text-sm text-destructive mt-2">{importError}</p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setImportDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleImportPalette}>Import</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 