// @flow
import * as React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import type { Role } from './types';
import type { Movie } from './types';

// API endpoint
//const API_GET_MOVIES = 'https://alintacodingtest.azurewebsites.net/api/Movies';
const API_GET_MOVIES = 'http://localhost:3001/movies';

// Flow type definitions

type Props = {};
type State = {
  movies?: Array<Movie> // Array of movies fetched from the API endpoint
};

class App extends React.Component<Props, State> {
  state = { movies: undefined }; // the initial state

  componentWillMount() {
    // Fetch the list of movies
    axios
      .get(API_GET_MOVIES)
      .then(response => {
        this.setState({ movies: response.data });
        console.dir(this.state);
      })
      .catch(error => {
        // TODO: Handle XHR error properly
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
