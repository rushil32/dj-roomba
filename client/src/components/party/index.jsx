import React from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

import { getParty } from '../../util/partyHelpers';
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

    socket.on('vote', (partyId, trackId) => {
      if (this.state.partyInfo._id === partyId) {
        setTimeout(this.getPartyInfo, 100);
      }
    })

    socket.on('add-track', (partyId) => {
      if (this.state.partyInfo._id === partyId) {
        setTimeout(this.getPartyInfo, 100);
      }
    })

    this.setState({ socket });
  }

  toggleSearch = () => this.setState(prevState => ({ showSearch: !prevState.showSearch }));

  toggleError = (text) => this.setState(prevState => ({ showAlert: !prevState.showAlert, alertText: text }));

  componentDidMount() { this.getPartyInfo(); this.initSocket(); }

  sortTracks = (tracks) => tracks.sort((a, b) => b.votes.length - a.votes.length)

  getPartyInfo = () => {
    const { id } = this.props.match.params;
    getParty(id).then(res => this.setState({ partyInfo: res }));
  }

  addTrack = (trackData) => {
    partyUtil
      .addTrack(this.state.partyInfo._id, trackData)
      .then(res => {
        this.setState({ partyInfo: res })
        this.state.socket.emit('add-track', res._id);

        return spotifyUtil.getPlayerStatus();
      })
      .then(res => {
        if (this.state.playActive) this.resumePlayback(res);
      });
  }

  vote = (trackId) => {
    const partyId = this.state.partyInfo._id;

    this.state.socket.emit('vote', partyId, trackId);

    partyUtil.toggleVote(partyId, trackId)
      .then(res => this.setState({ partyInfo: res }));
  }

  resumePlayback = (currentState) => {
    const { currentTrack } = this.state;
    
    if (
      currentState.is_playing === false || 
      currentTrack.trackId !== currentState.item.id
    ) {
      this.startPlay();
    }
  }

  startPlay = () => {
    this.setState({ 
      playActive: true,
      showAlert: false,
    });
    
    const { partyInfo } = this.state;
    const playList = this.sortTracks(partyInfo.tracks);
    
    if (playList.length === 0) return;
    
    const nextTrack = playList[0];
    
    spotifyUtil.playTrack(nextTrack.trackId)
    .then(res => partyUtil.removeTrack(partyInfo._id, nextTrack._id))
    .then(res => this.setState({ partyInfo: res, currentTrack: nextTrack, showError: false }))
    .catch(err => {
      console.log(err);
      this.toggleError('Could not connect to Spotify. To connect make sure your app is open and playing music.');
    });
    
    this.playTimer = setTimeout(this.startPlay, nextTrack.duration);
  }

  stopPlay = () => {
    spotifyUtil.pauseTrack();
    this.setState({ playActive: false, showAlert: false });
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
          stopPlay={this.stopPlay}
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
