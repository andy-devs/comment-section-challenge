import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		loader: false,
	},
	reducers: {
		toggleLoader(state, action) {
			state.loader = !state.loader;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
