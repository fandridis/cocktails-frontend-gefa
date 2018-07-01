import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Redirect, Route, withRouter } from 'react-router-dom';

import './CocktailDetails.css';
// import FontAwesome from 'react-fontawesome';

// ===== COMPONENT IMPORTS ===== //
// import SideMenu from "../sideMenu/SideMenu";
// import BtnToggleSideMenu from "../../reusable/btnToggleSideMenu/btnToggleSideMenu";
//import SelectGeneral from '../../reusable/selectGeneral/SelectGeneral';



class CocktailSearch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      spirits: [
        {value: 'Vodka', label: 'Vodka'},
        {value: 'Rum', label: 'Rum'},
        {value: 'Whiskey', label: 'Whiskey'},
        {value: 'Gin', label: 'Gin'},
        {value: 'Bourbon', label: 'Bourbon'}
      ],
      allCocktails: [],
      filteredCocktails: [],
      sideMenu: "-250px"
    }

    // Binding "this" to the function handler so we can use the main components "this" inside
    // and have access to things like this.state, this.setState({})
    // this.toggleSideMenu = this.toggleSideMenu.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    console.log('this.props @ CocktailDetails.js: ', this.props);
  };

  // handleChange(event) {
  //  console.log('event: ', event);
    // Multi-purpose handler
    // I get the event.target.name (coming from input name)
    // and use it to target the key on `state` object with the same name, using bracket syntax
  // this.setState({ [event.target.name]: event.target.value });
  // }

  handleChange(event) {
  }

  render() {
    return (
      <div className="cocktailSearch-pageWrapper">
        INDIVIDUAL COCKTAIL
      </div>
    )
  }

}


// Make the state (or part of it) accessible to this component as props (this.props.XXX)
// function mapStateToProps(state) {
//  return { user: state.user, tournaments: state.tournaments };
// }

// Connect the component Dashboard so it can access the state
// export default connect(mapStateToProps, actions)(Ingredients);
export default CocktailSearch;
