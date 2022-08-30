import React, { useState } from 'react';
import classNames from 'classnames';
import Tag from './Tag';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/Tag.css';

type TagListProps = {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
};

// list of tags
const TagList = ({selectedTestCase, updateSelectedTestCase}: TagListProps) => {
  const [newTag, setNewTag] = useState({name: ''});

  const addTag = (tag: string) => {
    // only add if it is not a duplicate
    const isDuplicate = ( element: string ) => {
      return element === tag;
    };
    let newTagList = [...selectedTestCase.tags];
        
    // only add if it is not a duplicate
    if (!selectedTestCase.tags.some(isDuplicate)) {
      newTagList = [...selectedTestCase.tags, tag];

    }

    updateSelectedTestCase({
      ...selectedTestCase,
      tags: newTagList
    });
  }

  const deleteTag = (tag: string) => {
    let newTagList = selectedTestCase.tags.filter(
      t => t !== tag
    );

    updateSelectedTestCase({
      ...selectedTestCase,
      tags: newTagList
    })
  }

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTag({ name: event.target.value});
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      addTag(newTag.name);
      setNewTag({ name: '' });
    }
  }

  const handleBlur = () => {
    setNewTag({ name: '' });
  }

  let key = 0;
  const tagsToRender = selectedTestCase.tags.map( tag => 
    <Tag
      key={key++} 
      tagName={tag}
      deleteTag={deleteTag}
      disabled={selectedTestCase.disabled}
    />
  );

  let listClasses = classNames({
    'Tag-list': true,
    'Disabled': selectedTestCase.disabled
  });

  return(
    <div data-testid="tag-list" className="Tag-list-container">
      <span className="Label">Tags</span>
      <span className={listClasses}>
        {tagsToRender}
        <textarea
          data-testid="tag-new"
          className="Tag-input"
          rows={1}
          wrap="off"
          placeholder="Enter new tag..."
          value={newTag.name}
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={selectedTestCase.disabled}
        />
      </span>
    </div>
  );
}

export default TagList;
