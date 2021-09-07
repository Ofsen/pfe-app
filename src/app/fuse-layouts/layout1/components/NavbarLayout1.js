import React from 'react';
import { AppBar, Hidden, Icon } from '@material-ui/core';
import { FuseScrollbars, FuseUtils } from '@fuse';
import clsx from 'clsx';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { authRoles } from 'app/auth';

const useStyles = makeStyles({
	content: {
		overflowX: 'hidden',
		overflowY: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 40px, 100% 10px',
		backgroundAttachment: 'local, scroll',
	},
});

function NavbarLayout1(props) {
	const classes = useStyles();
	const userRole = useSelector(({ auth }) => auth.user.role);

	return (
		<div className={clsx('flex flex-col overflow-hidden h-full', props.className)}>
			<AppBar
				color='primary'
				position='static'
				elevation={0}
				className='flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12'
			>
				<div className='flex flex-1 pr-8'>
					<Logo />
				</div>

				<Hidden mdDown>
					<NavbarFoldedToggleButton className='w-40 h-40 p-0' />
				</Hidden>

				<Hidden lgUp>
					<NavbarMobileToggleButton className='w-40 h-40 p-0'>
						<Icon>arrow_back</Icon>
					</NavbarMobileToggleButton>
				</Hidden>
			</AppBar>

			<FuseScrollbars className={clsx(classes.content)}>
				{FuseUtils.hasPermission(authRoles.user, userRole) && <UserNavbarHeader />}

				<Navigation layout='vertical' />
			</FuseScrollbars>

			<div className='flex flex-1 items-end justify-center py-12 font-normal'>
				<a href='https://github.com/ofsen' style={{ color: '#6B7280' }}>
					<Icon style={{ fontSize: 14 }}>star</Icon>
				</a>
			</div>
		</div>
	);
}

export default NavbarLayout1;
