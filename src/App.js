// @flow
import * as React from 'react';
import axios from 'axios';
import _uniq from 'lodash.uniq';
import logo from './logo.svg';
import type { ActorDataItem } from './types';
import type { ActorData, Movie, Role } from './types';
import ActorsList from './ActorsList';

// API endpoint
//const API_GET_MOVIES = 'https://alintacodingtest.azurewebsites.net/api/Movies';
const API_GET_MOVIES = 'http://localhost:3001/movies';

// Flow type definitions

type Props = {};
type State = {
  actorsData: ?Array<ActorDataItem>,
  xhrError: ?string
};

class App extends React.Component<Props, State> {
  state = { actorsData: undefined, xhrError: undefined }; // the initial state

  componentDidMount() {
    // Reset XHR Error
    this.setState({ xhrError: undefined });
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
        this.setState({ xhrError: error.message });
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  /**
   * Denormalize the data fetched from the Movies API
   */
  denormalizeData(data: Array<Movie>): ?Array<ActorDataItem> {
    if (!data) return undefined;
    if (data.length === 0) return [];
    //console.dir(data);
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

  getActorsData = (): ?Array<ActorData> => {
    if (!this.state.actorsData) return undefined;

    // Since we store actorsData in the state, we shoudln't mutate it.
    // Instead, we will makes to make a copy of that data before mutating
    // with sort.
    const data = this.state.actorsData
      .slice() // Clone the data before mutating
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
    return actorsData;
  };

  render() {
    const actorsData = this.getActorsData();

    return (
      // Render an error panel if an XHR error occured,
      // the list of actors otherwise (if not empty)
      <div className="App container">
        {this.state.xhrError ? (
          <div class="card">
            <div class="card-body">Error occured: {this.state.xhrError}</div>
          </div>
        ) : (
          <ActorsList actors={actorsData} />
        )}
      </div>
    );
  }
}

export default App;
