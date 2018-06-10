import React from 'react';
import PropTypes from 'prop-types';

import UserPlaylists from './UserPlaylists';

class PushModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.createPlaylist(this.state.value);
    window.$('#pushModal').modal('hide');

    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    const { userPlaylists, addToPlaylist } = this.props;

    return (
      <div className="modal fade" id="pushModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Push tracks to Spotify</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                <i className="material-icons">
                  warning
                </i>
                Selecting an existing playlist will replace all its tracks
              </div>
              <UserPlaylists playlists={userPlaylists} addToPlaylist={addToPlaylist} />
              <form onSubmit={this.handleSubmit}>
                <p>Or create a new Playlist</p>
                <input placeholder="Playlist Name" type="text" value={this.state.value} onChange={this.handleChange} />
                <div className="form-buttons">
                  <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
                  <button
                    disabled={value.length === 0}
                    type="submit"
                    className="btn btn-primary"
                  >Create Playlist
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PushModal.propTypes = {
  handleClick: PropTypes.func,
};

PushModal.defaultProps = {
  handleClick: () => {},
};

export default PushModal;
