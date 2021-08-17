import React, { useEffect, useCallback, useState } from 'react';
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	Icon,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	Switch,
	FormControlLabel,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FuseChipSelect } from '@fuse';
import _ from '@lodash';

const defaultFormState = {
	matricule: '',
	adr_depart: '',
	adr_arrivee: '',
	id_adr_depart: '',
	id_adr_arrivee: '',
	actif: true,
};

function BusDialog(props) {
	const dispatch = useDispatch();
	const busDialog = useSelector(({ transports }) => transports.bus.busDialog);
	const campRes = useSelector(({ transports }) => transports.bus.campRes);

	const { form, handleChange, setForm } = useForm(defaultFormState);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (busDialog.type === 'edit' && busDialog.data) {
			setForm({ ...busDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (busDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...busDialog.data,
			});
		}
	}, [busDialog.data, busDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (busDialog.props.open) {
			initDialog();
		}
	}, [busDialog.props.open, initDialog]);

	useEffect(() => {
		dispatch(Actions.getCampRes());
	}, [dispatch]);

	function closeComposeDialog() {
		busDialog.type === 'edit' ? dispatch(Actions.closeEditBusDialog()) : dispatch(Actions.closeNewBusDialog());
	}

	function canBeSubmitted() {
		return form.matricule.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (busDialog.type === 'new') {
			dispatch(Actions.addBus(form));
		} else {
			dispatch(Actions.updateBus(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeBus(form.id_ingredient));
		handleClose();
		closeComposeDialog();
	}

	function handleChipChange(value, name) {
		if (name === 'depart') {
			setForm(_.set({ ...form, id_adr_depart: value.value, adr_depart: value.label }));
		} else {
			setForm(_.set({ ...form, id_adr_arrivee: value.value, adr_arrivee: value.label }));
		}
	}

	const campResToSelect = _.filter(
		campRes,
		(o) => form.id_adr_depart !== o.id_camp_res && form.id_adr_arrivee !== o.id_camp_res
	);

	return (
		<Dialog
			classes={{
				paper: 'm-24',
			}}
			{...busDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth='xs'
		>
			<AppBar position='static' elevation={1}>
				<Toolbar className='flex w-full'>
					<Typography variant='subtitle1' color='inherit'>
						{busDialog.type === 'new' ? 'Nouveau Bus' : 'Modifier un Bus'}
					</Typography>
				</Toolbar>
				<div className='flex flex-col items-center justify-center pb-24'>
					<Typography variant='h6' color='inherit' className='pt-8'>
						{form.matricule}
					</Typography>
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className='flex flex-col overflow-hidden'>
				<DialogContent classes={{ root: 'pt-24 pb-0 px-24' }}>
					<div className='flex'>
						<TextField
							className='mb-24'
							label='Matricule'
							autoFocus
							id='matricule'
							name='matricule'
							value={form.matricule}
							onChange={handleChange}
							variant='outlined'
							required
							fullWidth
						/>
					</div>

					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>flight_takeoff</Icon>
						</div>
						<FuseChipSelect
							className='mb-24 w-full'
							name='adr_depart'
							options={campResToSelect.map((item) => ({
								value: item.id_camp_res,
								label: item.adresse,
							}))}
							value={
								form.adr_depart !== '' &&
								form.id_adr_depart !== '' && {
									value: form.id_adr_depart,
									label: form.adr_depart,
								}
							}
							variant='fixed'
							noOptionsMessage={() => 'Aucun(e) campus/résidence à sélectionner'}
							onChange={(value) => handleChipChange(value, 'depart')}
							placeholder='Selectionner...'
							textFieldProps={{
								label: 'Adresse de départ',
								InputLabelProps: {
									shrink: true,
								},
								variant: 'outlined',
							}}
						/>
					</div>

					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>flight_land</Icon>
						</div>
						<FuseChipSelect
							className='mb-24 w-full'
							name='adr_arrivee'
							options={campResToSelect.map((item) => ({
								value: item.id_camp_res,
								label: item.adresse,
							}))}
							value={
								form.adr_arrivee !== '' &&
								form.id_adr_arrivee !== '' && {
									value: form.id_adr_arrivee,
									label: form.adr_arrivee,
								}
							}
							variant='fixed'
							noOptionsMessage={() => 'Aucun(e) campus/résidence à sélectionner'}
							onChange={(value) => handleChipChange(value, 'arrivée')}
							placeholder='Selectionner...'
							textFieldProps={{
								label: "Adresse d'arrivée",
								InputLabelProps: {
									shrink: true,
								},
								variant: 'outlined',
							}}
						/>
					</div>

					<FormControlLabel
						control={<Switch checked={form.actif} onChange={handleChange} name='actif' aria-label='actif' />}
						label={form.actif ? 'Actif' : 'Inactif'}
					/>
				</DialogContent>
				<DialogActions className='justify-right pt-0 pb-24 pr-24'>
					{busDialog.type === 'new' ? (
						<Button
							variant='outlined'
							color='secondary'
							onClick={handleSubmit}
							type='submit'
							disabled={!canBeSubmitted()}
						>
							Ajouter
						</Button>
					) : (
						<React.Fragment>
							<IconButton onClick={handleClickOpen} className={'mr-8'}>
								<Icon color='error'>delete</Icon>
							</IconButton>
							<Button
								variant='outlined'
								color='secondary'
								type='submit'
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Enregistrer
							</Button>
						</React.Fragment>
					)}
				</DialogActions>
			</form>
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
						Cette action est irréversible, voulez-vous vraiment supprimer ce bus?
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							handleRemove();
						}}
						variant='contained'
						color='secondary'
					>
						Supprimer
					</Button>
				</DialogActions>
			</Dialog>
		</Dialog>
	);
}

export default BusDialog;
