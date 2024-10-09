import { create } from 'zustand';

const usePackageQuestionStore = create((set) => ({
  questions: [],

  // Soru ekleme fonksiyonu
  addQuestion: (question, minutes) =>
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    })),

  // Soru silme fonksiyonu
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),

  // Soruları sıfırlama
  clearQuestions: () => set({ questions: [] }),
}));

export default usePackageQuestionStore;
