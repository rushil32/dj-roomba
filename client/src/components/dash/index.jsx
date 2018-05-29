import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPartyList } from '../../util/partyHelpers';
import PartyCard from '../party-card';
import Intro from '../intro/index.jsx';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = { parties: [] };
  }

  componentDidMount() {
    getPartyList().then(res => this.setState({ parties: res }));
  }

  render() {
    const partyList = this.state.parties.map((party, index) => 
      <PartyCard key={party._id} index={index} info={party} />);

    return (
      <div className="dash">
        <div className="container">
          <div className="row">
            <div className="col">
              <Intro userData={this.props.userInfo} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Live right now</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {partyList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dash.defaultProps = {
  userInfo: {},
};

Dash.propTypes = {
  userInfo: PropTypes.object,
};

export default Dash;
