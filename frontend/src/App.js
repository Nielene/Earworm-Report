import React, { Component } from 'react';
// import '../css/App.css';
import { Route, Switch, Link } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import AllSongs from './components/songs/AllSongs';
import SongsByPopularity from './components/songs/SongsByPopularity';
import SongsByGenreId from './components/songs/SongsByGenreId';
import UserProfile from './components/users/UserProfile';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
            <Route exact path='/' render={props => <Home {...props} /> } />
            <Route exact path="/songs" render={ (props) => <AllSongs {...props} /> } />
            <Route path='/songs/byPopularity' render={(props) => <SongsByPopularity {...props} /> } />
            <Route path='/songs/byGenre' render={(props) => <SongsByGenreId {...props} /> } />
            <Route path='/profile/:user_id' render = { (props) => <UserProfile {...props} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
