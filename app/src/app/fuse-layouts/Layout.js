import React, { useContext } from 'react';
import { renderRoutes } from 'react-router-config';
import { FuseScrollbars, FuseSuspense } from '@fuse';
import { makeStyles } from '@material-ui/styles';
import ToolbarLayout from './components/ToolbarLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import clsx from 'clsx';
import AppContext from 'app/AppContext';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3],
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto',
			},
			'& $contentWrapper': {},
			'& $content': {},
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {},
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut,
				}),
			},
		},
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto',
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto',
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2,
	},
}));

function Layout(props) {
	const appContext = useContext(AppContext);
	const classes = useStyles(props);
	const { routes } = appContext;

	return (
		<div id='fuse-layout' className={clsx(classes.root, 'fullwidth', 'scroll-content')}>
			<div className='flex flex-1 flex-col overflow-hidden relative'>
				<div className={classes.wrapper}>
					<NavbarWrapperLayout />

					<div className={classes.contentWrapper}>
						<ToolbarLayout />

						<FuseScrollbars className={classes.content} scrollToTopOnChildChange>
							<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

							{props.children}
						</FuseScrollbars>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
