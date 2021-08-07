import * as Actions from '../actions';

const initialState = {
	data: null,
	campusresidencesDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const campusresidencesReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_CAMPUS_RESIDENCES: {
			return {
				...state,
				data: action.payload.sort((a, b) =>
					a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : a.nom.toLowerCase() > b.nom.toLowerCase() ? 1 : 0
				),
			};
		}
		case Actions.OPEN_NEW_CAMPUS_RESIDENCES_DIALOG: {
			return {
				...state,
				campusresidencesDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: null,
				},
			};
		}
		case Actions.CLOSE_NEW_CAMPUS_RESIDENCES_DIALOG: {
			return {
				...state,
				campusresidencesDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_CAMPUS_RESIDENCES_DIALOG: {
			return {
				...state,
				campusresidencesDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: action.data,
				},
			};
		}
		case Actions.CLOSE_EDIT_CAMPUS_RESIDENCES_DIALOG: {
			return {
				...state,
				campusresidencesDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default campusresidencesReducer;
