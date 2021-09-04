import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';
import moment from 'moment';
import _ from '@lodash';
import { FuseUtils } from '@fuse';
import { v4 } from 'uuid';

export const GET_DOSSIER_BOURSES = '[BOURSES APP] GET DOSSIER BOURSES';
export const SAVE_DOSSIER_BOURSES = '[BOURSES APP] SAVE DOSSIER BOURSES';
export const UPDATE_DOSSIER_BOURSES = '[BOURSES APP] UPDATE DOSSIER BOURSES';
export const RESET_DOSSIER_BOURSES = '[BOURSES APP] RESET DOSSIER BOURSES';

export function getDossierBourses(params) {
	const request = axios.get(apiUrl + 'Bourses/single/' + params.dossierBourseId);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_DOSSIER_BOURSES,
				payload: response.data.data,
			})
		);
}

export function saveDossierBourses(data) {
	let text_data = _.omit(data, 'images');
	let images_data = _.get(data, 'images');

	images_data.map((e) => {
		_.set(text_data, e.id, e.file.name);
		return false;
	});

	let imgs = new FormData();
	images_data = images_data.map((e) => imgs.append('imgs', e.file, e.file.name));

	const request = axios.all([
		axios.post(apiUrl + 'Bourses', { newDossierB: { ...text_data } }),
		axios.post(apiUrl + 'Bourses/images/' + text_data.id_dossier_b, imgs, {
			headers: {
				accept: 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=---------------------------${FuseUtils.generateGUID()}`,
			},
		}),
	]);

	return (dispatch) =>
		request.then((response) => {
			if (response[0].data.insert && response[1].data.insert) {
				Promise.all([
					dispatch({
						type: SAVE_DOSSIER_BOURSES,
						payload: response.data,
					}),
				]).then((r) => {
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
				});
			} else {
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
			}
		});
}

export function updateDossierBourses(data) {
	const request = axios.put(apiUrl + 'Bourses', { updateDossierB: { ...data } });

	return (dispatch) =>
		request.then((response) => {
			Promise.all([
				dispatch({
					type: UPDATE_DOSSIER_BOURSES,
					payload: response.data,
				}),
			]).then((r) => {
				if (r.insert === false) {
					dispatch(
						showMessage({
							message: 'Erreur lors de la modification du dossier',
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
							message: 'Dossier modifié avec succès',
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

export function newDossierBourses() {
	const data = {
		id_dossier_b: v4(),
		nom: '',
		prenom: '',
		n_etudiant: '',
		n_tel: '',
		email: '',
		photo_id: '',
		demande_b_sign: '',
		attestation_bac: '',
		cert_scolarite: '',
		accepted: null,
		date_depot: moment(),
		ext_role_impo_pere: '',
		ext_role_impo_mere: '',
		ext_role_impo_etud: '',
		just_rev_pere: '',
		just_rev_mere: '',
		spec_cheq: '',
		images: [],
	};

	return {
		type: GET_DOSSIER_BOURSES,
		payload: data,
	};
}

export function resetDossierBourses() {
	return {
		type: RESET_DOSSIER_BOURSES,
	};
}
