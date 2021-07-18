import React, { useEffect, useState } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import ProductsTableHead from './ProductsTableHead';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(({ bus }) => bus.products.data);
	const searchText = useSelector(({ bus }) => bus.products.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null,
	});

	useEffect(() => {
		dispatch(Actions.getBus());
	}, [dispatch]);

	useEffect(() => {
		setData(
			searchText.length === 0
				? products
				: _.filter(products, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}, [products, searchText]);

	console.log(products);

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
			setSelected(data.map((n) => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push('/bus/' + item.id + '/' + item.matricule);
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
					<ProductsTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(data, (o) => o[order.id], [order.direction])
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n, i) => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										key={i}
										className='h-64 cursor-pointer'
										hover
										role='checkbox'
										aria-checked={isSelected}
										tabIndex={-1}
										selected={isSelected}
										onClick={(event) => handleClick(n)}
									>
										<TableCell className='w-48 px-4 sm:px-12' padding='checkbox'>
											<Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell component='th' scope='row'>
											{n.matricule}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.depart.label}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.arrivee.label}
										</TableCell>

										<TableCell component='th' scope='row' align='right'>
											{n.active ? (
												<Icon className='text-green text-20'>check_circle</Icon>
											) : (
												<Icon className='text-red text-20'>remove_circle</Icon>
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
					'aria-label': 'Page Précedente',
				}}
				nextIconButtonProps={{
					'aria-label': 'Page Suivante',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ProductsTable);
