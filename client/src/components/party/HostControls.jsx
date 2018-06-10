import React from 'react';
import PropTypes from 'prop-types';

function HostControls({ shuffle, refreshPlaylists }) {
  return (
    <div className="host-controls">
      <ul>
        <li onClick={shuffle}>
          <i className="material-icons">
            shuffle
          </i>
          <span>Shuffle playlist</span>
        </li>
        <li onClick={refreshPlaylists} data-toggle="modal" data-target="#pushModal">
          <i className="material-icons">
            cloud_upload
          </i>
          <span>Push to Spotify</span>
        </li>
      </ul>
    </div>
  );
}

HostControls.propTypes = {
  shuffle: PropTypes.func,
  refreshPlaylists: PropTypes.func,
};

HostControls.defaultProps = {
  shuffle: () => {},
  refreshPlaylists: () => {},
};

export default HostControls;
