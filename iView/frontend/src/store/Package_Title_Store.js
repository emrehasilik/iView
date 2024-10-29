import { create } from 'zustand';
import axios from 'axios';

const usePackageQuestionStore = create((set, get) => ({
  packageTitle: '',
  questions: [],

  setPackageTitle: (title) => set({ packageTitle: title }),

  addQuestion: (question, minutes) =>
    set((state) => ({
      questions: [...state.questions, { question, minutes }],
    })),

  // Soru silme işlevi
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),

  clearAll: () => set({ packageTitle: '', questions: [] }),

  // Backend'e kaydetme
  savePackage: async () => {
    const { packageTitle, questions } = get(); // get ile state erişimi
    if (packageTitle && questions.length > 0) {
      try {
        console.log("Save request sent to backend");
        const response = await axios.post('http://localhost:5000/api/question-package', {
          title: packageTitle,
          questions,
        });
        console.log('Paket başarıyla kaydedildi:', response.data);
        set({ packageTitle: '', questions: [] });
      } catch (error) {
        console.error('Paket kaydedilirken hata oluştu:', error);
      }
    } else {
      alert('Lütfen paket başlığı ve en az bir soru ekleyin.');
    }
  },
}));

export default usePackageQuestionStore;
