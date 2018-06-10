import React from 'react';
import { Link } from 'react-router-dom';

import { minsSince, formatTime } from '../../util/generalHelpers';

function PreviousList({ list = [] }) {
  function timeSinceCreation(date) {
    return formatTime(minsSince(new Date(date), new Date()));
  }

  function playlistLength(length) {
    return length === 0 ? 'No tracks added' : `${length} tracks`;
  }

  return (
    <div className="prev-list">
      {list.length && (<p className="prev-list__title">Or pick up where you left off</p>)}
      <ul>
        { list.map(item => (
          <li key={item._id}>
            <Link className="dash-card intro-card live" to={`/party/${item._id}`}>
              <div>
                <div className="prev-list__header">
                  <p>{item.title}</p>
                  <p>{timeSinceCreation(item.createdOn)}</p>
                </div>
                <p>{playlistLength(item.tracks.length)}</p>
              </div>
            </Link>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default PreviousList;
