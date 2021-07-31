import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import BoursesHeader from './BoursesHeader';
import BoursesTable from './BoursesTable';
import reducer from './store/reducers';

function Bourses() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={<BoursesHeader />}
			content={<BoursesTable />}
			innerScroll
		/>
	);
}

export default withReducer('bourses', reducer)(Bourses);
