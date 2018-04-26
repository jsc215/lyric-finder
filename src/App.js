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
    this.getData = this.getData.bind(this);
  }

  getLyrics() {
    fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.title}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
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
    this.getData();
  }

  handleClearForm(event) {
    this.setState({
      artist: '',
      title: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // debugger
    let formPayload = {
      artist: this.state.artist,
      title: this.state.title
    };
    this.getLyrics();
    this.handleClearForm();
  }

  getData() {
    this.setState({
      artist: this.state.artist,
      title: this.state.title
    });
  }

  componentDidMount() {
    this.getLyrics();
    this.getData();
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
      return (
        <span key={key}>
          {lyric}
          <br />
        </span>
      );
    });

    return (
      <div>
        <div>
          <div className="container">
            <div className="row">
              <div className="offset-by-two twelve columns">
                <h1>The Lyric Finder</h1>
              </div>
            </div>
          </div>

          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="four columns">
                <label>
                  <input
                    className="u-full-width"
                    placeholder="Title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div className="four columns">
                <label>
                  <input
                    className="u-full-width"
                    placeholder="Artist"
                    name="artist"
                    type="text"
                    value={this.state.artist}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div className="three columns">
                <input
                  className="button-primary u-max-width"
                  type="submit"
                  value="GET THE LYRICS"
                />
              </div>
            </form>
            <div className="row">
              <div className="eight columns">
                <div />
                {lyrics}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Content(props) {
  return (
    <div>
      <h1> {props.title}</h1>
      <h1>{props.artist}</h1>
    </div>
  );
}

export default App;
