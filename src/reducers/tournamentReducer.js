import { CREATE_TOURNAMENT, FETCH_TOURNAMENTS, JOIN_TOURNAMENT } from '../actions/types';

// Here "state" is the "tournament" property in the store (see reducers/index.js)
export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TOURNAMENTS:
      console.log('action @ FETCH_TOURNAMENTS @ REDUCER: ', action);
      return action.payload || [];

    case CREATE_TOURNAMENT:
      console.log('action @ CREATE_TOURNAMENT @ REDUCER: ', action);
      return [...state, action.payload.theTournament];

    case JOIN_TOURNAMENT:
      console.log('action @ JOIN @ REDUCER: ', action);
      // Returning an array with what the previous state had, plus the latest tournament
      // This is similar to push() but doesn't mutate the previous state, which is better
      return [...state, action.payload.theTournament];

    default:
      return state;
  }
}

// state = null   means that the first time, that I do not know if user is logged in or not
// it will return null