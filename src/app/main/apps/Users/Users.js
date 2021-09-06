import React, { useEffect, useRef } from 'react';
import { FusePageSimple, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import UsersList from './UsersList';
import UsersHeader from './UsersHeader';
import IngredientDialog from './UserDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { authRoles } from 'app/auth';

function Users(props) {
	const dispatch = useDispatch();
	const userRole = useSelector(({ auth }) => auth.user.role);
	if (!FuseUtils.hasPermission(authRoles.staff, userRole)) window.location.replace('/');

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getUsers(props.match.params));
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
				header={<UsersHeader pageLayout={pageLayout} />}
				content={<UsersList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<IngredientDialog />
		</React.Fragment>
	);
}

export default withReducer('usersApp', reducer)(Users);
