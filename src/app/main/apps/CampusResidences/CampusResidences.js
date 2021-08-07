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
	Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import _ from '@lodash';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CampusResidencesDialog from './CampusResidencesDialog';
import { blue, blueGrey } from '@material-ui/core/colors';

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

function CampusResidences(props) {
	const dispatch = useDispatch();
	const courses = useSelector(({ campusResidences }) => campusResidences.campusresidencesReducer.data);
	const categories = [
		{
			id: 0,
			value: 'campus',
			label: 'Campus',
			color: blue[500],
		},
		{
			id: 1,
			value: 'residences',
			label: 'Residences',
			color: blueGrey[500],
		},
	];

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		dispatch(Actions.getCampusResidences());
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
						Liste des Campus & Résidences Universitaires
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Button
						onClick={(ev) => dispatch(Actions.openNewCampusResidencesDialog())}
						className='whitespace-no-wrap'
						variant='contained'
						color='secondary'
					>
						<span className='hidden sm:flex'>Ajouter</span>
						<Icon className='flex sm:hidden'>plus_one</Icon>
					</Button>
				</FuseAnimate>

				<Icon className={classes.headerIcon}>business</Icon>
			</div>

			<div className='flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24'>
				<div className='flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24'>
					<TextField
						label='Rechercher un campus ou une résidence'
						placeholder='Recherche...'
						className='flex w-full sm:w-320 mb-16 sm:mb-0 mx-16'
						value={searchText}
						inputProps={{
							'aria-label': 'Rechercher un campus ou une résidence',
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
								<em>Campus & Residences</em>
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
												onClick={() => dispatch(Actions.openEditCampusResidencesDialog(course))}
											>
												<div
													className='flex flex-shrink-0 items-center justify-between px-24 h-64'
													style={{
														background: category.color,
														color: theme.palette.getContrastText(category.color),
													}}
												>
													<Typography className='font-medium truncate' color='inherit'>
														{course.nom}
													</Typography>
												</div>
												<CardContent className='flex flex-col flex-auto items-center justify-center'>
													<Typography className='text-center text-16 font-400'>
														Adresse: <b>{course.adresse}</b>
													</Typography>
												</CardContent>
												{course.category === 'residences' && (
													<React.Fragment>
														<Divider />
														<Typography
															className='text-center text-13 font-600 mt-4 p-12'
															color='textSecondary'
														>
															{course.nbr_lits} Lits
														</Typography>
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
									Aucun campus/résidence trouvé
								</Typography>
							</div>
						)),
					[categories, filteredData, theme.palette, dispatch]
				)}
			</div>
			<CampusResidencesDialog />
		</div>
	);
}

export default withReducer('campusResidences', reducer)(CampusResidences);
