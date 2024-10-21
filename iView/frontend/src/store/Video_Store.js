import { create } from 'zustand';

const useVideoStore = create((set) => ({
  videos: [
    { candidateName: 'Emre Hasilik', videoUrl: '/assets/deneme.mp4' },
    { candidateName: 'Serkan Celal Terzioğlu', videoUrl: '/assets/deneme.mp4' },
    { candidateName: 'Ahmet Hamdi Büyükballı', videoUrl: '/assets/deneme.mp4' },
    { candidateName: 'Yusuf Koluş', videoUrl: '/assets/deneme.mp4' },
    { candidateName: 'Furkan Yiğit', videoUrl: '/assets/deneme.mp4' },
  
  ],

  // Video ekleme fonksiyonu
  addVideo: (video) => 
    set((state) => ({
      videos: [
        ...state.videos, 
        { 
          ...video, 
          createdAt: new Date(),   // Default olarak eklenme tarihi
        }
      ],
    })),

  // Video silme fonksiyonu
  removeVideo: (index) =>
    set((state) => ({
      videos: state.videos.filter((_, i) => i !== index),
    })),
}));

export default useVideoStore;
