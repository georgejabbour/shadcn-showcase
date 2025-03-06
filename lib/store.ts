import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultColors } from "./theme-config";
import {
  savePalette as dbSavePalette,
  getPalettes,
  deletePalette as dbDeletePalette,
  getPalette,
  Palette,
} from "./db";
import { StateCreator } from "zustand/vanilla";
import { useConfirmDialog } from "./confirm-dialog-store";
import { useSavePaletteDialog } from "@/components/save-palette-dialog";

interface PaletteState {
  // Current theme state
  isDarkMode: boolean;
  lightColors: Record<string, string>;
  darkColors: Record<string, string>;
  borderRadius: number;
  showActionsContainer: boolean;
  saveDialogOpen: boolean;
  setSaveDialogOpen: (open: boolean) => void;

  // Initialization state
  isInitialized: boolean;
  setInitialized: (initialized: boolean) => void;

  // Saved palettes
  savedPalettes: Palette[];

  // Actions
  setIsDarkMode: (isDarkMode: boolean) => void;
  setLightColors: (colors: Record<string, string>) => void;
  setDarkColors: (colors: Record<string, string>) => void;
  setBorderRadius: (radius: number) => void;
  setShowActionsContainer: (show: boolean) => void;
  resetTheme: () => Promise<void>;

  // Palette management
  savePalette: (name: string, existingPaletteId?: number) => Promise<number>;
  loadPalette: (id: number) => Promise<void>;
  loadSavedPalettes: () => Promise<void>;
  deletePalette: (id: number) => Promise<void>;
}

type PaletteStateCreator = StateCreator<
  PaletteState,
  [],
  [["zustand/persist", unknown]],
  PaletteState
>;

export const usePaletteStore = create<PaletteState>()(
  persist(
    ((set, get) => ({
      // Initial state
      isDarkMode: true,
      lightColors: getDefaultColors("light"),
      darkColors: getDefaultColors("dark"),
      borderRadius: 0.5,
      savedPalettes: [],
      showActionsContainer: true,

      saveDialogOpen: false,
      setSaveDialogOpen: (open: boolean) => set({ saveDialogOpen: open }),

      // Initialization state
      isInitialized: false,
      setInitialized: (initialized: boolean) =>
        set({ isInitialized: initialized }),

      // Theme actions
      setShowActionsContainer: (show: boolean) =>
        set({ showActionsContainer: show }),
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
      setLightColors: (colors: Record<string, string>) =>
        set({ lightColors: colors }),
      setDarkColors: (colors: Record<string, string>) =>
        set({ darkColors: colors }),
      setBorderRadius: (radius: number) => set({ borderRadius: radius }),

      resetTheme: () => {
        // Use the confirm dialog
        return new Promise<void>((resolve) => {
          useConfirmDialog.getState().open({
            title: "Reset Theme",
            description:
              "Are you sure you want to reset the theme to default settings? This action cannot be undone.",
            confirmText: "Reset",
            onConfirm: () => {
              set({
                lightColors: getDefaultColors("light"),
                darkColors: getDefaultColors("dark"),
                borderRadius: 0.5,
              });

              // Apply to CSS variables
              const root = document.documentElement;
              root.style.cssText = "";
              root.style.setProperty("--radius", `0.5rem`);

              // Remove the dark mode style element if it exists
              const styleEl = document.getElementById("theme-dark-colors");
              if (styleEl) {
                styleEl.remove();
              }
              resolve();
            },
            onCancel: () => {
              resolve();
            },
          });
        });
      },

      // Palette management
      savePalette: async (name: string, existingPaletteId?: number) => {
        const {
          lightColors,
          darkColors,
          borderRadius,
          saveDialogOpen,
          setSaveDialogOpen,
        } = get();

        // Use the save palette dialog with duo-tone option
        return new Promise<number>((resolve) => {
          useSavePaletteDialog.getState().open({
            paletteName: name,
            existingPaletteId,
            onConfirm: async (isDuoTone) => {
              // Log the values being saved for debugging
              console.log("Store - Saving palette:", name);
              console.log("Store - Light colors:", lightColors);
              console.log("Store - Dark colors:", darkColors);
              console.log("Store - Border radius:", borderRadius);
              console.log("Store - Is duo-tone:", isDuoTone);
              console.log("Store - Existing palette ID:", existingPaletteId);

              const id = await dbSavePalette({
                id: existingPaletteId,
                name,
                lightColors,
                darkColors,
                borderRadius,
                isDuoTone,
              });
              setSaveDialogOpen(false);

              // Refresh the list of saved palettes
              await get().loadSavedPalettes();
              resolve(id);
            },
            onCancel: () => {
              resolve(-1); // Return -1 to indicate cancellation
              setSaveDialogOpen(false);
            },
          });
        });
      },

      loadPalette: async (id: number) => {
        const palette = await getPalette(id);
        if (palette) {
          // Ensure we're working with the correct data format
          // The palette data might be stored as objects with nested properties
          let processedLightColors = palette.lightColors;
          let processedDarkColors = palette.darkColors;

          // Check if lightColors/darkColors are objects with nested properties
          // This handles the format seen in the screenshot where colors are stored with nested properties
          if (palette.lightColors && typeof palette.lightColors === "object") {
            if (
              "name" in palette.lightColors ||
              "background" in palette.lightColors ||
              "foreground" in palette.lightColors
            ) {
              // Convert the nested structure to a flat CSS variable format
              processedLightColors = Object.entries(palette.lightColors).reduce(
                (acc, [key, value]) => {
                  if (key === "name" || key === "id") return acc; // Skip non-color properties

                  if (typeof value === "object" && value !== null) {
                    // Handle nested color objects (like in the screenshot)
                    Object.entries(value).forEach(
                      ([nestedKey, nestedValue]) => {
                        if (nestedKey !== "name" && nestedKey !== "id") {
                          acc[`--${key}-${nestedKey}`] = nestedValue as string;
                        }
                      }
                    );
                  } else {
                    acc[`--${key}`] = value as string;
                  }
                  return acc;
                },
                {} as Record<string, string>
              );
            }
          }

          if (palette.darkColors && typeof palette.darkColors === "object") {
            if (
              "name" in palette.darkColors ||
              "background" in palette.darkColors ||
              "foreground" in palette.darkColors
            ) {
              // Convert the nested structure to a flat CSS variable format
              processedDarkColors = Object.entries(palette.darkColors).reduce(
                (acc, [key, value]) => {
                  if (key === "name" || key === "id") return acc; // Skip non-color properties

                  if (typeof value === "object" && value !== null) {
                    // Handle nested color objects (like in the screenshot)
                    Object.entries(value).forEach(
                      ([nestedKey, nestedValue]) => {
                        if (nestedKey !== "name" && nestedKey !== "id") {
                          acc[`--${key}-${nestedKey}`] = nestedValue as string;
                        }
                      }
                    );
                  } else {
                    acc[`--${key}`] = value as string;
                  }
                  return acc;
                },
                {} as Record<string, string>
              );
            }
          }

          set({
            lightColors: processedLightColors,
            darkColors: processedDarkColors,
            borderRadius: palette.borderRadius,
          });

          // Apply to CSS variables
          const { isDarkMode } = get();
          const colors = isDarkMode
            ? processedDarkColors
            : processedLightColors;
          const root = document.documentElement;

          // Apply border radius
          root.style.setProperty("--radius", `${palette.borderRadius}rem`);

          // Apply colors
          Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
          });

          // Apply dark colors inside the .dark selector scope
          const darkModeStyles = Object.entries(processedDarkColors)
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
        }
      },

      loadSavedPalettes: async () => {
        const palettes = await getPalettes();
        set({ savedPalettes: palettes });
      },

      deletePalette: async (id: number) => {
        // Find the palette name for the confirmation message
        const palette = get().savedPalettes.find((p) => p.id === id);
        const paletteName = palette ? palette.name : "this palette";

        // Check if this is the only palette or if it's named "Default Palette"
        const isOnlyPalette = get().savedPalettes.length === 1;
        const isDefaultPalette = palette?.name === "Default Palette";

        if (isDefaultPalette) {
          useConfirmDialog.getState().open({
            title: "Cannot Delete Default Palette",
            description: `The default palette cannot be deleted. You can modify it or create new palettes instead.`,
            confirmText: "OK",
            onConfirm: () => {},
            onCancel: () => {},
          });
          return Promise.resolve();
        }

        // Use the confirm dialog
        return new Promise<void>((resolve) => {
          useConfirmDialog.getState().open({
            title: "Delete Palette",
            description: `Are you sure you want to delete "${paletteName}"?`,
            confirmText: "Delete",
            onConfirm: async () => {
              await dbDeletePalette(id);
              await get().loadSavedPalettes();
              resolve();
            },
            onCancel: () => {
              resolve();
            },
          });
        });
      },
    })) as PaletteStateCreator,
    {
      name: "palette-storage",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        borderRadius: state.borderRadius,
        lightColors: state.lightColors,
        darkColors: state.darkColors,
        savedPalettes: state.savedPalettes,
        showActionsContainer: state.showActionsContainer,
      }),
    }
  )
);

