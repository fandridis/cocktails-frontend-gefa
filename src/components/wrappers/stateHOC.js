import React from 'react';
import { StateContext } from '../wrappers/StateContext';

// This function takes a component...
export function withState(Component) {
  // ...and returns another component...
  return function StatefullComponent(props) {
    // ... and renders the wrapped component with the context state!
    // Notice that we pass through any additional props as well
    return (
      <StateContext.Consumer>
        {state => <Component {...props} state={state} />}
      </StateContext.Consumer>
    );
  };
}