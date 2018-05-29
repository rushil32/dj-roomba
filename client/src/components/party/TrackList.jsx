import React from 'react';
import TrackInfo from './TrackInfo';
import TrackItem from './TrackItem';

class TrackList extends React.Component {
  state = {
    selectedTrack: {},
  }

  selectTrack = (track) => this.setState({ selectedTrack: track })

  subHead = (text) => (<li><span className="track-list__subheader">{text}</span></li>);

  render() {
    const { tracks, handleVote, currentTrack } = this.props;
    
    if (tracks.length === 0 && !currentTrack._id) {
      return (
        <div className="track-list">
          <ul>
            <TrackItem 
              header='Looks like this playlist is empty'
              subheader='Search for a track to get started'
              classes='empty'
            />
          </ul>
        </div>
      )
    }

    return (
      <div>
        <div className="track-list"> 
          <ul>
            {currentTrack._id && this.subHead('LAST PLAYED')}
            {currentTrack._id && (<TrackItem track={currentTrack} classes={'now-playing'} />)}
            {tracks.length && this.subHead('UP NEXT')}
            {tracks.map((track, index) => (
              <TrackItem
                track={track}
                classes={index === 0 ? 'up-next' : 'list'}
                handleVote={handleVote}
                selectTrack={this.selectTrack}
              />
            ))}
          </ul>
        </div>
        <TrackInfo trackData={this.state.selectedTrack} />
      </div>
    );
  }
}

TrackList.defaultProps = {
  tracks: []
}

export default TrackList;
