import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

function LoginButton() {
  function leaveRedirect(path) {
    cookie.set('_djr_redirect', path);
  }

  function clearRedirect() {
    cookie.remove('_djr_redirect');
  }

  function redirectToSpotify() {
    const path = window.location.pathname;

    if (path !== '/') {
      leaveRedirect(path);
    } else {
      clearRedirect();
    }

    axios.get('/api/users/spotify-auth').then(
      (res) => { window.location.href = res.data.url; },
      err => console.error(err),
    );
  }

  return (
    <button className="btn btn-primary login-button" onClick={redirectToSpotify}>
      Login with spotify
    </button>
  );
}

export default LoginButton;
