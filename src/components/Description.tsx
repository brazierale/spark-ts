import React, { Component } from 'react';
import '../styles/Description.css';

interface DescriptionProps {
  description: string;
  disabled: boolean;
  updateDescription: (updatedDescription: string) => void;
}

// description field
class Description extends Component<DescriptionProps> {
  render() {
    return(
      <div 
        data-testid='description'
        className="Description-container"
      >
        <span className="Label">Description</span>
        <textarea
          className="Description-input"
          rows={4}
          placeholder="Enter new description..."
          value={this.props.description}
          onChange={this.handleUserInput}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
  
  handleUserInput = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateDescription(event.target.value);
  }
}

export default Description;
