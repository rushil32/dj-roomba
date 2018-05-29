import React from 'react';

const TrackInfo = ({ trackData = {} }) => (
  <div className="modal fade track-info" id="trackInfoModal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="material-icons">
              close
            </i>
          </button>
        </div>
        <div className="modal-body">
          <img src={trackData.image} alt={trackData.name} />
          <h3>{trackData.name}</h3>
          <p>{trackData.artist}</p>
          <p>{trackData.album}</p>
        </div>
      </div>
    </div>
  </div>
);

export default TrackInfo;
