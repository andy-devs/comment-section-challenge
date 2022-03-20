import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		id: 1,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: '1 month ago',
		score: 12,
		user: {
			image: {
				png: './images/avatars/image-amyrobson.png',
				webp: './images/avatars/image-amyrobson.webp',
			},
			username: 'amyrobson',
		},
		replies: [],
	},
	{
		id: 2,
		content:
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
		createdAt: '2 weeks ago',
		score: 5,
		user: {
			image: {
				png: './images/avatars/image-maxblagun.png',
				webp: './images/avatars/image-maxblagun.webp',
			},
			username: 'maxblagun',
		},
		replies: [
			{
				id: 3,
				content:
					"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
				createdAt: '1 week ago',
				score: 4,
				replyingTo: 'maxblagun',
				user: {
					image: {
						png: './images/avatars/image-ramsesmiron.png',
						webp: './images/avatars/image-ramsesmiron.webp',
					},
					username: 'ramsesmiron',
				},
			},
			{
				id: 4,
				content:
					"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
				createdAt: '2 days ago',
				score: 2,
				replyingTo: 'ramsesmiron',
				user: {
					image: {
						png: './images/avatars/image-juliusomo.png',
						webp: './images/avatars/image-juliusomo.webp',
					},
					username: 'juliusomo',
				},
			},
		],
	},
];

const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialState,
	reducers: {
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
			state.push(newComment);
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
				const commentWithReplyId = state.findIndex(
					(comment) => comment.id === action.payload.id
				);
				state[commentWithReplyId].replies.push(newReply);
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.findIndex(
					(comment) => comment.id === action.payload.commentId
				);
				const commentAllReplies = state[commentWithReplyIndex].replies;
				const replyingToIndex = commentAllReplies.findIndex(
					(reply) => reply.id === action.payload.id
				);
				state[commentWithReplyIndex].replies.splice(
					replyingToIndex + 1,
					0,
					newReply
				);
			}
		},

		deleteHandler(state, action) {
			if (!action.payload.commentId) {
				state = state.filter((comment) => comment.id !== action.payload.id);
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.findIndex(
					(comment) => comment.id === action.payload.commentId
				);

				state[commentWithReplyIndex].replies = state[
					commentWithReplyIndex
				].replies.filter((reply) => reply.id !== action.payload.id);
			}
		},

		editHandler(state, action) {
			if (!action.payload.commentId) {
				const updatedCommentIndex = state.findIndex(
					(comment) => comment.id === action.payload.id
				);
				state[updatedCommentIndex].content = action.payload.content;
				state[updatedCommentIndex].createdAt = action.payload.createdAt;
			} else if (action.payload.commentId) {
				const commentWithReplyIndex = state.findIndex(
					(comment) => comment.id === action.payload.commentId
				);
				const updatedReply = state[commentWithReplyIndex].replies.findIndex(
					(reply) => reply.id === action.payload.id
				);
				state[commentWithReplyIndex].replies[updatedReply].content =
					action.payload.content;
				state[commentWithReplyIndex].replies[updatedReply].createdAt =
					action.payload.createdAt;
			}
		},
	},
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
