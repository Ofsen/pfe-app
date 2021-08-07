import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';

export const GET_CAMPUS_RESIDENCES = '[CAMPUS_RESIDENCES APP] GET CAMPUS_RESIDENCES';
export const OPEN_NEW_CAMPUS_RESIDENCES_DIALOG = '[CAMPUS_RESIDENCES APP] OPEN NEW CAMPUS_RESIDENCES DIALOG';
export const CLOSE_NEW_CAMPUS_RESIDENCES_DIALOG = '[CAMPUS_RESIDENCES APP] CLOSE NEW CAMPUS_RESIDENCES DIALOG';
export const OPEN_EDIT_CAMPUS_RESIDENCES_DIALOG = '[CAMPUS_RESIDENCES APP] OPEN EDIT CAMPUS_RESIDENCES DIALOG';
export const CLOSE_EDIT_CAMPUS_RESIDENCES_DIALOG = '[CAMPUS_RESIDENCES APP] CLOSE EDIT CAMPUS_RESIDENCES DIALOG';
export const ADD_CAMPUS_RESIDENCES = '[CAMPUS_RESIDENCES APP] ADD CAMPUS_RESIDENCES';
export const UPDATE_CAMPUS_RESIDENCES = '[CAMPUS_RESIDENCES APP] UPDATE CAMPUS_RESIDENCES';
export const REMOVE_CAMPUS_RESIDENCES = '[CAMPUS_RESIDENCES APP] REMOVE CAMPUS_RESIDENCES';

export function getCampusResidences() {
	const request = axios.all([axios.get(apiUrl + 'Campus'), axios.get(apiUrl + 'Residences')]);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_CAMPUS_RESIDENCES,
				payload: [...response[0].data.data, ...response[1].data.data],
			})
		);
}

export function openNewCampusResidencesDialog() {
	return {
		type: OPEN_NEW_CAMPUS_RESIDENCES_DIALOG,
	};
}

export function closeNewCampusResidencesDialog() {
	return {
		type: CLOSE_NEW_CAMPUS_RESIDENCES_DIALOG,
	};
}

export function openEditCampusResidencesDialog(data) {
	return {
		type: OPEN_EDIT_CAMPUS_RESIDENCES_DIALOG,
		data,
	};
}

export function closeEditCampusResidencesDialog() {
	return {
		type: CLOSE_EDIT_CAMPUS_RESIDENCES_DIALOG,
	};
}

export function addCampus(newCampus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.post(apiUrl + 'Campus', {
			newCampus,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du campus",
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
							message: 'Campus ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}

export function addResidence(newResidence) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.post(apiUrl + 'Residences', {
			newResidence,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout de la résidence",
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
							message: 'Résidence ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}

export function updateCampus(newCampus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.put(apiUrl + 'Campus', {
			newCampus,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du campus',
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
							message: 'Campus modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}

export function updateResidence(newResidence) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.put(apiUrl + 'Residences', {
			newResidence,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification de la résidence',
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
							message: 'Résidence modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}

export function removeCampus(id_campus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.delete(apiUrl + 'Campus/' + id_campus);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du campus',
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
							message: 'Campus supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}

export function removeResidence(id_residence) {
	return (dispatch, getState) => {
		const { routeParams } = getState().campusResidences.campusresidencesReducer;

		const request = axios.delete(apiUrl + 'Residences/' + id_residence);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_CAMPUS_RESIDENCES,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion de la résidence',
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
							message: 'Résidence supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getCampusResidences(routeParams));
				}
			})
		);
	};
}
