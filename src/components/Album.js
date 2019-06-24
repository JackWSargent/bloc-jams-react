import React, { Component } from 'react';
import albumData from './../data/albums';
class Album extends Component {
    constructor(props) {
        super(props)

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
      
        this.state = {
            album: album
        };
    }

    formatDuration(duration) {
        const mins = parseInt(duration/60) ;
        const seconds = parseInt(duration%60);
        return duration ? `${mins}:${seconds}` : "-:--";
    }

    songID(id) {
        return `${id + 1}`;
    }
    
    render() {
      return (
        <section className="album">
          <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
               {this.state.album.songs.map( (song, index) => 
                 <tr key={index}>
                   <td className="songID">{this.songID(index)}</td>
                   <td className="songTitle">{song.title}</td>
                   <td className="songDuration">{this.formatDuration(song.duration)}</td>
                 </tr>
               )}
           </tbody>
         </table>
        </section>
      );
    }
}

export default Album;