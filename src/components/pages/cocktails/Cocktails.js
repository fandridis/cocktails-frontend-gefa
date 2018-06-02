import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';
import './Cocktails.css';
import axios from 'axios';
// import { Redirect, Route, withRouter } from 'react-router-dom';

import Ingredient from './Ingredient';

class Cocktails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ingredientName: '',
      ingredientAlcoholPercentage: 0,
      ingredientType: '',    // spirit, juice, food, other
      allIngredients: [],
      cocktailName: '',
      cocktailIsAlcoholic: true,
      cocktailHowTo: '',
      cocktailIngredients: [],
      quantityTypes: [{value: 'ml', label: 'ml'},{value: 'oz', label: 'oz'},{value: 'pieces', label: 'pieces'}],
    }

    // Binding "this" to the function handler so we can use the main components "this" inside
    // and have access to things like this.state, this.setState({})
    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
    this.handleCocktailSubmit = this.handleCocktailSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityTypeChange = this.handleQuantityTypeChange.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount @ Dashboard.js with props: ', this.props);
    let res = await axios.get('/api/ingredients/getAll') 
    console.log('res.data: ', res.data);
    res.data.theIngredients.forEach(ingredient => {
      ingredient.value = ingredient.name;
      ingredient.label = ingredient.name;
    })
    this.setState({
      allIngredients: res.data.theIngredients
    })

  }

  
  handleChange (event) {
    // I get the event.target.name (coming from input name)
    // and use it to target the key on `state` object with the same name, using bracket syntax
    this.setState({ [event.target.name]: event.target.value });
  }

  handleIngredientChange = (cocktailIngredients) => {
    this.setState({ cocktailIngredients });
  }

  handleQuantityTypeChange = (quantityType) => {
    console.log('quantityType: ', quantityType);
  }

  handleIngredientSubmit(event) {
    console.log('state: ', this.state);

    axios.post('/api/ingredients/create', { ingredient: this.state })
    .then(result => {
      console.log('result: ', result);
    })
    .catch(error => {
      console.log('error: ', error);
    })

    event.preventDefault();
  }

  handleCocktailSubmit(event) {
    console.log('state: ', this.state);

    /*axios.post('/api/cocktails/create', { cocktail: this.state })
    .then(result => {
      console.log('result: ', result);
    })
    .catch(error => {
      console.log('error: ', error);
    })*/

    event.preventDefault();
  }
  removeIngredient(i){
    let currentIngredients = this.state.cocktailIngredients;
    currentIngredients.splice(i, 1);
    this.setState({cocktailIngredients: currentIngredients})
  }

  render() {
    return (
      <div>
        <h3>CREATE COCKTAIL</h3>
        <form onSubmit={this.handleCocktailSubmit}>
          <label>Cocktail Name</label>
          <input type="text" name="cocktailName" placeholder="ex. Margarita" onChange={this.handleChange} />
          
          <h5> ADD INGREDIENTS</h5>
          <Ingredient ingredients=
          {this.state.allIngredients}
          quantityTypes={this.state.quantityTypes}
          />

          <label>How to make</label>
          <input type="text" name="cocktailHowTo" placeholder="How to make it..." onChange={this.handleChange} />

          <input type="submit" value="Submit" />
        </form>

        <h3>ADD NEW INGREDIENTS</h3>
        <form onSubmit={this.handleIngredientSubmit}>
          <label>Ingredient Name</label>
          <input type="text" name="ingredientName" placeholder="ex. Vodka" onChange={this.handleChange} />
          
          <label>Ingredient Alcohol Percentage</label>
          <input type="number" name="ingredientAlcoholPercentage" placeholder="0-100 without the %" onChange={this.handleChange} />

          <label>Ingredient Type</label>
          <input type="text" name="ingredientType" placeholder="spirit / mixer / juice / other" onChange={this.handleChange} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}


// Make the state (or part of it) accessible to this component as props (this.props.XXX)
function mapStateToProps(state) {
 return { user: state.user, tournaments: state.tournaments };
}

// Connect the component Dashboard so it can access the state
export default connect(mapStateToProps, actions)(Cocktails);
