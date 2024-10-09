import { create } from 'zustand';

const useManageQuestionStore = create((set) => ({
  questionPackages: [],

  addQuestionPackage: (newPackage) =>
    set((state) => ({
      questionPackages: [...state.questionPackages, newPackage],
    })),

  // Paket silme fonksiyonu
  removeQuestionPackage: (index) =>
    set((state) => ({
      questionPackages: state.questionPackages.filter((_, i) => i !== index),
    })),
}));

export default useManageQuestionStore;
