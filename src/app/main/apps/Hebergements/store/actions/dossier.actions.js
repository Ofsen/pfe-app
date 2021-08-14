import axios from 'axios';

import { showMessage } from 'app/store/actions/fuse';
import { apiUrl } from 'app/defaultValues';
import moment from 'moment';
import _ from '@lodash';
import { FuseUtils } from '@fuse';

export const GET_DOSSIER = '[HEBERGEMENTS APP] GET DOSSIER';
export const SAVE_DOSSIER = '[HEBERGEMENTS APP] SAVE DOSSIER';
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

export function saveDossier(data) {
	let text_data = _.omit(data, 'images');
	let images_data = _.get(data, 'images');

	images_data.map((e) => {
		_.set(text_data, e.id, e.file.name);
		return false;
	});

	let imgs = new FormData();
	images_data = images_data.map((e) => imgs.append('imgs', e.file, e.file.name));

	const guid = FuseUtils.generateGUID();

	const request = axios.all([
		axios.post(apiUrl + 'Dossiers', { newDossier: { guid, ...text_data } }),
		axios.post(apiUrl + 'Dossiers/images/' + guid, imgs, {
			headers: {
				accept: 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=---------------------------${FuseUtils.generateGUID()}`,
			},
		}),
	]);

	return (dispatch) =>
		request.then((response) => {
			console.log(response);
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
		accepted: false,
		archived: false,
		date_depot: moment(),
		images: [],
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
