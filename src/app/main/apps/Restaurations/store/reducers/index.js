import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients.reducer';
import platsDessertsReducer from './platsDesserts.reducer';
import menusReducer from './menus.reducer';
import restosReducer from './restos.reducer';

const reducer = combineReducers({
	ingredientsReducer,
	platsDessertsReducer,
	menusReducer,
	restosReducer,
});

export default reducer;
