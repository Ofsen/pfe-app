import axios from 'axios';

import { apiUrl } from 'app/defaultValues';

export const GET_DOSSIERS = '[HEBERGEMENTS APP] GET DOSSIERS';
export const SET_DOSSIERS_SEARCH_TEXT = '[HEBERGEMENTS APP] SET DOSSIERS SEARCH TEXT';
export const DELETE_DOSSIERS = '[HEBERGEMENTS APP] DELETE DOSSIERS';

export function getDossiers() {
	const request = axios.get(apiUrl + 'Dossiers');

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_DOSSIERS,
				payload: response.data.data,
			})
		);
}

export function setDossiersSearchText(event) {
	return {
		type: SET_DOSSIERS_SEARCH_TEXT,
		searchText: event.target.value,
	};
}

export function deleteDossiers(dossiersIds) {
	const request = axios.post(apiUrl + 'Dossiers/delete', { dossiersIds });

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: DELETE_DOSSIERS,
				payload: response.data.data,
			})
		);
}