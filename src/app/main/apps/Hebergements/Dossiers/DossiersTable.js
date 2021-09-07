import React, { useEffect, useState } from 'react';
import {
	Icon,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Typography,
	DialogContentText,
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import DossiersTableHead from './DossiersTableHead';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { apiUrl } from 'app/defaultValues';

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(({ hebergements }) => hebergements.dossiers.data);
	const residences = useSelector(({ hebergements }) => hebergements.dossier.residences);
	const searchText = useSelector(({ hebergements }) => hebergements.dossiers.searchText);

	const [open, setOpen] = useState(false);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null,
	});

	useEffect(() => {
		dispatch(Actions.getDossiers());
		dispatch(Actions.getResidences());
	}, [dispatch]);

	useEffect(() => {
		setData(
			searchText.length === 0
				? products
				: _.filter(products, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}, [products, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id,
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map((n) => n.id_dossier));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push('/hebergements/dossiers/' + item.id_dossier);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, page) {
		setPage(page);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	function handleDeleteClick() {
		dispatch(Actions.deleteDossiers(selected))
			.then((r) => {
				dispatch(Actions.getDossiers());
				handleClose();
			})
			.catch((err) => console.log(err));
	}

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	return (
		<div className='w-full flex flex-col'>
			<FuseScrollbars className='flex-grow overflow-x-auto'>
				<Table className='min-w-xl' aria-labelledby='tableTitle'>
					<DossiersTableHead
						handleClickOpen={handleClickOpen}
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								(o) => {
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								},
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n) => {
								const selected_res = _.find(residences, (o) => o.id_camp_res === n.selected_res);
								const isSelected = selected.indexOf(n.id_dossier) !== -1;
								return (
									<TableRow
										className='h-64 cursor-pointer'
										hover
										role='checkbox'
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id_dossier}
										selected={isSelected}
										onClick={(event) => handleClick(n)}
									>
										<TableCell className='w-48 px-4 sm:px-12' padding='checkbox'>
											<Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.id_dossier)}
											/>
										</TableCell>

										<TableCell className='w-52' component='th' scope='row' padding='none'>
											<img
												className='w-full block rounded'
												style={{ width: 48, height: 48 }}
												src={apiUrl + 'hebergements/images/' + n.id_dossier + '/' + n.photo_id}
												alt='photo_id'
											/>
										</TableCell>

										<TableCell component='th' scope='row'>
											{n.nom.toUpperCase()}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.prenom.slice(0, 1).toUpperCase() + n.prenom.slice(1)}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.n_etudiant}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.n_tel}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.email}
										</TableCell>
										<TableCell component='th' scope='row'>
											{selected_res && selected_res.nom}
										</TableCell>
										<TableCell component='th' scope='row'>
											{moment(n.date_depot).format('YYYY/MM/DD')}
										</TableCell>

										<TableCell component='th' scope='row'>
											{n.archived ? (
												n.accepted ? (
													<Icon className='text-green text-20 ml-28'>check_circle</Icon>
												) : (
													<Icon className='text-red text-20 ml-28'>remove_circle</Icon>
												)
											) : (
												<Icon className='text-orange text-20 ml-28'>warning</Icon>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				component='div'
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
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
						{selected.length > 1
							? 'Cette action est irréversible, voulez-vous vraiment supprimer ces dossiers?'
							: 'Cette action est irréversible, voulez-vous vraiment supprimer ce dossier?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions className='pr-24 pb-24'>
					<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
						Annuler
					</Button>
					<Button
						onClick={() => {
							handleDeleteClick();
						}}
						variant='contained'
						color='secondary'
					>
						Supprimer
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withRouter(ProductsTable);
