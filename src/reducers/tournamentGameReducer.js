import { FETCH_TOURNAMENT_GAMES, VOTE_ON_GAME_OUTCOME } from '../actions/types';

// Here "state" is the "user" property in the store (see reducers/index.js)
export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TOURNAMENT_GAMES:
      console.log('action @ FETCH_TOURNAMENT_GAMES @ REDUCER: ', action);
      return action.payload || [];

    case VOTE_ON_GAME_OUTCOME:
      console.log('action @ VOTE_ON_GAME_OUTCOME @ REDUCER: ', action);
      return state.map((tournamentGame, i) => {
        // Go through all tournamentGames with map
        if (tournamentGame._id === action.payload.theTournamentGame._id) {
          // When we find the tournamentGame the user just voted for, return the new document
          return action.payload.theTournamentGame
        }
        else {
          // Otherwise, return the old, unchanged tournamentGame
          return tournamentGame;
        }
      })

    default:
      return state;
  }
}

// state = null means that the very first time, it returns [] when the state is empty
// it will return null