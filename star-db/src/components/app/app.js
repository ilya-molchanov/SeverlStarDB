import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  //swapiService = new SwapiService(); //DummySwapiService();//SwapiService();

  state = {
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {

      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    // const { getPerson,
    //   getStarship,
    //   getPersonImage,
    //   getStarshipImage,
    //   getAllPeople,
    //   getAllPlanets } = this.swapiService;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>

          <Router>
            <div className="stardb-app">

              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />
              <Route path="/" exact render={() => <h2>Welcome</h2>} />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route path="/starships/:id" exact
              render={({match, location, history}) => {
                const { id } = match.params;
                return <StarshipDetails itemId={id} />
              }} />


              {/* <Row left={ <PlanetList /> } right={ <PlanetDetails /> } />

              <Row left={ <StarshipList /> } right={ <StarshipDetails /> } /> */}

            </div>
          </Router>

        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}