import React from 'react';
import PropTypes from 'prop-types';

function Playlist({ tracks = [] }) {
  const trackRow = track => (
    <li>
      <p>{track.name}</p>
      <p>{track.artist}</p>
    </li>
  );

  return (
    <div className="playlist">
      <ul>
        {tracks.map(track => trackRow(track))};
      </ul>
    </div>
  );
}

Playlist.propTypes = {
  tracks: PropTypes.array,
};

export default Playlist;
