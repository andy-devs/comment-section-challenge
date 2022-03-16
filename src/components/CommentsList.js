import Comment from './Comment';
import styles from './CommentsList.module.css';
import { useEffect, useState } from 'react';

const CommentsList = () => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await fetch('data.json');
				const data = await response.json();
				const fetchedComments = await data.comments;
				setComments(fetchedComments);
			} catch (err) {
				console.log(err);
			}
		};

		fetchComments();
	}, []);

	return (
		<div className={styles.comments}>
			{comments.length === 0 ? (
				<p>No comments</p>
			) : (
				comments.map((comment) => {
					return (
						<Comment
							key={comment.id}
							id={comment.id}
							createdAt={comment.createdAt}
							score={comment.score}
							user={comment.user}
							content={comment.content}
							replies={comment.replies}
						/>
					);
				})
			)}
		</div>
	);
};

export default CommentsList;
