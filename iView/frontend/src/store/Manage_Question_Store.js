import { create } from 'zustand';
import axios from 'axios';

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

  // Soru paketini backend'den silme fonksiyonu
  removeQuestionPackage: async (packageId) => {
    try {
      // Backend'den paketi silme isteği gönder
      await axios.delete(`http://localhost:5000/api/question-package/${packageId}`);
      // State'i güncelle
      set((state) => ({
        questionPackages: state.questionPackages.filter((pkg) => pkg._id !== packageId),
      }));
    } catch (error) {
      console.error("Soru paketi silinirken hata oluştu:", error);
    }
  },

  // Soru paketlerini backend'den çekme fonksiyonu
  fetchQuestionPackages: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/question-packages');
      set({ questionPackages: response.data });
    } catch (error) {
      console.error("Soru paketleri alınırken hata oluştu:", error);
    }
  },
}));

export default useManageQuestionStore;
