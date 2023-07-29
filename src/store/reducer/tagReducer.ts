import { database } from '@/firebase/firestore';
import { Tag, StoreState } from '@/types';

const tagReducer = (set: any) => ({
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
  addTag: async (tag: Tag) => {
    await database.createTag(tag);
  },
  addTags: (tags: Tag[]) =>
    set((state: StoreState) => ({ tags: [...state.tags, ...tags] })),
  deleteTag: async (tag: Tag) => {
    await database.deleteTag(tag.id as string);
    set((state: StoreState) => ({
      tags: state.tags.filter(({ id }) => id !== tag.id),
    }));
  },
});

export default tagReducer;
