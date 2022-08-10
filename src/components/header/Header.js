import React from 'react';

import './Header.css';
import { InfoBar } from '../infoBar/InfoBar';
import { ControlButtons } from '../controlButtons/ControlButtons';
import { StatusFilter } from '../statusFilters/StatusFilters';
import { ColorFilters } from '../colorFilters/ColorFilters';
import { StatusFilters, dropFilters } from '../../redux/slices/filtersSlice';
import { availableColors } from '../../redux/slices/filtersSlice';
import { todoDeleteAll, completedTodosCleared, allTodosCompleted, allTodosActive } from '../../redux/slices/todosSlice';

const filters = Object.values(StatusFilters);
const colors = availableColors;
const buttons = {
	'Mark all as active': allTodosActive,
	'Mark all as completed': allTodosCompleted,
	'Delete completed': completedTodosCleared,
	'Delete all': todoDeleteAll,
	'Drop filters': dropFilters
};

export function Header() {
	return (
		<header>
			<h1>Todo App</h1>
			<div className='panel'>
				<div className='todosInfo'>
					<InfoBar />
				</div>
				<div className='controlButtons'>
					{Object.entries(buttons).map(([text, action]) =>
						<ControlButtons
							key={text} 
							buttonProps={{text, action}}/>
					)}
				</div>
				<div className='statusFilters'>
					{filters.map((filter) =>
						<StatusFilter
							key={filter}
							filter={filter} />
					)}
				</div>
				<div className='colorFilters'>
					{colors.map((color) =>
						<ColorFilters
							key={color}
							color={color} />
					)}
				</div>
			</div>
		</header>
	);
}