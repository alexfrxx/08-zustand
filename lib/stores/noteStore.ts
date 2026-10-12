import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PostNote } from '@/types/note';

type NoteDraftStore = {
  draft: PostNote;
  setDraft: (note: PostNote) => void;
  clearDraft: () => void;
};

const initialDraft: PostNote = {
  title: '',
  content: '',
  tag: 'Todo'
};

export const useDraft = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft }))
    }),
    { name: 'note-draft', partialize: (state) => ({ draft: state.draft }) }
  )
);
