import { combineReducers } from 'redux';
import ingredients from './ingredients.reducer';

const reducer = combineReducers({
	ingredients,
});

export default reducer;
