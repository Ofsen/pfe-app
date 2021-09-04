import axios from 'axios';

import { apiUrl } from 'app/defaultValues';

export const GET_DOSSIERS_BOURSES = '[BOURSES APP] GET DOSSIERS BOURSES';
export const SET_DOSSIERS_BOURSES_SEARCH_TEXT = '[BOURSES APP] SET DOSSIERS BOURSES SEARCH TEXT';
export const DELETE_DOSSIERS_BOURSES = '[BOURSES APP] DELETE DOSSIERS BOURSES';

export function getDossiersBourses() {
	const request = axios.get(apiUrl + 'Bourses');

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_DOSSIERS_BOURSES,
				payload: response.data.data,
			})
		);
}

export function setDossiersBoursesSearchText(event) {
	return {
		type: SET_DOSSIERS_BOURSES_SEARCH_TEXT,
		searchText: event.target.value,
	};
}

export function deleteDossiersBourses(dossiersBoursesIds) {
	const request = axios.post(apiUrl + 'Bourses/delete', { dossiersBoursesIds });

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: DELETE_DOSSIERS_BOURSES,
				payload: response.data.data,
			})
		);
}
