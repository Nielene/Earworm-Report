import React, { Component } from 'react';

class SingleSongComment extends Component {
  render () {
    return (
      <div key={this.props.comment.comment_id} className= ''>
        <div className='comments'>
          <p>song_id: {this.props.comment.song_id}</p>
          <p>comment_body: {this.props.comment.comment_body} </p>
        </div>
      </div>
    )
  }
}


export default SingleSongComment;
