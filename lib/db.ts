import Dexie, { Table } from 'dexie';

// Define the palette interface
export interface Palette {
  id?: number;
  name: string;
  createdAt: Date;
  lightColors: Record<string, any>;
  darkColors: Record<string, any>;
  borderRadius: number;
}

// Create a Dexie database class
class PaletteDatabase extends Dexie {
  palettes!: Table<Palette>;

  constructor() {
    super('paletteDatabase');
    this.version(1).stores({
      palettes: '++id, name, createdAt'
    });
  }
}

// Create and export a database instance
export const db = new PaletteDatabase();

// Helper functions for palette operations
export async function savePalette(palette: Omit<Palette, 'id' | 'createdAt'>): Promise<number> {
  const formattedPalette = {
    ...palette,
    createdAt: new Date()
  };
  
  return await db.palettes.add(formattedPalette);
}

export async function getPalettes(): Promise<Palette[]> {
  try {
    const palettes = await db.palettes.orderBy('createdAt').reverse().toArray();
    return palettes;
  } catch (error) {
    console.error('Error fetching palettes:', error);
    return [];
  }
}

export async function deletePalette(id: number): Promise<void> {
  await db.palettes.delete(id);
}

export async function getPalette(id: number): Promise<Palette | undefined> {
  try {
    return await db.palettes.get(id);
  } catch (error) {
    console.error(`Error fetching palette with id ${id}:`, error);
    return undefined;
  }
} 