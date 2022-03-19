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
		const newComment = {
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

	const addNewReply = (text, date, user, id) => {
		const newReply = {
			user: { image: currentUser.image, username: currentUser.username },
			content: text,
			score: 0,
			createdAt: date,
			replyingTo: user.username,
		};
		const commentWithReplyId = comments.findIndex(
			(comment) => comment.id === id
		);
		const commentsCopy = [...comments];
		commentsCopy[commentWithReplyId].replies.push(newReply);
		setComments(commentsCopy);
	};

	return (
		<div className='main'>
			<CommentsList
				comments={comments}
				currentUser={currentUser}
				addNewReply={addNewReply}
			/>
			<CommentForm currentUser={currentUser} addNewComment={addNewComment} />
		</div>
	);
}

export default App;
