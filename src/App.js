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

	const addNewComment = (text) => {
		const newComment = {
			user: { image: currentUser.image, username: currentUser.username },
			content: text,
			score: 0,
			createdAt: '1 minute ago',
			replies: [],
		};
		setComments((prev) => {
			return [...comments, newComment];
		});
	};

	return (
		<div className='main'>
			<CommentsList comments={comments} currentUser={currentUser} />
			<CommentForm currentUser={currentUser} addNewComment={addNewComment} />
		</div>
	);
}

export default App;
