import { combineReducers } from 'redux';
import authReducer from './authReducer';
import localStotageIsLoggedInReducer from './localStotageIsLoggedInReducer';
import tournamentsReducer from './tournamentReducer';
import tournamentGamesReducer from './tournamentGameReducer';

// They key 'auth' is saying that:
// auth piece of state is being manufactured/produced by authReducer
export default combineReducers({
  user: authReducer,
  isLoggedIn: localStotageIsLoggedInReducer,
  tournaments: tournamentsReducer,
  tournamentGames: tournamentGamesReducer,
});


// combineReducers shows the state