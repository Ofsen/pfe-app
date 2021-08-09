import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, Icon, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ImageDialog from './ImageDialog';

const useStyles = makeStyles((theme) => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0,
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8,
			},
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1,
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1,
			},
		},
	},
}));

function Dossier(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ hebergements }) => hebergements.dossier);

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);

	const [open, setOpen] = useState(false);
	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		function updateProductState() {
			const params = props.match.params;
			const { dossierId } = params;

			if (dossierId === 'new') {
				dispatch(Actions.newDossier());
			} else {
				dispatch(Actions.getDossier(props.match.params));
			}
		}

		updateProductState();
		return () => {
			dispatch(Actions.resetDossier());
		};
	}, [dispatch, setForm, props.match.params]);

	useEffect(() => {
		if ((product.data && !form) || (product.data && form && product.data.id !== form.id)) {
			setForm(product.data);
		}
	}, [form, product.data, setForm]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		const name = e.target.name;
		reader.onload = () => {
			setForm(
				_.set({ ...form }, name, {
					id: FuseUtils.generateGUID(),
					url: `data:${file.type};base64,${btoa(reader.result)}`,
					type: 'image',
				})
			);
		};

		reader.onerror = function () {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		return (
			form.nom.length > 0 &&
			form.prenom.length > 0 &&
			form.n_etudiant.length > 0 &&
			form.n_tel.length > 0 &&
			form.email.length > 0 &&
			form.photo_id &&
			form.demande_sign &&
			form.attestation_bac &&
			form.cert_scolarite &&
			form.cert_residence &&
			form.ext_naissance &&
			!_.isEqual(product.data, form)
		);
	}

	function setDisabled() {
		return props.match.params.dossierId !== 'new';
	}

	return (
		form !== null && (
			<React.Fragment>
				<FusePageCarded
					classes={{
						toolbar: 'p-0',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					}}
					header={
						form && (
							<div className='flex flex-1 w-full items-center justify-between'>
								<div className='flex flex-1 flex-col items-center sm:items-start'>
									<FuseAnimate animation='transition.slideRightIn' delay={300}>
										<Typography
											className='normal-case flex items-center sm:mb-12'
											component={Link}
											role='button'
											to='/hebergements/dossiers'
											color='inherit'
										>
											<Icon className='mr-4 text-20'>arrow_back</Icon>
											Liste des Dossiers
										</Typography>
									</FuseAnimate>

									<div className='flex items-center max-w-full'>
										<FuseAnimate animation='transition.expandIn' delay={300}>
											{form.photo_id ? (
												<img
													className='w-32 sm:w-48 mr-8 sm:mr-16 rounded max-h-48 overflow-hidden'
													src={form.photo_id.url}
													alt={form.photo_id.name}
												/>
											) : (
												<img
													className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
													src='assets/images/ecommerce/product-image-placeholder.png'
													alt={form.name}
												/>
											)}
										</FuseAnimate>
										<div className='flex flex-col min-w-0'>
											<FuseAnimate animation='transition.slideLeftIn' delay={300}>
												<Typography className='text-16 sm:text-20 truncate'>
													{form.nom && form.prenom
														? 'Dossier de ' +
														  form.nom.toUpperCase() +
														  ' ' +
														  form.prenom.slice(0, 1).toUpperCase() +
														  form.prenom.slice(1)
														: 'Nouveau Dossier'}
												</Typography>
											</FuseAnimate>
											<FuseAnimate animation='transition.slideLeftIn' delay={300}>
												<Typography variant='caption'>Détails du dossier</Typography>
											</FuseAnimate>
										</div>
									</div>
								</div>
								{props.match.params.dossierId !== 'new' ? (
									<React.Fragment>
										<FuseAnimate animation='transition.slideRightIn' delay={300}>
											<Button
												className='whitespace-no-wrap mr-8'
												variant='outlined'
												onClick={() => dispatch(Actions.saveDossier(form))}
											>
												<span className='hidden sm:flex'>Refuser</span>
												<span className='flex sm:hidden'>Refu.</span>
											</Button>
										</FuseAnimate>
										<FuseAnimate animation='transition.slideRightIn' delay={300}>
											<Button
												className='whitespace-no-wrap'
												variant='contained'
												color='secondary'
												onClick={() => dispatch(Actions.saveDossier(form))}
											>
												<span className='hidden sm:flex'>Valider</span>
												<span className='flex sm:hidden'>Valid.</span>
											</Button>
										</FuseAnimate>
									</React.Fragment>
								) : (
									<FuseAnimate animation='transition.slideRightIn' delay={300}>
										<Button
											className='whitespace-no-wrap'
											variant='contained'
											color='secondary'
											disabled={!canBeSubmitted()}
											onClick={() => dispatch(Actions.saveDossier(form))}
										>
											Enregistrer
										</Button>
									</FuseAnimate>
								)}
							</div>
						)
					}
					contentToolbar={
						<Tabs
							value={tabValue}
							onChange={handleChangeTab}
							indicatorColor='secondary'
							textColor='secondary'
							variant='scrollable'
							scrollButtons='auto'
							classes={{ root: 'w-full h-64' }}
						>
							<Tab className='h-64 normal-case' label='Informations Générale' />
							<Tab className='h-64 normal-case' label='Imprimé de la demande' />
							<Tab className='h-64 normal-case' label='Attestation de Baccalauréat' />
							<Tab className='h-64 normal-case' label='Certificat de scolarité' />
							<Tab className='h-64 normal-case' label='Certificat de résidence' />
							<Tab className='h-64 normal-case' label='Extrait de naissance' />
						</Tabs>
					}
					content={
						form && (
							<div className='p-16 sm:p-24'>
								{tabValue === 0 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Informations sur l'étudiant
										</Typography>
										<TextField
											className='mt-8 mb-16'
											error={form.nom === ''}
											required
											label='Nom'
											autoFocus
											id='nom'
											name='nom'
											value={form.nom.toUpperCase()}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											disabled={setDisabled()}
										/>

										<TextField
											className='mt-8 mb-16'
											error={form.prenom === ''}
											required
											label='Prénom'
											autoFocus
											id='prenom'
											name='prenom'
											value={form.prenom.slice(0, 1).toUpperCase() + form.prenom.slice(1)}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											disabled={setDisabled()}
										/>

										<TextField
											className='mt-8 mb-16'
											error={form.n_etudiant === ''}
											required
											label='N° Etudiant'
											autoFocus
											id='n_etudiant'
											name='n_etudiant'
											value={form.n_etudiant}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											disabled={setDisabled()}
										/>

										<TextField
											className='mt-8 mb-16'
											error={form.n_tel === ''}
											required
											label='N° Téléphone'
											autoFocus
											id='n_tel'
											name='n_tel'
											type='tel'
											value={form.n_tel}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											disabled={setDisabled()}
										/>

										<TextField
											className='mt-8 mb-16'
											error={form.email === ''}
											required
											label='Adresse E-Mail'
											autoFocus
											id='email'
											name='email'
											value={form.email}
											onChange={handleChange}
											variant='outlined'
											fullWidth
											disabled={setDisabled()}
										/>

										<Typography variant='h6' className='pb-12'>
											Photo d'Identité
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='photo_id'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.photo_id && (
													<div
														onClick={() => {
															setImgUrl(form.photo_id.url);
															setOpen(true);
														}}
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.photo_id.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.photo_id.url}
															alt='identite'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{tabValue === 1 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Imprimé de demande d’hébergement fournis par l’administration signé par
											l’intéressé(e) est légalisé
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='demande_sign'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.demande_sign && (
													<div
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.demande_sign.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.demande_sign.url}
															alt='demande-hébergement'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{tabValue === 2 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Une copie(01) certifiée conforme à l’original de l’attestation de baccalauréat
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='attestation_bac'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.attestation_bac && (
													<div
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.attestation_bac.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.attestation_bac.url}
															alt='attestation-de-baccalaureat'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{tabValue === 3 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Une copie(01) certifiée conforme à l’original de certificat de scolarité de
											l’établissement de l’enseignement supérieur.
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='cert_scolarite'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.cert_scolarite && (
													<div
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.cert_scolarite.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.cert_scolarite.url}
															alt='certificat-de-scolarite'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{tabValue === 4 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Certificat de résidence
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='cert_residence'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.cert_residence && (
													<div
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.cert_residence.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.cert_residence.url}
															alt='Certificat-de-residence'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{tabValue === 5 && (
									<div>
										<Typography variant='h6' className='pb-12'>
											Extrait de naissance
										</Typography>
										<div>
											{props.match.params.dossierId === 'new' && (
												<input
													accept='image/*'
													className='hidden'
													id='button-file'
													type='file'
													onChange={handleUploadChange}
													name='ext_naissance'
												/>
											)}
											<div className='flex justify-center sm:justify-start flex-wrap'>
												{props.match.params.dossierId === 'new' && (
													<label
														htmlFor='button-file'
														className={clsx(
															classes.productImageUpload,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
													>
														<Icon fontSize='large' color='action'>
															cloud_upload
														</Icon>
													</label>
												)}
												{form.ext_naissance && (
													<div
														className={clsx(
															classes.productImageItem,
															'flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
														)}
														key={form.ext_naissance.id}
													>
														<img
															className='max-w-none w-auto h-full'
															src={form.ext_naissance.url}
															alt='Extrait-de-naissance'
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						)
					}
					innerScroll
				/>
				<ImageDialog open={open} setOpen={setOpen} imgUrl={imgUrl} />
			</React.Fragment>
		)
	);
}

export default withReducer('hebergements', reducer)(Dossier);
