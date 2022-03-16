import styles from './Comment.module.css';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';

const Comment = (props) => {
	return (
		<div className={styles.comment}>
			<div className={styles['comment__score']}>
				<div className={styles['comment__score-controls']}>
					<img src={IconPlus} alt='plus sign' />
				</div>
				<span className={styles['comment__score-result']}>{props.score}</span>
				<div className={styles['comment__score-controls']}>
					<img src={IconMinus} alt='minus sign' />
				</div>
			</div>
			<div className={styles['comment__content']}>
				<div className={styles['comment__content-user']}>
					<img
						className={styles['comment__content-user__image']}
						src={props.user.image.png}
						alt='user'
					/>
					<span className={styles['comment__content-user__name']}>
						{props.user.username}
					</span>
					<span className={styles['comment__content-user__date']}>
						{props.createdAt}
					</span>
				</div>
				<div className={styles['comment__content-text']}>
					<p className={styles['comment__content-text__message']}>
						{props.content}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
