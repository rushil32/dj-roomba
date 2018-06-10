import React from "react";
import * as partyUtil from "../../util/partyHelpers";

import PartyHome from './PartyHome';
import Login from '../intro/Login';

class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyInfo: {},
      activeTab: 'playlist',
    };
  }

  componentDidMount() {
    this.getPartyInfo(this.props.match.params.id);
  }

  setPartyInfo = (partyInfo) => this.setState({ partyInfo })

  getPartyInfo = async (id) => {
    const partyInfo = await partyUtil.getParty(id);
    this.setState({ partyInfo });
  };

  addUserTracks = async (userId, partyId) => {
    const updatedParty = await partyUtil.addUserFavs(userId, partyId);
    this.setPartyInfo(updatedParty);
  }

  isUserConnected = () => {
    const { partyInfo } = this.state;
    const { userInfo } = this.props;

    if (!partyInfo.guests) return false;

    return partyInfo
      .guests
      .filter(guest => guest._id === userInfo._id)
      .length > 0;
  }

  isUserHost = () => {
    const { userInfo } = this.props;
    const { partyInfo } = this.state;

    if (!partyInfo.host) return false;

    return userInfo._id === partyInfo.host._id;
  }

  render() {
    const { userInfo } = this.props;
    const { partyInfo } = this.state;
    
    return (
      <div className="party">
        { 
          userInfo._id 
          ? (<PartyHome
              userInfo={userInfo}
              partyInfo={partyInfo}
              isUserConnected={this.isUserConnected()}
              isHost={this.isUserHost()}
              setPartyInfo={this.setPartyInfo}
              addTracks={() => this.addUserTracks(userInfo._id, partyInfo._id)} 
            />)
          : (<Login />)
        }
      </div>
    )
  }
}

Party.defaultProps = {
  userInfo: {}
};

export default Party;
