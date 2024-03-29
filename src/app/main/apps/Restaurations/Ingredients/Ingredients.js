import React, { useEffect, useRef } from 'react';
import { FusePageSimple, FuseUtils } from '@fuse';
import withReducer from 'app/store/withReducer';
import ContactsList from './ContactsList';
import ContactsHeader from './ContactsHeader';
import IngredientDialog from './IngredientDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { authRoles } from 'app/auth';

function Ingredients(props) {
	const dispatch = useDispatch();
	const userRole = useSelector(({ auth }) => auth.user.role);

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getContacts(props.match.params));
	}, [dispatch, props.match.params]);

	return FuseUtils.hasPermission(authRoles.staff, userRole) ? (
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
	) : (
		window.location.replace('/')
	);
}

export default withReducer('restauration', reducer)(Ingredients);
