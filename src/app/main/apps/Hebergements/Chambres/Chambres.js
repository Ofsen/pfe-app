import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import TodoList from './components/TodoList';
import TodoToolbar from './components/TodoToolbar';
import TodoHeader from './components/TodoHeader';
import TodoSidebarContent from './components/TodoSidebarContent';
import TodoDialog from './components/TodoDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function Chambres(props) {
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
				rightSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
			/>
			<TodoDialog />
		</React.Fragment>
	);
}

export default withReducer('chambres', reducer)(Chambres);
