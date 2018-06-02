//======= ACTION CREATORS =======//

import axios from 'axios';
import { 
  FETCH_USER,
  INITIALIZE_USER,
  SET_LOCALSTORAGE_USER,
  UNSET_LOCALSTORAGE_USER,
  FETCH_TOURNAMENTS,
  CREATE_TOURNAMENT,
  JOIN_TOURNAMENT,
  FETCH_TOURNAMENT_GAMES,
  VOTE_ON_GAME_OUTCOME
} from './types';

// ======================================= //
//         USER RELATED ACTIONS            //
// ======================================= //

// This is using the middleware Redux-Thunk (which is used for async action and gives us the possibility 
//to dispatch the action at later time - after the async function has finished)
export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/current_user');
  console.log('user @ fetchUser: ', user);
  if (user.data) {
    const tournaments = await axios.get('/api/tournament/findByUserIsParticipant');
    dispatch({ type: FETCH_TOURNAMENTS, payload: tournaments.data.theTournaments });
  }

  dispatch({ type: SET_LOCALSTORAGE_USER, payload: user.data._id });  // not used atm
  dispatch({ type: FETCH_USER, payload: user.data });
};

// This is still using Redux-Thunk, but returns the axios request.
// This way, in the component, when calling this action, we can use .then()
export function initializeUser(id, name) {
  return function (dispatch) {
    return axios.post('/api/user/initializeUser', { id, name })
      .then((response) => dispatch({ type: INITIALIZE_USER, payload: response.data.user }))
      .catch((err) => {
        throw err;
      })
  }
}

// ======================================= //
//       TOURNAMENT RELATED ACTIONS        //
// ======================================= //

export function fetchTournaments() {
  return function (dispatch) {
    return axios.get('/api/tournament/findByUserIsParticipant')
      .then((response) => dispatch({ type: FETCH_TOURNAMENTS, payload: response.data.theTournaments }))
      .catch((err) => {
        throw err;
      })
  }
}

export function fetchTournamentGames(tournamentId) {
  console.log(`Creating an action @ fetchTournamentGames with ${tournamentId}`);
  return function (dispatch) {
    return axios.get('/api/tournament/game/getAllByTournamentId/' + tournamentId) 
      .then((response) => dispatch({ type: FETCH_TOURNAMENT_GAMES, payload: response.data.theTournamentGames }))
      .catch((err) => {
        throw err;
      })
  }
}

export function createTournament(gameSelected, numberOfPlayers) {
  console.log(`Creating an action @ createTournament with ${gameSelected} and ${numberOfPlayers}`);
  return function (dispatch) {
    return axios.post('/api/createtournament', { gameSelected, numberOfPlayers }) 
      .then((response) => dispatch({ type: CREATE_TOURNAMENT, payload: response.data }))
      .catch((err) => {
        throw err;
      })
  }
}

export function joinTournament(code) {
  console.log(`Creating an action @ joinTournament with ${code}`);
  return function (dispatch) {
    return axios.post('/api/jointournament', { code })
      .then((response) => dispatch({ type: JOIN_TOURNAMENT, payload: response.data }))
      .catch((err) => {
        throw err;
      })
  }
}

export function voteOnGameOutcome(tournamentGameId, vote) {
  console.log(`Creating an action @ voteOnGameOutcome with ${tournamentGameId} and ${vote}`);
  return function (dispatch) {
    return axios.post('/api/tournament/game/voteOnGameOutcome', {tournamentGameId, vote })
      .then((response) => { 
        console.log('response.data.theTournamentGame: ', response.data.theTournamentGame);
        if (response.data.theTournamentGame) {
          dispatch({ type: VOTE_ON_GAME_OUTCOME, payload: response.data })
        }
      })
      .catch((err) => {
        throw err; 
      })
  }
}

// ======================================= //
//             SIMPLE EXAMPLES             //
// ======================================= //

// This is without Redux-Thunk (Which is used for async functions - here we don't need to wait before
// dispatching the action
export const setLocalStorageUser = user => ({
  type: SET_LOCALSTORAGE_USER,
  user
});

// This is without Redux-Thunk (Which is used for async functions - here we don't need to wait before
// dispatching the action
export const unsetLocalStorageIsUser = () => ({
  type: UNSET_LOCALSTORAGE_USER,
  payload: false
});


//export const setVisibilityFilter = filter => ({
//  type: 'SET_VISIBILITY_FILTER',
//  filter
//})

