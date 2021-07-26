import { combineReducers } from 'redux';
import ingredients from './ingredients.reducer';
import platsDesserts from './platsDesserts.reducer';

const reducer = combineReducers({
	ingredients,
	platsDesserts,
});

export default reducer;
