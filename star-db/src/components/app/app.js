import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context'

import './app.css';

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

          <div className="stardb-app">

            <Header onServiceChange={this.onServiceChange} />

            <RandomPlanet />

            <PeoplePage />

            <PlanetsPage />

            <StarshipsPage />
            
            {/* <Row left={ <PlanetList /> } right={ <PlanetDetails /> } />

            <Row left={ <StarshipList /> } right={ <StarshipDetails /> } /> */}

          </div>

        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}