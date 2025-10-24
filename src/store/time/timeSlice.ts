import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialState {
	checkedTimeRecords: number[];
}

const timeSlice = createSlice({
	name: 'time',
	initialState: {
		checkedTimeRecords: [],
	} as initialState,
	reducers: {
		checkTimeRecord: (state, action: PayloadAction<{ checked: boolean; timeRecordId: number }>) => {
			const { checked, timeRecordId } = action.payload;

			if (checked) {
				state.checkedTimeRecords.push(timeRecordId);
			} else {
				state.checkedTimeRecords = state.checkedTimeRecords.filter((id) => id !== timeRecordId);
			}
		},
		checkGroupTimeRecords: (state, action: PayloadAction<{ checked: boolean; timeRecords: ITimeRecord[] }>) => {
			const { checked, timeRecords } = action.payload;

			if (checked) {
				timeRecords.forEach((timeRecord) => state.checkedTimeRecords.push(timeRecord.id));
			} else {
				timeRecords.forEach(
					(timeRecord) => (state.checkedTimeRecords = state.checkedTimeRecords.filter((id) => id !== timeRecord.id))
				);
			}
		},
		clearCheckedTimeRecords: (state) => {
			state.checkedTimeRecords = [];
		},
	},
});

export const { checkTimeRecord, checkGroupTimeRecords, clearCheckedTimeRecords } = timeSlice.actions;

export default timeSlice.reducer;
