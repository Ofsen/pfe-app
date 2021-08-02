import React, { useEffect, useCallback, useState } from 'react';
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Icon,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	InputAdornment,
	Select,
	InputLabel,
	FormControl,
	OutlinedInput,
	MenuItem,
	DialogTitle,
	DialogContentText,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { FuseChipSelect } from '@fuse';
import _ from '@lodash';
import * as Actions from '../store/actions';
import { blue, blueGrey } from '@material-ui/core/colors';

var defaultFormState = {
	category: 'null',
	nom: '',
	prix: 0,
	ingredients: [{ index: 'ingredient-0' }],
	quantite: 0,
	description: '',
};

function PlatDessertDialog() {
	const dispatch = useDispatch();
	const platsDessertsDialog = useSelector(({ restauration }) => restauration.platsDessertsReducer.platsDessertsDialog);
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
	const ingredients = _.values(useSelector(({ restauration }) => restauration.ingredientsReducer.entities));

	const [selectedCategory, setSelectedCategory] = useState('null');
	const [totalPrice, setTotalPrice] = useState(0);
	const [dessertPrice, setDessertPrice] = useState(0);
	const [indexIngr, setIndexIngr] = useState(0);

	const [open, setOpen] = useState(false);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	useEffect(() => {
		if (form !== null) if (form.category === 'plats') calculatPrice();
	}, [form]);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (platsDessertsDialog.type === 'edit' && platsDessertsDialog.data) {
			setSelectedCategory(platsDessertsDialog.data.category);
			let ingredientsForm = defaultFormState.ingredients;

			if (platsDessertsDialog.data.category === 'desserts') {
				setDessertPrice(parseFloat(platsDessertsDialog.data.prix));
			} else {
				setTotalPrice(parseFloat(platsDessertsDialog.data.prix));
				ingredientsForm = platsDessertsDialog.data.ingredients.map((e, i) => {
					return { ...e, index: `ingredient-${i}` };
				});
				setIndexIngr(ingredientsForm.length - 1);
			}

			setForm({
				...platsDessertsDialog.data,
				ingredients: ingredientsForm,
				quantite: platsDessertsDialog.data.qte_stock,
			});
		}

		/**
		 * Dialog type: 'new'
		 */
		if (platsDessertsDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...platsDessertsDialog.data,
			});
		}
		dispatch(Actions.getContacts());
	}, [platsDessertsDialog.data, platsDessertsDialog.type, setForm, dispatch]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (platsDessertsDialog.props.open) {
			initDialog();
		}
		return () => {
			setForm(null);
			defaultFormState = {
				category: 'null',
				nom: '',
				prix: 0,
				ingredients: [{ index: 'ingredient-0' }],
				quantite: 0,
				description: '',
			};
			setSelectedCategory('null');
			setIndexIngr(0);
		};
	}, [platsDessertsDialog.props.open, initDialog, setForm]);

	function closeComposeDialog() {
		setTotalPrice(0);
		setDessertPrice(0);
		platsDessertsDialog.type === 'edit'
			? dispatch(Actions.closeEditPlatsDessertsDialog())
			: dispatch(Actions.closeNewPlatsDessertsDialog());
	}

	function canBeSubmitted() {
		if (form.category === 'plats') {
			return form.nom.length > 0 && selectedCategory !== 'null' && _.takeRight(form.ingredients)[0].nom !== undefined;
		} else {
			return form.nom.length > 0 && selectedCategory !== 'null';
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		let obj = null;

		if (form.category === 'plats') {
			obj = {
				nom: form.nom,
				description: form.description,
				ingredients: form.ingredients,
			};
		} else {
			obj = {
				nom: form.nom,
				description: form.description,
				qte_stock: parseFloat(form.quantite),
				prix: parseFloat(dessertPrice),
			};
		}

		switch (true) {
			case platsDessertsDialog.type === 'new' && form.category === 'plats':
				dispatch(Actions.addPlat(obj));
				break;
			case platsDessertsDialog.type === 'new' && form.category === 'desserts':
				dispatch(Actions.addDessert(obj));
				break;
			case platsDessertsDialog.type === 'edit' && form.category === 'plats':
				dispatch(Actions.updatePlat({ ...obj, id_plat: form.id_plat }));
				break;
			case platsDessertsDialog.type === 'edit' && form.category === 'desserts':
				dispatch(Actions.updateDessert({ ...obj, id_dessert: form.id_dessert }));
				break;
			default:
				break;
		}
		closeComposeDialog();
	}

	function handleRemove() {
		if (form.category === 'plats') {
			dispatch(Actions.removePlat(form.id_plat));
		} else {
			dispatch(Actions.removeDessert(form.id_dessert));
		}
		closeComposeDialog();
	}

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
		handleChipChange(event.target.value, event.target.name);
	}

	function handleChipChange(value, name) {
		if (name === 'ingredients') {
			let ing = form.ingredients;
			let found = _.filter(ing, (o) => o.index === value.index);

			if (found.length > 0) {
				ing = [
					...ing.slice(0, _.indexOf(ing, found[0])),
					{
						nom: value.data.label,
						prix: parseFloat(value.data.prix),
						quantite: 1,
						index: found[0].index,
						id_ingredient: value.data.value,
					},
					...ing.slice(_.indexOf(ing, found[0]) + 1),
				];
			}

			setForm(_.set({ ...form }, name, ing));
		} else {
			setForm(_.set({ ...form }, name, value));
		}
	}

	function handleQuantityChange(value, name) {
		let ing = form.ingredients;

		let newIngredientForm = _.find(ing, (o) => o.index === name);
		if (
			parseFloat(value) > 0 &&
			parseFloat(value) <=
				parseFloat(_.find(ingredients, (o) => o.id_ingredient === newIngredientForm.id_ingredient).qte_stock)
		)
			_.set(newIngredientForm, 'quantite', parseFloat(value));

		setForm((form) => ({
			...form,
			ingredients: ing,
		}));
	}

	function addIngredientInput() {
		let ing = form.ingredients;
		setForm((form) => ({
			...form,
			ingredients: ing.concat([{ index: `ingredient-${parseInt(indexIngr) + 1}` }]),
		}));
		setIndexIngr(parseInt(indexIngr) + 1);
	}

	function handleIngredientInputRemove(index) {
		let ing = form.ingredients;
		ing = _.filter(ing, (o) => o.index !== index);

		setForm((form) => ({
			...form,
			ingredients: ing,
		}));
	}

	const calculatPrice = () => {
		if (form.ingredients[0].nom !== undefined) {
			const prix = _.sumBy(form.ingredients, (o) => parseFloat(o.prix) * parseFloat(o.quantite));
			setTotalPrice(prix);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const ingredientsToSelect =
		form !== null && _.filter(ingredients, (o) => !_.find(form.ingredients, (e) => e.id_ingredient === o.id_ingredient));

	return (
		form !== null && (
			<React.Fragment>
				<Dialog
					classes={{
						paper: 'm-24',
					}}
					{...platsDessertsDialog.props}
					onClose={closeComposeDialog}
					fullWidth
					maxWidth='xs'
				>
					<AppBar position='static' elevation={1}>
						<Toolbar className='flex w-full'>
							<Typography variant='subtitle1' color='inherit'>
								{platsDessertsDialog.type === 'new' ? 'Nouveau Plat/Dessert' : 'Modifier un Plat/Dessert'}
							</Typography>
						</Toolbar>
						<div className='flex flex-col items-center justify-center pb-24'>
							<Typography variant='h6' color='inherit' className='pt-8'>
								{form.nom}
							</Typography>
						</div>
					</AppBar>
					<form noValidate onSubmit={handleSubmit} className='flex flex-col overflow-hidden'>
						<DialogContent classes={{ root: 'pt-24 pb-0 px-24' }}>
							<FormControl className='flex mb-24' variant='outlined'>
								<InputLabel htmlFor='category-label-placeholder'>Catégorie</InputLabel>
								<Select
									value={selectedCategory}
									onChange={handleSelectedCategory}
									disabled={platsDessertsDialog.type === 'edit'}
									input={
										<OutlinedInput
											labelWidth={'category'.length * 9}
											name='category'
											id='category-label-placeholder'
										/>
									}
								>
									<MenuItem value='null'>
										<em>Selectionner une catégorie</em>
									</MenuItem>

									{categories.map((category) => (
										<MenuItem value={category.value} key={category.id}>
											{category.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{selectedCategory === 'plats' && (
								<React.Fragment>
									<div className='flex'>
										<TextField
											className='mb-24'
											label='Nom'
											autoFocus
											id='nom'
											name='nom'
											value={form.nom}
											onChange={handleChange}
											variant='outlined'
											required
											fullWidth
										/>
									</div>

									{form.ingredients.map((elem, i) => {
										return (
											<div key={i} className='flex w-full'>
												<FuseChipSelect
													className='mb-24 w-full'
													name={elem.index}
													options={ingredientsToSelect.map((item) => ({
														value: item.id_ingredient,
														label: item.nom,
														prix: item.prix,
													}))}
													value={
														elem.nom !== undefined && {
															value: elem.id_ingredient,
															label: elem.nom,
															prix: elem.prix,
														}
													}
													variant='fixed'
													noOptionsMessage={() => 'Aucun ingrédient à sélectionner'}
													onChange={(value) =>
														handleChipChange({ index: elem.index, data: value }, 'ingredients')
													}
													placeholder='Selectionner...'
													textFieldProps={{
														label: 'Ingredients',
														InputLabelProps: {
															shrink: true,
														},
														variant: 'outlined',
													}}
												/>
												<TextField
													className='mb-24 ml-8 w-5/12'
													label='Quantité'
													id={`quantite-${i}`}
													name={elem.index}
													type='number'
													value={
														elem.nom === undefined
															? _.get(
																	_.find(form.ingredients, (o) => o.index === elem.index),
																	'quantite',
																	1
															  )
															: elem.quantite
													}
													onChange={(event) => handleQuantityChange(event.target.value, elem.index)}
													variant='outlined'
													disabled={elem.nom === undefined}
													InputProps={{
														endAdornment: <InputAdornment position='end'> Kg</InputAdornment>,
													}}
													fullWidth
												/>
												{i !== 0 && (
													<div className='min-w-48 ml-8 mb-24 self-center'>
														<IconButton
															onClick={(e) => {
																e.preventDefault();
																handleIngredientInputRemove(elem.index);
															}}
														>
															<Icon color='error'>delete</Icon>
														</IconButton>
													</div>
												)}
											</div>
										);
									})}
									<div className='flex'>
										<Button
											className='w-full mb-24'
											variant='contained'
											color='primary'
											onClick={addIngredientInput}
											disabled={form.ingredients[form.ingredients.length - 1].nom === undefined}
										>
											Ajouter un ingrédient
										</Button>
									</div>

									<div className='flex'>
										<TextField
											className='w-full mb-24'
											label='Description (optionnel)'
											name='description'
											multiline
											rows='6'
											value={form.description}
											onChange={handleChange}
											variant='outlined'
										/>
									</div>

									<div className='flex'>
										<div className='min-w-48 pt-20'>
											<Icon color='action'>attach_money</Icon>
										</div>
										<TextField
											className='mb-24'
											label='Prix'
											id='prix'
											name='prix'
											value={parseFloat(totalPrice).toFixed(2)}
											variant='outlined'
											InputProps={{
												endAdornment: <InputAdornment position='end'> DA</InputAdornment>,
											}}
											disabled
											fullWidth
										/>
									</div>
								</React.Fragment>
							)}
							{selectedCategory === 'desserts' && (
								<React.Fragment>
									<div className='flex'>
										<TextField
											className='mb-24'
											label='Nom'
											autoFocus
											id='nom'
											name='nom'
											value={form.nom}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											required
										/>
									</div>

									<div className='flex'>
										<TextField
											className='w-full mb-24'
											label='Description (optionnel)'
											name='description'
											multiline
											rows='6'
											value={form.description}
											onChange={handleChange}
											variant='outlined'
										/>
									</div>

									<div className='flex'>
										<div className='min-w-48 pt-20'>
											<Icon color='action'>bar_chart</Icon>
										</div>
										<TextField
											className='mb-24'
											label='Qte. stock'
											id='quantite'
											name='quantite'
											variant='outlined'
											type='number'
											value={form.quantite !== 0 ? parseFloat(form.quantite) : null}
											onChange={handleChange}
											fullWidth
										/>
									</div>
									<div className='flex'>
										<div className='min-w-48 pt-20'>
											<Icon color='action'>attach_money</Icon>
										</div>
										<TextField
											className='mb-24'
											label='Prix'
											id='prix-dessert'
											name='prix-dessert'
											variant='outlined'
											type='number'
											value={dessertPrice !== 0 ? parseFloat(dessertPrice).toFixed(2) : null}
											onChange={(e) => {
												e.preventDefault();
												setDessertPrice(parseFloat(e.target.value).toFixed(2));
											}}
											InputProps={{
												endAdornment: <InputAdornment position='end'> DA</InputAdornment>,
											}}
											fullWidth
										/>
									</div>
								</React.Fragment>
							)}
						</DialogContent>
						{console.log()}
						<DialogActions className='justify-right pt-0 pb-24 pr-24'>
							{platsDessertsDialog.type === 'new' ? (
								<Button
									variant='outlined'
									color='secondary'
									onClick={handleSubmit}
									type='submit'
									disabled={!canBeSubmitted()}
								>
									Ajouter
								</Button>
							) : (
								<React.Fragment>
									<IconButton onClick={handleClickOpen} className={'mr-8'}>
										<Icon color='error'>delete</Icon>
									</IconButton>
									<Button
										variant='outlined'
										color='secondary'
										type='submit'
										onClick={handleSubmit}
										disabled={!canBeSubmitted()}
									>
										Enregistrer
									</Button>
								</React.Fragment>
							)}
						</DialogActions>
					</form>
				</Dialog>
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
							Cette action est irréversible, voulez-vous vraiment supprimer ce plat/dessert?
						</DialogContentText>
					</DialogContent>
					<DialogActions className='pr-24 pb-24'>
						<Button variant='outlined' onClick={handleClose} color='primary' autoFocus>
							Annuler
						</Button>
						<Button
							onClick={() => {
								handleRemove();
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
		)
	);
}

export default PlatDessertDialog;
