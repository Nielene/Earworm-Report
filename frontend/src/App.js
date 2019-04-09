// This project has come a really long ways since the initial 
// submission. Great job on that.
// I would still like you to revisit this after capstone to get
// the favoriting fully functional. I think that would be a worthwile
// expenditure. Besides that, very good job on this!

import React, { Component } from 'react';
// import '../css/App.css';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import AllSongs from './components/songs/AllSongs';
import SongsByPopularity from './components/songs/SongsByPopularity';
import SongsByGenreId from './components/songs/SongsByGenreId';
import MyUserProfile from './components/users/MyUserProfile';
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
            <Route exact path='/profile/' render = { (props) => <MyUserProfile {...props} /> } />
            <Route path='/profile/:user_id' render = { (props) => <UserProfile {...props} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
