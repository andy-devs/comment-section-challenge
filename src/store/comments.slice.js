import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		items: [],
		totalLength: 0,
	},

	reducers: {
		replaceComments(state, action) {
			const comments = action.payload;
			for (let comment of comments.items) {
				console.log(comment);
				if (!comment.hasOwnProperty('replies')) {
					comment.replies = [];
				}
			}
			state.items = comments.items;
			state.totalLength = comments.items.totalLength;
		},
		addNewComment(state, action) {
			const id = Math.floor(Math.random() * 100000);
			const newComment = {
				id: id,
				user: {
					image: action.payload.currentUser.image,
					username: action.payload.currentUser.username,
				},
				content: action.payload.content,
				score: 0,
				createdAt: action.payload.createdAt,
				replies: [],
			};
			state.items.push(newComment);
			state.totalLength++;
		},

		addNewReply(state, action) {
			const newId = Math.floor(Math.random() * 100000);
			const newReply = {
				id: newId,
				user: {
					image: action.payload.currentUser.image,
					username: action.payload.currentUser.username,
				},
				content: action.payload.content,
				score: 0,
				createdAt: action.payload.createdAt,
				replyingTo: action.payload.user.username,
			};
			if (!action.payload.commentId) {
				const commentWithReplyId = state.items.findIndex(
					(comment) => comment.id === action.payload.id
				);
				state.items[commentWithReplyId].replies.push(newReply);
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.items.findIndex(
					(comment) => comment.id === action.payload.commentId
				);
				const commentAllReplies = state.items[commentWithReplyIndex].replies;
				const replyingToIndex = commentAllReplies.findIndex(
					(reply) => reply.id === action.payload.id
				);
				state.items[commentWithReplyIndex].replies.splice(
					replyingToIndex + 1,
					0,
					newReply
				);
			}
			state.totalLength++;
		},

		deleteHandler(state, action) {
			if (!action.payload.commentId) {
				const deletedCommentIndex = state.items.findIndex(
					(comment) => comment.id === action.payload.id
				);
				state.items.splice(deletedCommentIndex, 1);
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.items.findIndex(
					(comment) => comment.id === action.payload.commentId
				);
				state.items[commentWithReplyIndex].replies = state.items[
					commentWithReplyIndex
				].replies.filter((reply) => reply.id !== action.payload.id);
			}
			state.totalLength--;
		},

		editHandler(state, action) {
			if (!action.payload.commentId) {
				const updatedCommentIndex = state.findIndex(
					(comment) => comment.id === action.payload.id
				);
				state.items[updatedCommentIndex].content = action.payload.content;
				state.items[updatedCommentIndex].createdAt = action.payload.createdAt;
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.items.findIndex(
					(comment) => comment.id === action.payload.commentId
				);
				const updatedReply = state.items[
					commentWithReplyIndex
				].replies.findIndex((reply) => reply.id === action.payload.id);
				state.items[commentWithReplyIndex].replies[updatedReply].content =
					action.payload.content;
				state.items[commentWithReplyIndex].replies[updatedReply].createdAt =
					action.payload.createdAt;
			}
		},
	},
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
