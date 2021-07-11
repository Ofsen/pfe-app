import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
// import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import Auth0LoginTab from './tabs/Auth0LoginTab';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'white',
		color: theme.palette.primary.dark,
	},
}));

function Login() {
	const classes = useStyles();
	// const [selectedTab, setSelectedTab] = useState(0);

	// function handleTabChange(event, value) {
	// 	setSelectedTab(value);
	// }

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0')}>
			<div className='flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
				<FuseAnimate animation='transition.expandIn'>
					<img className='w-128 mb-32' src='assets/images/logos/ummto.png' alt='logo' />
				</FuseAnimate>

				<FuseAnimate animation='transition.slideUpIn' delay={300}>
					<Typography variant='h3' color='inherit' className='font-light'>
						Bienvenue Au Site De La Direction des Œuvres Universitaires Tizi ouzou Tamda
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={400}>
					<Typography variant='subtitle1' color='inherit' className='max-w-512 mt-16 text-gray-700'>
						La Direction des Œuvres Universitaires Tizi ouzou Tamda est crée en vertu de Arrêté interministériel du
						8 Joumada El Oula 1437 correspondant au 17 février 2016 modifiant et complétant l'arrêté
						interministériel du 10 Dhou El Kaâda 1425 correspondant au 22 décembre 2004 portant création des
						directions des oeuvres universitaires et fixation de leur siège, de la liste et de la consistance des
						résidences universitaires qui leur sont rattachées.
					</Typography>
				</FuseAnimate>
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className='w-full max-w-400 mx-auto m-16 md:m-0' square>
					<CardContent className='flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 '>
						<Typography variant='h6' className='text-center md:w-full mb-48'>
							CONNECTEZ VOUS A VOTRE COMPTE
						</Typography>

						{/* <Tabs value={selectedTab} onChange={handleTabChange} variant='fullWidth' className='mb-32'>
							<Tab
								icon={
									<img
										className='h-40 p-4 bg-black rounded-12'
										src='assets/images/logos/jwt.svg'
										alt='firebase'
									/>
								}
								className='min-w-0'
								label='JWT'
							/>
							<Tab
								icon={<img className='h-40' src='assets/images/logos/firebase.svg' alt='firebase' />}
								className='min-w-0'
								label='Firebase'
							/>
							<Tab
								icon={<img className='h-40' src='assets/images/logos/auth0.svg' alt='auth0' />}
								className='min-w-0'
								label='Auth0'
							/>
						</Tabs> */}

						<JWTLoginTab />

						{/* {selectedTab === 0 && <JWTLoginTab />}
						{selectedTab === 1 && <FirebaseLoginTab />}
						{selectedTab === 2 && <Auth0LoginTab />} */}

						<div className='flex flex-col items-center justify-center pt-32'>
							<span className='font-medium'>Pas encore enregistrer?</span>
							<Link className='font-medium' to='/register'>
								Créer un compte
							</Link>
							<Link className='font-medium mt-8' to='/'>
								Revenir a l'accueil
							</Link>
						</div>
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default Login;
