import React, { useRef, useEffect, useState } from 'react';
import { Hidden, Icon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple } from '@fuse';
import SidebarContent from './SidebarContent';
import ServicesContent from './ServicesContent';

const useStyles = makeStyles({
	layoutRoot: {},
});

const Services = (props) => {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [page, setPage] = useState('');

	useEffect(() => {
		if (Object.entries(props.match.params).length !== 0) {
			setPage(props.match.params.label);
		} else {
			setPage('Accueil');
		}
	}, [props.match.params]);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot,
			}}
			header={
				<div className='flex flex-col flex-1'>
					<div className='flex items-center pr-12 lg:pr-24 p-24'>
						<div className='flex-1'>{page === 'Accueil' ? <h1>Informations générales</h1> : <h1>{page}</h1>}</div>
						<Hidden lgUp>
							<IconButton
								onClick={(ev) => pageLayout.current.toggleRightSidebar()}
								aria-label='open left sidebar'
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
					</div>
				</div>
			}
			content={
				<div className='p-24'>
					<ServicesContent page={page} />
				</div>
			}
			rightSidebarContent={
				<div className='p-24'>
					<h4>Menu</h4>
					<br />
					<SidebarContent />
				</div>
			}
			sidebarInner
			ref={pageLayout}
		/>
	);
};

export default Services;
