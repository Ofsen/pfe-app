import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
};

const productsReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_BUS: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.SET_BUS_SEARCH_TEXT: {
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

export default productsReducer;
