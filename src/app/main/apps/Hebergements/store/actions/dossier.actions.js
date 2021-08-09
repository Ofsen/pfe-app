import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';

export const GET_DOSSIER = '[HEBERGEMENTS APP] GET DOSSIER';
export const SAVE_DOSSIER = '[HEBERGEMENTS APP] SAVE DOSSIER';
export const RESET_DOSSIER = '[HEBERGEMENTS APP] RESET DOSSIER';

export function getDossier(params) {
	const request = axios.get(apiUrl + 'Dossiers/single', { params });

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_DOSSIER,
				payload: response.data,
			})
		);
}

export function saveDossier(data) {
	const request = axios.post(apiUrl + 'Dossiers', data);

	return (dispatch) =>
		request.then((response) => {
			Promise.all([
				dispatch({
					type: SAVE_DOSSIER,
					payload: response.data,
				}),
			]).then((r) => {
				if (r.insert === false) {
					dispatch(
						showMessage({
							message: "Erreur lors de l'ajout du dossier",
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
							message: 'Dossier ajouté avec succès',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'center',
							},
							variant: 'success',
						})
					);
				}
			});
		});
}

export function newDossier() {
	const data = {
		nom: '',
		prenom: '',
		n_etudiant: '',
		n_tel: '',
		email: '',
		photo_id: null,
		demande_sign: null,
		attestation_bac: null,
		cert_scolarite: null,
		cert_residence: null,
		ext_naissance: null,
		accepted: false,
	};

	return {
		type: GET_DOSSIER,
		payload: data,
	};
}

export function resetDossier() {
	return {
		type: RESET_DOSSIER,
	};
}
