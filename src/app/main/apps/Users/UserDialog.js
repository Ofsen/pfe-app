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
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	MenuItem,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
	email: '',
	password: '',
	password2: '',
	displayName: '',
	role: null,
};

const roles = ['admin', 'staff'];

function UserDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ usersApp }) => usersApp.usersReducer.userDialog);

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
		contactDialog.type === 'edit' ? dispatch(Actions.closeEditUserDialog()) : dispatch(Actions.closeNewUserDialog());
	}

	function canBeSubmitted() {
		if (form.email && form.displayName && form.role && form.password) {
			return (
				form.email.length > 0 &&
				form.displayName.length > 0 &&
				form.role !== null &&
				form.password.length > 3 &&
				form.password === form.password2
			);
		}
		return false;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(Actions.addUser(form));
		} else {
			dispatch(Actions.updateUser(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeUser(form.id_user));
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
						{contactDialog.type === 'new' ? 'Nouvelle Utilisateur' : 'Modifier un Utilisateur'}
					</Typography>
				</Toolbar>
				<div className='flex flex-col items-center justify-center pb-24'>
					<Typography variant='h6' color='inherit' className='pt-8'>
						{form.displayName}
					</Typography>
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className='flex flex-col overflow-hidden'>
				<DialogContent classes={{ root: 'pt-24 pb-0 px-24' }}>
					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>alternate_email</Icon>
						</div>
						<TextField
							className='mb-24'
							label='E-mail'
							autoFocus
							id='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							variant='outlined'
							required
							fullWidth
						/>
					</div>

					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>person</Icon>
						</div>
						<TextField
							className='mb-24'
							label='Nom'
							id='displayName'
							name='displayName'
							value={form.displayName}
							onChange={handleChange}
							variant='outlined'
							fullWidth
						/>
					</div>

					<div className='flex'>
						<div className='min-w-48 pt-20'>
							<Icon color='action'>lock</Icon>
						</div>
						<TextField
							className='mb-24'
							label='Mot de passe'
							id='password'
							name='password'
							type='password'
							value={form.password}
							onChange={handleChange}
							variant='outlined'
							fullWidth
						/>
					</div>
					<div className='flex'>
						<TextField
							className='mb-24'
							label='Mot de passe (Confirmation)'
							id='password2'
							name='password2'
							type='password'
							value={form.password2}
							onChange={handleChange}
							variant='outlined'
							fullWidth
						/>
					</div>

					<FormControl className='flex mb-24' variant='outlined'>
						<InputLabel htmlFor='category-label-placeholder'>Rôle</InputLabel>
						<Select
							value={form.role}
							onChange={handleChange}
							input={<OutlinedInput labelWidth={'role'.length * 7.5} name='role' id='role-label-placeholder' />}
						>
							<MenuItem value={null}>
								<em>Selectionner un rôle</em>
							</MenuItem>

							{roles.map((role, i) => (
								<MenuItem value={role} key={i}>
									{role}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
						Cette action est irréversible, voulez-vous vraiment supprimer cette utilisateur?
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

export default UserDialog;
