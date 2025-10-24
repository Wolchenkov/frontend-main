import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
interface Host {
	host: string;
}

const initialState: Host = {
	host: '',
};

const hostSlice = createSlice({
	name: 'host',
	initialState,
	reducers: {
		setCurrentHost: (state, { payload }) => {
			state.host = payload;
		},
	},
});

export const { setCurrentHost } = hostSlice.actions;

export default hostSlice.reducer;

export const selectCurrentHost = (state: RootState) => state.host.host;
