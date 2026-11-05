import React, { Component } from 'react';

// Optional: a free Pexels API key (https://www.pexels.com/api/) gives curated
// stock photos served from Pexels' fast image CDN. Set it in a `.env` file:
//   REACT_APP_PEXELS_API_KEY=your-key
// Without a key we fall back to LoremFlickr, which needs no key at all.
const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

const WIDTH = 1280;
const HEIGHT = 720;

// look up an image URL for a word on Pexels
function fetchPexels(query) {
  const url = 'https://api.pexels.com/v1/search?per_page=1&orientation=landscape&query=' + encodeURIComponent(query);
  return fetch(url, { headers: { Authorization: PEXELS_API_KEY } })
    .then(res => {
      if (!res.ok) throw new Error('Pexels request failed: ' + res.status);
      return res.json();
    })
    .then(data => {
      const photo = data.photos && data.photos[0];
      if (!photo) throw new Error('No Pexels results for ' + query);
      // ask the Pexels CDN for an image sized for the screen
      return photo.src.original + '?auto=compress&cs=tinysrgb&fit=crop&w=' + WIDTH + '&h=' + HEIGHT;
    });
}

// keyless, keyword-based image URL. `lock` pins the result so the same word
// always returns the same photo (and the browser can cache it).
function loremFlickrURL(query) {
  let lock = 0;
  for (let i = 0; i < query.length; i++) lock = (lock * 31 + query.charCodeAt(i)) % 100000;
  return 'https://loremflickr.com/' + WIDTH + '/' + HEIGHT + '/' + encodeURIComponent(query) + '?lock=' + lock;
}

class Image extends Component {
  constructor(props){
    super(props)
    // set the default start content
    this.state = {
      image: 'https://images.pexels.com/photos/893892/pexels-photo-893892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      query: 'lazy deck placeholder',
    }
    // words we've already looked up, so we don't refetch them
    this.cache = {};
    this.lastQuery = null;
    this.Load = this.Load.bind(this)
  }

  // when the component mounts
  componentDidMount() {
    // do this every x seconds
    this.interval = setInterval(
      () => {
        // only when something has been said
        if(this.props.transcript.length !== 0){
          // get the last word that was said, without punctuation
          const query = this.props.transcript.trim().split(" ").slice(-1)[0].toLowerCase().replace(/[^\w-]/g, '');
          // only go get a new image when the word has changed
          if (query && query !== this.lastQuery) {
            this.lastQuery = query;
            this.Load(query);
          }
        }
      },
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  Load(query){
    const getURL = this.cache[query]
      ? Promise.resolve(this.cache[query])
      : PEXELS_API_KEY
        ? fetchPexels(query).catch(() => loremFlickrURL(query))
        : Promise.resolve(loremFlickrURL(query));

    getURL.then(newURL => {
      this.cache[query] = newURL;
      // preload the image so it swaps in without a flash
      const preload = new window.Image();
      preload.onload = () => {
        // ignore it if the speaker has already moved on to another word
        if (this.lastQuery !== query) return;
        // let's set the state
        this.setState({
          // change the image
          image: newURL,
          query: query
        })
      };
      preload.src = newURL;
    });
  }

  render() {
    // image styles
    let fullscreenImage = {
      width:'100vw',
      height:'100vh',
      objectFit: 'cover',
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
