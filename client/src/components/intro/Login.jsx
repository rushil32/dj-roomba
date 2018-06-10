import React from 'react';

import LoginButton from './LoginButton';
import logoDark from '../../assets/logo-dark.svg';

function Login() {
  return (
    <div className="login">
      <div>
        <img src={logoDark} alt="DJ Roomba" />
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
