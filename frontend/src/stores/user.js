import create from "zustand";
import { nanoid } from "nanoid";

export const useUserStore = create((set) => ({
  id: nanoid(),
  name: "",
  verification: false,
  setUserVerification: (value) =>
    set((state) => ({
      ...state,
      value,
    })),
  setUser: (name) =>
    set((state) => ({
      ...state,
      name,
    })),
}));
