import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import TodoList from './TodoList';
import TodoToolbar from './TodoToolbar';
import TodoHeader from './TodoHeader';
import TodoSidebarContent from './TodoSidebarContent';
import TodoDialog from './TodoDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function Hebergements(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getFilters());
		dispatch(Actions.getFolders());
		dispatch(Actions.getLabels());
	}, [dispatch]);

	useEffect(() => {
		dispatch(Actions.getTodos(props.match.params));
	}, [dispatch, props.match.params]);

	return (
		<React.Fragment>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					rightSidebar: 'ml-24',
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				contentToolbar={<TodoToolbar />}
				content={<TodoList history={props.history} />}
				// rightSidebarHeader={<TodoSidebarHeader />}
				rightSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
				// innerScroll
			/>
			<TodoDialog />
		</React.Fragment>
	);
}

export default withReducer('hebergements', reducer)(Hebergements);
