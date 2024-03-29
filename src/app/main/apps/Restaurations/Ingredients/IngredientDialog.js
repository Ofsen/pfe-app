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
	InputAdornment,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
	nom: '',
	prix: '',
	qte_stock: '',
};

function IngredientDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ restauration }) => restauration.ingredientsReducer.ingredientDialog);

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
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		contactDialog.type === 'edit' ? dispatch(Actions.closeEditContactDialog()) : dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.nom.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(Actions.addContact(form));
		} else {
			dispatch(Actions.updateContact(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id_ingredient));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24',
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth='xs'
		>
			<AppBar position='static' elevation={1}>
				<Toolbar className='flex w-full'>
					<Typography variant='subtitle1' color='inherit'>
						{contactDialog.type === 'new' ? 'Nouvelle Ingredient' : 'Modifier un Ingredient'}
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
						<div className='min-w-48 pt-20'>
							<Icon color='action'>attach_money</Icon>
						</div>
						<TextField
							className='mb-24'
							label='Prix'
							id='prix'
							name='prix'
							value={form.prix}
							onChange={handleChange}
							variant='outlined'
							InputProps={{
								endAdornment: <InputAdornment position='end'> DA</InputAdornment>,
							}}
							fullWidth
						/>
					</div>

					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>insert_chart</Icon>
						</div>
						<TextField
							className='mb-24'
							label='Qte. stock'
							id='qte_stock'
							name='qte_stock'
							value={form.qte_stock}
							onChange={handleChange}
							variant='outlined'
							InputProps={{
								endAdornment: <InputAdornment position='end'>Kg</InputAdornment>,
							}}
							fullWidth
						/>
					</div>
				</DialogContent>
				<DialogActions className='justify-right pt-0 pb-24 pr-24'>
					{contactDialog.type === 'new' ? (
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
						Cette action est irréversible, voulez-vous vraiment supprimer cette ingrédient?
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

export default IngredientDialog;
