import React from 'react';
import {
	Card,
	Chip,
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
import { useSelector } from 'react-redux';
import moment from 'moment';

function IngredientsInvoiceDialog(props) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'DZD',
		minimumFractionDigits: 2,
	});

	const menus = useSelector(({ restauration }) => restauration.menusReducer.details);

	const handleClose = () => {
		props.setOpenInvoice(false);
	};

	// const mergedIngredients = () => {
	// 	let ingr = [];
	// 	menus.map((e) => {
	// 		e.ingredients_plats.map((elem) => {
	// 			ingr.push({ ...elem, time: moment(e.start).startOf('week') });
	// 		});
	// 		ingr.push(
	// 			...[
	// 				{
	// 					id: e.id_dessert_un,
	// 					prix: e.prix_dessert_un,
	// 					nom: e.nom_dessert_un,
	// 					quantite: 1,
	// 					type: 'dessert',
	// 					time: moment(e.start).startOf('week'),
	// 				},
	// 				{
	// 					id: e.id_dessert_deux,
	// 					prix: e.prix_dessert_deux,
	// 					nom: e.nom_dessert_deux,
	// 					quantite: 1,
	// 					type: 'dessert',
	// 					time: moment(e.start).startOf('week'),
	// 				},
	// 			]
	// 		);
	// 	});

	// 	ingr = _.chain(ingr)
	// 		.groupBy('id')
	// 		.map((value) => {
	// 			if (value[0].type) {
	// 				return {
	// 					..._.mergeWith(...value, (o, s, key) => {
	// 						if (key === 'quantite') {
	// 							return parseFloat(o) + parseFloat(s);
	// 						} else {
	// 							return o;
	// 						}
	// 					}),
	// 				};
	// 			} else {
	// 				return {
	// 					..._.mergeWith(...value, (o, s, key) => {
	// 						if (key === 'quantite') {
	// 							return parseFloat(o) + parseFloat(s);
	// 						} else {
	// 							return o;
	// 						}
	// 					}),
	// 					type: 'ingredient',
	// 				};
	// 			}
	// 		})
	// 		.value();
	// 	return ingr;
	// };
	if (menus.length < 1) {
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
		menus && (
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
									{menus.map((week, i) => (
										<React.Fragment>
											<Typography variant='subtitle1' className='font-bold mt-24'>
												Semaine #{i + 1} - du{' '}
												{moment(week[0].start)
													.startOf('month')
													.add(i * 7, 'days')
													.format('DD-MM-YYYY')}{' '}
												au{' '}
												{menus.length !== i + 1
													? moment(week[0].start)
															.startOf('month')
															.add(i * 7 + 6, 'days')
															.format('DD-MM-YYYY')
													: moment(week[0].start).endOf('month').format('DD-MM-YYYY')}
											</Typography>
											<TableBody>
												{week.map((service, index) => (
													<TableRow key={i + index}>
														<TableCell>
															<Typography variant='subtitle1' className='font-bold'>
																{service.nom.charAt(0).toUpperCase() + service.nom.slice(1)}
															</Typography>
															{service.ingredients &&
																service.ingredients.map((e, indexIngr) => (
																	<Chip
																		key={indexIngr}
																		label={e.nom + ' x ' + e.quantite}
																		className='m-4'
																	/>
																))}
														</TableCell>
														<TableCell align='right'>
															{service.type.charAt(0).toUpperCase() + service.type.slice(1)}
														</TableCell>
														<TableCell align='right'>{formatter.format(service.prix)}</TableCell>
														<TableCell align='right'>{service.quantite}</TableCell>
														<TableCell align='right'>
															{formatter.format(
																parseFloat(service.prix) * parseFloat(service.quantite)
															)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</React.Fragment>
									))}
								</Table>

								<Table className='simple mt-48 mb-16'></Table>
							</div>
						</CardContent>
					</Card>
				</DialogContent>
			</Dialog>
		)
	);
}

export default IngredientsInvoiceDialog;
