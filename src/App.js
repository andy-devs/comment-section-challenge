import { useEffect } from 'react';
import CommentsList from './components/Comments/CommentsList';
import CommentForm from './components/Forms/CommentForm';

function App() {
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch('data.json');
	// 			const data = await response.json();
	// 			const fetchedComments = await data.comments;
	// 			const fetchedCurrentUser = await data.currentUser;
	// 			setComments(fetchedComments);
	// 			setCurrentUser(fetchedCurrentUser);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	return (
		<div className='main'>
			<CommentsList />
			<CommentForm />
		</div>
	);
}

export default App;
