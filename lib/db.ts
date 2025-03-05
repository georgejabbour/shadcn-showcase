import Dexie, { Table } from 'dexie';

// Define the palette interface
export interface Palette {
  id?: number;
  name: string;
  createdAt: Date;
  lightColors: Record<string, string>;
  darkColors: Record<string, string>;
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
  return await db.palettes.add({
    ...palette,
    createdAt: new Date()
  });
}

export async function getPalettes(): Promise<Palette[]> {
  return await db.palettes.orderBy('createdAt').reverse().toArray();
}

export async function deletePalette(id: number): Promise<void> {
  await db.palettes.delete(id);
}

export async function getPalette(id: number): Promise<Palette | undefined> {
  return await db.palettes.get(id);
} 