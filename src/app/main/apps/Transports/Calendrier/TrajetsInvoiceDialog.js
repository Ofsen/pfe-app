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
import moment from 'moment';

function TrajetsInvoiceDialog(props) {
	const [invoice, setInvoice] = useState(null);

	const menus = useSelector(({ transports }) => transports.busCalendrier.entities);
	const campRes = useSelector(({ transports }) => transports.bus.campRes);

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
		ingr = _.chain(menus)
			.groupBy('id_trajet')
			.map((value) => {
				return { ...value[0] };
			})
			.value();
		return ingr;
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
								<Table className='simple mb-16'>
									<TableHead>
										<TableRow>
											<TableCell>MATRICULE</TableCell>
											<TableCell align='right'>FREQUENCE</TableCell>
											<TableCell align='right'>DEPART</TableCell>
											<TableCell align='right'>ARRIVEE</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{mergedIngredients().map((service, i) => (
											<TableRow key={i}>
												<TableCell>
													<Typography variant='subtitle1' className='font-bold'>
														{service.matricule}
													</Typography>
												</TableCell>
												<TableCell align='right'>
													{service.freq === 0
														? 'Chaque année'
														: service.freq === 1
														? 'Tout les mois'
														: service.freq === 2
														? 'Chaque semaine'
														: service.freq === 3
														? 'Tous les jours'
														: ''}
												</TableCell>
												<TableCell align='right'>
													<span className='font-bold'>
														{moment(service.parent_start).format('HH:mm')}
													</span>{' '}
													de{' '}
													<span className='font-bold'>
														{_.find(campRes, (o) => o.id_camp_res === service.adr_depart).nom +
															' - ' +
															_.find(campRes, (o) => o.id_camp_res === service.adr_depart)
																.adresse}
													</span>
												</TableCell>
												<TableCell align='right'>
													<span className='font-bold'>
														{moment(service.parent_end).format('HH:mm')}
													</span>{' '}
													de{' '}
													<span className='font-bold'>
														{_.find(campRes, (o) => o.id_camp_res === service.adr_arrivee).nom +
															' - ' +
															_.find(campRes, (o) => o.id_camp_res === service.adr_arrivee)
																.adresse}
													</span>
												</TableCell>
											</TableRow>
										))}
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

export default TrajetsInvoiceDialog;
