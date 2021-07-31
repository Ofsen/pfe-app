import axios from 'axios';

export const GET_BUS = '[TRANSPORT APP] GET BUS';
export const SET_BUS_SEARCH_TEXT = '[TRANSPORT APP] SAVE BUS';

export function getBus() {
	const request = axios.get('/api/e-commerce-app/bus');

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_BUS,
				payload: response.data,
			})
		);
}

export function setBusSearchText(event) {
	return {
		type: SET_BUS_SEARCH_TEXT,
		searchText: event.target.value,
	};
}
