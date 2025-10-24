import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface initialState {
	activeTask: boolean | null;
	activeParentTask: number | undefined;
	filter: {
		status: number | null;
		delegate_id: number | null;
		priority: number | null;
		date_start: [string | null, string | null] | null;
	};
	isFilterOpened: boolean;
	showSubtasks: boolean;
}
const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		activeTask: null,
		activeParentTask: undefined,
		filter: {
			status: null,
			delegate_id: null,
			priority: null,
			date_start: null,
		},
		isFilterOpened: false,
		showSubtasks: false,
	} as initialState,
	reducers: {
		setActiveTask: (state, action) => {
			state.activeTask = action.payload;
		},
		setActiveParentTask: (state, action) => {
			state.activeParentTask = action.payload;
		},
		setFilter: (state, action) => {
			if (Object.keys(action.payload).length === 0) {
				state.filter = {
					status: null,
					delegate_id: null,
					priority: null,
					date_start: null,
				};
			} else {
				state.filter = { ...state.filter, ...action.payload };
			}
		},
		setIsFilterOpened: (state, action) => {
			state.isFilterOpened = action.payload;
		},
		toggleSubtasks: (state) => {
			state.showSubtasks = !state.showSubtasks;
		},
	},
});

export const { setActiveTask, setActiveParentTask, setFilter, setIsFilterOpened, toggleSubtasks } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectActiveParentTask = (state: RootState) => state.tasks.activeParentTask;
export const selectFilter = (state: RootState) => state.tasks.filter;
export const selectIsFilterOpened = (state: RootState) => state.tasks.isFilterOpened;
export const selectShowSubtasks = (state: RootState) => state.tasks.showSubtasks;
