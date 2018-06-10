import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';


import { getUrlParams, removeHashParams } from './util/generalHelpers';
import Intro from './components/intro';
import Party from './components/party';
import Nav from './components/common/Nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      setUser: this.setUser,
    };
  }

  setUser = userInfo => this.setState({ userInfo })

  getUserInfo = () => {
    axios.get('/api/users/info')
      .then(res => {
        cookie.set('spotify_access', res.data.newToken);
        this.setUser(res.data.user);
      });
  }

  loginSpotify = (code, state) => {
    axios.post('/api/users/spotify-login', {
      code: removeHashParams(code),
      state
    }).then(
      res => {
        this.setUser(res.data.userInfo);

        cookie.set('spotify_access', res.data.access_token);
        cookie.set('spotify_refresh', res.data.refresh_token);
      },
      err => console.log(err),
    )
  }

  componentDidMount() {
    const params = getUrlParams();
    const code = params.code || null;
    const state = params.state || null;
    const spotifyToken = cookie.get('spotify_access');
    
    if (spotifyToken)
      this.getUserInfo();
    else if (code)
      this.loginSpotify(code, state);
  }

  render() {
    return (
      <Router>
        <div>
          { this.state.userInfo._id && (<Nav />) }
          <Route exact path="/" component={(props) => (
            <Intro {...props} userInfo={this.state.userInfo} />
          )}/>
          <Route path="/party/:id" component={(props) => (
            <Party {...props} userInfo={this.state.userInfo} />
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
