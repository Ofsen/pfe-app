import React, { useState } from 'react';
import {
	TableHead,
	TableSortLabel,
	TableCell,
	TableRow,
	Checkbox,
	Tooltip,
	IconButton,
	Icon,
	Menu,
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const rows = [
	{
		id: 'image',
		align: 'left',
		disablePadding: true,
		label: '',
		sort: false,
	},
	{
		id: 'nom',
		align: 'left',
		disablePadding: false,
		label: 'Nom',
		sort: true,
	},
	{
		id: 'prenom',
		align: 'left',
		disablePadding: false,
		label: 'Prénom',
		sort: true,
	},
	{
		id: 'n_etudiant',
		align: 'left',
		disablePadding: false,
		label: 'N° Etudiant',
		sort: true,
	},
	{
		id: 'n_tel',
		align: 'left',
		disablePadding: false,
		label: 'N° Téléphone',
		sort: true,
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true,
	},
	{
		id: 'date_depot',
		align: 'left',
		disablePadding: false,
		label: 'Date Dépot',
		sort: true,
	},
	{
		id: 'accepted',
		align: 'center',
		disablePadding: false,
		label: 'Accepté',
		sort: true,
	},
];

const useStyles = makeStyles((theme) => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper,
	},
}));

function DossiersBourseTableHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	const createSortHandler = (property) => (event) => {
		props.onRequestSort(event, property);
	};

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className='h-64'>
				<TableCell padding='checkbox' className='relative pl-4 sm:pl-12'>
					<Checkbox
						indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
						checked={props.numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{props.numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
								aria-haspopup='true'
								onClick={openSelectedProductsMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id='selectedProductsMenu'
								anchorEl={selectedProductsMenu}
								open={Boolean(selectedProductsMenu)}
								onClose={closeSelectedProductsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											props.handleClickOpen();
											closeSelectedProductsMenu();
										}}
									>
										<ListItemIcon className='min-w-40'>
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary='Supprimer' />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
				{rows.map((row) => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title='Sort'
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default DossiersBourseTableHead;
