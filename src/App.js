import { useEffect, useState } from 'react';
import CommentsList from './components/Comments/CommentsList';
import CommentForm from './components/Forms/CommentForm';

function App() {
	const [comments, setComments] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('data.json');
				const data = await response.json();
				const fetchedComments = await data.comments;
				const fetchedCurrentUser = await data.currentUser;
				setComments(fetchedComments);
				setCurrentUser(fetchedCurrentUser);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	const addNewComment = (text, date) => {
		const id = Math.floor(Math.random() * 100000);
		const newComment = {
			id: id,
			user: { image: currentUser.image, username: currentUser.username },
			content: text,
			score: 0,
			createdAt: date,
			replies: [],
		};
		setComments((prev) => {
			return [...comments, newComment];
		});
	};

	const addNewReply = (text, date, user, id, commentId) => {
		const newId = Math.floor(Math.random() * 100000);
		const newReply = {
			id: newId,
			user: { image: currentUser.image, username: currentUser.username },
			content: text,
			score: 0,
			createdAt: date,
			replyingTo: user.username,
		};
		if (!commentId) {
			const commentWithReplyId = comments.findIndex(
				(comment) => comment.id === id
			);
			const commentsCopy = [...comments];
			commentsCopy[commentWithReplyId].replies.push(newReply);
			setComments(commentsCopy);
		} else if (commentId) {
			const commentWithReplyIndex = comments.findIndex(
				(comment) => comment.id === commentId
			);
			const commentsCopy = [...comments];
			const commentAllReplies = commentsCopy[commentWithReplyIndex].replies;
			const replyingToIndex = commentAllReplies.findIndex(
				(reply) => reply.id === id
			);
			commentsCopy[commentWithReplyIndex].replies.splice(
				replyingToIndex + 1,
				0,
				newReply
			);
			setComments(commentsCopy);
		}
	};

	const deleteHandler = (id, commentId) => {
		if (!commentId) {
			const newComments = comments.filter((comment) => comment.id !== id);
			setComments(newComments);
		} else if (commentId) {
			const commentsCopy = [...comments];
			const commentWithReplyIndex = commentsCopy.findIndex(
				(comment) => comment.id === commentId
			);

			commentsCopy[commentWithReplyIndex].replies = commentsCopy[
				commentWithReplyIndex
			].replies.filter((reply) => reply.id !== id);
			setComments(commentsCopy);
		}
	};

	return (
		<div className='main'>
			<CommentsList
				comments={comments}
				currentUser={currentUser}
				addNewReply={addNewReply}
				deleteHandler={deleteHandler}
			/>
			<CommentForm currentUser={currentUser} addNewComment={addNewComment} />
		</div>
	);
}

export default App;
