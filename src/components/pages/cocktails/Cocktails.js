import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
// import Select from 'react-select';
import axios from 'axios';
// import { Redirect, Route, withRouter } from 'react-router-dom';

import './Cocktails.css';
import FontAwesome from 'react-fontawesome';

// ===== COMPONENT IMPORTS ===== //
import AddIngredient from './AddIngredient/AddIngredient';
import AddQuantityType from './AddQuantityType/AddQuantityType';
import SelectGeneral from '../../reusable/selectGeneral/SelectGeneral';

import {ApiAiClient} from "api-ai-javascript";

const client = new ApiAiClient({accessToken: '622c99fbec55421ba644273a7c7b82cd'})

client
.textRequest('shoes')
    .then((response) => { 
      console.log('response: ', response );

      client
        .textRequest('yes')
            .then((response) => { 
              console.log('response: ', response )
            })
            .catch((error) => {/* do something here too */})
            
    })
    .catch((error) => {/* do something here too */})

class Cocktails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ingredientName: '',
      ingredientAlcoholPercentage: 0,
      ingredientType: '',    // spirit, juice, food, other
      allIngredients: [],
      ingredientsSelected: [{
        ingredientObjId: '',
        ingredientName: '',
        containsAlcohol: false,
        quantityType: '',
        quantity: 0
      }],
      cocktailName: '',
      cocktailDescription: '',
      cocktailHowTo: '',
      cocktailStrength: '',
      cocktailTime: '',
      cocktailIngredients: [],
      quantityTypes: [
        {value: 'ml', label: 'ml'},
        {value: 'oz', label: 'oz'},
        {value: 'part', label: 'part(s)'},
        {value: 'barspoon', label: 'barspoon(s)'},
        {value: 'dash', label: 'dash(es)'},
        {value: 'piece', label: 'piece(s)'}],
      strength: [
        {value: 'light', label: 'Light'},
        {value: 'medium', label: 'Medium'},
        {value: 'strong', label: 'Strong'}],
      time: [
        {value: 'anytime', label: 'Anytime'},
        {value: 'morning', label: 'Morning'},
        {value: 'afternoon', label: 'Afternoon'},
        {value: 'night', label: 'Night'}],
      selectedFile: null,
      }
    

    // Binding "this" to the function handler so we can use the main components "this" inside
    // and have access to things like this.state, this.setState({})
    this.handleCocktailSubmit = this.handleCocktailSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleQuantityTypeChange = this.handleQuantityTypeChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);

    this.addIngedient = this.addIngedient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount @ Dashboard.js with props: ', this.props);
    let res = await axios.get('/api/ingredients/getAll');
   // let res = await axios.get('https://cocktails-api-gefa.herokuapp.com/api/ingredients/getAll');
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

  handleIngredientChange = (ingredient, index) => {
    let ingredientsSelected = this.state.ingredientsSelected;
    ingredientsSelected[index].ingredientObjId = ingredient._id;
    ingredientsSelected[index].ingredientName = ingredient.name;
    if (ingredient.alcoholPercentage > 0) {
      ingredientsSelected[index].containsAlcohol = true;
    }

    this.setState({ ingredientsSelected: ingredientsSelected });
  }

  handleQuantityTypeChange = (quantityType, index) => {
    let ingredientsSelected = this.state.ingredientsSelected;
    ingredientsSelected[index].quantityType = quantityType.value;
    ingredientsSelected[index].quantity = 0;
    this.setState({ ingredientsSelected: ingredientsSelected });
  }

  handleQuantityChange = (event, index) => {
    let ingredientsSelected = this.state.ingredientsSelected;
    ingredientsSelected[index].quantity = event.target.value;

    this.setState({ ingredientsSelected: ingredientsSelected });
  }

  handleStrengthChange = (event, index) => {
    this.setState({ cocktailStrength: event.value });
  }

  handleTimeChange = (event, index) => {
    this.setState({ cocktailTime: event.value });
  }

  fileSelectedHandler(event) {
    console.log('event.target.files[0]: ', event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  }

  handleCocktailSubmit(event) {
    event.preventDefault()

    let file = new FormData();

    console.log('Appending the file: ', this.state.selectedFile);
    console.log('With name: ', this.state.selectedFile.name);
    
    file.append('file', this.state.selectedFile);

    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    axios.post('/api/cocktails/uploadimage', file, config)
    .then(response => {
      console.log('response @handleChangeFile: ', response);
    })
    .catch(err => {
      console.log('error @ handleChangeFile: ', err);
    })
    
    /*
    console.log('state: ', this.state);
    let cocktail = {
      name: this.state.cocktailName,
      description: this.state.cocktailDescription,
      isAlcoholic: false,
      howTo: this.state.cocktailHowTo,
      strength: this.state.cocktailStrength,
      time: this.state.cocktailTime,
      ingredients: this.state.ingredientsSelected
    }

    if (cocktail.ingredients.some(ingredient => ingredient.containsAlcohol)) {
      cocktail.isAlcoholic = true;
    }

    let highestContentAmount = 0;
    let highestContentSpirit = '';

    cocktail.ingredients.map(ingredient => {
      if (ingredient.containsAlcohol) {
        if (ingredient.quantityType === 'oz') { ingredient.quantity *= 30 }
        if (ingredient.quantity > highestContentAmount) {
          highestContentAmount = ingredient.quantity;
          highestContentSpirit = ingredient.ingredientName;
        }
      }
    });
    
    cocktail.baseSpirit = highestContentSpirit;

    axios.post('https://cocktails-api-gefa.herokuapp.com/api/cocktails/create', { cocktail: cocktail })
    .then(result => {
      console.log('result: ', result);
    })
    .catch(error => {
      console.log('error: ', error);
    })
    event.preventDefault();*/
  }

  removeIngredient(index) {

    let ingredientsSelected = this.state.ingredientsSelected;
    ingredientsSelected.pop();

    this.setState({ ingredientsSelected: ingredientsSelected });
  }

  addIngedient() {
    let ingredientsSelected = this.state.ingredientsSelected;
    let newIngredient = {
      ingredientObjId: '',
      ingredientName: '',
      containsAlcohol: false,
      quantityType: '',
      quantity: 0
    }
    ingredientsSelected.push(newIngredient);

    this.setState({ ingredientsSelected: ingredientsSelected });
  }

  log() {
    console.log('this.state: ', this.state);
  }

  render() {
    return (
      <div className="cocktail-main">
        <h1 className="cocktail__title">Create Cocktail</h1>

        <form className="cocktail__form" onSubmit={this.handleCocktailSubmit}>
          
          <div className="cocktail__inputFieldText">
            <label className="cocktail__label">Cocktail Name:</label>
            <input className="cocktail__input" type="text" name="cocktailName" placeholder="ex: Margarita" onChange={this.handleChange} />
          </div>

          <div className="cocktail__inputFieldText">
            <label className="cocktail__label">Description:</label>
            <textarea className="cocktail__input" type="text" name="cocktailDescription" placeholder="ex: This cocktail is da bomb!" onChange={this.handleChange} />
          </div>

          <div className="cocktail__extra-details">
            <div className="cocktail__inputFieldText cocktail__inputFieldText--extra">
              <label className="cocktail__label">Strength:</label>
              <SelectGeneral 
                list={this.state.strength}
                size={'small'}
                // index={i}
                handleChange={this.handleStrengthChange} 
                placeholder = {'Select Value'}
              />
            </div>
            <div className="cocktail__inputFieldText cocktail__inputFieldText--extra">
              <label className="cocktail__label">Time:</label>
              <SelectGeneral 
                list={this.state.time}
                size={'normal'}
                // index={i}
                handleChange={this.handleTimeChange} 
                placeholder = {'Best time to drink?'}
              />
            </div>
          </div>
        

          {this.state.ingredientsSelected.map((ingredient, i) =>
            <div className="cocktail__ingredients-list" key={i}> 
              <div className="cocktail__inputFieldText">
                <label className="cocktail__label">Ingredient #{i + 1}:</label>

                <AddIngredient 
                  ingredients={this.state.allIngredients}
                  index={i}
                  handleIngredientChange={this.handleIngredientChange} 
                />

                <AddQuantityType 
                  quantityTypes={this.state.quantityTypes}
                  index={i}
                  handleQuantityTypeChange={this.handleQuantityTypeChange}
                />
                <input className="cocktail__ingredient-quantity" type="number" placeholder="ex: 40 ml" 
                  value={this.state.ingredientsSelected[i].quantity}
                  onChange={(e) => {this.handleQuantityChange(e, i)}}
                />
                { i === this.state.ingredientsSelected.length -1
                  ? <div>
                      {this.state.ingredientsSelected.length > 1 ? <FontAwesome onClick={() => {this.removeIngredient(i)}} className="remove-ingredient" name='trash-o' size="2x" /> : ''}
                      <FontAwesome onClick={() => {this.addIngedient(i)}} className="add-ingredient" name='plus' size="2x" />
                    </div>
                  : ''
                }
            </div>
          </div>
          )}

          <div className="cocktail__inputFieldText">
            <label className="cocktail__label">How to make:</label>
            <textarea className="cocktail__input cocktail__input--big" type="text" name="cocktailHowTo" placeholder="ex: Add all ingredients in a glass and start drinking!" onChange={this.handleChange} />
          </div>

          <div className="cocktail__inputFieldText">
            <label className="cocktail__label">Add an image</label>
            <label className="pt-file-input pt-large .modifier">
              <input name="file" type="file" onChange={this.fileSelectedHandler} />
              <span className="pt-file-upload-input">{this.state.selectedFile ? this.state.selectedFile.name : 'Choose a file'}</span>
          </label>
          </div>



          <input className="cocktail__create" type="submit" value="Submit" />
        </form>

          <button onClick={() => {this.log()}}>LOG</button>
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


/*

          <label className="cocktail__label">Add Ingredients</label>
          <AddIngredient ingredients=
          {this.state.allIngredients}
          quantityTypes={this.state.quantityTypes}
          />

          <label className="cocktail__label">How to make</label>
          <input type="text" name="cocktailHowTo" placeholder="How to make it..." onChange={this.handleChange} />


*/