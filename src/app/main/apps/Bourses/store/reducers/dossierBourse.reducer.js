import * as Actions from '../actions';

const initialState = {
	data: null,
};

const dossierBourseReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_DOSSIER_BOURSES: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.SAVE_DOSSIER_BOURSES: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.RESET_DOSSIER_BOURSES: {
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
