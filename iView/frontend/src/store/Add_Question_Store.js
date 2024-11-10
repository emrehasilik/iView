import { create } from 'zustand';
import axios from 'axios';

const usePackageQuestionStore = create((set) => ({
  questions: [],

  // Soru ekleme fonksiyonu
  addQuestion: async (packageId, question, minutes) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/question-package/${packageId}/question`, {
        question,
        minutes,
      });
      const addedQuestion = response.data.questions[response.data.questions.length - 1];
      
      set((state) => ({
        questions: [...state.questions, addedQuestion],
      }));
    } catch (error) {
      console.error("Soru eklenirken hata oluştu:", error);
    }
  },

  // Soru silme fonksiyonu
  removeQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.filter((question) => question._id !== questionId),
    })),

  // Soruları sıfırlama
  clearQuestions: () => set({ questions: [] }),
}));

export default usePackageQuestionStore;

//question.store.js