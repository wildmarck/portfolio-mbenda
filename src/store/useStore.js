import { create } from 'zustand'

export const useStore = create((set) => ({
  // Preloader
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),

  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),

  // Active section
  activeSection: 0,
  setActiveSection: (v) => set({ activeSection: v }),
}))
