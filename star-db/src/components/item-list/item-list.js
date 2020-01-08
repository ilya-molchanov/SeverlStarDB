import React, { Component } from 'react';

import './item-list.css';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner';

const ItemList = (props) => {

  // renderItems(arr) {
  //   return arr.map((item) => {
  //     const { id } = item;

  //     const label = this.props.children(item); //this.props.renderItem(item);

  //     return (
  //       <li className="list-group-item" 
  //           key={id}
  //           onClick={() => this.props.onItemSelected(id)} >
  //         {label}
  //       </li>
  //     );
  //   });
  // }

  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    return (
      <li className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

const  withData = (View, getData) => {
  return class extends Component {

    state = {
      data: null
    };
  
    componentDidMount() {
      getData()
        .then((data) => {
          this.setState({
            data
          });
        });
    }
  

    render() {

      const { data } = this.state;
      if (!data) {
        return <Spinner />;
      }
      const items = this.renderItems(data);

      return <View { ...this.props } data={data} />
    }
  }
}

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);