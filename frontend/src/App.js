// Hey, so it looks like there hasn't been any
// commits from you since I made my last review / PR.
// Have there been changes I'm not seeing ?
//App is missing most of it's core functionality
// as well as it's styling.
//Favoriting doesn't work.
//No where to make comments.
// Can't seem to add a song.
// Profile doesn't show toggle / nor does it toggle.
//byPopularity page is empty...
//and STYLING.
//Please clean console.
//Not sure what happened or why it appears you quit
// working on it :-( there's still a long
// ways to go on this one. 


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
