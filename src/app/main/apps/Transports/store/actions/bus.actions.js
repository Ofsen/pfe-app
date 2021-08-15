import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';

export const GET_TRANSPORT = '[TRANSPORT APP] GET TRANSPORT';
export const SET_TRANSPORT_SEARCH_TEXT = '[TRANSPORT APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_TRANSPORT = '[TRANSPORT APP] TOGGLE IN SELECTED TRANSPORT';
export const SELECT_ALL_TRANSPORT = '[TRANSPORT APP] SELECT ALL TRANSPORT';
export const DESELECT_ALL_TRANSPORT = '[TRANSPORT APP] DESELECT ALL TRANSPORT';
export const OPEN_NEW_BUS_DIALOG = '[TRANSPORT APP] OPEN NEW BUS DIALOG';
export const CLOSE_NEW_BUS_DIALOG = '[TRANSPORT APP] CLOSE NEW BUS DIALOG';
export const OPEN_EDIT_BUS_DIALOG = '[TRANSPORT APP] OPEN EDIT BUS DIALOG';
export const CLOSE_EDIT_BUS_DIALOG = '[TRANSPORT APP] CLOSE EDIT BUS DIALOG';
export const ADD_BUS = '[TRANSPORT APP] ADD BUS';
export const UPDATE_BUS = '[TRANSPORT APP] UPDATE BUS';
export const REMOVE_BUS = '[TRANSPORT APP] REMOVE BUS';
export const REMOVE_TRANSPORT = '[TRANSPORT APP] REMOVE TRANSPORT';
export const GET_CAMPUS_RESIDENCES = '[CAMPUS_RESIDENCES APP] GET CAMPUS_RESIDENCES';

export function getBus(routeParams) {
	const request = axios.get(apiUrl + 'Bus', {
		params: routeParams,
	});

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_TRANSPORT,
				payload: response.data.data,
				routeParams,
			})
		);
}

export function getCampRes() {
	const request = axios.all([axios.get(apiUrl + 'Campus'), axios.get(apiUrl + 'Residences')]);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_CAMPUS_RESIDENCES,
				payload: [...response[0].data.data, ...response[1].data.data],
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_TRANSPORT_SEARCH_TEXT,
		searchText: event.target.value,
	};
}

export function toggleInBus(busId) {
	return {
		type: TOGGLE_IN_SELECTED_TRANSPORT,
		busId,
	};
}

export function selectAllBus() {
	return {
		type: SELECT_ALL_TRANSPORT,
	};
}

export function deSelectAllBus() {
	return {
		type: DESELECT_ALL_TRANSPORT,
	};
}

export function openNewBusDialog() {
	return {
		type: OPEN_NEW_BUS_DIALOG,
	};
}

export function closeNewBusDialog() {
	return {
		type: CLOSE_NEW_BUS_DIALOG,
	};
}

export function openEditBusDialog(data) {
	return {
		type: OPEN_EDIT_BUS_DIALOG,
		data,
	};
}

export function closeEditBusDialog() {
	return {
		type: CLOSE_EDIT_BUS_DIALOG,
	};
}

export function addBus(newBus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().transport.bus;

		const request = axios.post(apiUrl + 'Bus', {
			newBus,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_BUS,
				}),
			]).then((r) => {
				if (r.insert === false) {
					dispatch(
						showMessage({
							message: "Erreur lors de l'ajout du bus",
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
						showMessage({
							message: 'Bus ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getBus(routeParams));
				}
			})
		);
	};
}

export function updateBus(bus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().transport.bus;

		const request = axios.put(apiUrl + 'bus', {
			bus,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_BUS,
				}),
			]).then((r) => {
				if (r.update === false) {
					dispatch(
						showMessage({
							message: 'Erreur lors de la modification du bus',
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
						showMessage({
							message: 'Bus modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getBus(routeParams));
				}
			})
		);
	};
}

export function removeBus(id_bus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().transport.bus;

		const a = [id_bus];

		const request = axios.post(apiUrl + 'Bus/delete', {
			id_bus: a,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_BUS,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						showMessage({
							message: 'Erreur lors de la suppresion du bus',
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
						showMessage({
							message: 'Bus supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getBus(routeParams));
				}
			})
		);
	};
}

export function removeMultipleBus(id_bus) {
	return (dispatch, getState) => {
		const { routeParams } = getState().transport.bus;

		const request = axios.post(apiUrl + 'Bus/delete', {
			id_bus,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_TRANSPORT,
				}),
				dispatch({
					type: DESELECT_ALL_TRANSPORT,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						showMessage({
							message: 'Erreur lors de la suppresion des bus',
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
						showMessage({
							message: 'Bus supprimés avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getBus(routeParams));
				}
			})
		);
	};
}
