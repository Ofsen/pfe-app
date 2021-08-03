import * as Actions from '../actions';
import moment from 'moment';

const initialState = {
	entities: [],
	eventDialog: {
		type: 'new',
		props: {
			open: false,
		},
		data: null,
	},
};

const menusReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_EVENTS: {
			let entities = action.payload.data.map((event, i) => ({
				...event,
				start: new Date(moment(event.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)),
				end: new Date(moment(event.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)),
				id: i,
			}));

			return {
				...state,
				entities,
			};
		}
		case Actions.OPEN_NEW_EVENT_DIALOG: {
			return {
				...state,
				eventDialog: {
					type: 'new',
					props: {
						open: true,
					},
					data: {
						...action.data,
					},
				},
			};
		}
		case Actions.CLOSE_NEW_EVENT_DIALOG: {
			return {
				...state,
				eventDialog: {
					type: 'new',
					props: {
						open: false,
					},
					data: null,
				},
			};
		}
		case Actions.OPEN_EDIT_EVENT_DIALOG: {
			return {
				...state,
				eventDialog: {
					type: 'edit',
					props: {
						open: true,
					},
					data: {
						...action.data,
						start: new Date(action.data.start),
						end: new Date(action.data.end),
					},
				},
			};
		}
		case Actions.CLOSE_EDIT_EVENT_DIALOG: {
			return {
				...state,
				eventDialog: {
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

export default menusReducer;
