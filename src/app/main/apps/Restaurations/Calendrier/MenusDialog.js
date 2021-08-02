import React, { useCallback, useEffect } from 'react';
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
	FormControl,
	FormControlLabel,
	InputLabel,
	OutlinedInput,
	MenuItem,
	Select,
	Switch,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { FuseChipSelect } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import * as Actions from '../store/actions';
import _ from '@lodash';

const defaultFormState = {
	title: 'Menu du ' + moment().format(moment.HTML5_FMT.DATE),
	plat_un: { value: null, label: null },
	plat_deux: { value: null, label: null },
	dessert_un: { value: null, label: null },
	dessert_deux: { value: null, label: null },
	start: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	end: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	recurrent: false,
	until: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
	interval: null,
	freq: null,
};

function MenusDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ menus }) => menus.menusReducer.eventDialog);
	const platsDesserts = useSelector(({ menus }) => menus.platsDessertsReducer.data);

	const { form, handleChange, setForm } = useForm(defaultFormState);
	let start = moment(form.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	let end = moment(form.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	let until = moment(form.until).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			setForm({ ...eventDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...eventDialog.data,
			});
		}
	}, [eventDialog.data, eventDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	useEffect(() => {
		dispatch(Actions.getPlatsDesserts());
	}, [dispatch]);

	function closeComposeDialog() {
		eventDialog.type === 'edit' ? dispatch(Actions.closeEditEventDialog()) : dispatch(Actions.closeNewEventDialog());
	}

	function canBeSubmitted() {
		if (form.recurrent) {
			return (
				form.interval >= 1 &&
				moment(form.start) <= moment(form.until) &&
				form.title.length > 0 &&
				moment(form.start) <= moment(form.end) &&
				form.plat_un.value !== null &&
				form.plat_deux.value !== null &&
				form.dessert_un.value !== null &&
				form.dessert_deux.value !== null
			);
		} else {
			return (
				form.title.length > 0 &&
				form.start <= form.end &&
				form.plat_un.value !== null &&
				form.plat_deux.value !== null &&
				form.dessert_un.value !== null &&
				form.dessert_deux.value !== null
			);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(Actions.addEvent(form));
		} else {
			dispatch(Actions.updateEvent(form));
		}
		closeComposeDialog();
	}

	function handleIntervalChange(event) {
		event.persist();

		setForm((form) => ({
			...form,
			interval: event.target.value < 1 ? 1 : parseInt(event.target.value),
		}));
	}

	function handleRemove() {
		dispatch(Actions.removeEvent(form.id));
		closeComposeDialog();
	}

	function handleChipChange(value, name) {
		setForm(_.set({ ...form }, name, value));
	}

	const platsToSelect = _.filter(
		platsDesserts,
		(o) => o.category === 'plats' && form.plat_un.value !== o.id_plat && form.plat_deux.value !== o.id_plat
	);

	const dessertsToSelect = _.filter(
		platsDesserts,
		(o) => o.category === 'desserts' && form.dessert_deux.value !== o.id_dessert && form.dessert_un.value !== o.id_dessert
	);

	console.log(
		moment().format('YYYY-MM-DD HH:mm:ss'),
		moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss'),
		moment() <= moment().add(1, 'h')
	);

	return (
		<Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth='xs' component='form'>
			<AppBar position='static'>
				<Toolbar className='flex w-full'>
					<Typography variant='subtitle1' color='inherit'>
						{eventDialog.type === 'new' ? 'Ajouter un menu' : 'Modifier un menu'}
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					<TextField
						id='title'
						label='Titre'
						className='mt-8 mb-16'
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							max: end,
						}}
						name='title'
						value={form.title}
						onChange={handleChange}
						variant='outlined'
						autoFocus
						required
						fullWidth
					/>
					<FuseChipSelect
						className='mt-8 mb-16 w-full'
						name={'plat_un'}
						options={platsToSelect.map((item) => ({
							value: item.id_plat,
							label: item.nom,
						}))}
						value={form.plat_un.value !== null && form.plat_un}
						variant='fixed'
						noOptionsMessage={() => 'Aucun plat à sélectionner'}
						onChange={(value) => handleChipChange(value, 'plat_un')}
						placeholder='Selectionner le premièr plat'
						textFieldProps={{
							label: 'Premièr plat',
							InputLabelProps: {
								shrink: true,
							},
							variant: 'outlined',
						}}
					/>
					<FuseChipSelect
						className='mt-8 mb-16 w-full'
						name={'plat_deux'}
						options={platsToSelect.map((item) => ({
							value: item.id_plat,
							label: item.nom,
						}))}
						value={form.plat_deux.value !== null && form.plat_deux}
						variant='fixed'
						noOptionsMessage={() => 'Aucun plat à sélectionner'}
						onChange={(value) => handleChipChange(value, 'plat_deux')}
						placeholder='Selectionner le deuxième plat'
						textFieldProps={{
							label: 'Deuxième plat',
							InputLabelProps: {
								shrink: true,
							},
							variant: 'outlined',
						}}
					/>
					<FuseChipSelect
						className='mt-8 mb-16 w-full'
						name={'dessert_un'}
						options={dessertsToSelect.map((item) => ({
							value: item.id_dessert,
							label: item.nom,
						}))}
						value={form.dessert_un.value !== null && form.dessert_un}
						variant='fixed'
						noOptionsMessage={() => 'Aucun dessert à sélectionner'}
						onChange={(value) => handleChipChange(value, 'dessert_un')}
						placeholder='Selectionner le premièr dessert'
						textFieldProps={{
							label: 'Premièr dessert',
							InputLabelProps: {
								shrink: true,
							},
							variant: 'outlined',
						}}
					/>
					<FuseChipSelect
						className='mt-8 mb-16 w-full'
						name={'dessert_deux'}
						options={dessertsToSelect.map((item) => ({
							value: item.id_dessert,
							label: item.nom,
						}))}
						value={form.dessert_deux.value !== null && form.dessert_deux}
						variant='fixed'
						noOptionsMessage={() => 'Aucun dessert à sélectionner'}
						onChange={(value) => handleChipChange(value, 'dessert_deux')}
						placeholder='Selectionner le deuxième dessert'
						textFieldProps={{
							label: 'Deuxième dessert',
							InputLabelProps: {
								shrink: true,
							},
							variant: 'outlined',
						}}
					/>
					<TextField
						id='start'
						name='start'
						label='Du'
						type='datetime-local'
						className='mt-8 mb-16'
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							max: end,
						}}
						value={start}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
					<TextField
						id='end'
						name='end'
						label="Jusqu'au"
						type='datetime-local'
						className='mt-8 mb-16'
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							min: start,
						}}
						value={end}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
					<FormControlLabel
						className='mt-8 mb-16'
						label='Répéter'
						control={<Switch checked={form.recurrent} id='recurrent' name='recurrent' onChange={handleChange} />}
					/>
					{form.recurrent && (
						<React.Fragment>
							<TextField
								id='dtstart'
								name='start'
								label='Répéter Du'
								type='datetime-local'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									max: end,
								}}
								value={start}
								variant='outlined'
								fullWidth
								disabled
							/>

							<TextField
								id='until'
								name='until'
								label="Répéter jusqu'au"
								type='datetime-local'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								value={until}
								onChange={handleChange}
								variant='outlined'
								fullWidth
							/>

							<FormControl className='flex mt-8 mb-16' variant='outlined'>
								<InputLabel htmlFor='freq-label-placeholder'>Fréquence</InputLabel>
								<Select
									value={form.freq}
									onChange={handleChange}
									input={
										<OutlinedInput
											labelWidth={'frequence'.length * 7.5}
											name='freq'
											id='freq-label-placeholder'
										/>
									}
								>
									<MenuItem value={null}>
										<em>Selectionner la fréquence de répétition</em>
									</MenuItem>

									{['Chaque Année', 'Tout les mois', 'Chaque semaine', 'Tout les jour'].map((e, i) => (
										<MenuItem value={i} key={i}>
											{e}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<TextField
								id='interval'
								label='Interval'
								type='number'
								className='mt-8 mb-16'
								InputLabelProps={{
									shrink: true,
								}}
								name='interval'
								value={form.interval}
								onChange={handleIntervalChange}
								variant='outlined'
								autoFocus
								fullWidth
							/>
						</React.Fragment>
					)}
				</DialogContent>

				<DialogActions className='justify-right pt-0 pb-24 pr-24'>
					{eventDialog.type === 'new' ? (
						<Button variant='outlined' color='secondary' type='submit' disabled={!canBeSubmitted()}>
							Ajouter
						</Button>
					) : (
						<React.Fragment>
							<IconButton onClick={handleRemove}>
								<Icon color='error'>delete</Icon>
							</IconButton>
							<Button variant='outlined' color='secondary' type='submit' disabled={!canBeSubmitted()}>
								Enregistrer
							</Button>
						</React.Fragment>
					)}
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default MenusDialog;
