import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
	entities: null,
	searchText: '',
	selectedIngredientIds: [],
	routeParams: {},
	ingredientDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const ingredientsReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_INGREDIENTS: {
			return {
				...state,
				entities: _.keyBy(_.flattenDeep(action.payload), 'id_ingredient'),
				routeParams: action.routeParams,
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText,
			};
		}
		case Actions.TOGGLE_IN_SELECTED_CONTACTS: {
			const contactId = action.contactId;

			let selectedIngredientIds = [...state.selectedIngredientIds];

			if (selectedIngredientIds.find((id) => id === contactId) !== undefined) {
				selectedIngredientIds = selectedIngredientIds.filter((id) => id !== contactId);
			} else {
				selectedIngredientIds = [...selectedIngredientIds, contactId];
			}

			return {
				...state,
				selectedIngredientIds: selectedIngredientIds,
			};
		}
		case Actions.SELECT_ALL_CONTACTS: {
			const arr = Object.keys(state.entities).map((k) => state.entities[k]);

			const selectedIngredientIds = arr.map((ingredient) => ingredient.id_ingredient);

			return {
				...state,
				selectedIngredientIds: selectedIngredientIds,
			};
		}
		case Actions.DESELECT_ALL_CONTACTS: {
			return {
				...state,
				selectedIngredientIds: [],
			};
		}
		case Actions.OPEN_NEW_CONTACT_DIALOG: {
			return {
				...state,
				ingredientDialog: {
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
				ingredientDialog: {
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
				ingredientDialog: {
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
				ingredientDialog: {
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

export default ingredientsReducer;
