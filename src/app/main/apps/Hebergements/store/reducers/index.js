import { combineReducers } from 'redux';
import todos from './todos.reducer';
import folders from './folders.reducer';
import labels from './labels.reducer';
import filters from './filters.reducer';
import dossier from './dossier.reducer';
import dossiers from './dossiers.reducer';

const reducer = combineReducers({
	todos,
	folders,
	labels,
	filters,
	dossier,
	dossiers,
});

export default reducer;
