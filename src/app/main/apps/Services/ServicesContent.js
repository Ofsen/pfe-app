import React from 'react';
import { FuseAnimate } from '@fuse';
import { Typography, Table, TableRow, TableCell } from '@material-ui/core';

export default function ServicesContent({ page }) {
	let content = (
		<div className='p-24'>
			<h1 className='pb-2'>L'organisation administrative</h1>
			<p className='pb-40'>
				L'organisation administrative de la direction des oeuvres universitaires Tiziouzou Tamda est établie en
				application du décret exécutif n° 95⁄84 du 22⁄03⁄95 modifié et complété et de l'arrêté interministériel
				n°85⁄2003 du 20⁄12⁄2003.
				<i> Elle est composée de quatre départements :</i>
			</p>
			<h3 className='pb-2'>1. Le département des ressources humaines :</h3>
			<ul className='pb-24'>
				<li>Service de la gestion des carrières</li>
				<li>Service de la formation et de perfectionnement</li>
			</ul>
			<h3 className='pb-2'>2. Le département du controle et de la coordination :</h3>
			<ul className='pb-24'>
				<li>Service du transport</li>
				<li>Service de la restauration</li>
				<li>Service hébergement</li>
				<li>Service des activité scientifiques, culturelles et sportives</li>
			</ul>
			<h3 className='pb-2'>3. Le département des bourses : </h3>
			<ul className='pb-24'>
				<li>Service de l'attribution des bourses</li>
				<li>Service du renouvellement des bourses</li>
			</ul>
			<h3 className='pb-2'>4. Le département des finances et des marchés publics :</h3>
			<ul className='pb-24'>
				<li>Service du budget et de la comptabilité </li>
				<li>Service des marchés publics </li>
				<li>Service du suivi des opérations de construction et de l'équipement </li>
			</ul>
		</div>
	);

	switch (page) {
		case 'Hébergement':
			content = (
				<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
					<FuseAnimate animation='transition.slideUpIn' delay={300}>
						<Typography variant='h3' color='inherit' className='font-light'>
							Hébergement
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Les conditions d'attribution d'une chambre universitaire: Le bénéficier de l'hébergement en
							résidence universitaire est subordonné aux conditions suivantes:
							<ol>
								<li>
									être inscrit à l'une des filières de l'enseignement supérieur et de la recherche
									scientifique à l'université MOULOUD MAMMERI de Tizi-Ouzou.
								</li>
								<li>Agé(e) de moins de 28 ans.</li>
								<li>
									Résidence familiale à plus de 30 km pour les filles et à plus de 50 km pour les garçons.
								</li>
							</ol>
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Une fois votre demande d'hébergement accordée selon les conditions énumérées précédemment, vous
							prendrez connaissance de votre résidence d'affectation soit:
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							<a href='http://dou-tamda.dz/fiches/dossier%20hebergement.pdf'>
								Constititution de dossier d'hébergement
							</a>
						</Typography>
					</FuseAnimate>
				</div>
			);
			break;
		case 'Restauration':
			content = (
				<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
					<FuseAnimate animation='transition.slideUpIn' delay={300}>
						<Typography variant='h3' color='inherit' className='font-light'>
							Restauration
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							La direction des oeuvres universiataires Tamda assure les repas des étudiants internes et externes.
							la Plupart des résidences universitaires comporte un espace restaurant: Le restaurant sis au compus
							universitaire Tamda:
							<ul>
								<li>RU TAMEDA1</li>
								<li>RU TAMEDA2</li>
								<li>RU TAMEDA3</li>
								<li>RU TAMEDA4</li>
								<li>RU TAMEDA5</li>
							</ul>
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Les résidents bénificient d'un petit déjeuner et de deux repas par jour: (déjeuner et le dinner).
							1.20DA est le Prix de repas, 0.50DA est Prix de petit déjeuner.
						</Typography>
					</FuseAnimate>
				</div>
			);
			break;
		case 'Transport':
			content = (
				<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
					<FuseAnimate animation='transition.slideUpIn' delay={300}>
						<Typography variant='h3' color='inherit' className='font-light'>
							Transport
						</Typography>
					</FuseAnimate>

					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Le transport universitaire est constitué en deux parties:
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Le Transport universitaire Urbain: Assure le transport des étudiants (es) de la Résidence
							Universitaire vers les campus pédagogiques.
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Le Transport universitaire Sub-Urbain: Est un palliatif à l'hebergement, il permet de garantir le
							déplacement des etudiants de leurs adresses personnelles vers les campus pédagogiques.
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Notre direction compte 5 298 abonnés(es) aux transport urbain et 1 800 abonné(es) sub-urbain, le
							transport urbain est assuré par la direction des oeuvres universitaires Hasnaoua T.O, et le
							sub-urbain par la direcion des oeuvres universitaires Centre T.O.
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Les pieces à fournir pour le dossier de transport sont:
							<ol>
								<li>Une copie du certificat de scolarité de l'année universitaire en cours.</li>
								<li>Deux (02) photos d'identité.</li>
								<li>Photocopie de la carte Nationale d'identité ou du permis de conduire.</li>
								<li>Frais d'inscription (abonnement) au transport.</li>
								<li>Fiche de Résidence.</li>
							</ol>
						</Typography>
					</FuseAnimate>
				</div>
			);
			break;
		case 'Bourses':
			content = (
				<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
					<FuseAnimate animation='transition.slideUpIn' delay={300}>
						<Typography variant='h3' color='inherit' className='font-light'>
							Bourse universitaire
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Tout étudiant inscrit à l&apos;université de Tizi-Ouzou (campus sis Tamda) a le droit de déposer une
							demande de bourse universitaire auprès de notre d&eacute;partement des bourses.
						</Typography>
					</FuseAnimate>

					<FuseAnimate animation='transition.slideUpIn' delay={300}>
						<Typography variant='h3' color='inherit' className='font-light mt-32'>
							Conditions d'attribution de bourse
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Une bourse est attribuée à tout étudiant inscrit dont les parents justifient d’un revenu mensuel net
							cumulé inférieur ou égal à huit (08) fois le salaire national Minimum garanti (SNMG).
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							Cette bourse peut continuer à être servie pendant le cursus universitaire, pour le cas de
							redoublement elle sera suspendu en cas d'un deuxième échec, et elle ne sera rétablie qu'en cas de
							passage en année supérieur.
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							{' '}
							le Montant de la bourse est fixé trimestriellement pendant une durée du cycle de formation comme
							suit:
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							<Table>
								<TableRow>
									<TableCell width='20%' height='50%'>
										<strong>Etudiant inscris en graduation</strong>
									</TableCell>
									<TableCell width='70%' height='50%' border='1'>
										<ul>
											<li>
												<span color='red'> 4 050.00 DA </span>pour les étudiants dont les parents
												justifient d’un revenu mensuel net cumulé inférieur ou égal à quatre (04) fois
												SNMG{' '}
											</li>
											<li>
												<span color='red'> 3 600.00 DA </span> pour les étudiants dont les parents
												justifient d’un revenu mensuel net cumulé supérieur à quatre (04) fois SNMG et
												inférieur ou égal à Sept (07) fois SNMG
											</li>
											<li>
												<span color='red'>2 700.00 DA</span> pour les étudiants dont les parents
												justifient d’un revenu mensuel net cumulé supérieur à Sept (07) fois SNMG et
												inférieur ou égal à Huit (08) fois SNMG
											</li>
										</ul>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell width='20%'>
										<strong>Etudiants inscrits en Post-Graduation ou en Master </strong>
									</TableCell>
									<TableCell width='50%'>
										<ul>
											<li>
												Etudiants en 1ere année : <font color='red'>5 850.00 DA</font> / trimestre
											</li>
											<li>
												Etudiants en 2eme année :<font color='red'> 7 200.00 DA </font>/ trimestre
											</li>
										</ul>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell width='25%'>
										<strong>Etudiants inscrits en Doctorat</strong>
									</TableCell>
									<TableCell width='50%'>
										<ul>
											<li>
												Une bourse de <font color='red'>12 000.00 DA </font>/ Mois
											</li>
										</ul>
									</TableCell>
								</TableRow>
							</Table>
						</Typography>
					</FuseAnimate>
					<FuseAnimate delay={400}>
						<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
							<a href='http://dou-tamda.dz/dossierbourse.html'>
								<strong>Constitution de dossier de Bourse</strong>
							</a>
							<br />
							<a href='http://dou-tamda.dz/renouvellementbourse.html'>
								<strong>Renouvellement du dossier de bourse</strong>
							</a>
							<br />
							<a href='http://dou-tamda.dz/transfertbourse.html'>
								<strong>Transfert du dossier de bourse</strong>
							</a>
						</Typography>
					</FuseAnimate>
				</div>
			);
			break;
		default:
			break;
	}

	return content;
}
