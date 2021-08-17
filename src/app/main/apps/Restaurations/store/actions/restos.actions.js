import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';

export const GET_RESTOS = '[RESTOS APP] GET RESTOS';
export const GET_CATEGORIES_RESTOS = '[RESTOS APP] GET CATEGORIES RESTOS';
export const OPEN_NEW_RESTOS_DIALOG = '[RESTOS APP] OPEN NEW RESTOS DIALOG';
export const CLOSE_NEW_RESTOS_DIALOG = '[RESTOS APP] CLOSE NEW RESTOS DIALOG';
export const OPEN_EDIT_RESTOS_DIALOG = '[RESTOS APP] OPEN EDIT RESTOS DIALOG';
export const CLOSE_EDIT_RESTOS_DIALOG = '[RESTOS APP] CLOSE EDIT RESTOS DIALOG';
export const ADD_RESTOS = '[RESTOS APP] ADD RESTOS';
export const UPDATE_RESTOS = '[RESTOS APP] UPDATE RESTOS';
export const REMOVE_RESTOS = '[RESTOS APP] REMOVE RESTOS';

export function getRestos() {
	const request = axios.get(apiUrl + 'Restaurants');

	return (dispatch) =>
		request.then((response) => {
			dispatch({
				type: GET_RESTOS,
				payload: response.data.data,
			});
		});
}

export function getCatCampusResidences() {
	const request = axios.all([axios.get(apiUrl + 'Campus'), axios.get(apiUrl + 'Residences')]);

	return (dispatch) =>
		request.then((response) => {
			const resOne = response[0].data.data.map((e, i) => {
				return {
					id: i,
					value: e.id_camp_res,
					label: e.nom,
				};
			});
			const resTwo = response[1].data.data.map((e, i) => {
				return {
					id: resOne.length + i,
					value: e.id_camp_res,
					label: e.nom,
				};
			});
			dispatch({
				type: GET_CATEGORIES_RESTOS,
				payload: [...resOne, ...resTwo],
			});
		});
}

export function openNewRestosDialog() {
	return {
		type: OPEN_NEW_RESTOS_DIALOG,
	};
}

export function closeNewRestosDialog() {
	return {
		type: CLOSE_NEW_RESTOS_DIALOG,
	};
}

export function openEditRestosDialog(data) {
	return {
		type: OPEN_EDIT_RESTOS_DIALOG,
		data,
	};
}

export function closeEditRestosDialog() {
	return {
		type: CLOSE_EDIT_RESTOS_DIALOG,
	};
}

export function addResto(newRestaurant) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.restosReducer;

		const request = axios.post(apiUrl + 'Restaurants', {
			newRestaurant,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_RESTOS,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du réstaurant",
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
							message: 'Réstaurant ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getRestos(routeParams));
				}
			})
		);
	};
}

export function updateResto(newRestaurant) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.restosReducer;

		const request = axios.put(apiUrl + 'Restaurants', {
			newRestaurant,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_RESTOS,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du réstaurant',
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
							message: 'Réstaurant modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getRestos(routeParams));
				}
			})
		);
	};
}

export function removeResto(id_restaurant) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.restosReducer;

		const request = axios.delete(apiUrl + 'Restaurants/' + id_restaurant);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_RESTOS,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du réstaurant',
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
							message: 'Réstaurant supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getRestos(routeParams));
				}
			})
		);
	};
}
