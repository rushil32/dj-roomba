import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Editor from './components/editor';
import Login from './components/login';
import "./App.css";


class App extends Component {
  state = {
    userData: {}
  };

  setUserData = (userData) => this.setState({ userData });
  
  getUserData = () => {
    axios.get('/api/users/current').then(
      res => this.setUserData(res.data.user),
      error => console.error,
    );
  }

  componentDidMount() { this.getUserData(); }

  render() {
    const { userData } = this.state;
    
    return userData.email 
            ? (<Editor userData={userData} setUserData={this.setUserData} />)
            : (<Login userData={userData} setUserData={this.setUserData} />);
  }
}

export default App;
