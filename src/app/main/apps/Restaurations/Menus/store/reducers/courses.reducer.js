import * as Actions from '../actions';

const initialState = {
	data: null,
    categories: [],
    menuDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const coursesReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_MENUS: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.GET_CATEGORIES: {
			return {
				...state,
				categories: action.payload,
			};
		}
		case Actions.OPEN_NEW_CONTACT_DIALOG: {
			return {
				...state,
				menuDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: null,
				},
			};
		}
		case Actions.CLOSE_NEW_CONTACT_DIALOG: {
			return {
				...state,
				menuDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				menuDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: action.data,
				},
			};
		}
		case Actions.CLOSE_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				menuDialog: {
					type: 'edit',
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
