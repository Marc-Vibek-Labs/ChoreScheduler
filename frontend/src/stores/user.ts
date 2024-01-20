import create from 'zustand';
import { nanoid } from 'nanoid';
import { StatHelpText } from '@chakra-ui/react';

type UserStore = {
  id: string;
  name: string;
  verification: boolean;
  setUser: (name: string) => void;
  setUserVerification: (value: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  id: nanoid(),
  name: '',
  verification: false,
  setUserVerification: (value) =>
    set((state) => ({
      ...state,
      value
    })),
  setUser: (name) =>
    set((state) => ({
      ...state,
      name
    }))
}));
