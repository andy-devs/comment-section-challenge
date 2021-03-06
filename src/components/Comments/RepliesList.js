import Comment from './Comment';
import styles from './RepliesList.module.css';

const RepliesList = ({ replies, currentUser, commentId }) => {
	return (
		<div className={styles.replies}>
			{replies.map((reply) => (
				<Comment
					key={reply.id}
					id={reply.id}
					createdAt={reply.createdAt}
					score={reply.score}
					user={reply.user}
					content={reply.content}
					replyingTo={reply.replyingTo}
					currentUser={currentUser}
					commentId={commentId}
				/>
			))}
		</div>
	);
};

export default RepliesList;
