import React from 'react';
import { FusePageCarded, FuseUtils } from '@fuse';
import withReducer from 'app/store/withReducer';
import DossiersBourseHeader from './DossiersBourseHeader';
import DossiersBourseTable from './DossiersBourseTable';
import reducer from './store/reducers';
import { useSelector } from 'react-redux';
import { authRoles } from 'app/auth';

function DossiersBourse() {
	const userRole = useSelector(({ auth }) => auth.user.role);

	if (!FuseUtils.hasPermission(authRoles.staff, userRole)) window.location.replace('/');
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={<DossiersBourseHeader />}
			content={<DossiersBourseTable />}
			innerScroll
		/>
	);
}

export default withReducer('bourses', reducer)(DossiersBourse);
