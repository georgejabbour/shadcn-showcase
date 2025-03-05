import { create } from 'zustand';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel?: () => void;
  
  // Actions
  open: (options: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => void;
  close: () => void;
}

export const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: undefined,
  
  open: (options) => set({
    isOpen: true,
    title: options.title,
    description: options.description,
    confirmText: options.confirmText || 'Confirm',
    cancelText: options.cancelText || 'Cancel',
    onConfirm: options.onConfirm,
    onCancel: options.onCancel,
  }),
  
  close: () => set({ isOpen: false }),
})); 