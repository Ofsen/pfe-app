import React, { useEffect, useRef } from 'react';
import { FusePageSimple } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import ContactsList from './ContactsList';
import ContactsHeader from './ContactsHeader';
import IngredientDialog from './IngredientDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function Ingredients(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getContacts(props.match.params));
	}, [dispatch, props.match.params]);

	useEffect(() => {
		dispatch(Actions.getContacts(props.match.params));
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
				header={<ContactsHeader pageLayout={pageLayout} />}
				content={<ContactsList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<IngredientDialog />
		</React.Fragment>
	);
}

export default withReducer('ingredients', reducer)(Ingredients);
