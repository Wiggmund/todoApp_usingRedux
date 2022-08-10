import {useSelector, useDispatch} from 'react-redux';
import React, { useState } from 'react';

import './TodoListItem.css';
import { CustomCheckbox } from '../customCheckbox/CustomCheckbox';
import { selectTodoById, todoToggled, todoColorSelected, todoDeleted, todoTextChange } from '../../redux/slices/todosSlice';
import { FilterColorAvatar } from '../filterColorAvatar/FilterColorAvatar';
import { basicColorAvatarStyles } from '../../utils/commonStyles';
import { ColorTooltip } from '../colorTooltip/ColorTooltip';


export function TodoListItem(props) {
	const {
		id
	} = props;

	const todoInputRef = React.createRef();
	const cancelMark = './x.png';
	const editMark = './editMark.png';

	const todo = useSelector((state) =>
		selectTodoById(state, id));
	const dispatch = useDispatch();
	
	const [colorTooltip, setColorTooltip] = useState(false);
	const [text, setText] = useState(todo.text);
	
	const handleChangeTodoStatus = (e) => {
		dispatch(todoToggled(props.id));
	}

	const handleDeleteTodo = () => {
		dispatch(todoDeleted(id));
	};
	const handleCloseOrOpenColorTooltip = () => {
		setColorTooltip(!colorTooltip);
	}
	const handleChangeTodoColor = (e, color) => {
		if (color) {
			dispatch(todoColorSelected(id, color))
			handleCloseOrOpenColorTooltip();
		}
	}

	const handleChangeTodoText = (e) => {
		const text = e.target.value;
		dispatch(todoTextChange(id, text))
		setText(text);
	};
	const handleSetFocusForTodoText = (e) => {
		todoInputRef.current.focus();
	}
	
	return (
		<div className='todo'>
			<CustomCheckbox
				height={50}
				width={50}
				borderRadius={'50%'}
				onChange={handleChangeTodoStatus}
				checked={todo.completed}/>
			<input 
				type="text" 
				className={todo.completed ?
					'todo__text todo__finished' :
					'todo__text'}
				value={text}
				onChange={handleChangeTodoText}
				ref={todoInputRef} />
			<img
				src={editMark}
				alt="editMark"
				className='todo__icon'
				onClick={handleSetFocusForTodoText}/>
			<img
				src={cancelMark}
				alt="cancelMark"
				className='todo__icon'
				onClick={handleDeleteTodo}/>
			<FilterColorAvatar
				color={todo.color}
				styles={basicColorAvatarStyles.styles}
				hoverStyles={basicColorAvatarStyles.hoverStyles}
				onClick={handleCloseOrOpenColorTooltip}/>
			{colorTooltip &&
				<ColorTooltip
					onCloseColorTooltip={handleCloseOrOpenColorTooltip}
					onChangeTodoColor={handleChangeTodoColor}/>
			}
		</div>
	);
}