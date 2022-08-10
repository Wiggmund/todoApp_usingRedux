import {useSelector} from 'react-redux';
import './InfoBar.css';
import { selectActiveTodos, selectCompletedTodos } from '../../redux/slices/todosSlice';

export function InfoBar() {
	const activeTodos = useSelector(selectActiveTodos).length;
	const completedTodos = useSelector(selectCompletedTodos).length;
	const allTodos = activeTodos + completedTodos;
	return (
		<div className='infoBar'>
			<div className="infoBar__item">
				<h4>All task</h4>
				<p>{allTodos}</p>	
			</div>
			<div className="infoBar__item">
				<h4>Active task</h4>
				<p>{activeTodos}</p>	
			</div>
			<div className="infoBar__item">
				<h4>Completed</h4>
				<p>{completedTodos}</p>	
			</div>
		</div>
	);
}