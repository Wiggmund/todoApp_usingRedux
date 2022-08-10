import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './TodoList.css';
import { TodoListItem } from '../todoListItem/TodoListItem';
import { selectFilteredTodoIds, todoAdded } from '../../redux/slices/todosSlice';

export function TodoList() {
	const [value, setValue] = useState('');
	const todosId = useSelector(selectFilteredTodoIds);
	const dispatch = useDispatch();
	const handleChange = (e) => setValue(e.target.value);
	const handleKeyDown = (e) => {
		const trimmedText = e.target.value;
		if (trimmedText && e.key === 'Enter') {
			dispatch(todoAdded(trimmedText));
			setValue('');
		}
	};
	return (
		<main>
			<input
				className='todoInput'
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}/>
			<div className="todoItems">
				{todosId.map((todoId) =>
					<TodoListItem
						key={todoId}
						id={todoId} />
				)}
			</div>
		</main>
	);
}