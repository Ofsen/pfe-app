import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';

export const GET_USERS = '[USERS APP] GET USERS';
export const SET_SEARCH_TEXT_USERS = '[USERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_USERS = '[USERS APP] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USERS APP] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USERS APP] DESELECT ALL USERS';
export const OPEN_NEW_USER_DIALOG = '[USERS APP] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[USERS APP] CLOSE NEW USER DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[USERS APP] OPEN EDIT USER DIALOG';
export const CLOSE_EDIT_USER_DIALOG = '[USERS APP] CLOSE EDIT USER DIALOG';
export const ADD_USER = '[USERS APP] ADD USER';
export const UPDATE_USER = '[USERS APP] UPDATE USER';
export const REMOVE_USER = '[USERS APP] REMOVE USER';
export const REMOVE_USERS = '[USERS APP] REMOVE USERS';

export function getUsers(routeParams) {
	const request = axios.get(apiUrl + 'Users', {
		params: routeParams,
	});

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_USERS,
				payload: response.data.data,
				routeParams,
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT_USERS,
		searchText: event.target.value,
	};
}

export function toggleInSelectedUsers(userId) {
	return {
		type: TOGGLE_IN_SELECTED_USERS,
		userId,
	};
}

export function selectAllUsers() {
	return {
		type: SELECT_ALL_USERS,
	};
}

export function deSelectAllUsers() {
	return {
		type: DESELECT_ALL_USERS,
	};
}

export function openNewUserDialog() {
	return {
		type: OPEN_NEW_USER_DIALOG,
	};
}

export function closeNewUserDialog() {
	return {
		type: CLOSE_NEW_USER_DIALOG,
	};
}

export function openEditUserDialog(data) {
	return {
		type: OPEN_EDIT_USER_DIALOG,
		data,
	};
}

export function closeEditUserDialog() {
	return {
		type: CLOSE_EDIT_USER_DIALOG,
	};
}

export function addUser(newUser) {
	return (dispatch, getState) => {
		const { routeParams } = getState().usersApp.usersReducer;

		const request = axios.post(apiUrl + 'Users', newUser);

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_USER,
				}),
			]).then((r) => {
				if (r.insert === false) {
					dispatch(
						showMessage({
							message: "Erreur lors de l'ajout de l'utilisateur",
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
							message: "L'utilisateur ajouté avec succès",
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getUsers(routeParams));
				}
			})
		);
	};
}

export function updateUser(user) {
	return (dispatch, getState) => {
		const { routeParams } = getState().usersApp.usersReducer;

		const request = axios.put(apiUrl + 'Users', {
			user,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_USER,
				}),
			]).then((r) => {
				if (r.update === false) {
					dispatch(
						showMessage({
							message: "Erreur lors de la modification de l'utilisateur",
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
							message: "L'utilisateur modifié avec succès",
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getUsers(routeParams));
				}
			})
		);
	};
}

export function removeUser(id_user) {
	return (dispatch, getState) => {
		const { routeParams } = getState().usersApp.usersReducer;

		const a = [id_user];

		const request = axios.post(apiUrl + 'Users/delete', {
			id_user: a,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_USER,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						showMessage({
							message: "Erreur lors de la suppresion de l'utilisateur",
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
							message: "L'utilisateur supprimé avec succès",
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getUsers(routeParams));
				}
			})
		);
	};
}

export function removeUsers(id_ingredient) {
	return (dispatch, getState) => {
		const { routeParams } = getState().restauration.usersReducer;

		const request = axios.post(apiUrl + 'Users/delete', {
			id_ingredient,
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: REMOVE_USERS,
				}),
				dispatch({
					type: DESELECT_ALL_USERS,
				}),
			]).then((r) => {
				if (r.delete === false) {
					dispatch(
						showMessage({
							message: 'Erreur lors de la suppresion des utilisateurs',
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
							message: 'Les utilisateurs supprimés avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
					dispatch(getUsers(routeParams));
				}
			})
		);
	};
}
