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
	title: 'Trajet du ' + moment().format(moment.HTML5_FMT.DATE),
	id_bus: null,
	start: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	end: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	recurring: false,
	until: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	interval: null,
	freq: null,
};

function TransportsDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ transports }) => transports.busCalendrier.trajetDialog);
	const bus = useSelector(({ transports }) => transports.busCalendrier.bus);
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
		dispatch(Actions.getBusArray());
	}, [dispatch]);

	function closeComposeDialog() {
		eventDialog.type === 'edit' ? dispatch(Actions.closeEditTrajetDialog()) : dispatch(Actions.closeNewTrajetDialog());
	}

	function canBeSubmitted() {
		if (form.recurring) {
			return (
				form.interval >= 1 &&
				moment(form.start) <= moment(form.until) &&
				form.title.length > 0 &&
				moment(form.start) <= moment(form.end) &&
				form.id_bus !== null
			);
		} else {
			return form.title.length > 0 && form.start <= form.end && form.id_bus !== null;
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(Actions.addTrajet(form));
		} else {
			dispatch(Actions.updateTrajet(form));
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
		dispatch(Actions.removeTrajet(form.id_trajet, form.start));
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

	const busInfo = form.id_bus !== null && _.find(bus, (e) => e.id_bus === form.id_bus);

	console.log(form);

	return (
		bus !== null && (
			<React.Fragment>
				<Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth='xs' component='form'>
					<AppBar position='static'>
						<Toolbar className='flex w-full'>
							{FuseUtils.hasPermission(authRoles.staff, userRole) ? (
								<Typography variant='subtitle1' color='inherit'>
									{eventDialog.type === 'new' ? 'Ajouter un trajet' : 'Modifier un trajet'}
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
									<Typography variant='h5' color='inherit' className='mt-8 mb-4'>
										Itinéraire:
									</Typography>
									<Typography variant='subtitle1' color='inherit' className='mt-4 mb-16'>
										{busInfo &&
											'Départ de ' +
												busInfo.adr_depart +
												' à ' +
												moment(eventDialog.data.start).format('HH:mm') +
												', arrivée à ' +
												busInfo.adr_arrivee +
												' à ' +
												moment(eventDialog.data.end).format('HH:mm')}
									</Typography>
									<Typography variant='h5' color='inherit' className='mt-8 mb-4'>
										Matricule:
									</Typography>
									<Typography>{busInfo && busInfo.matricule}</Typography>
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
									name='id_bus'
									options={
										bus !== null &&
										bus.map((item) => ({
											value: item.id_bus,
											label: item.matricule,
										}))
									}
									value={
										form.matricule !== null && {
											label: form.matricule,
											value: form.id_bus,
										}
									}
									variant='fixed'
									noOptionsMessage={() => 'Aucun bus à sélectionner'}
									onChange={(value) => handleChipChange(value.value, 'id_bus')}
									placeholder='Selectionner un bus'
									textFieldProps={{
										label: 'Bus',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
								/>
								<p className='mt-8 mb-16 w-full'>
									{busInfo && 'Départ de ' + busInfo.adr_depart + ', arrivée à ' + busInfo.adr_arrivee}
								</p>
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
										<Switch
											checked={form.recurring}
											id='recurring'
											name='recurring'
											onChange={handleChange}
										/>
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
							Cette action est irréversible, voulez-vous vraiment supprimer ce trajet?
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
		)
	);
}

export default TransportsDialog;
