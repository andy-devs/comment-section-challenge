import Comment from './Comment';
import styles from './CommentsList.module.css';
import RepliesList from './RepliesList';

const CommentsList = ({ comments, currentUser }) => {
	return (
		<div className={styles.comments}>
			{comments.length === 0 ? (
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
								currentUser={currentUser}
							/>
							{comment.replies.length > 0 && (
								<RepliesList
									replies={comment.replies}
									currentUser={currentUser}
								/>
							)}
						</>
					);
				})
			)}
		</div>
	);
};

export default CommentsList;
