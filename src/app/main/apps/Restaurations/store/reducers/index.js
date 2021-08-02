import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients.reducer';
import platsDessertsReducer from './platsDesserts.reducer';
import menusReducer from './menus.reducer';

const reducer = combineReducers({
	ingredientsReducer,
	platsDessertsReducer,
	menusReducer,
});

export default reducer;
