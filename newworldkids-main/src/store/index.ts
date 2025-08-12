import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Project, Animal } from '../types';

interface GlobalState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Language
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  
  // Donation tracking
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  donationAmount: number;
  setDonationAmount: (amount: number) => void;
  
  // Favorites
  favoriteAnimals: Animal[];
  addFavoriteAnimal: (animal: Animal) => void;
  removeFavoriteAnimal: (animalId: string) => void;
  
  // UI State
  isNavOpen: boolean;
  toggleNav: () => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),
      
      // Theme
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Language
      currentLanguage: 'en',
      setLanguage: (lang) => set({ currentLanguage: lang }),
      
      // Donation
      selectedProject: null,
      setSelectedProject: (project) => set({ selectedProject: project }),
      donationAmount: 0,
      setDonationAmount: (amount) => set({ donationAmount: amount }),
      
      // Favorites
      favoriteAnimals: [],
      addFavoriteAnimal: (animal) => 
        set((state) => ({
          favoriteAnimals: [...state.favoriteAnimals, animal]
        })),
      removeFavoriteAnimal: (animalId) =>
        set((state) => ({
          favoriteAnimals: state.favoriteAnimals.filter((a) => a.id !== animalId)
        })),
      
      // UI State
      isNavOpen: false,
      toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'new-world-kids-storage',
      partialize: (state) => ({
        user: state.user,
        isDarkMode: state.isDarkMode,
        currentLanguage: state.currentLanguage,
        favoriteAnimals: state.favoriteAnimals,
      }),
    }
  )
);

export default useStore;
