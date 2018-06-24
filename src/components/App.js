// If a given file is exporting a class or a React component of any type
// I label it with a capital letter in its name

import React, { Component } from 'react';
// BrowserRouter: React component for how should React behave
// Route: React component used to setup a rule between certail route and components to be visible
import {BrowserRouter, Route} from 'react-router-dom'; // helpers for navigating around the dom (native and core exists too)
// connect gives components the ability to call actions
import { connect } from 'react-redux';
// Create an object will all the actions of the app
import * as actions from '../actions';


import 'font-awesome/css/font-awesome.css';

//import Header from './header/Header';
import Landing from './pages/landing/Landing';
import Cocktails from './pages/cocktails/Cocktails';
import Ingredients from './pages/ingredients/Ingredients';
import CocktailSearch from './pages/cocktailSearch/CocktailSearch';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }

    this.handler = this.handler.bind(this);
  }


  handler() {
    this.setState({
        user: false
    });
}

  // Preferred location to do any initialization actions
  componentDidMount() {
  }

  render() {
    return (
      <div className="main-app">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/cocktails" component={Cocktails} />
            <Route path="/ingredients" component={Ingredients} />
            <Route path="/cocktailsearch" component={CocktailSearch} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// This finds the "auth" property from Redux store and returns it (saves to props)
// function mapStateToProps({ auth }) {
//  return { auth };
//}

const mapStateToProps = state => {
  const { user, isLoggedIn } = state
  return {
    user,
    isLoggedIn
  }
}

// This gets the whole Redux store
// function mapStateToProps( state ) {
//  console.log('Auth at mapstate: ', state);
//  return state.auth || {auth: false};
//}

// connect 1st arg: mapState to props argument
// connect 2nd arg: all the action creators
export default connect(mapStateToProps, actions)(App);

// At Route Landing we use 'exact' so it only shows when the route is exactly /
// Otherwise it would show for /dashboard too because / is incuded in /dashboard
// 'exact' could be written as 'exact={true}'
