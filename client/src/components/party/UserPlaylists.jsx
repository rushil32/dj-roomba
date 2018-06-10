import React from 'react';
import PropTypes from 'prop-types';

import ConfirmModal from '../common/ConfirmModal';

class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.modalId = 'confirmPlaylistModal';
    this.state = {
      selectedPlaylist: '',
    };
  }
  
  selectPlaylist = id => this.setState({ selectedPlaylist: id }); 
  
  playlistRow = playlist => (
    <li 
      data-toggle="modal"
      data-target={"#" + this.modalId}
      onClick={() => this.selectPlaylist(playlist.id)}
    >{playlist.name}
    </li>
  );

  render() {
    const { addToPlaylist, playlists } = this.props;
    const { selectedPlaylist } = this.state;

    return (
      <div className="user-playlists">
        <p>Select an existing playlist</p>
        <ul>
          {playlists.map(playlist => this.playlistRow(playlist))};
        </ul>
        <ConfirmModal
          name={this.modalId}
          question="Are you sure you want to clear this playlist?"
          handleSubmit={() => addToPlaylist(selectedPlaylist)}
        />
      </div>
    );
  }
}

UserPlaylists.propTypes = {
  playlists: PropTypes.array,
  addToPlaylist: PropTypes.func,
};

export default UserPlaylists;
