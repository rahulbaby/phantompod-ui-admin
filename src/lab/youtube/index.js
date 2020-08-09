import React, { Component } from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';

class ResponsivePlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      playing: false,
      played: 0.5,
      seeking: false,
    };
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.current.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    const SEPARATOR = ' · ';

    return (
      <div>
        SOME OTHER COMPONENT ON TOP
        <div
          style={{
            width: 400,
            height: 300,
            background: '#ccc',
            position: 'absolute',
            opacity: 0,
          }}
        />
        <div style={{ width: 400, height: 300, zIndex: -1, position: 'relative' }}>
          <YouTubePlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            width="100%"
            height="100%"
            playing={playing}
            ref={this.player}
          />
        </div>
        SOME OTHER COMPONENT ON BOTTOM
        <br />
        <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={this.handleSeekMouseDown}
          onChange={this.handleSeekChange}
          onMouseUp={this.handleSeekMouseUp}
        />
      </div>
    );
  }
}

export default ResponsivePlayer;
