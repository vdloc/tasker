import { Tag, StoreState } from '@/types';

const tagReducer = (set: any) => ({
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
  addTag: (tag: Tag) => set((state: StoreState) => ({ tags: [...state.tags, tag] })),
  addTags: (tags: Tag[]) => set((state: StoreState) => ({ tags: [...state.tags, ...tags] })),
  deleteTag: (tag: Tag) =>
    set((state: StoreState) => ({
      tags: state.tags.filter(({ id }) => id !== tag.id),
    })),
});

export default tagReducer;