// Module-level variable to track initialization status
let isStoreInitialized = false;

// Utility function to initialize the palette store
export const initializePaletteStore = async () => {
  // Skip initialization on the server side
  if (typeof window === "undefined") {
    console.log("Skipping palette store initialization on server side");
    return false;
  }

  // Check the module-level flag first
  if (isStoreInitialized) {
    console.log("Palette store already initialized (module flag), skipping");
    return true;
  }

  const {
    lightColors,
    darkColors,
    borderRadius,
    loadSavedPalettes,
    savedPalettes,
    isInitialized,
    setInitialized,
  } = usePaletteStore.getState();

  // Also check the store flag as a backup
  if (isInitialized) {
    console.log("Palette store already initialized (store flag), skipping");
    isStoreInitialized = true; // Sync the module flag
    return true;
  }

  try {
    // Set the module flag immediately to prevent concurrent initializations
    isStoreInitialized = true;

    // Only load palettes if we don't already have them
    if (savedPalettes.length === 0) {
      // Load saved palettes
      await loadSavedPalettes();
    }

    // Get the updated palettes after loading
    const palettes = usePaletteStore.getState().savedPalettes;
    console.log(`Initialized palette store with ${palettes.length} palettes`);

    // Check if there are no palettes, and if so, create a default one
    if (palettes.length === 0) {
      console.log("No palettes found, creating default palette");

      const defaultId = await dbSavePalette({
        id: undefined,
        name: "Default Palette",
        lightColors,
        darkColors,
        borderRadius,
        isDuoTone: false,
      });

      console.log(`Created default palette with ID: ${defaultId}`);
    }

    // Mark as initialized in the store as well
    setInitialized(true);
    return true;
  } catch (error) {
    // If initialization fails, reset the flags
    isStoreInitialized = false;
    console.error("Failed to initialize palette store:", error);
    return false;
  }
};
