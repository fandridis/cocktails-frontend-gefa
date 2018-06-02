import { FETCH_USER, INITIALIZE_USER } from '../actions/types';

// Here "state" is the "user" property in the store (see reducers/index.js)
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case INITIALIZE_USER:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

// state = null   means that the first time, that I do not know if user is logged in or not
// it will return null