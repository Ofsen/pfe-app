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

function BusList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ transports }) => transports.bus.entities);
	const selectedBusIds = useSelector(({ transports }) => transports.bus.selectedBusIds);
	const searchText = useSelector(({ transports }) => transports.bus.searchText);

	const [filteredData, setFilteredData] = useState(null);
	const [open, setOpen] = useState(false);
	const [busToDelete, setBusToDelete] = useState(null);

	const handleClickOpen = (id = null) => {
		if (id !== null) {
			setBusToDelete(id);
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
									dispatch(Actions.openEditBusDialog(rowInfo.original));
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
					noDataText='Aucun bus trouvé'
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
											? dispatch(Actions.selectAllBus())
											: dispatch(Actions.deSelectAllBus());
									}}
									checked={
										selectedBusIds.length === Object.keys(contacts).length && selectedBusIds.length > 0
									}
									indeterminate={
										selectedBusIds.length !== Object.keys(contacts).length && selectedBusIds.length > 0
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
										checked={selectedBusIds.includes(row.value.id_bus)}
										onChange={() => dispatch(Actions.toggleInBus(row.value.id_bus))}
									/>
								);
							},
							className: 'justify-center',
							sortable: false,
							width: 64,
						},
						{
							Header: 'Matricule',
							accessor: 'matricule',
							filterable: true,
							className: 'font-bold',
							width: 200,
						},
						{
							Header: 'Adresse de départ',
							accessor: 'adr_depart',
							filterable: true,
						},
						{
							Header: "Adresse d'arrivé",
							accessor: 'adr_arrivee',
							filterable: true,
						},
						{
							Header: 'Actif',
							accessor: 'actif',
							className: 'justify-center',
							width: 128,
							Cell: (row) =>
								row.row.actif ? (
									<Icon className='text-green text-20'>check_circle</Icon>
								) : (
									<Icon className='text-red text-20'>remove_circle</Icon>
								),
						},
						{
							Header: () => (
								<div className='flex items-center'>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											if (selectedBusIds.length > 0) {
												handleClickOpen();
											} else {
												dispatch(
													Messages.showMessage({
														message: 'Aucun Bus selectionnée',
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
											handleClickOpen(row.original.id_bus);
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
						{selectedBusIds.length > 1
							? 'Cette action est irréversible, voulez-vous vraiment supprimer ces bus?'
							: 'Cette action est irréversible, voulez-vous vraiment supprimer ce bus?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							if (busToDelete !== null) {
								dispatch(Actions.removeBus(busToDelete));
							} else {
								dispatch(Actions.removeMultipleBus(selectedBusIds));
							}
							setBusToDelete(null);
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

export default BusList;
