import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import cookie from 'js-cookie';

import { hoursSince } from '../../util/generalHelpers';

import LivePartyCard from './LivePartyCard';
import LoginCard from './LoginCard';
import CreatePartyCard from './CreatePartyCard';

class Intro extends Component {
  static propTypes = {
    userData: PropTypes.object,
    setUserData: PropTypes.func,
  }

  static defaultProps = {
    userData: {},
    setUser: () => {}
  }

  redirectToSpotify = () => {
    axios.get('/api/users/spotify-auth').then(
      res => window.location.href = res.data.url,
      err => console.error(err),
    )
  }

  isPartyActive = (startTime) => {
    return  Math.floor(hoursSince(new Date(), new Date(startTime))) < 48;
  }

  render() {
    const { userData } = this.props;

    if (userData.party && this.isPartyActive(userData.party.createdOn)) {
      return (<LivePartyCard userData={userData} />)
    } else if (userData._id) {
      return (<CreatePartyCard userData={userData} />)
    } else {
      return (<LoginCard handleLogin={this.redirectToSpotify} />)
    }
  }
}

export default Intro;
