// External
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import WebfontLoader from '@dr-kobros/react-webfont-loader';

// Internal
import Image from './Image/Image';

const config = {
  google: {
    families: ['Work Sans: 800'],
  }
};



class App extends Component {

  render() {
    const { transcript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    var normalise = {
      padding: 0,
      margin: 0
    }
    var textContainer = {
      position: 'fixed',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
    var textStyles = {
      width:'100vw',
      textAlign:'center',
      fontSize:'6em',
      fontFamily: "'Work Sans', sans-serif",
      fontWeight:800,
      color: 'white',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
      letterSpacing: '-2.5px'
    }
    return (
      <WebfontLoader config={config}>
        <div style={normalise}>
          <div style={textContainer}>
            <h1 style={textStyles}>{this.props.transcript ? this.props.transcript.split(" ").slice(-2).join(" ") : "Start Talking..."}</h1>
          </div>
          <Image transcript={transcript}/>
        </div>
      </WebfontLoader>
    );
  }
}

App.propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

export default SpeechRecognition(App);
