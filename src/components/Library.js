import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';
class Library extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            albums: albumData,
        }
    }

    render() {
      return ( 
        <section className='library container'>
          <div className='row'>
          {
            this.state.albums.map( (album, index) => 
              <Link to={`/album/${album.slug}`} key={index} className='col-md-16 card mb-4 box-shadow library'>
                <img src={album.albumCover} alt={album.title} />
                <div>{album.title}</div>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
              </Link>
            )
          }
          </div>
        </section>
      );
    }
}

export default Library;