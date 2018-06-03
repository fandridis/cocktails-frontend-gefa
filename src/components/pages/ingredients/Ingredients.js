import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
// import Select from 'react-select';
import axios from 'axios';
// import { Redirect, Route, withRouter } from 'react-router-dom';

import './Ingredients.css';
import FontAwesome from 'react-fontawesome';

// ===== COMPONENT IMPORTS ===== //
import SelectGeneral from '../../reusable/selectGeneral/SelectGeneral'



class Ingredients extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ingredientName: '',
      ingredientDescription: '',
      alcoholPercentage: 0,
      type: '',
      allIngredients: [],
      allTypes: [
        {value: 'spirit', label: 'Spirit'},
        {value: 'juice', label: 'Juice'},
        {value: 'herb', label: 'Herb'},
        {value: 'other', label: 'Other'}
      ],
    }

    // Binding "this" to the function handler so we can use the main components "this" inside
    // and have access to things like this.state, this.setState({})
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount @ Dashboard.js with props: ', this.props);
    let res = await axios.get('https://cocktails-api-gefa.herokuapp.com/api/ingredients/getAll') 
    console.log('res.data: ', res.data);
    res.data.theIngredients.forEach(ingredient => {
      ingredient.value = ingredient.name;
      ingredient.label = ingredient.name;
    })
    this.setState({
      allIngredients: res.data.theIngredients
    })
  }

  handleChange(event) {
    // Multi-purpose handler
    // I get the event.target.name (coming from input name)
    // and use it to target the key on `state` object with the same name, using bracket syntax
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({type: event.value});
  }

  handleIngredientSubmit(event) {
    console.log('state: ', this.state);
    let ingredient = {
      name: this.state.ingredientName,
      description: this.state.ingredientDescription,
      alcoholPercentage: this.state.alcoholPercentage,
      type: this.state.type  
    }

    axios.post('https://cocktails-api-gefa.herokuapp.com/api/ingredients/create', { ingredient: ingredient })
    .then(result => {
      console.log('result: ', result);
    })
    .catch(error => {
      console.log('error: ', error);
    })
    event.preventDefault();
  }


  log() {
    console.log('this.state: ', this.state);
  }

  render() {
    return (
      <div className="ingredients-main">
        <h1 className="ingredient__title">Create Ingredient</h1>

        <form className="ingredients__form" onSubmit={this.handleIngredientSubmit}>
          
          <div className="ingredients__inputFieldText">
            <label className="ingredients__label">Name:</label>
            <input className="ingredients__input" type="text" name="ingredientName" placeholder="ex: Vodka" onChange={this.handleChange} />
          </div>

          <div className="ingredients__inputFieldText">
            <label className="ingredients__label">Description:</label>
            <textarea className="ingredients__input" type="text" name="ingredientDescription" placeholder="ex: Made from a cactus" onChange={this.handleChange} />
          </div>

          <div className="ingredients__inputFieldText">
            <label className="ingredients__label"> Alcohol Percentange (%):</label>
            <input className="cocktail__ingredient-quantity" type="number" name="alcoholPercentage" placeholder="ex: 40" onChange={this.handleChange} />
          </div>

          <div className="ingredients__inputFieldText">
            <label className="ingredients__label"> Type:</label>
            <SelectGeneral 
              list={this.state.allTypes}
              size={'small'}
              // index={i}
              handleChange={this.handleTypeChange} 
              placeholder = {'Select Type'}
            />
          </div>

          <input className="cocktail__create" type="submit" value="Submit" />
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
export default connect(mapStateToProps, actions)(Ingredients);


/*

          <label className="cocktail__label">Add Ingredients</label>
          <AddIngredient ingredients=
          {this.state.allIngredients}
          quantityTypes={this.state.quantityTypes}
          />

          <label className="cocktail__label">How to make</label>
          <input type="text" name="cocktailHowTo" placeholder="How to make it..." onChange={this.handleChange} />


*/
