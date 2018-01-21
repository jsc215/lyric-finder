import React, { Component } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lyrics: '',
    artist: '',
    title: ''
  };
    this.getLyrics = this.getLyrics.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  getLyrics() {
    fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.title}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let title = this.state.title;
      let artist = this.state.artist;
      this.setState({
       lyrics: body.lyrics,
       title: title,
       artist: artist
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleClick() {
    this.getLyrics();
  }

  handleClearForm(event) {
    this.setState({
      artist: '',
      title: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      artist: this.state.artist,
      title: this.state.title
    };

    console.log(formPayload)
    this.getLyrics()
  }

  componentDidMount(){
    this.getLyrics();
  }

  handleChange(event) {
    let newKey = event.target.name;
    let newValue = event.target.value;
    this.setState({
      [newKey]: newValue
    });
  }

  render() {
    let lyrics = this.state.lyrics.split('\n').map((lyric, key) => {
      return <span key={key}>{lyric}<br/></span>;
    });

    return(
      <div className='container'>
        <h1>The Lyric Finder</h1>
          <form className='search'  onSubmit={this.handleSubmit}>
            <label>
              <input
                placeholder='Title'
                name='title'
                type='text'
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                placeholder='Artist'
                name='artist'
                type='text'
                value={this.state.artist}
                onChange={this.handleChange}
              />
            </label>
              <input className='button-primary' type= 'submit' value='GET THE LYRICS'/>
          </form>
        <div className='row'>
          <div className='4 columns'>
            {lyrics}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
