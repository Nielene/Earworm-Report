import React, { Component } from 'react';
// import '../../css/home/UserProfile.css';



class UserProfile extends Component {


  render () {
    

    return (

        <div className='mainBodyDiv'>
          <div className='mainBody userProfile'>
            <div className='usernameTitle'>
              <h1> User Name </h1>
            </div>

            <form className='form'>

                <div className='postedAndFavoritedButtonsDiv'>
                  <div className='leftPostedbutton'>
                    <button type='button' >Posted</button>
                  </div>
                  <div className='rightFavoritedButton'>
                    <button type='button' >Favorited</button>
                  </div>
                </div>

              <div className='addNewSongDiv'>
                <p>Add New Song</p>
                <div className='addNewSong'>
                  <div className='addNewSongTextInput'>
                    <input type='text' />
                  </div>
                  <div className='addNewSongSubmitButton'>
                    <button type='submit' > Submit</button>
                  </div>
                </div>
              </div>

            </form>

          </div>
        </div>

    )
  }
}



export default UserProfile;
