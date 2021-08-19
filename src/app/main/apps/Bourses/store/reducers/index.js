import {combineReducers} from 'redux';
import dossierBourse from './dossierBourse.reducer';
import dossiersBourse from './dossiersBourse.reducer';

const reducer = combineReducers({
    dossierBourse,
	dossiersBourse,
});

export default reducer;
