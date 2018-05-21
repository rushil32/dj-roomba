import React from 'react';
import PropTypes from 'prop-types';

class TagInput extends React.Component {
  static propTypes = {
    handleInput: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => this.setState({ value: event.target.value });

  handleSubmit = (event) => this.props.handleInput(this.state.value);

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group dropdown-input">
          <input 
            value={this.state.value} 
            onChange={this.handleChange} 
            type="text" 
            className="form-control" 
            placeholder="Add Tag" 
            onKeyPress={this.handleKeyPress}
          />
          <div className="input-group-append" onClick={this.handleSubmit}>
            <span className="input-group-text" id="basic-addon2">
              <i className="material-icons">done</i>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default TagInput;