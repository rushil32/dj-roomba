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

    this.playTimer = {};
  }

  initSocket = () => {
    const socket = io();

    socket.on('vote', this.getPartyInfo)
    socket.on('add-track', this.getPartyInfo)
    socket.on('remove-track', this.getPartyInfo)

    this.setState({ socket });
  }

  toggleSearch = () => this.setState(prevState => ({ showSearch: !prevState.showSearch }));

  toggleError = (text) => this.setState(prevState => ({ showAlert: !prevState.showAlert, alertText: text }));

  componentDidMount() { 
    const { id } = this.props.match.params;
    
    this.getPartyInfo(id); 
    this.initSocket(); 
  }

  sortTracks = (tracks) => tracks.sort((a, b) => b.votes.length - a.votes.length);

  getPartyInfo = (id) => partyUtil.getParty(id).then(res => this.setState({ partyInfo: res }));

  addTrack = (trackData) => {
    partyUtil
      .addTrack(this.state.partyInfo._id, trackData)
      .then(res => {
        this.setState({ partyInfo: res })
        this.state.socket.emit('add-track', res._id);

        if (this.state.playActive) this.resumePlay()
      })
  }

  vote = (trackId) => {
    const partyId = this.state.partyInfo._id;

    this.state.socket.emit('vote', partyId);

    partyUtil.toggleVote(partyId, trackId)
      .then(res => this.setState({ partyInfo: res }));
  }

  resumePlay = () => {
    const { currentTrack } = this.state;

    spotifyUtil.isTrackPlaying(currentTrack)
      .then((state) => {
        if (state.track && !state.playing) {
          this.startPlayer();
        }
      })
  }

  pausePlay = () => {
    spotifyUtil.pause();
    this.setState({ playActive: false, showAlert: false });
  }

  startPlay = () => {
    if (this.state.playActive) return;
    this.playNext();
  }

  playNext = () => {
    this.setState({ 
      playActive: true,
      showAlert: false,
    });
    
    const { partyInfo } = this.state;
    const playList = this.sortTracks(partyInfo.tracks);
    
    if (playList.length === 0) return;
    
    const nextTrack = playList[0];
    
    this.playTimer = setTimeout(this.playNext, nextTrack.duration + 2000);
    
    spotifyUtil.playTrack(nextTrack.trackId)
      .then(res => {
        this.state.socket.emit('remove-track', partyInfo._id);
        
        return partyUtil.removeTrack(partyInfo._id, nextTrack._id);
      })
      .then(res => this.setState({ partyInfo: res, currentTrack: nextTrack, showError: false }))
      .catch(err => {
        this.setState({ playActive: false });
        this.toggleError('Could not connect to Spotify.');
        
        clearInterval(this.playTimer);
      });
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
          startPlay={this.startPlay}
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
