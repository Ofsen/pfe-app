import axios from 'axios';
import { showMessage } from 'app/store/actions/fuse';

export const GET_BUS = '[TRANSPORT APP] GET BUS';
export const SAVE_BUS = '[TRANSPORT APP] SAVE BUS';

export function getBus(params) {
	const request = axios.get('/api/e-commerce-app/bus', { params });

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_BUS,
				payload: response.data,
			})
		);
}

export function saveBus(data) {
	const request = axios.post('/api/e-commerce-app/product/save', data);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: 'Bus enregistré' }));

			return dispatch({
				type: SAVE_BUS,
				payload: response.data,
			});
		});
}

export function newBus() {
	const data = {
		matricule: '',
		depart: '',
		arrivee: '',
		actif: false,
	};

	return {
		type: GET_BUS,
		payload: data,
	};
}
