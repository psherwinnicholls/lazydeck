import React, { Component } from 'react';

class Image extends Component {
  constructor(props){
    super(props)
    this.state = {
      image: 'https://images.unsplash.com/photo-1531903941236-b67dd2867cff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=87b1a60dd5fcfe49436106827c96a241&auto=format&fit=crop&w=946&q=80'
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
        if(this.props.transcript.length === 0){
          // if nothing has been said get a waiting image
          query = "waiting";
          this.Load(query);
        }else{
          // if something has been said, get the last word that was said
          query = this.props.transcript.split(" ").slice(-1);
          this.Load(query);
        }
      },
      500
    );
  }

  Load(query){
      // API key for unsplash
      let newImage = 'https://source.unsplash.com/600x300/?' + query;
      this.setState({
        // change the image
        image: newImage,
      })
    }

  render() {
    // define the image styles
    let fullscreen = {
      width:'100vw',
      height:'100vh',
      backgroundImage:'url(' + this.state.image + ')',
      backgroundSize:'cover',
      backgroundPosition:'center',
      filter: 'brightness(80%)',
      position:'absolute',
      zIndex: -1
    }

    return (
      <div style={fullscreen}>
      </div>
    );
  }
}

export default Image;
