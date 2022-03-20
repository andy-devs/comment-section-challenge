import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments.slice';
import userReducer from './user.slice';

const store = configureStore({
	reducer: {
		comments: commentsReducer,
		user: userReducer,
	},
});

export default store;
