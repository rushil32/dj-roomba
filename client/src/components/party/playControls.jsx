import React from 'react';
import { Link } from 'react-router-dom';

const PlayControls = ({ startPlay, playNext, stopPlay, userInfo, playActive, hostControls = false }) => {
  const controlClass = playActive ? 'play-controls active' : 'play-controls';
  const syncButtonClass = playActive ? 'material-icons animated spin' : 'material-icons';

  return (
    <div className={controlClass}>
      <div>
        <Link to={'/'}>
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
      <div>
        { hostControls && (
          <div>
            <i onClick={stopPlay} className="material-icons">stop</i>
            <i onClick={startPlay} className={syncButtonClass}>sync</i>
            <i onClick={playNext} className="material-icons">skip_next</i>
          </div>
        )}
      </div>
      <div>
        { hostControls && (
          <img src={userInfo.image} alt={userInfo.name} />
        )}
      </div>
    </div>
  )
};

export default PlayControls;
