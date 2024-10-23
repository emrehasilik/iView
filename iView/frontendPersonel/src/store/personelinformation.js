import { create } from 'zustand';

const usePersonelInformationStore = create((set) => ({
  personalInfo: [],
  
  addPersonalInfo: (info) => set((state) => ({
    personalInfo: [...state.personalInfo, info],
  })),
}));

export default usePersonelInformationStore;
