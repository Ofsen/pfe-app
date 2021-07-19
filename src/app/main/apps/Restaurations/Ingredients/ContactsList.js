import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ ingredients }) => ingredients.ingredients.entities);
	const selectedIngredientIds = useSelector(({ ingredients }) => ingredients.ingredients.selectedIngredientIds);
	const searchText = useSelector(({ ingredients }) => ingredients.ingredients.searchText);

	const [filteredData, setFilteredData] = useState(null);

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
						width: 128,
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
						Header: () =>
							selectedIngredientIds.length > 0 && (
								<div className='flex items-center'>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											dispatch(Actions.removeContacts(selectedIngredientIds));
										}}
									>
										<Icon color='error'>delete</Icon>
									</IconButton>
								</div>
							),
						width: 64,
						sortable: false,
						Cell: (row) => (
							<div className='flex items-center'>
								<IconButton
									onClick={(ev) => {
										ev.stopPropagation();
										dispatch(Actions.removeContact(row.original.id_ingredient));
									}}
								>
									<Icon>delete</Icon>
								</IconButton>
							</div>
						),
					},
				]}
				defaultPageSize={10}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;
