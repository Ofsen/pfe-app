import axios from 'axios';

import * as Actions from 'app/store/actions';
import { apiUrl } from 'app/defaultValues';

export const GET_INGREDIENTS = '[INGREDIENTS APP] GET INGREDIENTS';
export const SET_SEARCH_TEXT = '[INGREDIENTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS = '[INGREDIENTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[INGREDIENTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[INGREDIENTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[INGREDIENTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[INGREDIENTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[INGREDIENTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[INGREDIENTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[INGREDIENTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[INGREDIENTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[INGREDIENTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[INGREDIENTS APP] REMOVE CONTACTS';

export function getContacts(routeParams) {
	const request = axios.get(apiUrl + 'Ingredients', {
		params: routeParams,
	});

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_INGREDIENTS,
				payload: response.data.data,
				routeParams,
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value,
	};
}

export function toggleInSelectedContacts(contactId) {
	return {
		type: TOGGLE_IN_SELECTED_CONTACTS,
		contactId,
	};
}

export function selectAllContacts() {
	return {
		type: SELECT_ALL_CONTACTS,
	};
}

export function deSelectAllContacts() {
	return {
		type: DESELECT_ALL_CONTACTS,
	};
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

export function addContact(newIngredient) {
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
							message: "Erreur lors de l'ajout de l'ingrédient",
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
					dispatch(getContacts(routeParams));
				}
			})
		);
	};
}

export function updateContact(ingredient) {
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
					dispatch(getContacts(routeParams));
				}
			})
		);
	};
}

export function removeContact(id_ingredient) {
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
					dispatch(getContacts(routeParams));
				}
			})
		);
	};
}

export function removeContacts(id_ingredient) {
	return (dispatch, getState) => {
		const { routeParams } = getState().ingredients.ingredients;

		const request = axios.post(apiUrl + 'Ingredients/delete', {
			id_ingredient,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_CONTACTS,
				}),
				dispatch({
					type: DESELECT_ALL_CONTACTS,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						Actions.showMessage({
							message: 'Erreur lors de la suppresion des ingrédients',
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
							message: 'Ingrédients supprimés avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getContacts(routeParams));
				}
			})
		);
	};
}
