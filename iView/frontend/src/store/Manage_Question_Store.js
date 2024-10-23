
import { create } from 'zustand';

const useManageQuestionStore = create((set) => ({
  questionPackages: [],

  // Yeni soru paketi ekleme fonksiyonu
  addQuestionPackage: (newPackage) =>
    set((state) => ({
      questionPackages: [...state.questionPackages, newPackage],
    })),

  // Soru paketini güncelleme fonksiyonu
  updatePackageQuestions: (index, updatedQuestions) =>
    set((state) => {
      const updatedPackages = [...state.questionPackages];
      updatedPackages[index] = {
        ...updatedPackages[index],
        questions: updatedQuestions,
      };
      return { questionPackages: updatedPackages };
    }),

  // Soru paketini silme fonksiyonu
  removeQuestionPackage: (index) =>
    set((state) => {
      const updatedPackages = state.questionPackages.filter((_, i) => i !== index);
      return { questionPackages: updatedPackages };
    }),
}));

export default useManageQuestionStore;
