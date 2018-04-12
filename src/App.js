// @flow
import * as React from 'react';
import axios from 'axios';
import _uniq from 'lodash.uniq';
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
        //console.dir(this.state);
      })
      .catch(error => {
        // TODO: Handle XHR error properly
        console.log(error);
      });
  }

  getActors = () => {
    if (!this.state.movies || this.state.movies.length === 0) return null;
    // Get the list of actors sorted by the movie name
    const movieData = [];
    // Denormalize the movie data
    this.state.movies.forEach(movie =>
      movie.roles.forEach(role => {
        movieData.push({
          actor: role.actor,
          role: role.name,
          movie: movie.name
        });
      })
    );
    //console.dir(movieData);
    // Sort the denormalized array by movie (alphabetical order)
    movieData.sort((a, b) => {
      return a.movie < b.movie ? -1 : a.movie > b.movie ? 1 : 0;
    });
    console.dir(movieData);
    // Get the list of actors
    const actors = _uniq(movieData.map(movie => movie.actor));
    //console.dir(actorArray);
    // Build an array of actors data in the format required for output
    // Note that at this point the array is already pre-sorted by movie name/
    // There is no additional requirement to sort the list of actors by their name.
    // However, this can be accomplished with a single line of code (see below)
    const actorsData = actors.map(actor => ({
      actor,
      roles: _uniq(
        movieData.filter(data => data.actor === actor).map(data => data.role)
      )
    }));
    // Uncomment the below code the sort the actors by their name (not in the requirements)
    /*
    actorsData.sort(
      (a, b) => (a.actor < b.actor ? -1 : a.actor > b.actor ? 1 : 0)
    );
    */
    console.dir(actorsData);
  };

  render() {
    this.getActors();
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
