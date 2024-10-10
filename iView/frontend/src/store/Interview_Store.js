// store/Interview_Store.js
import { create } from 'zustand';

const useInterviewStore = create((set) => ({
  interviews: [],

  // Mülakat ekleme fonksiyonu
  addInterview: (interview) => 
    set((state) => ({
      interviews: [
        ...state.interviews, 
        { 
          ...interview, 
          totalCandidates: 0,    // Default değer 0
          onHoldCandidates: 0    // Default değer 0
        }
      ],
    })),

  // Mülakat silme fonksiyonu
  removeInterview: (index) =>
    set((state) => ({
      interviews: state.interviews.filter((_, i) => i !== index),
    })),
}));

export default useInterviewStore;
