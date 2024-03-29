import React, { useEffect } from 'react';
import { Button, TextField, Icon, Typography } from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FuseChipSelect } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function Product(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ chambres }) => chambres.product);

	const { form, handleChange, setForm } = useForm(null);

	useEffect(() => {
		function updateProductState() {
			const params = props.match.params;
			const { chambreId } = params;

			if (chambreId === 'new') {
				dispatch(Actions.newDossier());
			} else {
				dispatch(Actions.getDossier({ productId: '1' }));
			}
		}

		updateProductState();
	}, [dispatch, props.match.params]);

	useEffect(() => {
		if ((product.data && !form) || (product.data && form && product.data.id !== form.id)) {
			setForm(product.data);
		}
	}, [form, product.data, setForm]);

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map((item) => item.value)
			)
		);
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={
				<div className='flex flex-1 w-full items-center justify-between'>
					<div className='flex flex-col items-start max-w-full'>
						<FuseAnimate animation='transition.slideRightIn' delay={300}>
							<Typography
								className='normal-case flex items-center sm:mb-12'
								component={Link}
								role='button'
								to='/hebergements/chambres'
								color='inherit'
							>
								<Icon className='mr-4 text-20'>arrow_back</Icon>
								Chambre
							</Typography>
						</FuseAnimate>

						<div className='flex items-center max-w-full'>
							<div className='flex flex-col min-w-0'>
								<FuseAnimate animation='transition.slideLeftIn' delay={300}>
									<Typography variant='caption'>Détail de la chambre</Typography>
								</FuseAnimate>
							</div>
						</div>
					</div>
					<FuseAnimate animation='transition.slideRightIn' delay={300}>
						<Button
							className='whitespace-no-wrap'
							variant='contained'
							onClick={() => dispatch(Actions.saveDossier(form))}
						>
							Enregistrer
						</Button>
					</FuseAnimate>
				</div>
			}
			contentToolbar={
				<div className='px-24'>
					<h4>Informations</h4>
				</div>
			}
			content={
				form && (
					<div className='p-16 sm:p-24 max-w-2xl'>
						<div>
							<TextField
								className='mt-8 mb-16'
								error={form.name === ''}
								required
								label='Name'
								autoFocus
								id='name'
								name='name'
								value={form.name}
								onChange={handleChange}
								variant='outlined'
								fullWidth
							/>

							<TextField
								className='mt-8 mb-16'
								id='description'
								name='description'
								onChange={handleChange}
								label='Description'
								type='text'
								value={form.description}
								multiline
								rows={5}
								variant='outlined'
								fullWidth
							/>

							<FuseChipSelect
								className='mt-8 mb-24'
								value={form.categories.map((item) => ({
									value: item,
									label: item,
								}))}
								onChange={(value) => handleChipChange(value, 'categories')}
								placeholder='Select multiple categories'
								textFieldProps={{
									label: 'Categories',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
								isMulti
							/>

							<FuseChipSelect
								className='mt-8 mb-16'
								value={form.tags.map((item) => ({
									value: item,
									label: item,
								}))}
								onChange={(value) => handleChipChange(value, 'tags')}
								placeholder='Select multiple tags'
								textFieldProps={{
									label: 'Tags',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
								isMulti
							/>
						</div>
					</div>
				)
			}
		/>
	);
}

export default withReducer('hebergements', reducer)(Product);
