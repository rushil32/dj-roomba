import React from 'react';
import PropTypes from 'prop-types';

import LiveIcon from '../party-card/LiveIcon';

const TrackItem = ({
  track,
  classes,
  handleVote,
  selectTrack,
  header,
  subheader
}) => {
  let rightSection;

  if (classes === 'up-next' || classes === 'list') {
    rightSection = (
      <div>
        <span>{track.votes.length} vote(s)</span>
        <i
          className="material-icons"
          onClick={() => selectTrack(track)}
          data-toggle="modal"
          data-target="#trackInfoModal"
        >
          info
        </i>
        <i 
          className="material-icons" 
          onClick={() => handleVote(track.trackId)}
        >
          arrow_upward
        </i>
      </div>
    );
  } else if (classes === 'now-playing') {
    rightSection = (
      <div>
        <LiveIcon />
      </div>
    );
  }

  return (
    <li key={track.trackId} className={classes}>
      <div>
        <h3>{track.name || header}</h3>
        <p>{track.artist || subheader}</p>
      </div>
      {rightSection}
    </li>
  );
};

TrackItem.propTypes = {
  track: PropTypes.object,
  classes: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  handleVote: PropTypes.func,
  selectTrack: PropTypes.func,
};

TrackItem.defaultProps = {
  track: {},
  classes: '',
  header: '',
  subheader: '',
  handleVote: () => {},
  selectTrack: () => {},
};

export default TrackItem;
