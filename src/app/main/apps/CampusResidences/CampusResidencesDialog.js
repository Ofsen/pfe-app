import React, { useEffect, useCallback, useState } from 'react';
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
	Select,
	InputLabel,
	FormControl,
	OutlinedInput,
	MenuItem,
	DialogTitle,
	DialogContentText,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { blue, blueGrey } from '@material-ui/core/colors';

var defaultFormState = {
	category: 'null',
	nom: '',
	adresse: '',
	nbr_lits: 0,
};

function CampusResidencesDialog() {
	const dispatch = useDispatch();
	const CampusResidencesDialog = useSelector(
		({ campusResidences }) => campusResidences.campusresidencesReducer.campusresidencesDialog
	);
	const categories = [
		{
			id: 0,
			value: 'campus',
			label: 'Campus',
			color: blue[500],
		},
		{
			id: 1,
			value: 'residences',
			label: 'Residences',
			color: blueGrey[500],
		},
	];

	const [selectedCategory, setSelectedCategory] = useState('null');

	const [open, setOpen] = useState(false);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (CampusResidencesDialog.type === 'edit' && CampusResidencesDialog.data) {
			setSelectedCategory(CampusResidencesDialog.data.category);
			setForm({
				...CampusResidencesDialog.data,
			});
		}

		/**
		 * Dialog type: 'new'
		 */
		if (CampusResidencesDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...CampusResidencesDialog.data,
			});
		}
	}, [CampusResidencesDialog.data, CampusResidencesDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (CampusResidencesDialog.props.open) {
			initDialog();
		}
		return () => {
			setForm(null);
			defaultFormState = {
				category: 'null',
				nom: '',
				adresse: '',
				nbr_lits: 0,
			};
			setSelectedCategory('null');
		};
	}, [CampusResidencesDialog.props.open, initDialog, setForm]);

	function closeComposeDialog() {
		CampusResidencesDialog.type === 'edit'
			? dispatch(Actions.closeEditCampusResidencesDialog())
			: dispatch(Actions.closeNewCampusResidencesDialog());
	}

	function canBeSubmitted() {
		if (form.category === 'residence') {
			return form.nom.length > 0 && selectedCategory !== 'null' && form.nbr_lits > 0 && form.adresse.length > 0;
		} else {
			return form.nom.length > 0 && selectedCategory !== 'null' && form.adresse.length > 0;
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		let obj = null;

		if (form.category === 'campus') {
			obj = {
				nom: form.nom,
				adresse: form.adresse,
			};
		} else {
			obj = {
				nom: form.nom,
				adresse: form.adresse,
				nbr_lits: parseFloat(form.nbr_lits),
			};
		}

		switch (true) {
			case CampusResidencesDialog.type === 'new' && selectedCategory === 'campus':
				dispatch(Actions.addCampus(obj));
				break;
			case CampusResidencesDialog.type === 'new' && selectedCategory === 'residences':
				dispatch(Actions.addResidence(obj));
				break;
			case CampusResidencesDialog.type === 'edit' && selectedCategory === 'campus':
				dispatch(Actions.updateCampus({ ...obj, id_campus: form.id_campus }));
				break;
			case CampusResidencesDialog.type === 'edit' && selectedCategory === 'residences':
				dispatch(Actions.updateResidence({ ...obj, id_residence: form.id_residence }));
				break;
			default:
				break;
		}
		closeComposeDialog();
	}

	function handleRemove() {
		if (form.category === 'campus') {
			dispatch(Actions.removeCampus(form.id_campus));
		} else {
			dispatch(Actions.removeResidence(form.id_residence));
		}
		closeComposeDialog();
	}

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		form !== null && (
			<React.Fragment>
				<Dialog
					classes={{
						paper: 'm-24',
					}}
					{...CampusResidencesDialog.props}
					onClose={closeComposeDialog}
					fullWidth
					maxWidth='xs'
				>
					<AppBar position='static' elevation={1}>
						<Toolbar className='flex w-full'>
							<Typography variant='subtitle1' color='inherit'>
								{CampusResidencesDialog.type === 'new'
									? 'Nouveau Campus/Résidence'
									: 'Modifier un Campus/Résidence'}
							</Typography>
						</Toolbar>
						<div className='flex flex-col items-center justify-center pb-24'>
							<Typography variant='h6' color='inherit' className='pt-8'>
								{form.nom}
							</Typography>
						</div>
					</AppBar>
					<form noValidate onSubmit={handleSubmit} className='flex flex-col overflow-hidden'>
						<DialogContent classes={{ root: 'pt-24 pb-0 px-24' }}>
							<FormControl className='flex mb-24' variant='outlined'>
								<InputLabel htmlFor='category-label-placeholder'>Catégorie</InputLabel>
								<Select
									value={selectedCategory}
									onChange={handleSelectedCategory}
									disabled={CampusResidencesDialog.type === 'edit'}
									input={
										<OutlinedInput
											labelWidth={'category'.length * 9}
											name='category'
											id='category-label-placeholder'
										/>
									}
								>
									<MenuItem value='null'>
										<em>Selectionner une catégorie</em>
									</MenuItem>

									{categories.map((category) => (
										<MenuItem value={category.value} key={category.id}>
											{category.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{selectedCategory === 'campus' && (
								<React.Fragment>
									<div className='flex'>
										<TextField
											className='mb-24'
											label='Nom'
											autoFocus
											id='nom'
											name='nom'
											value={form.nom}
											onChange={handleChange}
											variant='outlined'
											required
											fullWidth
										/>
									</div>
									<div className='flex'>
										<TextField
											className='mb-24'
											label='Adresse'
											autoFocus
											id='adresse'
											name='adresse'
											value={form.adresse}
											onChange={handleChange}
											variant='outlined'
											required
											fullWidth
										/>
									</div>
								</React.Fragment>
							)}
							{selectedCategory === 'residences' && (
								<React.Fragment>
									<div className='flex'>
										<TextField
											className='mb-24'
											label='Nom'
											autoFocus
											id='nom'
											name='nom'
											value={form.nom}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											required
										/>
									</div>

									<div className='flex'>
										<TextField
											className='mb-24'
											label='Adresse'
											autoFocus
											id='adresse'
											name='adresse'
											value={form.adresse}
											onChange={handleChange}
											variant='outlined'
											required
											fullWidth
										/>
									</div>

									<div className='flex'>
										<div className='min-w-48 pt-20'>
											<Icon color='action'>bar_chart</Icon>
										</div>
										<TextField
											className='mb-24'
											label='Nbr. Lits'
											id='nbr_lits'
											name='nbr_lits'
											variant='outlined'
											type='number'
											value={form.nbr_lits !== 0 ? parseFloat(form.nbr_lits) : null}
											onChange={handleChange}
											fullWidth
										/>
									</div>
								</React.Fragment>
							)}
						</DialogContent>
						<DialogActions className='justify-right pt-0 pb-24 pr-24'>
							{CampusResidencesDialog.type === 'new' ? (
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
							Cette action est irréversible, voulez-vous vraiment supprimer ce campus/résidence?
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

export default CampusResidencesDialog;
