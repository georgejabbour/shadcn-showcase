"use client"

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { create } from 'zustand'

interface SavePaletteDialogState {
  isOpen: boolean;
  paletteName: string;
  onConfirm: (isDuoTone: boolean) => void;
  onCancel: () => void;
  
  // Actions
  open: (options: {
    paletteName: string;
    onConfirm: (isDuoTone: boolean) => void;
    onCancel: () => void;
  }) => void;
  close: () => void;
}

export const useSavePaletteDialog = create<SavePaletteDialogState>((set) => ({
  isOpen: false,
  paletteName: '',
  onConfirm: () => {},
  onCancel: () => {},
  
  open: (options) => set({
    isOpen: true,
    paletteName: options.paletteName,
    onConfirm: options.onConfirm,
    onCancel: options.onCancel,
  }),
  
  close: () => set({ isOpen: false }),
}));

export function SavePaletteDialog() {
  const { isOpen, paletteName, onConfirm, onCancel, close } = useSavePaletteDialog();
  const [isDuoTone, setIsDuoTone] = useState(false);

  const handleConfirm = () => {
    onConfirm(isDuoTone);
    setIsDuoTone(false); // Reset for next time
    close();
  };

  const handleCancel = () => {
    onCancel();
    setIsDuoTone(false); // Reset for next time
    close();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Palette</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to save the palette "{paletteName}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="duo-tone" 
              className="mt-0.5"
              checked={isDuoTone} 
              onCheckedChange={(checked) => setIsDuoTone(checked === true)}
            />
            <div>
              <Label htmlFor="duo-tone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                This is a duo-tone palette
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Duo-tone palettes use two primary colors to create a more dynamic and visually interesting design.
              </p>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 