import { create } from 'zustand';

const useManageQuestionStore = create((set) => ({
  questionPackages: [],

  // Soru paketini ekleme
  addQuestionPackage: (newPackage) =>
    set((state) => ({
      questionPackages: [...state.questionPackages, newPackage],
    })),
}));

export default useManageQuestionStore;
