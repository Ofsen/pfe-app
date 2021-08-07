import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';
import moment from 'moment';

export const GET_EVENTS = '[MENUS APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[MENUS APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[MENUS APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[MENUS APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[MENUS APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[MENUS APP] ADD EVENT';
export const UPDATE_EVENT = '[MENUS APP] UPDATE EVENT';
export const REMOVE_EVENT = '[MENUS APP] REMOVE EVENT';

export function getMenus(date, resto) {
	const request = axios.get(apiUrl + 'Menus/' + moment(date).format('YYYY-MM-DD') + '/' + resto);

	return (dispatch) =>
		request.then((response) => {
			dispatch({
				type: GET_EVENTS,
				payload: response.data,
			});
		});
}

export function openNewMenuDialog(data) {
	return {
		type: OPEN_NEW_EVENT_DIALOG,
		data,
	};
}

export function closeNewMenuDialog() {
	return {
		type: CLOSE_NEW_EVENT_DIALOG,
	};
}

export function openEditMenuDialog(data) {
	return {
		type: OPEN_EDIT_EVENT_DIALOG,
		data,
	};
}

export function closeEditMenuDialog() {
	return {
		type: CLOSE_EDIT_EVENT_DIALOG,
	};
}

export function addMenu(newMenu) {
	return (dispatch, getState) => {
		const request = axios.post(apiUrl + 'Menus', {
			newMenu,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_EVENT,
				}),
			]).then(() => {
				if (response.data.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout du menu",
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
							message: 'Menu ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(newMenu.start));
				}
			})
		);
	};
}

export function updateMenu(menu) {
	return (dispatch, getState) => {
		const request = axios.put(apiUrl + 'Menus', {
			menu,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_EVENT,
				}),
			]).then(() => {
				if (response.data.update === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la modification du menu',
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
							message: 'Menu modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(menu.start));
				}
			})
		);
	};
}

export function removeMenu(menuId, date) {
	return (dispatch, getState) => {
		const request = axios.delete(apiUrl + 'Menus/' + menuId);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_EVENT,
				}),
			]).then(() => {
				if (response.data.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion du menu',
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
							message: 'Menu supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(date));
				}
			})
		);
	};
}
