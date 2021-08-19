import * as Actions from '../actions';

const initialState = {
	data: null,
	residences: []
};

const dossierBourseReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_DOSSIER: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.GET_RESIDENCES: {
			return {
				...state,
				residences: action.payload,
			};
		}
		case Actions.SAVE_DOSSIER: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.RESET_DOSSIER: {
			return {
				...state,
				data: null,
			};
		}
		default: {
			return state;
		}
	}
};

export default dossierBourseReducer;
