// External
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import {Textfit} from 'react-textfit'
// Internal
import Image from './Image/Image';

const config = {
  google: {
    families: ['Work Sans: 800'],
  }
};

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: 'Start Talking',
      image: 'https://images.pexels.com/photos/893892/pexels-photo-893892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    }
  }

  handleClick(phrase){
    console.log(this.state.text)
    this.setState({
      text: phrase,
      image: phrase
    })
  }

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
      width: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
    var textStyles = {
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
        <div onClick={() => this.handleClick(this.props.transcript.split(" ").slice(-2).join(" "))} style={normalise}>
          <div style={textContainer}>
            <Textfit style={textStyles} mode="multi">
              {this.props.transcript}
            </Textfit>
          </div>
          <Image image={this.state.image} transcript={this.state.text}/>
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
