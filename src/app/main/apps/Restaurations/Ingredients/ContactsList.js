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
import * as Actions from '../store/actions';
import * as Messages from 'app/store/actions';

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ ingredients }) => ingredients.ingredientsReducer.entities);
	const selectedIngredientIds = useSelector(({ ingredients }) => ingredients.ingredientsReducer.selectedIngredientIds);
	const searchText = useSelector(({ ingredients }) => ingredients.ingredientsReducer.searchText);

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
									dispatch(Actions.openEditContactDialog(rowInfo.original));
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
					noDataText='Aucun ingredient trouvé'
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
											? dispatch(Actions.selectAllContacts())
											: dispatch(Actions.deSelectAllContacts());
									}}
									checked={
										selectedIngredientIds.length === Object.keys(contacts).length &&
										selectedIngredientIds.length > 0
									}
									indeterminate={
										selectedIngredientIds.length !== Object.keys(contacts).length &&
										selectedIngredientIds.length > 0
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
										checked={selectedIngredientIds.includes(row.value.id_ingredient)}
										onChange={() => dispatch(Actions.toggleInSelectedContacts(row.value.id_ingredient))}
									/>
								);
							},
							className: 'justify-center',
							sortable: false,
							width: 64,
						},
						{
							Header: 'Nom',
							accessor: 'nom',
							filterable: true,
							className: 'font-bold',
						},
						{
							Header: 'Prix',
							accessor: 'prix',
							width: 128,
							filterable: true,
						},
						{
							Header: 'Qte. stock',
							accessor: 'qte_stock',
							width: 128,
							filterable: true,
						},
						{
							Header: () => (
								<div className='flex items-center'>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											if (selectedIngredientIds.length > 0) {
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
											handleClickOpen(row.original.id_ingredient);
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
						{selectedIngredientIds.length > 1
							? 'Cette action est irréversible, voulez-vous vraiment supprimer ces ingrédients?'
							: 'Cette action est irréversible, voulez-vous vraiment supprimer cette ingrédient?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							if (ingrToDelete !== null) {
								dispatch(Actions.removeContact(ingrToDelete));
							} else {
								dispatch(Actions.removeContacts(selectedIngredientIds));
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

export default ContactsList;
