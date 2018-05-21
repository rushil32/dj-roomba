import React from 'react';
import PropTypes from 'prop-types';

class HeaderInput extends React.Component {
  state = { value: '' }

  static propTypes = {
    handleInput: PropTypes.func,
    value: PropTypes.string
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      value: nextProps.value || ''
    }
  }

  handleChange = (event) => this.setState({ value: event.target.value });

  handleSubmit = (event) => this.props.handleInput({ title: this.state.value });

  handleKeyUp = (event) => {
    this.handleSubmit(event);
  }

  render() {
    return (
      <div className="text-area__header">
        <input
          value={this.state.value} 
          onChange={this.handleChange} 
          type="text" 
          className="form-control" 
          placeholder="Title" 
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}

export default HeaderInput;