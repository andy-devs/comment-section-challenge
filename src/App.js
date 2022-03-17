import { useEffect, useState } from 'react';
import CommentsList from './components/Comments/CommentsList';

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

	return (
		<>
			<CommentsList comments={comments} currentUser={currentUser} />
		</>
	);
}

export default App;
