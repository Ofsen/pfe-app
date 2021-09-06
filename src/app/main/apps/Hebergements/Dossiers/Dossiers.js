import React from 'react';
import { useSelector } from 'react-redux';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import DossiersHeader from './DossiersHeader';
import DossiersTable from './DossiersTable';
import reducer from '../store/reducers';
import { FuseUtils } from '@fuse';
import { authRoles } from 'app/auth';

function Dossiers() {
	const userRole = useSelector(({ auth }) => auth.user.role);

	return FuseUtils.hasPermission(authRoles.staff, userRole) ? (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={<DossiersHeader />}
			content={<DossiersTable />}
			innerScroll
		/>
	) : (
		window.location.replace('/')
	);
}

export default withReducer('hebergements', reducer)(Dossiers);
