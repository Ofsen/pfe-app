import React, { useEffect, useRef } from 'react';
import { FusePageSimple } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import BusList from './BusList';
import BusHeader from './BusHeader';
import BusDialog from './BusDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function Bus(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getBus(props.match.params));
	}, [dispatch, props.match.params]);

	return (
		<React.Fragment>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
				}}
				header={<BusHeader pageLayout={pageLayout} />}
				content={<BusList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<BusDialog />
		</React.Fragment>
	);
}

export default withReducer('transports', reducer)(Bus);
