import FormLayout from '../FormLayout';
import TagsListEditFormHeader from './Header';
import TagsListEditFormContent from './Content';
import TagsListEditFormFooter from './Footer';

export default function TagsEditForm() {
  return (
    <FormLayout
      Header={TagsListEditFormHeader}
      Content={TagsListEditFormContent}
      Footer={TagsListEditFormFooter}
    />
  );
}
