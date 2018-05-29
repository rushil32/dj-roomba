import React from 'react';
import axios from 'axios';

import SearchResult from './SearchResult';
import { getParty } from '../../util/partyHelpers';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: [],
    };
  }

  handleChange = (event) => {
    this.setState({ searchString: event.target.value});
  }

  isTrackSelected = (track) => {
    const trackList = this.props.trackList.filter(item => item.trackId === track.id);
    return trackList.length > 0;
  }

  getTrackData = (track) => {
    return {
      trackId: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0].url,
      trackUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
      duration: track.duration_ms,
    }
  }

  searchTrack = (event) => {
    const { searchString } = this.state;

    if (searchString.length > 0) {
      axios.get(`/api/spotify/search/${searchString}`)
      .then(
        res => this.setState({ searchResults: res.data }),
        err => console.log(err)
      );
    }
  }

  render() {
    console.log(this.props.trackList);
    const { searchResults } = this.state;
    const resultList = searchResults.map(track =>
      <SearchResult 
        trackData={this.getTrackData(track)}
        isSelected={this.isTrackSelected(track)}
        handleClick={this.props.addTrack}
      />
    );

    return (
      <div className="search-overlay">
        <div className="search-overlay__close">
          <i className="material-icons" onClick={this.props.toggleOverlay}>close</i>
        </div>
        <label>Search by track or artist name</label>
        <input 
          className="form-control"
          value={this.state.searchString}
          onChange={this.handleChange}
          onKeyUp={this.searchTrack}
          autoFocus={true}
          placeholder="Search..."
        />
        <ul>
          { resultList }
        </ul>
      </div>
    );
  }
}

export default Search;
