import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		loader: false,
		modal: false,
	},
	reducers: {
		toggleLoader(state, action) {
			state.loader = !state.loader;
		},
		toggleModal(state, action) {
			state.modal = !state.modal;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
