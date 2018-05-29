import React from 'react';

import { minsSince, formatTime } from '../../util/generalHelpers';

function PartyCard({ info = {}, index=0 }) {
  const { title, description, host, createdOn } = info;
  const timeSinceCreation = formatTime(minsSince(new Date(createdOn), new Date()));
  const animationDelay = `${(index + 1) * 0.15}s`;

  return (
    <div className="dash-card party-card animated fadeInUp" style={{ animationDelay }}>
      <div className="party-card__header">
        <div className="party-card__host">
          <img src={host.image} alt={host.name} />
          <p>{host.name}</p>
        </div>
        <div className="party-card__time">
          <p>{ timeSinceCreation }</p>
        </div>
      </div>
      <div className="party-card__title">
        <h3>{title}</h3>
      </div>
      <p className="party-card__subheader">{description}</p>
    </div>
  );
}

export default PartyCard;
