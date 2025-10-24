import { createSlice } from '@reduxjs/toolkit';

interface initialState {
	currentUploads: { [id: string]: { name: string; loaded: number } };
	newFiles: number[];
}

const uploadsSlice = createSlice({
	name: 'uploads',
	initialState: { currentUploads: {}, newFiles: [] } as initialState,
	reducers: {
		setUploadProgress: (state, action) => {
			const { id, loaded } = action.payload;
			if (state.currentUploads[id]) {
				state.currentUploads[id].loaded = loaded;
			}
		},
		addUploadToList: (state, action) => {
			const { id, name } = action.payload;
			state.currentUploads[id] = { name, loaded: 0 };
		},
		clearUploadedFiles: (state) => {
			for (const id in state.currentUploads) {
				if (state.currentUploads[id].loaded === 100) {
					delete state.currentUploads[id];
				}
			}
		},
		clearCurrentUploads: (state) => {
			state.currentUploads = {};
		},
		addToNewFiles: (state, action) => {
			const { id } = action.payload;
			state.newFiles.push(id);
		},
		removeFromNewFiles: (state, action) => {
			const { id } = action.payload;
			state.newFiles = state.newFiles.filter((value) => value !== id);
		},
	},
});

export const {
	setUploadProgress,
	addUploadToList,
	clearCurrentUploads,
	clearUploadedFiles,
	addToNewFiles,
	removeFromNewFiles,
} = uploadsSlice.actions;

export default uploadsSlice.reducer;
