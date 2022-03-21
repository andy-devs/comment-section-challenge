import Comment from './Comment';
import styles from './CommentsList.module.css';
import RepliesList from './RepliesList';
import { useSelector } from 'react-redux';

const CommentsList = () => {
	const comments = useSelector((state) => state.comments.items);
	const totalLength = useSelector((state) => state.comments.totalLength);

	return (
		<div className={styles.comments}>
			{totalLength === 0 ? (
				<p>No comments</p>
			) : (
				comments.map((comment) => {
					return (
						<>
							<Comment
								key={comment.id}
								id={comment.id}
								createdAt={comment.createdAt}
								score={comment.score}
								user={comment.user}
								content={comment.content}
							/>
							{comment.replies.length > 0 && (
								<RepliesList commentId={comment.id} replies={comment.replies} />
							)}
						</>
					);
				})
			)}
		</div>
	);
};

export default CommentsList;
