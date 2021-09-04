import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';
import moment from 'moment';
import _ from '@lodash';
import { FuseUtils } from '@fuse';
import { v4 } from 'uuid';

export const GET_DOSSIER = '[HEBERGEMENTS APP] GET DOSSIER';
export const GET_RESIDENCES = '[HEBERGEMENTS APP] GET RESIDENCES';
export const SAVE_DOSSIER = '[HEBERGEMENTS APP] SAVE DOSSIER';
export const UPDATE_DOSSIER = '[HEBERGEMENTS APP] UPDATE DOSSIER';
export const RESET_DOSSIER = '[HEBERGEMENTS APP] RESET DOSSIER';

export function getDossier(params) {
	const request = axios.get(apiUrl + 'Dossiers/single/' + params.dossierId);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_DOSSIER,
				payload: response.data.data,
			})
		);
}

export function getResidences(params) {
	const request = axios.get(apiUrl + 'Residences');

	return (dispatch) =>
		request.then((response) => {
			const data = _.filter(response.data.data, (o) => o.nbr_lits - o.nbr_lits_occupe > 0);
			dispatch({
				type: GET_RESIDENCES,
				payload: data,
			});
		});
}

export function saveDossier(data) {
	let text_data = _.omit(data, 'images');
	let images_data = _.get(data, 'images');

	images_data.map((e) => {
		_.set(text_data, e.id, e.file.name);
		return false;
	});

	let imgs = new FormData();
	images_data = images_data.map((e) => imgs.append('imgs', e.file, e.file.name));

	const request = axios.all([
		axios.post(apiUrl + 'Dossiers', { newDossier: { ...text_data } }),
		axios.post(apiUrl + 'Dossiers/images/' + text_data.id_dossier, imgs, {
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
						type: SAVE_DOSSIER,
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

export function updateDossier(data) {
	const request = axios.put(apiUrl + 'Dossiers', { updateDossier: { ...data } });

	return (dispatch) =>
		request.then((response) => {
			Promise.all([
				dispatch({
					type: UPDATE_DOSSIER,
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

export function newDossier() {
	const data = {
		id_dossier: v4(),
		nom: '',
		prenom: '',
		n_etudiant: '',
		n_tel: '',
		email: '',
		accepted: null,
		archived: false,
		date_depot: moment(),
		images: [],
		selected_res: '',
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
