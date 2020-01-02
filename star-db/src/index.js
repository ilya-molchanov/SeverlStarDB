import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

//import SwapiService from './services/swapi-service';

// new SwapiService().getResource('/people/1')
//     .then((body) => {
//         console.log('gigigi');
//         console.log(body);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// new SwapiService().getAllPeople().then((body) => {
//     body.forEach(element => {
//         console.log(element.name);
//     });    
// })

ReactDOM.render(<App />,
  document.getElementById('root'));