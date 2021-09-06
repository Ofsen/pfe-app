import React, { useEffect, useState } from 'react';
import {
	Checkbox,
	Icon,
	IconButton,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';
import * as Messages from 'app/store/actions';

function UsersList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ usersApp }) => usersApp.usersReducer.entities);
	const selectedUserIds = useSelector(({ usersApp }) => usersApp.usersReducer.selectedUserIds);
	const searchText = useSelector(({ usersApp }) => usersApp.usersReducer.searchText);

	const [filteredData, setFilteredData] = useState(null);
	const [open, setOpen] = useState(false);
	const [ingrToDelete, setIngrToDelete] = useState(null);

	const handleClickOpen = (id = null) => {
		if (id !== null) {
			setIngrToDelete(id);
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		function getFilteredArray(entities, searchText) {
			const arr = Object.keys(entities).map((id) => entities[id]);
			if (searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className='flex flex-1 items-center justify-center h-full'>
				<Typography color='textSecondary' variant='h5'>
					Liste vide
				</Typography>
			</div>
		);
	}

	return (
		<React.Fragment>
			<FuseAnimate animation='transition.slideUpIn' delay={300}>
				<ReactTable
					className='-striped -highlight h-full sm:rounded-16 overflow-hidden'
					getTrProps={(state, rowInfo, column) => {
						return {
							className: 'cursor-pointer',
							onClick: (e, handleOriginal) => {
								if (rowInfo) {
									dispatch(Actions.openEditUserDialog(rowInfo.original));
								}
							},
						};
					}}
					previousText='Précedent'
					nextText='Suivant'
					loadingText='Chargement...'
					pageText='Page'
					ofText='/'
					rowsText='lignes'
					pageJumpText='aller a la page'
					rowsSelectorText='lignes par page'
					noDataText='Aucun utilisateur trouvé'
					data={filteredData}
					columns={[
						{
							Header: () => (
								<Checkbox
									onClick={(event) => {
										event.stopPropagation();
									}}
									onChange={(event) => {
										event.target.checked
											? dispatch(Actions.selectAllUsers())
											: dispatch(Actions.deSelectAllUsers());
									}}
									checked={
										selectedUserIds.length === Object.keys(contacts).length && selectedUserIds.length > 0
									}
									indeterminate={
										selectedUserIds.length !== Object.keys(contacts).length && selectedUserIds.length > 0
									}
								/>
							),
							accessor: '',
							Cell: (row) => {
								return (
									<Checkbox
										onClick={(event) => {
											event.stopPropagation();
										}}
										checked={selectedUserIds.includes(row.value.id_user)}
										onChange={() => dispatch(Actions.toggleInSelectedUsers(row.value.id_user))}
									/>
								);
							},
							className: 'justify-center',
							sortable: false,
							width: 64,
						},
						{
							Header: 'E-mail',
							accessor: 'email',
							filterable: true,
						},
						{
							Header: 'Nom',
							accessor: 'displayName',
							filterable: true,
							className: 'font-bold',
						},
						{
							Header: 'Rôle',
							accessor: 'role',
							width: 128,
							filterable: true,
						},
						{
							Header: () => (
								<div className='flex items-center'>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											if (selectedUserIds.length > 0) {
												handleClickOpen();
											} else {
												dispatch(
													Messages.showMessage({
														message: 'Aucun ingrédient selectionnée',
														autoHideDuration: 6000,
														anchorOrigin: {
															vertical: 'bottom',
															horizontal: 'center',
														},
														variant: 'warning',
													})
												);
											}
										}}
									>
										<Icon color='error'>delete_sweep</Icon>
									</IconButton>
								</div>
							),
							width: 64,
							sortable: false,
							className: 'justify-center',
							Cell: (row) => (
								<div className='flex items-center'>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											handleClickOpen(row.original.id_user);
										}}
									>
										<Icon color='error'>delete</Icon>
									</IconButton>
								</div>
							),
						},
					]}
					defaultPageSize={10}
				/>
			</FuseAnimate>
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
						{selectedUserIds.length > 1
							? 'Cette action est irréversible, voulez-vous vraiment supprimer ces utilisateurs?'
							: 'Cette action est irréversible, voulez-vous vraiment supprimer cette utilisateur?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							if (ingrToDelete !== null) {
								dispatch(Actions.removeUser(ingrToDelete));
							} else {
								dispatch(Actions.removeUsers(selectedUserIds));
							}
							setIngrToDelete(null);
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

export default UsersList;
