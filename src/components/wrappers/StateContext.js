import React from 'react';

export const StateContext = React.createContext();

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'Hello World!',
      cocktails: [],
      updateCocktails: (cocktails) => { this.setState({cocktails: cocktails})} //this.changeLocale
    };

  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateProvider;