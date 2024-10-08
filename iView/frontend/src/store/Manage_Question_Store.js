import {create} from 'zustand';

const useManageQuestionStore = create((set) => ({
  questionPackages: [],

  addQuestionPackage: (packageData) => {
    set((state) => ({
      questionPackages: [...state.questionPackages, packageData],
    }));
  },
}));

export default useManageQuestionStore;
