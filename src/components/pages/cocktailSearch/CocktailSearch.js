import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import * as actions from '../../../actions';
// import Select from 'react-select';
import axios from 'axios';
// import { Redirect, Route, withRouter } from 'react-router-dom';

import './CocktailSearch.css';
// import FontAwesome from 'react-fontawesome';

// ===== COMPONENT IMPORTS ===== //
import CocktailList from './cocktailList/CocktailList';
// import SideMenu from "../sideMenu/SideMenu";
// import BtnToggleSideMenu from "../../reusable/btnToggleSideMenu/btnToggleSideMenu";
import SelectGeneral from '../../reusable/selectGeneral/SelectGeneral';

import { StateContext } from '../../wrappers/StateContext';

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
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    //this.setState(prevState => ({
    //  sideMenu: this.state.sideMenu === "0" ? "-250px" : "0"
    //}));

    console.log('componentDidMount @ CocktailSearch.js with props: ', this.props);

    if (this.props.stateContext.cocktails.length > 0) {
      console.log('ALREADY GOT THE COCKTAILS!');
      this.setState({
        allCocktails: this.props.stateContext.cocktails,
        filteredCocktails: this.props.stateContext.cocktails
      });
    }
    else {
      console.log('DO NOT HAVE THE COCKTAILS YET!');
      let res = await axios.get('https://cocktails-api-gefa.herokuapp.com/api/cocktails/getAll') 
      console.log('res.data: ', res.data);
      this.setState({
        allCocktails: res.data.theCocktails,
        filteredCocktails: res.data.theCocktails
      });
      // Update the context state too
      this.props.stateContext.updateCocktails(res.data.theCocktails);
    }

  }

  toggleSideMenu = () => {
    this.setState(prevState => ({
      sideMenu: this.state.sideMenu === "0" ? "-250px" : "0"
    }));
  };

  // handleChange(event) {
  //  console.log('event: ', event);
    // Multi-purpose handler
    // I get the event.target.name (coming from input name)
    // and use it to target the key on `state` object with the same name, using bracket syntax
  // this.setState({ [event.target.name]: event.target.value });
  // }

  handleChange(event) {
    console.log('event: ', event);

    if (!event[0]) {
      console.log('no event');
      return this.setState({filteredCocktails: this.state.allCocktails});
    }

    let filteredCocktails = this.state.allCocktails.filter(cocktail => {
      return event.some(filterItem => filterItem.value === cocktail.baseSpirit);
    });

    this.setState({ filteredCocktails: filteredCocktails });
  }

  render() {
    return (
      <div className="cocktailSearch-pageWrapper">

      {/* // ===== This is how we access a value from the context state ===== //
      <StateContext.Consumer>
        {localeVal =>
          localeVal.locale === 'en' ? <h1>Welcome!</h1> : <h1>Bienvenue!</h1>
        }
      </StateContext.Consumer>
      */}

        <div className="cocktailSearch_searchBar">
        <SelectGeneral 
          list={this.state.spirits}
          allowMultiple={true}
          size={'big'}
          // index={i}
          handleChange={this.handleChange} 
          placeholder = {'Filter by spirit...'}
        />
        </div>
        <div className="cocktailSearch_resultsFound">
          Results found... {this.state.filteredCocktails.length}
        </div>

        <div className="cocktailSearch_cocktailList">
          <CocktailList cocktails={this.state.filteredCocktails} />
        </div>
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

// export default CocktailSearch;

// ===== Wrapping the component so it can access the context state through its props ===== //
// Otherwise they would only be available on render()
export default props => (
 <StateContext.Consumer>
   {stateContext => <CocktailSearch {...props} stateContext={stateContext} />}
 </StateContext.Consumer>
);