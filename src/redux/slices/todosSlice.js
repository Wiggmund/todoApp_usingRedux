import { createSlice, createSelector } from '@reduxjs/toolkit';
import { StatusFilters } from './filtersSlice';

const initialState = {
	status: 'idle',
	entities: {
		1: {id: 1, text: 'Todo 1', completed: false, color: 'white'},
		2: {id: 2, text: 'Todo 2', completed: false, color: 'white'},
		3: {id: 3, text: 'Todo 3', completed: false, color: 'white'},
		4: {id: 4, text: 'Todo 4', completed: false, color: 'white'}
	}
};

const nextId = (state) => {
	const currId = Object.keys(state.entities)
		.reduce((acc, id) => {
			return Math.max(acc, id);
		}, 0)

	return currId + 1;
}

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		todoAdded: {
			reducer(state, action) {
				const {text, color} = action.payload;
				const todoId = nextId(state);
				state.entities[todoId] = {
					id: todoId,
					text,
					color,
					completed: false
				};
			},
			prepare(text, color = 'orange') {
				return {
					payload: {text, color}
				};
			}
		},
		todoToggled(state, action) {
			const todoId = action.payload;
			const todo = state.entities[todoId];
			todo.completed = !todo.completed;
		},
		todoColorSelected: {
			reducer(state, action) {
				const {todoId, color} = action.payload;
				state.entities[todoId].color = color;
			},
			prepare(todoId, color) {
				return {
					payload: {todoId, color}
				};
			}
		},
		todoTextChange: {
			reducer(state, action) {
				const {todoId, text} = action.payload;
				state.entities[todoId].text = text;
			},
			prepare(todoId, text) {
				return {
					payload: {todoId, text}
				};
			}
		},
		todoDeleted(state, action) {
			delete state.entities[action.payload];
		},
		allTodosCompleted(state, action) {
			Object.values(state.entities)
				.forEach((todo) => todo.completed = true);
		},
		allTodosActive(state, action) {
			Object.values(state.entities)
				.forEach((todo) => todo.completed = false)
		},
		completedTodosCleared(state, action) {
			Object.values(state.entities)
				.forEach((todo) => {
					if (todo.completed) {
						delete state.entities[todo.id];
					}
				});
		},
		todoDeleteAll(state, action) {
			Object.values(state.entities)
				.forEach((todo) => delete state.entities[todo.id]);
		}
	}
});


export const {
	todoAdded,
	todoToggled,
	todoColorSelected,
	todoTextChange,
	todoDeleted,
	allTodosCompleted,
	allTodosActive,
	completedTodosCleared,
	todoDeleteAll
} = todosSlice.actions;

export default todosSlice.reducer;

const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(
	selectTodoEntities,
	(entities) => Object.values(entities)
);

export const selectTodoIds = createSelector(
	selectTodos,
	(todos) => todos.map((todo) => todo.id)
);
export const selectTodoById = (state, todoId) =>
	selectTodoEntities(state)[todoId];

export const selectFilteredTodos = createSelector(
	selectTodos,
	(state) => state.filters,
	(todos, filters) => {
		const { status, colors } = filters
		const showAllCompletions = status === StatusFilters.All
		if (showAllCompletions && colors.length === 0) {
		  return todos
		}
	
		const completedStatus = status === StatusFilters.Completed
		return todos.filter((todo) => {
		  const statusMatches =
			showAllCompletions || todo.completed === completedStatus
		  const colorMatches = colors.length === 0 || colors.includes(todo.color)
		  return statusMatches && colorMatches
		})
	  }
);

export const selectFilteredTodoIds = createSelector(
	selectFilteredTodos,
	(filteredTodos) => filteredTodos.map((todo) => todo.id)
);

export const selectActiveTodos = createSelector(
	selectTodos,
	(todos) => todos
		.filter((todo) => !todo.completed)
		.map((todo) => todo.id)
);

export const selectCompletedTodos = createSelector(
	selectTodos,
	(todos) => todos
		.filter((todo) => todo.completed)
		.map((todo) => todo.id)
);