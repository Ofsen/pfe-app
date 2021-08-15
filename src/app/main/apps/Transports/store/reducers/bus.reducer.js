import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
	entities: null,
	searchText: '',
	selectedBusIds: [],
	routeParams: {},
	busDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
	campRes: [],
};

const busReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_TRANSPORT: {
			return {
				...state,
				entities: _.keyBy(_.flattenDeep(action.payload), 'id_bus'),
				routeParams: action.routeParams,
			};
		}
		case Actions.SET_TRANSPORT_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText,
			};
		}
		case Actions.TOGGLE_IN_SELECTED_TRANSPORT: {
			const busId = action.busId;
			console.log(action);

			let selectedBusIds = [...state.selectedBusIds];

			if (selectedBusIds.find((id) => id === busId) !== undefined) {
				selectedBusIds = selectedBusIds.filter((id) => id !== busId);
			} else {
				selectedBusIds = [...selectedBusIds, busId];
			}

			return {
				...state,
				selectedBusIds: selectedBusIds,
			};
		}
		case Actions.SELECT_ALL_TRANSPORT: {
			const arr = Object.keys(state.entities).map((k) => state.entities[k]);

			const selectedBusIds = arr.map((Bud) => Bud.id_Bud);

			return {
				...state,
				selectedBusIds: selectedBusIds,
			};
		}
		case Actions.DESELECT_ALL_TRANSPORT: {
			return {
				...state,
				selectedbusIds: [],
			};
		}
		case Actions.OPEN_NEW_BUS_DIALOG: {
			return {
				...state,
				busDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: null,
				},
			};
		}
		case Actions.CLOSE_NEW_BUS_DIALOG: {
			return {
				...state,
				busDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_BUS_DIALOG: {
			return {
				...state,
				busDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: action.data,
				},
			};
		}
		case Actions.CLOSE_EDIT_BUS_DIALOG: {
			return {
				...state,
				busDialog: {
					type: 'edit',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.GET_CAMPUS_RESIDENCES: {
			return {
				...state,
				campRes: action.payload.sort((a, b) =>
					a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : a.nom.toLowerCase() > b.nom.toLowerCase() ? 1 : 0
				),
			};
		}
		default: {
			return state;
		}
	}
};

export default busReducer;
