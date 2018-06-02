import { SET_LOCALSTORAGE_USER, UNSET_LOCALSTORAGE_USER } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case SET_LOCALSTORAGE_USER:
      return action.payload || false;
    case UNSET_LOCALSTORAGE_USER:
      return false;
    default:
      return state;
  }
}

// state = null   means that the first time, that I do not know if user is logged in or not
// it will return null