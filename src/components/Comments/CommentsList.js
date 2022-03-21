import Comment from './Comment';
import { Oval } from 'react-loader-spinner';
import styles from './CommentsList.module.css';
import RepliesList from './RepliesList';
import { useSelector } from 'react-redux';

const CommentsList = () => {
	const comments = useSelector((state) => state.comments.items);
	const loader = useSelector((state) => state.ui.loader);

	return (
		<div className={styles.comments}>
			{loader ? (
				<div
					style={{
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'center',
					}}>
					<Oval
						ariaLabel='loading-indicator'
						height={100}
						width={100}
						strokeWidth={4}
						color='hsl(238, 40%, 52%)'
						secondaryColor='hsl(239, 57%, 85%)'
					/>
				</div>
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
