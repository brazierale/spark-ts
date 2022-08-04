import DeleteTag from './TagDelete';

type TagProps = {
  tagName: string;
  disabled: boolean;
  deleteTag: (tag: string) => void;
};

// single tag which will in future act as a link to filtering
const Tag = ( {tagName, disabled, deleteTag}: TagProps ) => {
  
  return (
    <span data-testid="tag" className="Tag">
      {tagName}
      <DeleteTag
        tagName={tagName}
        disabled={disabled}
        deleteTag={deleteTag} />
    </span>
  );
};

export default Tag;
