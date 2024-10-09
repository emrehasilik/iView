import { create } from 'zustand';

const useManageQuestionStore = create((set) => ({
  questionPackages: [],
  
  // Soru paketi ekleme fonksiyonu
  addQuestionPackage: (newPackage) =>
    set((state) => ({
      questionPackages: [...state.questionPackages, newPackage],
    })),

  // Soru paketi silme fonksiyonu
  removeQuestionPackage: (index) =>
    set((state) => ({
      questionPackages: state.questionPackages.filter((_, i) => i !== index),
    })),
}));

export default useManageQuestionStore;
