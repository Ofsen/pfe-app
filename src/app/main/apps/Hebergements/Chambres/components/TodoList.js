import React, { useEffect, useState } from 'react';
import { List, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate, FuseAnimateGroup } from '@fuse';
import { useSelector } from 'react-redux';
import _ from '@lodash';
import TodoListItem from './TodoListItem';

function TodoList(props) {
	const todos = useSelector(({ chambres }) => chambres.todos.entities);
	const searchText = useSelector(({ chambres }) => chambres.todos.searchText);
	const orderBy = useSelector(({ chambres }) => chambres.todos.orderBy);
	const orderDescending = useSelector(({ chambres }) => chambres.todos.orderDescending);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function getFilteredArray(entities, searchText) {
			const arr = Object.keys(entities).map((id) => entities[id]);
			if (searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, searchText);
		}

		if (todos) {
			setFilteredData(_.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']));
		}
	}, [todos, searchText, orderBy, orderDescending]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className='flex flex-1 items-center justify-center h-full'>
					<Typography color='textSecondary' variant='h5'>
						Aucune donnée
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<List className='p-0'>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn',
				}}
			>
				{filteredData.map((todo) => (
					<TodoListItem todo={todo} key={todo.id} history={props.history} />
				))}
			</FuseAnimateGroup>
		</List>
	);
}

export default TodoList;
