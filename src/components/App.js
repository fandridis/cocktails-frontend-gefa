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

import Cocktails from './pages/cocktails/Cocktails';


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
      <div className="">
        <div className="background__image"></div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/cocktails" component={Cocktails} />
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


// The first div has class of container for materializeCSS to work well

// At Route Landing we use 'exact' so it only shows when the route is exactly /
// Otherwise it would show for /dashboard too because / is incuded in /dashboard
// 'exact' could be written as 'exact={true}'
