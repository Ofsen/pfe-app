import React, { useCallback, useEffect, useState } from 'react';
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Icon,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	FormControl,
	FormControlLabel,
	InputLabel,
	OutlinedInput,
	MenuItem,
	Select,
	Switch,
	DialogTitle,
	DialogContentText,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { FuseChipSelect, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import * as Actions from '../store/actions';
import _ from '@lodash';
import { authRoles } from 'app/auth';

const defaultFormState = {
	title: 'Menu du ' + moment().format(moment.HTML5_FMT.DATE),
	id_plat_un: null,
	id_plat_deux: null,
	id_dessert_un: null,
	id_dessert_deux: null,
	start: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	end: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	recurring: false,
	until: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	interval: null,
	freq: null,
};

function MenusDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ menus }) => menus.menusReducer.eventDialog);
	const platsDesserts = useSelector(({ menus }) => menus.platsDessertsReducer.data);
	const userRole = useSelector(({ auth }) => auth.user.role);

	const [open, setOpen] = useState(false);

	const { form, handleChange, setForm } = useForm(defaultFormState);
	let start = moment(form.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	let end = moment(form.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	let until = moment(form.until).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			if (eventDialog.data.is_child) {
				setForm({ ...eventDialog.data, start: eventDialog.data.parent_start, end: eventDialog.data.parent_end });
			} else {
				setForm({ ...eventDialog.data });
			}
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...eventDialog.data,
			});
		}
	}, [eventDialog.data, eventDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	useEffect(() => {
		dispatch(Actions.getPlatsDesserts());
	}, [dispatch]);

	function closeComposeDialog() {
		eventDialog.type === 'edit' ? dispatch(Actions.closeEditMenuDialog()) : dispatch(Actions.closeNewMenuDialog());
	}

	function canBeSubmitted() {
		if (form.recurring) {
			return (
				form.interval >= 1 &&
				moment(form.start) <= moment(form.until) &&
				form.title.length > 0 &&
				moment(form.start) <= moment(form.end) &&
				form.id_plat_un !== null &&
				form.id_plat_deux !== null &&
				form.id_dessert_un !== null &&
				form.id_dessert_deux !== null
			);
		} else {
			return (
				form.title.length > 0 &&
				form.start <= form.end &&
				form.id_plat_un !== null &&
				form.id_plat_deux !== null &&
				form.id_dessert_un !== null &&
				form.id_dessert_deux !== null
			);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(Actions.addMenu(form));
		} else {
			dispatch(Actions.updateMenu(form));
		}
		closeComposeDialog();
	}

	function handleIntervalChange(event) {
		event.persist();

		setForm((form) => ({
			...form,
			interval: event.target.value < 1 ? 1 : parseInt(event.target.value),
		}));
	}

	function handleRemove() {
		dispatch(Actions.removeMenu(form.id_menu, form.start));
		closeComposeDialog();
	}

	function handleChipChange(value, name) {
		setForm(_.set({ ...form }, name, value));
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const platsToSelect = _.filter(
		platsDesserts,
		(o) => o.category === 'plats' && form.id_plat_un !== o.id_plat && form.id_plat_deux !== o.id_plat
	);

	const dessertsToSelect = _.filter(
		platsDesserts,
		(o) => o.category === 'desserts' && form.id_dessert_deux !== o.id_dessert && form.id_dessert_un !== o.id_dessert
	);

	return (
		<React.Fragment>
			<Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth='xs' component='form'>
				<AppBar position='static'>
					<Toolbar className='flex w-full'>
						{FuseUtils.hasPermission(authRoles.staff, userRole) ? (
							<Typography variant='subtitle1' color='inherit'>
								{eventDialog.type === 'new' ? 'Ajouter un menu' : 'Modifier un menu'}
							</Typography>
						) : (
							<Typography variant='subtitle1' color='inherit'>
								{eventDialog.type === 'edit' && 'Information'}
							</Typography>
						)}
					</Toolbar>
				</AppBar>
				{!FuseUtils.hasPermission(authRoles.staff, userRole) &&
					eventDialog.type === 'edit' &&
					eventDialog.data !== null && (
						<React.Fragment>
							<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
								<Typography variant='h4' color='inherit' className='mt-8 mb-16'>
									{eventDialog.data.title}
								</Typography>
								<Typography variant='h5' color='inherit' className='mt-8 mb-16'>
									Au menu:
								</Typography>
								<Typography variant='subtitle1' color='inherit' className='mt-8 mb-16'>
									{_.find(platsDesserts, (e) => e.id_plat === eventDialog.data.id_plat_un).nom}
								</Typography>
								<Typography variant='subtitle1' color='inherit' className='mt-8 mb-16'>
									{_.find(platsDesserts, (e) => e.id_plat === eventDialog.data.id_plat_deux).nom}
								</Typography>
								<Typography variant='subtitle1' color='inherit' className='mt-8 mb-16'>
									{_.find(platsDesserts, (e) => e.id_dessert === eventDialog.data.id_dessert_un).nom}
								</Typography>
								<Typography variant='subtitle1' color='inherit' className='mt-8 mb-16'>
									{_.find(platsDesserts, (e) => e.id_dessert === eventDialog.data.id_dessert_deux).nom}
								</Typography>
							</DialogContent>
							<DialogActions className='justify-right pt-0 pb-24 pr-24'></DialogActions>
						</React.Fragment>
					)}

				{FuseUtils.hasPermission(authRoles.staff, userRole) && (
					<form noValidate onSubmit={handleSubmit}>
						<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
							<TextField
								id='title'
								label='Titre'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									max: end,
								}}
								name='title'
								value={form.title}
								onChange={handleChange}
								variant='outlined'
								autoFocus
								required
								fullWidth
							/>
							<FuseChipSelect
								className='mt-8 mb-16 w-full'
								name={'plat_un'}
								options={platsToSelect.map((item) => ({
									value: item.id_plat,
									label: item.nom,
								}))}
								value={
									form.id_plat_un !== null && {
										label: _.find(platsDesserts, (e) => e.id_plat === form.id_plat_un).nom,
										value: form.id_plat_un,
									}
								}
								variant='fixed'
								noOptionsMessage={() => 'Aucun plat à sélectionner'}
								onChange={(value) => handleChipChange(value.value, 'id_plat_un')}
								placeholder='Selectionner le premièr plat'
								textFieldProps={{
									label: 'Premièr plat',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
							/>
							<FuseChipSelect
								className='mt-8 mb-16 w-full'
								name={'plat_deux'}
								options={platsToSelect.map((item) => ({
									value: item.id_plat,
									label: item.nom,
								}))}
								value={
									form.id_plat_deux !== null && {
										label: _.find(platsDesserts, (e) => e.id_plat === form.id_plat_deux).nom,
										value: form.id_plat_deux,
									}
								}
								variant='fixed'
								noOptionsMessage={() => 'Aucun plat à sélectionner'}
								onChange={(value) => handleChipChange(value.value, 'id_plat_deux')}
								placeholder='Selectionner le deuxième plat'
								textFieldProps={{
									label: 'Deuxième plat',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
							/>
							<FuseChipSelect
								className='mt-8 mb-16 w-full'
								name={'dessert_un'}
								options={dessertsToSelect.map((item) => ({
									value: item.id_dessert,
									label: item.nom,
								}))}
								value={
									form.id_dessert_un !== null && {
										label: _.find(platsDesserts, (e) => e.id_dessert === form.id_dessert_un).nom,
										value: form.id_dessert_un,
									}
								}
								variant='fixed'
								noOptionsMessage={() => 'Aucun dessert à sélectionner'}
								onChange={(value) => handleChipChange(value.value, 'id_dessert_un')}
								placeholder='Selectionner le premièr dessert'
								textFieldProps={{
									label: 'Premièr dessert',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
							/>
							<FuseChipSelect
								className='mt-8 mb-16 w-full'
								name={'dessert_deux'}
								options={dessertsToSelect.map((item) => ({
									value: item.id_dessert,
									label: item.nom,
								}))}
								value={
									form.id_dessert_deux !== null && {
										label: _.find(platsDesserts, (e) => e.id_dessert === form.id_dessert_deux).nom,
										value: form.id_dessert_deux,
									}
								}
								variant='fixed'
								noOptionsMessage={() => 'Aucun dessert à sélectionner'}
								onChange={(value) => handleChipChange(value.value, 'id_dessert_deux')}
								placeholder='Selectionner le deuxième dessert'
								textFieldProps={{
									label: 'Deuxième dessert',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
							/>
							<TextField
								id='start'
								name='start'
								label='Du'
								type='datetime-local'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									max: end,
								}}
								value={start}
								onChange={handleChange}
								variant='outlined'
								fullWidth
							/>
							<TextField
								id='end'
								name='end'
								label="Jusqu'au"
								type='datetime-local'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									min: start,
								}}
								value={end}
								onChange={handleChange}
								variant='outlined'
								fullWidth
							/>
							<FormControlLabel
								className='mt-8 mb-16'
								label='Répéter'
								control={
									<Switch checked={form.recurring} id='recurring' name='recurring' onChange={handleChange} />
								}
							/>
							{form.recurring && (
								<React.Fragment>
									<TextField
										id='dtstart'
										name='start'
										label='Répéter Du'
										type='datetime-local'
										className='mt-8 mb-16'
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											max: end,
										}}
										value={start}
										variant='outlined'
										fullWidth
										disabled
									/>

									<TextField
										id='until'
										name='until'
										label="Répéter jusqu'au"
										type='datetime-local'
										className='mt-8 mb-16'
										InputLabelProps={{
											shrink: true,
										}}
										value={until}
										onChange={handleChange}
										variant='outlined'
										fullWidth
									/>

									<FormControl className='flex mt-8 mb-16' variant='outlined'>
										<InputLabel htmlFor='freq-label-placeholder'>Fréquence</InputLabel>
										<Select
											value={form.freq}
											onChange={handleChange}
											input={
												<OutlinedInput
													labelWidth={'frequence'.length * 7.5}
													name='freq'
													id='freq-label-placeholder'
												/>
											}
										>
											<MenuItem value={null}>
												<em>Selectionner la fréquence de répétition</em>
											</MenuItem>

											{['Chaque Année', 'Tout les mois', 'Chaque semaine', 'Tout les jour'].map(
												(e, i) => (
													<MenuItem value={i} key={i}>
														{e}
													</MenuItem>
												)
											)}
										</Select>
									</FormControl>

									<TextField
										id='interval'
										label='Interval'
										type='number'
										className='mt-8 mb-16'
										InputLabelProps={{
											shrink: true,
										}}
										name='interval'
										value={form.interval}
										onChange={handleIntervalChange}
										variant='outlined'
										autoFocus
										fullWidth
									/>
								</React.Fragment>
							)}
						</DialogContent>

						<DialogActions className='justify-right pt-0 pb-24 pr-24'>
							{eventDialog.type === 'new' ? (
								<Button variant='outlined' color='secondary' type='submit' disabled={!canBeSubmitted()}>
									Ajouter
								</Button>
							) : (
								<React.Fragment>
									<IconButton onClick={handleClickOpen}>
										<Icon color='error'>delete</Icon>
									</IconButton>
									<Button variant='outlined' color='secondary' type='submit' disabled={!canBeSubmitted()}>
										Enregistrer
									</Button>
								</React.Fragment>
							)}
						</DialogActions>
					</form>
				)}
			</Dialog>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title' className='py-24'>
					<div className='flex items-center justify-between'>
						<Typography variant='h5'>Attention!</Typography>
						<Icon color='error'>error</Icon>
					</div>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description' className='px-24'>
						Cette action est irréversible, voulez-vous vraiment supprimer ce menu?
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							handleRemove();
							handleClose();
						}}
						variant='contained'
						color='secondary'
					>
						Supprimer
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default MenusDialog;
