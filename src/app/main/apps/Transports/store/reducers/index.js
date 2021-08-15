import { combineReducers } from 'redux';
import busCalendrier from './busCalendrier.reducer';
import bus from './bus.reducer';

const reducer = combineReducers({
	busCalendrier,
	bus,
});

export default reducer;
