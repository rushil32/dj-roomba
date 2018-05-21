import React from 'react';
import { authWithServer } from '../../util/userHelpers';

class LoginButton extends React.Component {
  onSignIn = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;

    authWithServer(id_token).then(res => this.props.setUserData(res));
  }

  componentDidMount() {
    let _this = this;
    window.gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 185,
      'height': 40,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': _this.onSignIn
    });  
  }

  render() {
    return (
      <div id="g-signin2"></div>
    );
  }
}

export default LoginButton;

