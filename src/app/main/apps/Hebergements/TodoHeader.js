import React, { useState } from 'react';
import { Hidden, Icon, IconButton, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';

function TodoHeader(props) {
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<ThemeProvider theme={mainTheme}>
			<div className='flex flex-1 h-full p-24 justify-between'>
				<div className='flex items-center flex-1'>
					<FuseAnimate animation='transition.expandIn' delay={300}>
						<Icon className='text-32 mr-16'>hotel</Icon>
					</FuseAnimate>
					<FuseAnimate animation='transition.slideLeftIn' delay={300}>
						<span className='text-24'>Liste des chambres</span>
					</FuseAnimate>
				</div>
				<div className='flex items-center'>
					<Hidden lgUp>
						<Paper className='flex items-center h-48 sm:h-56 p-16 pl-4 pr-4 rounded-8 ' elevation={1}>
							<IconButton
								onClick={(ev) => props.pageLayout.current.toggleRightSidebar()}
								aria-label='ouvrir le menu des filtres'
							>
								<Icon>menu</Icon>
							</IconButton>
						</Paper>
					</Hidden>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default TodoHeader;
