import React, { Component } from 'react';
import { FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';

class Home extends Component {
	render() {
		return (
			<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
				<FuseAnimate animation='transition.slideUpIn' delay={300}>
					<Typography variant='h3' color='inherit' className='font-light'>
						Bienvenue Au Site De La Direction des Œuvres Universitaires Tizi ouzou Tamda
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={400}>
					<Typography variant='subtitle1' color='inherit' className='mt-16 text-gray-700'>
						La Direction des Œuvres Universitaires Tizi ouzou Tamda est crée en vertu de Arrêté interministériel du
						8 Joumada El Oula 1437 correspondant au 17 février 2016 modifiant et complétant l'arrêté
						interministériel du 10 Dhou El Kaâda 1425 correspondant au 22 décembre 2004 portant création des
						directions des oeuvres universitaires et fixation de leur siège, de la liste et de la consistance des
						résidences universitaires qui leur sont rattachées.
					</Typography>
				</FuseAnimate>
			</div>
		);
	}
}

export default Home;
