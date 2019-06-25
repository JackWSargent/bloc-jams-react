import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props)

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
      
        this.state = {
            album: album,
            currentSong: null,
            isPlaying: false,
            songHovered: null,
            currentTime: 0,
            duration: album.songs[0].duration, 
            volume: 0.8
        };
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.setState({volume: newVolume});
        this.audioElement.volume = newVolume;
    }

    // const newState = {'volume': e.target.value };
    // this.audioElement.volume = newState.volume;
    // this.setState(newState);

    renderSongID(song, index) {
        const isHovered = this.state.songHovered === index;
        const isPlaying = this.thisSongPlaying(song);
        if(isPlaying) {
            return (
            <i className="icon ion-md-pause"></i>);
        } else if (isHovered || this.state.currentSong === song) {
            return (
            <i className="icon ion-md-play"></i>);
        }
        return (
            <span>{index + 1}</span>);
    }

    thisSongPlaying(song)  {
        return this.state.currentSong === song && this.state.isPlaying; //Current song is the one we are hovering over and as a song is playing
    }

    formatDuration(duration) {
        const mins = parseInt(duration/60) ;
        let seconds = parseInt(duration%60);
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
        return duration ? `${mins}:${seconds}` : "-:--";
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }   

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
          } else {
            if (!isSameSong) { this.setSong(song); }  
            this.play();
          }
    }

    handleHoverOn(index) {
        this.setState({songHovered: index});
        console.log("Hovering");
    }

    handleHoverOff() {
        this.setState({songHovered: null})
        console.log("Not Hovering");
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    render() {
      return (
        <section className="album container">
        <div className="row">
          <section id="album-info" className="col-md-8 container">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details  album-info">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list" className="song-list container" >
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody className='container'>
               {this.state.album.songs.map( (song, index) => 
                 <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.handleHoverOn(index)} onMouseLeave={() => this.handleHoverOff()}>
                   <td className="songID">{this.renderSongID(song, index)}</td>
                   <td className="songTitle">{song.title}</td>
                   <td className="songDuration">{this.formatDuration(song.duration)}</td>
                 </tr>
               )}
           </tbody>
         </table>
         </div>
         <PlayerBar 
         isPlaying={this.state.isPlaying} 
         currentSong={this.state.currentSong}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()} 
         handleNextClick={() => this.handleNextClick()}
         currentTime={this.formatDuration(this.audioElement.currentTime)}
         duration={this.formatDuration(this.audioElement.duration)}
         currentTimeUnformatted={this.audioElement.currentTime}
         durationUnformatted={this.audioElement.duration}
         volume={this.state.volume}
         handleTimeChange={(e) => this.handleTimeChange(e)}
         handleVolumeChange={(e) => this.handleVolumeChange(e)}
         />
        </section>
      );
    }
}

export default Album;