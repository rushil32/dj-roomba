import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cookie from 'js-cookie';

import Login from './Login';
import CreateParty from './CreateParty';

class Intro extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
  }

  static defaultProps = {
    userInfo: {},
  }

  checkForRedirect = () => {
    setTimeout(() => {
      const REDIRECT_COOKIE = '_djr_redirect';
      const redirect = cookie.get(REDIRECT_COOKIE);

      if (redirect) {
        cookie.remove(REDIRECT_COOKIE);
        this.props.history.push(redirect);
      }
    }, 0);
  }

  componentDidMount() {
    this.checkForRedirect();
  }

  render() {
    const { userInfo } = this.props;
    const introBlock = userInfo._id 
                      ? (<CreateParty userInfo={userInfo} />)
                      : (<Login />);

    return (
      <div className="intro">
        {introBlock}
      </div>
    );
  }
}

export default withRouter(Intro);
