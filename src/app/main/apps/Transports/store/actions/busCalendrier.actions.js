import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';
import moment from 'moment';

export const GET_TRAJET_EVENTS = '[TRAJET APP] GET TRAJET EVENTS';
export const GET_TRAJET_ARRAY = '[TRAJET APP] GET TRAJET EVENTS ARRAY';
export const OPEN_NEW_TRAJET_EVENT_DIALOG = '[TRAJET APP] OPEN NEW TRAJET EVENT DIALOG';
export const CLOSE_NEW_TRAJET_EVENT_DIALOG = '[TRAJET APP] CLOSE NEW TRAJET EVENT DIALOG';
export const OPEN_EDIT_TRAJET_EVENT_DIALOG = '[TRAJET APP] OPEN EDIT TRAJET EVENT DIALOG';
export const CLOSE_EDIT_TRAJET_EVENT_DIALOG = '[TRAJET APP] CLOSE EDIT TRAJET EVENT DIALOG';
export const ADD_TRAJET_EVENT = '[TRAJET APP] ADD TRAJET EVENT';
export const UPDATE_TRAJET_EVENT = '[TRAJET APP] UPDATE TRAJET EVENT';
export const REMOVE_TRAJET_EVENT = '[TRAJET APP] REMOVE TRAJET EVENT';

export function getBusArray(routeParams) {
	const request = axios.get(apiUrl + 'Trajets/Bus', {
		params: routeParams,
	});

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_TRAJET_ARRAY,
				payload: response.data.data,
				routeParams,
			})
		);
}

export function getTrajets(date, campRes = null) {
	const request = axios.get(apiUrl + 'Trajets/' + moment(date).format('YYYY-MM-DD') + '/' + campRes);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_TRAJET_EVENTS,
				payload: response.data.data,
			})
		);
}

export function openNewTrajetDialog(data) {
	return {
		type: OPEN_NEW_TRAJET_EVENT_DIALOG,
		data,
	};
}

export function closeNewTrajetDialog() {
	return {
		type: CLOSE_NEW_TRAJET_EVENT_DIALOG,
	};
}

export function openEditTrajetDialog(data) {
	return {
		type: OPEN_EDIT_TRAJET_EVENT_DIALOG,
		data,
	};
}

export function closeEditTrajetDialog() {
	return {
		type: CLOSE_EDIT_TRAJET_EVENT_DIALOG,
	};
}

export function addTrajet(newTrajet) {
	return (dispatch, getState) => {
		const request = axios.post(apiUrl + 'Trajets', {
			newTrajet,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_TRAJET_EVENT,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du trajet",
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'error',
						})
					);
				} else {
					dispatch(
						Actions.showMessage({
							message: 'Trajet ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getTrajets(newTrajet.start));
				}
			})
		);
	};
}

export function updateTrajet(trajet) {
	return (dispatch, getState) => {
		const request = axios.put(apiUrl + 'Trajets', {
			trajet,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_TRAJET_EVENT,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du trajet',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'error',
						})
					);
				} else {
					dispatch(
						Actions.showMessage({
							message: 'trajet modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getTrajets(trajet.start));
				}
			})
		);
	};
}

export function removeTrajet(trajetId, date) {
	return (dispatch, getState) => {
		const request = axios.delete(apiUrl + 'Trajets/' + trajetId);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_TRAJET_EVENT,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du trajet',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'error',
						})
					);
				} else {
					dispatch(
						Actions.showMessage({
							message: 'Trajet supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getTrajets(date));
				}
			})
		);
	};
}
