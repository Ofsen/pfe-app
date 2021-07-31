import * as Actions from '../actions';

const initialState = {
	data: null,
	categories: [],
	platsDessertsDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const coursesReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_PLATS_DESSERTS: {
			return {
				...state,
				data: action.payload.sort((a, b) =>
					a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : a.nom.toLowerCase() > b.nom.toLowerCase() ? 1 : 0
				),
			};
		}
		case Actions.GET_CATEGORIES_PLATS_DESSERTS: {
			return {
				...state,
				categories: action.payload,
			};
		}
		case Actions.OPEN_NEW_PLATS_DESSERTS_DIALOG: {
			return {
				...state,
				platsDessertsDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: null,
				},
			};
		}
		case Actions.CLOSE_NEW_PLATS_DESSERTS_DIALOG: {
			return {
				...state,
				platsDessertsDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_PLATS_DESSERTS_DIALOG: {
			return {
				...state,
				platsDessertsDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: action.data,
				},
			};
		}
		case Actions.CLOSE_EDIT_PLATS_DESSERTS_DIALOG: {
			return {
				...state,
				platsDessertsDialog: {
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

export default coursesReducer;
