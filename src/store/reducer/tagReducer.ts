import { database, tagRef } from '@/firebase/firestore';
import { Tag } from '@/types';
import { getDataFromSnapshot } from '@/utils';
import { onSnapshot, query } from 'firebase/firestore';

const tagReducer = (set: any) => ({
  tags: [],
  fetchTags: async () => {
    const tags = await database.getTags();
    set({ tags });
  },

  addTag: async (tag: Tag) => {
    await database.createTag(tag);
  },
  addTags: async (tags: Tag[]) => {
    await database.createTags(tags);
  },
  deleteTag: async (tag: Tag) => {
    await database.deleteTag(tag.id as string);
  },
  listenOnTagsChanged() {
    const tagQuery = query(tagRef);
    const unsubscribe = onSnapshot(tagQuery, (querySnapshot) => {
      const tags = getDataFromSnapshot<Tag[]>(querySnapshot);
      set({ tags });
    });

    return unsubscribe;
  },
});

export default tagReducer;
