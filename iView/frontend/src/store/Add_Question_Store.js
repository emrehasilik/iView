import { create } from 'zustand';

const usePackageQuestionStore = create((set) => ({
  questions: [],

  // Soru ekleme fonksiyonu
  addQuestion: (question, minutes) =>
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    })),

  // Soru güncelleme fonksiyonu
  updateQuestion: (index, updatedQuestion, updatedMinutes) =>
    set((state) => ({
      questions: state.questions.map((q, i) =>
        i === index ? { question: updatedQuestion, minutes: updatedMinutes } : q
      ),
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
