import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import DossiersBourseHeader from './DossiersBourseHeader';
import DossiersBourseTable from './DossiersBourseTable';
import reducer from './store/reducers';

function DossiersBourse() {
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
