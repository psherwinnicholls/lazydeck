import React, { Component } from 'react';

class Image extends Component {
  constructor(props){
    super(props)
    // set the default start content
    this.state = {
      image: this.props.image,
      query: 'lazy deck placeholder',
    }
    this.Load = this.Load.bind(this)
  }

  // when the component mounts
  componentDidMount() {
    // do this every x seconds
    setInterval(
      () => {
        // there will be a query
        let query;
        // only when something has been said
        if(this.props.transcript.length !== 0){
          // if something has been said, get the last word that was said
          query = this.props.transcript.split(" ").slice(-1);
          // go get the new image
          this.Load(query);
        }
      },
      500
    );
  }

  Load(query){
      // create the new url
      let newURL = 'https://source.unsplash.com/600x300/?' + query
      // let's set the state
      this.setState({
        // change the image
        image: newURL,
        query: query
      })

    }

  render() {
    // image styles
    let fullscreenImage = {
      width:'100vw',
      height:'100vh',
      filter: 'brightness(80%)',
      position:'absolute',
      zIndex: -1
    }

    return (
      <div>
        <img style={fullscreenImage} src={this.state.image} alt={this.state.query}/>
      </div>
    );
  }
}

export default Image;
