import Comment from './Comment';
import styles from './CommentsList.module.css';
import RepliesList from './RepliesList';

const CommentsList = ({ comments, currentUser, addNewReply }) => {
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
								addNewReply={addNewReply}
							/>
							{comment.replies.length > 0 && (
								<RepliesList
									commentId={comment.id}
									replies={comment.replies}
									currentUser={currentUser}
									addNewReply={addNewReply}
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
