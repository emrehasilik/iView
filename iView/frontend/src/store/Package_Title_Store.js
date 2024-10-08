import {create} from 'zustand';

const usePackageQuestionStore = create((set) => ({
  questions: [],

  addQuestion: (question, minutes) => {
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    }));
  },

  clearQuestions: () => {
    set({ questions: [] });
  },
}));

export default usePackageQuestionStore;
