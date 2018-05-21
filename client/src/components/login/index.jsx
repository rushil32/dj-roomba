import React from 'react';
import GoogleLogin from '../nav/GoogleLogin';
import logo from '../../assets/origami-logo.svg';

function Login({ setUserData }) {
  return (
    <div className="login">
      <div className="login__box">
        <img className="login__logo" src={logo} alt="Pigeon Notes" />
        <h1>Pigeon Notes</h1>
        <GoogleLogin setUserData={setUserData} />
      </div>
    </div>
  );
}

export default Login;
