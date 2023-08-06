import { database, tagRef } from '@/firebase/firestore';
import { Tag, User } from '@/types';
import { getDataFromSnapshot } from '@/utils';
import { onSnapshot, query, where } from 'firebase/firestore';

const tagReducer = (set: any, get: any) => ({
  tags: [],
  fetchTags: async () => {
    const user = get().user as User;
    if (!user) return;
    const tags = await database.getTags(user.uid);
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
    const user = get().user as User;
    if (!user) return () => {};
    const tagsQuery = query(tagRef, where('userID', '==', user.uid));
    const unsubscribe = onSnapshot(tagsQuery, (querySnapshot) => {
      const tags = getDataFromSnapshot<Tag[]>(querySnapshot);
      set({ tags });
    });

    return unsubscribe;
  },
  resetTags: async () => {
    const tags = get().tags;
    await database.deleteTags(tags);
  },
});

export default tagReducer;
