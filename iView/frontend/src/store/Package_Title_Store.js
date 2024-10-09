import {create} from 'zustand';

const usePackageQuestionStore = create((set) => ({
  questions: [],
  addQuestion: (question, minutes) =>
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    })),
  updateQuestion: (index, updatedQuestion, updatedMinutes) =>
    set((state) => {
      const updatedQuestions = [...state.questions];
      updatedQuestions[index] = { question: updatedQuestion, minutes: updatedMinutes };
      return { questions: updatedQuestions };
    }),
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  clearQuestions: () => set({ questions: [] }),
}));

export default usePackageQuestionStore;
