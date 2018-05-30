import React from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

import * as spotifyUtil from '../../util/spotifyHelpers';
import * as partyUtil from '../../util/partyHelpers';

import Search from './Search';
import TrackList from './TrackList';
import Alert from '../common/Alert';
import PlayControls from './playControls';
import io from 'socket.io-client';

class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyInfo: {},
      showSearch: false,
      playActive: false,
      currentTrack: {},
      showAlert: false,
      alertText: '',
      socket: {}
    };

    this.playNextTimer = {};
    this.pollTimer = {};
  }

  initSocket = () => {
    const socket = io();

    socket.on('vote', this.getPartyInfo)
    socket.on('add-track', this.getPartyInfo)
    socket.on('remove-track', this.getPartyInfo)

    this.setState({ socket });
  }

  toggleSearch = () => {
    this.setState(prevState => ({ 
      showSearch: !prevState.showSearch 
    }));
  }
  toggleError = (text) => {
    this.setState(prevState => ({ 
      showAlert: !prevState.showAlert, 
      alertText: text 
    }))
  };

  componentDidMount() { 
    this.getPartyInfo(this.props.match.params.id); 
    this.initSocket(); 
  }

  sortTracks = (tracks) => tracks.sort((a, b) => b.votes.length - a.votes.length)

  getPartyInfo = (id) => {
    partyUtil.getParty(id).then(res => {
      this.setState({ partyInfo: res });
    });
  };

  addTrack = (trackData) => {
    partyUtil
      .addTrack(this.state.partyInfo._id, trackData)
      .then(res => {
        this.setState({ partyInfo: res })
        this.state.socket.emit('add-track', res._id);

        if (this.state.playActive) this.startPlayLoop()
      })
  }

  vote = (trackId) => {
    const partyId = this.state.partyInfo._id;

    this.state.socket.emit('vote', partyId);

    partyUtil.toggleVote(partyId, trackId)
      .then(res => this.setState({ partyInfo: res }));
  }

  pausePlay = () => {
    spotifyUtil.pause();
    clearInterval(this.playNextTimer);

    this.setState({ playActive: false, showAlert: false });
  }

  playTrack = (track) => {
    const { partyInfo } = this.state;

    spotifyUtil.playTrack(track.trackId)
      .then(res => {
        this.state.socket.emit('remove-track', partyInfo._id);
        
        return partyUtil.removeTrack(partyInfo._id, track._id);
      })
      .then(res => this.setState({ partyInfo: res, currentTrack: track, showError: false }))
      .catch(err => {
        this.setState({ playActive: false });
        this.toggleError('Could not connect to Spotify.');
        
        clearInterval(this.playNextTimer);
      });
  }

  getNextTrack = () => {
    if (this.state.partyInfo.tracks.length === 0) return false;
    
    const playList = this.sortTracks(this.state.partyInfo.tracks);
    return playList[0];
  }

  playNext = () => {
    const nextTrack = this.getNextTrack();
    if (nextTrack) this.playTrack(nextTrack);
  }

  startPlayLoop = () => {
    this.setState({ 
      playActive: true,
      showAlert: false,
    });

    const nextTrack = this.getNextTrack();

    if (!nextTrack) return;
    
    spotifyUtil.getPlayerStatus()
      .then(status => {
        if (!status.is_playing) this.playTrack(nextTrack);
      });
    
    this.playNextTimer = setTimeout(this.startPlayLoop, 5000);
  }

  render() {
    const { partyInfo, showSearch, currentTrack, showAlert, alertText, playActive } = this.state;
    const isHost = this.props.userInfo._id && (this.props.userInfo._id === partyInfo.host);
    const partyClass = playActive ? 'party active' : 'party';

    const searchOverlay = showSearch && (
      <Search
        trackList={partyInfo.tracks}
        toggleOverlay={this.toggleSearch}
        addTrack={this.addTrack}
      />
    );

    return (
      <div className={partyClass}>
        {searchOverlay}
        <div className="party__search-toggle" onClick={this.toggleSearch}>Search for track</div>
        <TrackList
          currentTrack={currentTrack}
          tracks={this.sortTracks(partyInfo.tracks || [])}
          handleVote={this.vote}
        />
        <Alert text={alertText} toggle={showAlert} />
        <PlayControls
          startPlay={this.startPlayLoop}
          stopPlay={this.pausePlay}
          playNext={this.playNext}
          userInfo={this.props.userInfo} 
          playActive={playActive}
          hostControls={isHost}
        />
      </div>
    );
  }
}

Party.defaultProps = {
  userInfo: {}
}

export default Party;
