import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import clsx from 'clsx';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut,
				}),
			},
		},
	},
	avatar: {
		width: 72,
		height: 72,
		position: 'absolute',
		top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut,
		}),
		'& > img': {
			borderRadius: '50%',
		},
	},
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);

	const classes = useStyles();

	return (
		<AppBar
			position='static'
			color='primary'
			elevation={0}
			classes={{ root: classes.root }}
			className='user relative flex flex-col items-center justify-center pt-8 pb-32 z-0'
		>
			<Typography className='email text-13 opacity-50 whitespace-no-wrap' color='inherit'>
				Connecté en tant que
			</Typography>
			<Typography className='username text-16  whitespace-no-wrap' color='inherit'>
				{user.data.displayName}
			</Typography>
		</AppBar>
	);
}

export default UserNavbarHeader;
