import React from 'react';

export default function ServicesContent({ page }) {
	switch (page) {
		case 'Hébergement':
			return <div>Hébergement</div>;
			break;
		case 'Restauration':
			return <div>Restauration</div>;
			break;
		case 'Transport':
			return <div>Transport</div>;
			break;
		case 'Bourses':
			return <div>Bourses</div>;
			break;
		default:
			return (
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
			break;
	}
}
