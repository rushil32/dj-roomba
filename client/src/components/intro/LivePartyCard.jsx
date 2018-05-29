import React from 'react';
import { Link } from 'react-router-dom';

import LiveIcon from '../party-card/LiveIcon';

function LivePartyCard({ userData }) {
  const { party } = userData;

  return (
    <Link className="dash-card intro-card live" to={`/party/${party._id}`}>
      <div className="intro-card__left">
        <img src={userData.image} alt={userData.name} />
      </div>
      <div className="intro-card__right">
        <div className="intro-card__preheader">
          <LiveIcon />
          <p >ACTIVE RIGHT NOW</p>
        </div>
        <h3>{ party.title }</h3>
      </div>
    </Link>
  );
}

export default LivePartyCard;
