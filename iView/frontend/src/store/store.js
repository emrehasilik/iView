import {create} from 'zustand';

const useStore = create((set) => ({
  email: '',
  password: '',
  
  setEmail: (newEmail) => set({ email: newEmail }),
  setPassword: (newPassword) => set({ password: newPassword }),
}));

export default useStore;
