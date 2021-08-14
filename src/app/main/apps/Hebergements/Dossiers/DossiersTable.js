import React, { useEffect, useState } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import DossiersTableHead from './DossiersTableHead';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(({ hebergements }) => hebergements.dossiers.data);
	const searchText = useSelector(({ hebergements }) => hebergements.dossiers.searchText);

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

	return (
		<div className='w-full flex flex-col'>
			<FuseScrollbars className='flex-grow overflow-x-auto'>
				<Table className='min-w-xl' aria-labelledby='tableTitle'>
					<DossiersTableHead
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
								console.log(n);
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
											{n.photo_id ? (
												<img
													className='w-full block rounded'
													src={n.photo_id.url}
													alt={n.photo_id.name}
												/>
											) : (
												<img
													className='w-full block rounded'
													src='assets/images/ecommerce/product-image-placeholder.png'
													alt={n.photo_id.name}
												/>
											)}
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
		</div>
	);
}

export default withRouter(ProductsTable);
