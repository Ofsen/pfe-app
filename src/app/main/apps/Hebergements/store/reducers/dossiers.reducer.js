import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
};

const dossiersReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_DOSSIERS: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.SET_DOSSIERS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText,
			};
		}
		default: {
			return state;
		}
	}
};

export default dossiersReducer;
