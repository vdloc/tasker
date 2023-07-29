import FormLayout from '../FormLayout';
import TagsListEditFormContent from './Content';
import TagsListEditFormFooter from './Footer';
import TagsListEditFormHeader from './Header';

export default function TagsEditForm() {
  return (
    <FormLayout Header={TagsListEditFormHeader} Content={TagsListEditFormContent} Footer={TagsListEditFormFooter} />
  );
}
