import React, { useEffect, useMemo, useState } from 'react';
import {
	Button,
	Card,
	CardContent,
	OutlinedInput,
	Icon,
	TextField,
	Typography,
	Select,
	InputLabel,
	FormControl,
	MenuItem,
	CardActions,
	Divider,
	Chip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import _ from '@lodash';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import PlatDessertDialog from './PlatDessertDialog';
import { blue, blueGrey } from '@material-ui/core/colors';
import { authRoles } from 'app/auth';

const useStyles = makeStyles((theme) => ({
	header: {
		background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
		color: theme.palette.getContrastText(theme.palette.primary.main),
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none',
	},
}));

function Menus(props) {
	const dispatch = useDispatch();
	const userRole = useSelector(({ auth }) => auth.user.role);
	const courses = useSelector(({ restauration }) => restauration.platsDessertsReducer.data);
	const categories = [
		{
			id: 0,
			value: 'plats',
			label: 'Plats',
			color: blue[500],
		},
		{
			id: 1,
			value: 'desserts',
			label: 'Desserts',
			color: blueGrey[500],
		},
	];

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		dispatch(Actions.getPlatsDesserts());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedCategory === 'all') {
				return courses;
			}

			return _.filter(courses, (item) => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}
				return item.nom.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, searchText, selectedCategory]);

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	if (!FuseUtils.hasPermission(authRoles.staff, userRole)) window.location.replace('/');

	return (
		<div className='flex flex-col flex-1 w-full'>
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-row flex-shrink-0 items-center justify-between text-center p-16 sm:p-24 h-200'
				)}
			>
				<FuseAnimate animation='transition.slideUpIn' duration={400} delay={100}>
					<Typography color='inherit' className='text-24 sm:text-40 font-light'>
						Liste des Plats & Desserts
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Button
						onClick={(ev) => dispatch(Actions.openNewPlatsDessertsDialog())}
						className='whitespace-no-wrap'
						variant='contained'
						color='secondary'
					>
						<span className='hidden sm:flex'>Ajouter</span>
						<Icon className='flex sm:hidden'>plus_one</Icon>
					</Button>
				</FuseAnimate>

				<Icon className={classes.headerIcon}>fastfood</Icon>
			</div>

			<div className='flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24'>
				<div className='flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24'>
					<TextField
						label='Rechercher un plat ou dessert'
						placeholder='Recherche...'
						className='flex w-full sm:w-320 mb-16 sm:mb-0 mx-16'
						value={searchText}
						inputProps={{
							'aria-label': 'Search',
						}}
						onChange={handleSearchText}
						variant='outlined'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<FormControl className='flex w-full sm:w-320 mx-16' variant='outlined'>
						<InputLabel htmlFor='category-label-placeholder'>Categories</InputLabel>
						<Select
							value={selectedCategory}
							onChange={handleSelectedCategory}
							input={
								<OutlinedInput
									labelWidth={'category'.length * 9}
									name='category'
									id='category-label-placeholder'
								/>
							}
						>
							<MenuItem value='all'>
								<em>Plats & desserts</em>
							</MenuItem>

							{categories.map((category) => (
								<MenuItem value={category.value} key={category.id}>
									{category.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				{useMemo(
					() =>
						filteredData &&
						(filteredData.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn',
								}}
								className='flex flex-wrap py-24'
							>
								{filteredData.map((course, index) => {
									const category = categories.find((_cat) => _cat.value === course.category);
									return (
										<div className='w-full pb-24 sm:w-1/2 lg:w-1/4 sm:p-16' key={index}>
											<Card
												elevation={1}
												className='flex flex-col h-full cursor-pointer'
												onClick={() => dispatch(Actions.openEditPlatsDessertsDialog(course))}
											>
												<div
													className='flex flex-shrink-0 items-center justify-between px-24 h-64'
													style={{
														background: category.color,
														color: theme.palette.getContrastText(category.color),
													}}
												>
													<Typography className='font-medium truncate' color='inherit'>
														{category.label}
													</Typography>
													<div className='flex items-center justify-center opacity-75'>
														<div className='text-16 whitespace-no-wrap'>{course.prix} DA</div>
													</div>
												</div>
												<CardContent className='flex flex-col flex-auto items-center justify-center'>
													<Typography className='text-center text-16 font-400'>
														{course.nom}
													</Typography>
													<Typography
														className='text-center text-13 font-600 mt-4'
														color='textSecondary'
													>
														{course.description}
													</Typography>
												</CardContent>
												{course.category === 'plats' && (
													<React.Fragment>
														<Divider />
														{course.ingredients !== null && (
															<CardActions className='justify-center flex-wrap'>
																{course.ingredients.map((i, index) => (
																	<Chip
																		key={index}
																		label={i.nom + ' x ' + i.quantite}
																		className='m-4'
																	/>
																))}
															</CardActions>
														)}
													</React.Fragment>
												)}
											</Card>
										</div>
									);
								})}
							</FuseAnimateGroup>
						) : (
							<div className='flex flex-1 items-center justify-center'>
								<Typography color='textSecondary' className='text-24 my-24'>
									Aucun plat/dessert trouvé
								</Typography>
							</div>
						)),
					[categories, filteredData, theme.palette, dispatch]
				)}
			</div>
			<PlatDessertDialog />
		</div>
	);
}

export default withReducer('restauration', reducer)(Menus);
