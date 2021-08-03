import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';

export const GET_PLATS_DESSERTS = '[PLATS DESSERTS APP] GET PLATS DESSERTS';
export const GET_CATEGORIES_PLATS_DESSERTS = '[PLATS DESSERTS APP] GET CATEGORIES PLATS DESSERTS';
export const OPEN_NEW_PLATS_DESSERTS_DIALOG = '[PLATS DESSERTS APP] OPEN NEW PLATS DESSERTS DIALOG';
export const CLOSE_NEW_PLATS_DESSERTS_DIALOG = '[PLATS DESSERTS APP] CLOSE NEW PLATS DESSERTS DIALOG';
export const OPEN_EDIT_PLATS_DESSERTS_DIALOG = '[PLATS DESSERTS APP] OPEN EDIT PLATS DESSERTS DIALOG';
export const CLOSE_EDIT_PLATS_DESSERTS_DIALOG = '[PLATS DESSERTS APP] CLOSE EDIT PLATS DESSERTS DIALOG';
export const ADD_PLATS_DESSERTS = '[PLATS DESSERTS APP] ADD PLATS DESSERTS';
export const UPDATE_PLATS_DESSERTS = '[PLATS DESSERTS APP] UPDATE PLATS DESSERTS';
export const REMOVE_PLAT_DESSERT = '[PLATS DESSERTS APP] REMOVE PLAT DESSERT';
export const REMOVE_PLATS_DESSERTS = '[PLATS DESSERTS APP] REMOVE PLATS DESSERTS';

export function getPlatsDesserts() {
	const request = axios.all([axios.get(apiUrl + 'Plats'), axios.get(apiUrl + 'Desserts')]);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_PLATS_DESSERTS,
				payload: [...response[0].data.data, ...response[1].data.data],
			})
		);
}

export function openNewPlatsDessertsDialog() {
	return {
		type: OPEN_NEW_PLATS_DESSERTS_DIALOG,
	};
}

export function closeNewPlatsDessertsDialog() {
	return {
		type: CLOSE_NEW_PLATS_DESSERTS_DIALOG,
	};
}

export function openEditPlatsDessertsDialog(data) {
	return {
		type: OPEN_EDIT_PLATS_DESSERTS_DIALOG,
		data,
	};
}

export function closeEditPlatsDessertsDialog() {
	return {
		type: CLOSE_EDIT_PLATS_DESSERTS_DIALOG,
	};
}

export function addPlat(newPlat) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.post(apiUrl + 'Plats', {
			newPlat,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du plat",
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
							message: 'Plat ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}

export function addDessert(newDessert) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.post(apiUrl + 'Desserts', {
			newDessert,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du dessert",
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
							message: 'Dessert ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}

export function updatePlat(newPlat) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.put(apiUrl + 'Plats', {
			newPlat,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du plat',
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
							message: 'Plat modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}

export function updateDessert(newDessert) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.put(apiUrl + 'Desserts', {
			newDessert,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du dessert',
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
							message: 'Dessert modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}

export function removePlat(id_plat) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.delete(apiUrl + 'Plats/' + id_plat);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du plat',
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
							message: 'Plat supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}

export function removeDessert(id_dessert) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.platsDessertsReducer;

		const request = axios.delete(apiUrl + 'Desserts/' + id_dessert);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_PLATS_DESSERTS,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du dessert',
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
							message: 'Dessert supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getPlatsDesserts(routeParams));
				}
			})
		);
	};
}
