import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultColors } from './theme-config';
import { savePalette as dbSavePalette, getPalettes, deletePalette as dbDeletePalette, getPalette, Palette } from './db';
import { StateCreator } from 'zustand/vanilla';

interface PaletteState {
  // Current theme state
  isDarkMode: boolean;
  lightColors: Record<string, string>;
  darkColors: Record<string, string>;
  borderRadius: number;
  
  // Saved palettes
  savedPalettes: Palette[];
  
  // Actions
  setIsDarkMode: (isDarkMode: boolean) => void;
  setLightColors: (colors: Record<string, string>) => void;
  setDarkColors: (colors: Record<string, string>) => void;
  setBorderRadius: (radius: number) => void;
  resetTheme: () => void;
  
  // Palette management
  savePalette: (name: string) => Promise<number>;
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
      lightColors: getDefaultColors('light'),
      darkColors: getDefaultColors('dark'),
      borderRadius: 0.5,
      savedPalettes: [],
      
      // Theme actions
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
      setLightColors: (colors: Record<string, string>) => set({ lightColors: colors }),
      setDarkColors: (colors: Record<string, string>) => set({ darkColors: colors }),
      setBorderRadius: (radius: number) => set({ borderRadius: radius }),
      
      resetTheme: () => {
        set({
          lightColors: getDefaultColors('light'),
          darkColors: getDefaultColors('dark'),
          borderRadius: 0.5
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
      },
      
      // Palette management
      savePalette: async (name: string) => {
        const { lightColors, darkColors, borderRadius } = get();
        const id = await dbSavePalette({
          name,
          lightColors,
          darkColors,
          borderRadius
        });
        
        // Refresh the list of saved palettes
        await get().loadSavedPalettes();
        return id;
      },
      
      loadPalette: async (id: number) => {
        const palette = await getPalette(id);
        if (palette) {
          set({
            lightColors: palette.lightColors,
            darkColors: palette.darkColors,
            borderRadius: palette.borderRadius
          });
          
          // Apply to CSS variables
          const { isDarkMode } = get();
          const colors = isDarkMode ? palette.darkColors : palette.lightColors;
          const root = document.documentElement;
          
          // Apply border radius
          root.style.setProperty("--radius", `${palette.borderRadius}rem`);
          
          // Apply colors
          Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
          });
          
          // Apply dark colors inside the .dark selector scope
          const darkModeStyles = Object.entries(palette.darkColors)
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
        await dbDeletePalette(id);
        await get().loadSavedPalettes();
      }
    })) as PaletteStateCreator,
    {
      name: 'palette-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        borderRadius: state.borderRadius
      })
    }
  )
); 