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
            <Link to='/' style={{textDecoration: 'none' }}> Earworm Report </Link> {' '}
          </div>
            <div className='rightNavBar'>
              <Link to='/' style={{textDecoration: 'none' }}> Home </Link> {' '}
              <Link to='/songs' style={{textDecoration: 'none' }}> All Songs </Link> {' '}
              <Link to='/songs/byPopularity' style={{textDecoration: 'none' }}> By Popularity </Link> {' '}
              <Link to='/songs/byGenre' style={{textDecoration: 'none' }}> By Genre </Link> {' '}
              <Link to='/profile/:user_id' style={{textDecoration: 'none' }}> My Profile </Link> {' '}
            </div>
        </div>
      </nav>
    )
  }
}


export default withRouter(Navbar);
