import React from 'react';
import axios from 'axios';

class CreatePartyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      private: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    axios.post('/api/parties/new', {
      title: this.state.title,
      description: this.state.description,
      private: this.state.private,
      host: this.props.userData._id,
    }).then((res) => {
      console.log(res);
    });
  }

  render() {
    const { userData } = this.props;

    return (
      <div className="dash-card intro-card create">
        <div className="intro-card__left">
          <img src={userData.image} alt={userData.name} />
          <p>{userData.name}</p>
          <p className="intro-card__logout">Not you? Click <u>here</u> to logout</p>
        </div>
        <div className="intro-card__right">
          <h3>Get your event started here:</h3>
          <form onSubmit={this.handleSubmit}>
            <input 
              placeholder="Give your event a name"
              className="form-control"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <textarea
              placeholder="Tell people a little bit about it (Optional)"
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <div className="form-check">
              <input
                value={this.state.private}
                onChange={this.handleChange}
                type="checkbox"
                className="form-check-input"
                name="private"
              />
              <label className="form-check-label" htmlFor="private">Private</label>
            </div>
            <button
              disabled={this.state.title.length === 0}
              className="btn btn-primary"
              type="submit"
              value="Submit"
            >
            Create Party
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePartyCard;
