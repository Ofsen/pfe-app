import * as Actions from '../actions';

const initialState = {
	data: null,
	categories: [],
	restosDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const restosReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_RESTOS: {
			return {
				...state,
				data: action.payload.sort((a, b) =>
					a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : a.nom.toLowerCase() > b.nom.toLowerCase() ? 1 : 0
				),
			};
		}
		case Actions.GET_CATEGORIES_RESTOS: {
			return {
				...state,
				categories: action.payload,
			};
		}
		case Actions.OPEN_NEW_RESTOS_DIALOG: {
			return {
				...state,
				restosDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: null,
				},
			};
		}
		case Actions.CLOSE_NEW_RESTOS_DIALOG: {
			return {
				...state,
				restosDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_RESTOS_DIALOG: {
			return {
				...state,
				restosDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: action.data,
				},
			};
		}
		case Actions.CLOSE_EDIT_RESTOS_DIALOG: {
			return {
				...state,
				restosDialog: {
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

export default restosReducer;
