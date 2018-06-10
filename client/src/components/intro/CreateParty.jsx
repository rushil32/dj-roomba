import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import * as partyUtil from '../../util/partyHelpers';

import PreviousList from './PreviousList';

class CreatePartyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      previous: [],
    };
  }

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { history, userInfo } = this.props;
    const newParty = await partyUtil.createParty(userInfo._id, this.state.title);

    history.push(`/party/${newParty._id}`);
  }

  componentDidMount() {
    partyUtil
      .getUserList(this.props.userInfo._id)
      .then(res => this.setState({ previous: res }));
  }

  render() {
    const { userInfo } = this.props;
    
    return (
      <div className="create-party">
        <div className="create-party__user">
          <img src={userInfo.image} alt={userInfo.name} />
        </div>
        <div className="create-party__form">
          <h2>Create an event</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Give your event a name"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <button
              disabled={this.state.title.length === 0}
              className="btn btn-primary btn-block"
              type="submit"
              value="Submit"
            >
            Create Party
            </button>
          </form>
        </div>
        <PreviousList list={this.state.previous} />
      </div>
    );
  }
}

export default withRouter(CreatePartyCard);
