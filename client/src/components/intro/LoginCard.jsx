import React from 'react';
import iconRecord from '../../assets/icon-record.svg';

function LoginCard({ handleLogin }) {
  return (
    <div className="dash-card intro-card login">
      <div className="intro-card__left">
        <img src={iconRecord} alt="Create party" />
      </div>
      <div className="intro-card__right">
        <h3>Hosting? Login to create your own party</h3>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login with spotify
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
