import { useEffect } from 'react';
import CommentsList from './components/Comments/CommentsList';
import CommentForm from './components/Forms/CommentForm';
import { useSelector, useDispatch } from 'react-redux';
import { sendCommentsData, fetchCommentsData } from './store/comments.actions';

let isInitial = true;

function App() {
	const comments = useSelector((state) => state.comments);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCommentsData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		dispatch(sendCommentsData(comments));
	}, [comments, dispatch]);

	return (
		<div className='main'>
			<CommentsList />
			<CommentForm />
		</div>
	);
}

export default App;
