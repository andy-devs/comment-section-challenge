import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	image: {
		png: './images/avatars/image-juliusomo.png',
		webp: './images/avatars/image-juliusomo.webp',
	},
	username: 'juliusomo',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
