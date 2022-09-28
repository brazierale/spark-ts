import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type DeleteTagProps = {
  tagName: string;
  disabled: boolean;
  deleteTag: (tagName: string) => void;
};

// delete button for a single tag
const DeleteTag = ({ tagName, disabled, deleteTag }: DeleteTagProps) => {
  const Classes = (disabled: boolean) =>
    classNames({
      'Delete-tag': true,
      'Disabled-delete': disabled,
    });

  return (
    <FontAwesomeIcon
      data-testid='tag-delete'
      className={Classes(disabled)}
      icon={faTimes}
      onClick={() => deleteTag(tagName)}
    />
  );
};

export default DeleteTag;
