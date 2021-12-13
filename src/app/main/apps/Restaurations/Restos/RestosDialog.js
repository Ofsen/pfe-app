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
import * as Actions from '../store/actions';

var defaultFormState = {
	id_camp_res: 'null',
	nom: '',
};

function RestosDialog() {
	const dispatch = useDispatch();
	const restosDialog = useSelector(({ restauration }) => restauration.restosReducer.restosDialog);
	const categories = useSelector(({ restauration }) => restauration.restosReducer.categories);

	const [selectedCategory, setSelectedCategory] = useState('null');

	const [open, setOpen] = useState(false);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (restosDialog.type === 'edit' && restosDialog.data) {
			setSelectedCategory(restosDialog.data.id_camp_res);
			setForm({
				...restosDialog.data,
			});
		}

		/**
		 * Dialog type: 'new'
		 */
		if (restosDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...restosDialog.data,
			});
		}
		dispatch(Actions.getCatCampusResidences());
	}, [restosDialog.data, restosDialog.type, setForm, dispatch]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (restosDialog.props.open) {
			initDialog();
		}
		return () => {
			setForm(null);
			defaultFormState = {
				id_camp_res: 'null',
				nom: '',
			};
			setSelectedCategory('null');
		};
	}, [restosDialog.props.open, initDialog, setForm]);

	function closeComposeDialog() {
		restosDialog.type === 'edit' ? dispatch(Actions.closeEditRestosDialog()) : dispatch(Actions.closeNewRestosDialog());
	}

	function canBeSubmitted() {
		if (form.id_camp_res === 'plats') {
			return form.nom.length > 0 && selectedCategory !== 'null';
		} else {
			return form.nom.length > 0 && selectedCategory !== 'null';
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		const obj = {
			nom: form.nom,
			id_camp_res: selectedCategory,
		};

		switch (true) {
			case restosDialog.type === 'new' && selectedCategory !== 'null':
				dispatch(Actions.addResto(obj));
				break;
			case restosDialog.type === 'edit' && form.id_camp_res !== 'null':
				dispatch(Actions.updateResto({ ...obj, id_restaurant: form.id_restaurant }));
				break;
			default:
				break;
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeResto(form.id_restaurant));
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
					{...restosDialog.props}
					onClose={closeComposeDialog}
					fullWidth
					maxWidth='xs'
				>
					<AppBar position='static' elevation={1}>
						<Toolbar className='flex w-full'>
							<Typography variant='subtitle1' color='inherit'>
								{restosDialog.type === 'new' ? 'Nouveau Réstaurant' : 'Modifier un Réstaurant'}
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
								<InputLabel htmlFor='category-label-placeholder'>Campus/Résidence</InputLabel>
								<Select
									value={selectedCategory}
									onChange={handleSelectedCategory}
									disabled={restosDialog.type === 'edit'}
									input={
										<OutlinedInput
											labelWidth={'Campus/Résidence'.length * 8}
											name='category'
											id='category-label-placeholder'
										/>
									}
								>
									<MenuItem value='null'>
										<em>Selectionner un Campus/Résidence</em>
									</MenuItem>

									{categories.map((category) => (
										<MenuItem value={category.value} key={category.id}>
											{category.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{selectedCategory !== 'null' && (
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
								</React.Fragment>
							)}
						</DialogContent>
						<DialogActions className='justify-right pt-0 pb-24 pr-24'>
							{restosDialog.type === 'new' ? (
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
							Cette action est irréversible, voulez-vous vraiment supprimer ce réstaurant?
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

export default RestosDialog;
