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

// import { StateContext } from '../../wrappers/StateContext';
// Above not needed as I am using the HOC withState below to wrap the component
// With the HOC, we don't need StateContext.Consumer anymore as we can access
// the state context from this.props.state
import { withState } from '../../wrappers/stateHOC';

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

    if (this.props.state.cocktails.length > 0) {
      console.log('ALREADY GOT THE COCKTAILS!');
      this.setState({
        allCocktails: this.props.state.cocktails,
        filteredCocktails: this.props.state.cocktails
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
      this.props.state.updateCocktails(res.data.theCocktails);
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

    if (!event) {
      console.log('no event');
      return this.setState({filteredCocktails: this.state.allCocktails});
    }

    let filteredCocktails = this.state.allCocktails.filter(cocktail => cocktail.baseSpirit === event.value);

    this.setState({ filteredCocktails: filteredCocktails });
  }

  render() {
    return (
      <div className="cocktailSearch-pageWrapper">

        <h1>{this.props.state.test}</h1>

        <div className="cocktailSearch_searchBar">
        <SelectGeneral 
          list={this.state.spirits}
          allowMultiple={false}
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

// ===== Wrapping the component so it can access the context state through its props ===== //
// Otherwise it would only be available on render()
// export default props => (
//  <StateContext.Consumer>
//    {stateContext => <CocktailSearch {...props} stateContext={stateContext} />}
//  </StateContext.Consumer>
// );

// Does the same with the above, but now using a HOC component instead
 export default withState(CocktailSearch);

 //const ThemedButton = withTheme(Button);