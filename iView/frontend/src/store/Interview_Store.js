// store/Interview_Store.js
import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
  interviews: [],

  addInterview: (interview) => 
    set((state) => ({
      interviews: [
        ...state.interviews, 
        { 
          ...interview, 
          totalCandidates: 0,
          onHoldCandidates: 0
        }
      ],
    })),

  // Mülakat silme fonksiyonu
  removeInterview: async (id) => {
    try {
      // Backend'den mülakatı sil
      await axios.delete(`http://localhost:5000/api/interviews/${id}`);
      // Store'dan mülakatı sil
      set((state) => ({
        interviews: state.interviews.filter((interview) => interview._id !== id),
      }));
    } catch (error) {
      console.error("Interview silinirken hata:", error);
    }
  },
  
  setInterviews: (interviews) => set({ interviews }),
}));

export default useInterviewStore;
