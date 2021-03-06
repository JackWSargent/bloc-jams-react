import React, {Component} from 'react';

class PlayerBar extends Component {
    render() {
        return (
          <section className="player-bar ">
            <section id="buttons" >
              <button id="previous" onClick={this.props.handlePrevClick} className='player-bar-buttons' >
                <span className="icon ion-md-skip-backward"></span>
              </button>
              <button id="play-pause" onClick={this.props.handleSongClick} className='player-bar-buttons' >
                <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
              </button>
              <button id="next" onClick={this.props.handleNextClick} className='player-bar-buttons'>
                <span className="icon ion-md-skip-forward"></span>
              </button>
            </section>
            <section id="time-control">
            <div className="current-time">{this.props.currentTime}</div>
              <input 
              type="range" 
              className="seek-bar" 
              onChange={this.props.handleTimeChange}
              value={(this.props.currentTimeUnformatted / this.props.durationUnformatted) || 0} 
              max="1" 
              min="0" 
              step="0.01" 
              />   
            <div className="total-time">{this.props.duration}</div> 
            </section>
            <section id="volume-control">
              <div className="icon ion-volume-low"></div>
              <input 
              type="range" 
              className="seek-bar" 
              onChange={this.props.handleVolumeChange}
              value={this.props.volume}
              max="1"
              min="0"
              step=".01" 
              />
              <div className="icon ion-volume-high"></div>
            </section>
          </section>
        )
    };
}

export default PlayerBar;