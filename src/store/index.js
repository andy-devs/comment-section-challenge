import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments.slice';
import userReducer from './user.slice';
import uiReducer from './ui.slice';

const store = configureStore({
	reducer: {
		comments: commentsReducer,
		user: userReducer,
		ui: uiReducer,
	},
});

export default store;
