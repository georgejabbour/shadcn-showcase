import Dexie, { Table } from 'dexie';

// Define the palette interface
export interface Palette {
  id?: number;
  name: string;
  createdAt: Date;
  lightColors: Record<string, any>;
  darkColors: Record<string, any>;
  borderRadius: number;
  isDuoTone?: boolean;
}

// Create a Dexie database class
class PaletteDatabase extends Dexie {
  palettes!: Table<Palette>;

  constructor() {
    super('paletteDatabase');
    this.version(2).stores({
      palettes: '++id, name, createdAt, isDuoTone'
    });
    
    // Migration from v1 to v2: Add isDuoTone field to existing records
    this.on('ready', () => {
      // Upgrade needed
      if (this.verno === 2) {
        this.transaction('rw', this.palettes, async () => {
          const allPalettes = await this.palettes.toArray();
          allPalettes.forEach(async (palette) => {
            if (palette.isDuoTone === undefined) {
              await this.palettes.update(palette.id!, { isDuoTone: false });
            }
          });
        }).catch(e => console.error('Migration failed:', e));
      }
    });
  }
}

// Create and export a database instance
export const db = new PaletteDatabase();

// Helper functions for palette operations
export async function savePalette(palette: Omit<Palette, 'id' | 'createdAt' | 'isDuoTone'> & { isDuoTone?: boolean }): Promise<number> {
  const formattedPalette = {
    ...palette,
    createdAt: new Date(),
    isDuoTone: palette.isDuoTone ?? false
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