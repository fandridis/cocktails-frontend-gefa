import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// compose is for Redux Dev Tools
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';

// Importing all the reducers to pass in the store
import reducers from './reducers';

// With Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// 1st arg of our store: all the reducers
// 2nd arg of our store: initial state
// 3rd arg of our store: the middleaware
const store = createStore(
  reducers, /* preloadedState, */ 
  composeEnhancers(
    applyMiddleware(reduxThunk)
  ));


// *** WITHOUT PROVIDER ***
// 1st arg: route component
// 2nd arg: where to rend that component (found in /../public/index.html)
// ReactDOM.render(
//  <App />, 
//  document.querySelector('#root'));

// *** WITH PROVIDER ***
ReactDOM.render(
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
);