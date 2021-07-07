// I recommend using NavLink here. Then you can style the 
// active class. Please remove dead import code.

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import icon from '../../icons/iconfinder_Faint_2695614.png'
// import all from '../../icons/iconfinder_ic_clear_all_48px_352269.png'
// import popular from '../../icons/iconfinder_ic_trending_up_48px_352184.png'
import '../../css/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className='navbar'>
          <div className='leftNavBar'>
            <Link to='/' style={{textDecoration: 'none' }}> <p> Earworm Report </p> </Link> {' '}
          </div>
            <div className='rightNavBar'>
              <Link to='/' style={{textDecoration: 'none' }}> <p>Home </p></Link> {' '}
              <Link to='/songs' style={{textDecoration: 'none' }}> <p>All Songs </p></Link> {' '}
              <Link to='/songs/byPopularity' style={{textDecoration: 'none' }}> <p> By Popularity </p></Link> {' '}
              <Link to='/songs/byGenre' style={{textDecoration: 'none' }}> <p>By Genre </p> </Link> {' '}
              <Link to='/profile/' style={{textDecoration: 'none' }}> <p>My Profile </p></Link> {' '}
            </div>
        </div>
      </nav>
    )
  }
}


export default withRouter(Navbar);
