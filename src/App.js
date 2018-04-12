// @flow
import * as React from 'react';
import axios from 'axios';
import _uniq from 'lodash.uniq';
import logo from './logo.svg';
import type { ActorDataItem } from './types';
import type { Role } from './types';
import type { Movie } from './types';

// API endpoint
//const API_GET_MOVIES = 'https://alintacodingtest.azurewebsites.net/api/Movies';
const API_GET_MOVIES = 'http://localhost:3001/movies';

// Flow type definitions

type Props = {};
type State = {
  actorsData: ?Array<ActorDataItem>
};

class App extends React.Component<Props, State> {
  state = { actorsData: undefined }; // the initial state

  componentWillMount() {
    // Fetch the list of movies
    // Since our goal is to perform complex transformations or/and filtering
    // on the data, it makes sense to store it in a denormalized state.
    axios
      .get(API_GET_MOVIES)
      .then(response => {
        this.setState({ actorsData: this.denormalizeData(response.data) });
        //console.dir(this.state);
      })
      .catch(error => {
        // TODO: Handle XHR error properly
        console.log(error);
      });
  }

  /**
   * Denormalize the data fetched from the Movies API
   */
  denormalizeData(data: Array<Movie>): ?Array<ActorDataItem> {
    if (!data) return undefined;
    if (data.length === 0) return [];
    console.dir(data);
    const actorData = [];
    data.forEach(movie =>
      movie.roles.forEach(role => {
        actorData.push({
          actor: role.actor,
          role: role.name,
          movie: movie.name
        });
      })
    );
    return actorData;
    //console.dir(movieData);
  }

  getActors = () => {
    // Since we store actorsData in the state, we may not to mutate it.
    // In this case it makes to make a copy of that data before mutating
    // with sort.
    if (!this.state.actorsData) return undefined;

    const data = this.state.actorsData
      .slice()
      // Sort the denormalized array by movie (alphabetical order)
      .sort((a, b) => {
        return a.movie < b.movie ? -1 : a.movie > b.movie ? 1 : 0;
      });
    // Get the list of actors
    const actors = _uniq(data.map(movie => movie.actor));
    //console.dir(actorArray);
    // Build an array of actors data in the format required for output
    // Note that at this point the array is already pre-sorted by movie name/
    // There is no additional requirement to sort the list of actors by their name.
    // However, this can be accomplished with a single line of code (see below)
    const actorsData = actors.map(actor => ({
      actor,
      roles: _uniq(
        data.filter(data => data.actor === actor).map(data => data.role)
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
