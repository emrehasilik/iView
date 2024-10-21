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
      
      // İlgili index'teki paketin sorularını güncelle
      updatedPackages[index] = {
        ...updatedPackages[index],
        questions: updatedQuestions,
      };

      return { questionPackages: updatedPackages };
    }),
}));

export default useManageQuestionStore;
