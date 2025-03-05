import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define category IDs based on the categories in color-picker.tsx
export const CATEGORY_IDS = {
  BASE: 'base',
  COMPONENTS: 'components',
  PRIMARY_SECONDARY: 'primary-secondary',
  ACCENTS_MUTED: 'accents-muted',
  FUNCTIONAL: 'functional',
  GRADIENTS: 'gradients',
} as const;

export type CategoryId = typeof CATEGORY_IDS[keyof typeof CATEGORY_IDS];

interface CategoryState {
  // Map of category IDs to their open state
  openCategories: Record<CategoryId, boolean>;
  
  // Actions
  toggleCategory: (categoryId: CategoryId) => void;
  setCategory: (categoryId: CategoryId, isOpen: boolean) => void;
  resetCategories: () => void;
}

// Default state with all categories open
const DEFAULT_OPEN_STATE: Record<CategoryId, boolean> = {
  [CATEGORY_IDS.BASE]: true,
  [CATEGORY_IDS.COMPONENTS]: true,
  [CATEGORY_IDS.PRIMARY_SECONDARY]: true,
  [CATEGORY_IDS.ACCENTS_MUTED]: true,
  [CATEGORY_IDS.FUNCTIONAL]: true,
  [CATEGORY_IDS.GRADIENTS]: true,
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      openCategories: { ...DEFAULT_OPEN_STATE },
      
      toggleCategory: (categoryId) => 
        set((state) => ({
          openCategories: {
            ...state.openCategories,
            [categoryId]: !state.openCategories[categoryId],
          },
        })),
      
      setCategory: (categoryId, isOpen) => 
        set((state) => ({
          openCategories: {
            ...state.openCategories,
            [categoryId]: isOpen,
          },
        })),
      
      resetCategories: () => 
        set({ openCategories: { ...DEFAULT_OPEN_STATE } }),
    }),
    {
      name: 'color-category-state',
    }
  )
); 