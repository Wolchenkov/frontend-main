import { createSlice } from '@reduxjs/toolkit';
import { User } from './auth.types';
import { RootState } from '..';

const initialState: User = {
	avatar: null,
	id: 0,
	name: '',
	email: '',
	token: null,
	role: {
		name: '',
		label: '',
	},
	teamId: null,
	permissions: [],
	timers: [],
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('token');
			state.name = '';
			state.email = '';
			state.token = '';
			state.role.name = '';
			state.role.label = '';
			state.teamId = null;
			state.permissions = [];
		},
		checkAuth: (state) => {
			state.token = localStorage.getItem('token');
		},
		setEmail: (state, { payload }) => {
			state.email = payload.email;
		},
		setToken: (state, { payload }) => {
			localStorage.setItem('token', payload.token);
			state.token = payload.token;
		},
		setTimers: (state, { payload }) => {
			state.timers = payload;
		},
	},
});

export const { logout, checkAuth, setToken, setEmail, setTimers } = authSlice.actions;

export default authSlice.reducer;

export const selectTimers = (state: RootState) => state.auth.timers;
export const selectTeamId = (state: RootState) => state.auth.teamId;
// export const selectCurrentHost = (state: RootState) => state.currentHost.host;
