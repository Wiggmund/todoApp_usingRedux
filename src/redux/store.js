import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './slices/todosSlice';
import filtersReducer from './slices/filtersSlice';


const store = configureStore({
	reducer: {
		todos: todosReducer,
		filters: filtersReducer
	}
});

export default store;