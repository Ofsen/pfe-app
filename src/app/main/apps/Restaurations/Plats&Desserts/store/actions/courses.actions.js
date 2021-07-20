import axios from 'axios';

import { apiUrl } from 'app/defaultValues';
import * as Actions from 'app/store/actions';

export const GET_MENUS = '[MENUS APP] GET MENUS';
export const GET_CATEGORIES = '[MENUS APP] GET CATEGORIES';
export const OPEN_NEW_CONTACT_DIALOG = '[MENUS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[MENUS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[MENUS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[MENUS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[MENUS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[MENUS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[MENUS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[MENUS APP] REMOVE CONTACTS';

export function getMenus() {
	const request = axios.get('/api/academy-app/courses');

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_MENUS,
				payload: response.data,
			})
		);
}

export function getCategories() {
	const request = axios.get('/api/academy-app/categories');

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_CATEGORIES,
				payload: response.data,
			})
		);
}

export function openNewContactDialog() {
	return {
		type: OPEN_NEW_CONTACT_DIALOG,
	};
}

export function closeNewContactDialog() {
	return {
		type: CLOSE_NEW_CONTACT_DIALOG,
	};
}

export function openEditContactDialog(data) {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG,
		data,
	};
}

export function closeEditContactDialog() {
	return {
		type: CLOSE_EDIT_CONTACT_DIALOG,
	};
}

export function addMenu(newIngredient) {
	return (dispatch, getState) => {
		const { routeParams } = getState().ingredients.ingredients;

		const request = axios.post(apiUrl + 'Ingredients', {
			newIngredient,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_CONTACT,
				}),
			]).then((r) => {
				if (r.insert === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de l'ajout.",
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
							message: 'Ingrédient ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(routeParams));
				}
			})
		);
	};
}

export function updateMenu(ingredient) {
	return (dispatch, getState) => {
		const { routeParams } = getState().ingredients.ingredients;

		const request = axios.put(apiUrl + 'Ingredients', {
			ingredient,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_CONTACT,
				}),
			]).then((r) => {
				if (r.update === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de la modification de l'ingrédient",
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
							message: 'Ingrédient modifié avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(routeParams));
				}
			})
		);
	};
}

export function removeMenu(id_ingredient) {
	return (dispatch, getState) => {
		const { routeParams } = getState().ingredients.ingredients;

		const a = [id_ingredient];

		const request = axios.post(apiUrl + 'Ingredients/delete', {
			id_ingredient: a,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_CONTACT,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						Actions.showMessage({
							message: "Erreur lors de la suppresion de l'ingrédient",
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
							message: 'Ingrédient supprimé avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getMenus(routeParams));
				}
			})
		);
	};
}
