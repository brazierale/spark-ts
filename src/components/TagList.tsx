import React, { Component } from 'react';
import classNames from 'classnames';
import Tag from './Tag';
import { TestCaseObject } from '../modules/TestCase';
import '../styles/Tag.css';

interface TagListProps {
  selectedTestCase: TestCaseObject;
  updateSelectedTestCase: (testCase: TestCaseObject) => void;
};

// list of tags
class TagList extends Component<TagListProps> {
  state = {
    newTag: ''
  }

  render() {
    let key = 0;
    const tagsToRender = this.props.selectedTestCase.tags.map( tag => 
      <Tag
        key={key++} 
        tagName={tag}
        deleteTag={this.deleteTag}
        disabled={this.props.selectedTestCase.disabled}
      />
    );

    let listClasses = classNames({
      'Tag-list': true,
      'Disabled': this.props.selectedTestCase.disabled
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
            value={this.state.newTag}
            onChange={this.handleUserInput}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            disabled={this.props.selectedTestCase.disabled}
          />
        </span>
      </div>
    );
  }

  addTag = (tag: string) => {
    // only add if it is not a duplicate
    const isDuplicate = ( element: string ) => {
      return element === tag;
    };
    let newTagList = [...this.props.selectedTestCase.tags];
        
    // only add if it is not a duplicate
    if (!this.props.selectedTestCase.tags.some(isDuplicate)) {
      newTagList = [...this.props.selectedTestCase.tags, tag];

    }

    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      tags: newTagList
    });
  }

  deleteTag = (tag: string) => {
    let newTagList = this.props.selectedTestCase.tags.filter(
      t => t !== tag
    );

    this.props.updateSelectedTestCase({
      ...this.props.selectedTestCase,
      tags: newTagList
    })
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newTag: event.target.value});
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.addTag(this.state.newTag);
      this.setState({ newTag: '' });
    }
  }

  handleBlur = () => {
    this.setState({ newTag: '' });
  }
}

export default TagList;
