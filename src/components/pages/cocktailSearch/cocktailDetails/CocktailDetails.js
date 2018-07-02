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



class CocktailDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  async componentDidMount() {
    console.log('this.props @ CocktailDetails.js: ', this.props);
  };

  render() {
    let cocktail = this.props.location.state.cocktail;

    return (
      <div className="cocktailSearch-pageWrapper">

        <img 
          src={"https://cocktailsappimages.blob.core.windows.net/testcontainer/" + cocktail.imageLink}
          alt="cocktail drink"
          className="cocktailCard__image"
        />

        <h1>Name: {cocktail.name}</h1>

        <h3>Strength: {cocktail.strength}</h3>

        <h3>Time: {cocktail.time}</h3>

        <p>Description: {cocktail.description}</p>

        {cocktail.ingredients.map((ingredient, i) =>
          <div key={i}>
            <h3>{ingredient.ingredientName}</h3>
            <h4>{ingredient.quantity}</h4>
          </div>
        )}

        <p>How to make: {cocktail.howTo}</p>

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
export default CocktailDetails;
