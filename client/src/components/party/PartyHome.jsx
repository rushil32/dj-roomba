import React from 'react';

import * as partyUtil from "../../util/partyHelpers";
import * as spotifyUtil from "../../util/spotifyHelpers";

import PartyTabs from './PartyTabs';
import Playlist from './Playlist';
import Guestlist from './Guestlist';
import BannerCta from '../common/BannerCta';
import HostControls from './HostControls';
import PushModal from './PushModal';


class PartyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'playlist',
      userPlaylists: [],
      playlistSuccess: false,
    };
  }

  getUserPlaylists = async () => {
    const { userInfo } = this.props;
    let userPlaylists = await spotifyUtil.getUserPlaylists(userInfo.spotifyId);
    userPlaylists = userPlaylists.filter(playlist => playlist.owner.id === userInfo.spotifyId);

    this.setState({ userPlaylists });
  }

  createPlaylist = async (playlistName) => {
    const { userInfo, partyInfo } = this.props;
    const userId = userInfo.spotifyId;
    const newPlaylist = await spotifyUtil.createPlaylist(playlistName, userId);
    const updatedPlaylist = await spotifyUtil.addToPlaylist(
      userInfo.spotifyId,
      newPlaylist.id,
      partyInfo.tracks
    );
    this.setSuccessMessage()
  }

  addToPlaylist = (playlistId) => {
    const { userInfo, partyInfo } = this.props;

    spotifyUtil
      .addToPlaylist(
        userInfo.spotifyId,
        playlistId,
        partyInfo.tracks
      )
      .then(res => this.setSuccessMessage());
  }

  setActiveTab = (activeTab) => this.setState({ activeTab });

  setSuccessMessage = () => this.setState({ playlistSuccess: true });

  shuffleTracks = async () => {
    const { partyInfo, setPartyInfo } = this.props;
    const shuffled = await partyUtil.shuffleTracks(partyInfo._id);
    setPartyInfo(shuffled);
  }

  render() {
    const { activeTab, userPlaylists } = this.state;
    const { addTracks, partyInfo, isUserConnected, isHost } = this.props;
    const showHostControls = isHost && activeTab === 'playlist';
    
    return (
      <div>
        { !isUserConnected && (
          <BannerCta 
            header="Join party"
            subheader="By joining you will be sharing your list of top tracks with the host"
            cta="connect"
            handleClick={addTracks}
          />
        )}
        <PartyTabs handleClick={this.setActiveTab} active={activeTab} />
        { showHostControls && (
          <HostControls 
            shuffle={this.shuffleTracks}
            refreshPlaylists={this.getUserPlaylists}
            pushPlaylist={this.pushPlaylist}
          />
        )} 
        { 
          activeTab === 'playlist'
          ? (<Playlist tracks={partyInfo.tracks} />)
          : (<Guestlist guests={partyInfo.guests} />)
        }
        <PushModal
          userPlaylists={userPlaylists}
          addToPlaylist={this.addToPlaylist}
          createPlaylist={this.createPlaylist}
        />
      </div>
    )
  }
}

export default PartyHome;
