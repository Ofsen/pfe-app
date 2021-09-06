import { combineReducers } from 'redux';
import usersReducer from './users.reducer';

const reducer = combineReducers({
	usersReducer,
});

export default reducer;
