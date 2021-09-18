import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	TableCell,
	TableRow,
	TableBody,
	TableHead,
	Table,
	Dialog,
	DialogContent,
} from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import _ from '@lodash';

function IngredientsInvoiceDialog(props) {
	const [invoice, setInvoice] = useState(null);
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'DZD',
		minimumFractionDigits: 2,
	});

	const menus = useSelector(({ restauration }) => restauration.menusReducer.entities);

	useEffect(() => {
		axios
			.get('/api/invoices/get-invoice', {
				params: { id: '5725a6802d' },
			})
			.then((res) => {
				setInvoice(res.data);
			});
	}, []);

	const handleClose = () => {
		props.setOpenInvoice(false);
	};

	const mergedIngredients = () => {
		let ingr = [];
		menus.map((e) => {
			ingr.push(...e.ingredients_plats);
			ingr.push(
				...[
					{ id: e.id_dessert_un, prix: e.prix_dessert_un, nom: e.nom_dessert_un, quantite: 1, type: 'dessert' },
					{ id: e.id_dessert_deux, prix: e.prix_dessert_deux, nom: e.nom_dessert_deux, quantite: 1, type: 'dessert' },
				]
			);
		});

		ingr = _.chain(ingr)
			.groupBy('id')
			.map((value) => {
				if (value[0].type) {
					return {
						..._.mergeWith(...value, (o, s, key) => {
							if (key === 'quantite') {
								return parseFloat(o) + parseFloat(s);
							} else {
								return o;
							}
						}),
					};
				} else {
					return {
						..._.mergeWith(...value, (o, s, key) => {
							if (key === 'quantite') {
								return parseFloat(o) + parseFloat(s);
							} else {
								return o;
							}
						}),
						type: 'ingredient',
					};
				}
			})
			.value();
		return ingr;
	};

	const prixTotal = () => {
		return _.sumBy(menus, (o) => parseFloat(o.prix_total));
	};

	if (mergedIngredients().length < 1) {
		return (
			<Dialog
				open={props.openInvoice}
				maxWidth={false}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent className='flex-grow flex-shrink-0 py-64 px-88 print:p-0'>
					<Typography variant='h6' color='textSecondary'>
						Aucune donnée trouvée
					</Typography>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		mergedIngredients() &&
		invoice && (
			<Dialog
				open={props.openInvoice}
				maxWidth={false}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent className='flex-grow flex-shrink-0 p-0 print:p-0'>
					<Card className='mx-auto w-xl print:w-full print:p-8 print:shadow-none'>
						<CardContent className='p-32 print:p-0'>
							<Table className='simple'>
								<TableBody>
									<TableRow>
										<TableCell>
											<Typography variant='h6' color='textSecondary'>
												Détails du mois
											</Typography>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>

							<div className='mt-16'>
								<Table className='simple'>
									<TableHead>
										<TableRow>
											<TableCell>NOM</TableCell>
											<TableCell align='right'>TYPE</TableCell>
											<TableCell align='right'>PRIX UNITAIRE</TableCell>
											<TableCell align='right'>QUANTITE</TableCell>
											<TableCell align='right'>TOTAL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{mergedIngredients().map((service, i) => (
											<TableRow key={i}>
												<TableCell>
													<Typography variant='subtitle1' className='font-bold'>
														{service.nom.charAt(0).toUpperCase() + service.nom.slice(1)}
													</Typography>
												</TableCell>
												<TableCell align='right'>
													{service.type.charAt(0).toUpperCase() + service.type.slice(1)}
												</TableCell>
												<TableCell align='right'>{formatter.format(service.prix)}</TableCell>
												<TableCell align='right'>{service.quantite}</TableCell>
												<TableCell align='right'>
													{formatter.format(parseFloat(service.prix) * parseFloat(service.quantite))}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>

								<Table className='simple mt-48 mb-16'>
									<TableBody>
										<TableRow>
											<TableCell>
												<Typography className='font-light' variant='h4' color='textSecondary'>
													PRIX TOTAL
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography className='font-light' variant='h4' color='textSecondary'>
													{formatter.format(prixTotal())}
												</Typography>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</DialogContent>
			</Dialog>
		)
	);
}

export default IngredientsInvoiceDialog;
