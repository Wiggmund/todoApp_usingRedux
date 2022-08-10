import { createSlice } from '@reduxjs/toolkit';


export const StatusFilters = {
	All: 'all',
	Active: 'active',
	Completed: 'completed',
}

export const availableColors = ['green', 'blue', 'orange', 'purple', 'red']


const initialState = {
	status: StatusFilters.All,
	colors: [],
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		statusFilterChanged(state, action) {
			state.status = action.payload;
		},
		colorFilterChanged: {
			reducer(state, action) {
				const {color, changeType} = action.payload;
				const colors = state.colors;
				switch (changeType) {
				case 'added':
					if (!colors.includes(color)) {
						colors.push(color);
					}
				break;
				case 'removed':
					state.colors = colors
						.filter((existingColor) =>
							existingColor !== color);
					break;
				default:
					return;
				}
			},
			prepare(color, changeType) {
				return {
					payload: {color, changeType}
				};
			}
		},
		dropFilters(state, action) {
			return state = initialState;
		}
	}
});

export const {
	statusFilterChanged,
	colorFilterChanged,
	dropFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilterStatus = (state) => state.filters.status;
export const selectFilterColors = (state) => state.filters.colors;