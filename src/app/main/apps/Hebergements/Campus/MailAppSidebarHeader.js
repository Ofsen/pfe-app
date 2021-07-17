import React from 'react';
import { Icon } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function MailAppSidebarHeader() {
	return (
		<div className='flex flex-col justify-center h-full p-24'>
			<div className='flex items-center flex-1'>
				<FuseAnimate animation='transition.expandIn' delay={300}>
					<Icon className='mr-16 text-32'>business</Icon>
				</FuseAnimate>
				<FuseAnimate animation='transition.slideLeftIn' delay={300}>
					<span className='text-24'>Campus</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default MailAppSidebarHeader;
