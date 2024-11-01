// src/store/PersonelInformation.js
import { create } from 'zustand';

const usePersonelInformationStore = create((set) => ({
  personalInfo: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    isApproved: false,
  },
  setPersonalInfo: (info) => set({ personalInfo: info }),
}));

export default usePersonelInformationStore;
