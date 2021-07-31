import * as Actions from '../actions';
<<<<<<< HEAD
import { RRule } from 'rrule';
import _ from '@lodash';
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

const eventsReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_EVENTS: {
			let entities = action.payload.data.map((event) => ({
				...event,
				start: new Date(event.start),
				end: new Date(event.end),
			}));

			entities = entities.map((e) => {
				if (e.recurrent) {
					const rule = new RRule({
						freq: e.freq,
						dtstart: e.dtstart,
						until: e.until,
						interval: e.interval,
					}).all();

					return rule.map((re, i) => {
						return {
							...e,
							id: entities.length + i + 1,
							start: re,
							end: re,
							recurrent: false,
						};
					});
				} else {
					return e;
				}
			});

			entities = _.flattenDeep(entities).filter((event) => action.payload.month === moment(event.start).month());

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

export default eventsReducer;
=======

const initialState = {
    entities   : [],
    eventDialog: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EVENTS:
        {
            const entities = action.payload.map((event) => (
                {
                    ...event,
                    start: new Date(event.start),
                    end  : new Date(event.end)
                }
            ));

            return {
                ...state,
                entities
            };
        }
        case Actions.OPEN_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.data
                    }
                }
            };
        }
        case Actions.CLOSE_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.data,
                        start: new Date(action.data.start),
                        end  : new Date(action.data.end)
                    }
                }
            };
        }
        case Actions.CLOSE_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default eventsReducer;
>>>>>>> 31d78bbc28ff84f8adccc772269555b0b576e86f
