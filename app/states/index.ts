import { create } from 'zustand';

// State for handling user click comment button, on click make them focus on comment input field
type CommentRefStore = {
  focused: boolean;
  setFocused: (value: boolean) => void;
};

export const useCommentRefStore = create<CommentRefStore>((set) => ({
  focused: false,
  setFocused: (value: boolean) => set({ focused: value }),
}));

type ModalStore = {
  message: string;
  setMessage: (value: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  message: '',
  setMessage: (value: string) => set({ message: value }),
}));

type RefreshStore = {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
};

export const useRefreshStore = create<RefreshStore>((set) => ({
  refresh: false,
  setRefresh: (value: boolean) => set({ refresh: value }),
}));
