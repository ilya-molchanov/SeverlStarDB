import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {

        // renderItem={ (item) => `${item.name} (${item.gender}, ${item.birthYear})`
        // renderItem={ ({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {
                    (i) => (
                    `${i.name} (${i.birthYear})`
                    )
                }
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson} />
                <ErrorButton />
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails} />
        )
    }
}