import axios from 'axios';
import { showMessage } from 'app/store/actions/fuse';

export const GET_SINGLE_BUS = '[TRANSPORT APP] GET SINGLE BUS';
export const SAVE_BUS = '[TRANSPORT APP] SAVE BUS';

export function getSingleBus(params) {
	const request = axios.get('/api/e-commerce-app/single-bus', { params });

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_SINGLE_BUS,
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
		type: GET_SINGLE_BUS,
		payload: data,
	};
}
