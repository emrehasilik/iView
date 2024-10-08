import {create} from 'zustand';

// Zustand store'u tanımlıyoruz
const useAddQuestionStore = create((set) => ({
  questions: [], // Soru listesi
  addQuestion: (question, minutes) => {
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    }));
    console.log("Soru başarıyla kaydedildi:", question, minutes); // Konsola başarılı mesaj
  },
}));

export default useAddQuestionStore;
