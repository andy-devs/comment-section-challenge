import styles from './Comment.module.css';
import IconPlus from '../../assets/icon-plus.svg';
import IconMinus from '../../assets/icon-minus.svg';
import IconReply from '../../assets/icon-reply.svg';
import IconEdit from '../../assets/icon-edit.svg';
import IconDelete from '../../assets/icon-delete.svg';
import ReplyForm from '../Forms/ReplyForm';
import { useState } from 'react';

const Comment = (props) => {
	const [score, setScore] = useState(props.score);
	const [upScore, setUpScore] = useState(false);
	const [downScore, setDownScore] = useState(false);
	const [isReplyVisible, setisReplyVisible] = useState(false);

	const upScoreHandler = () => {
		if (downScore) {
			setScore((prev) => ++prev);
			setDownScore(false);
		}
		if (!upScore) {
			setScore((prev) => ++prev);
			setUpScore(true);
		} else {
			setScore((prev) => --prev);
			setUpScore(false);
		}
	};

	const downScoreHandler = () => {
		if (upScore) {
			setScore((prev) => --prev);
			setUpScore(false);
		}
		if (!downScore) {
			setScore((prev) => --prev);
			setDownScore(true);
		} else {
			setScore((prev) => ++prev);
			setDownScore(false);
		}
	};

	const toggleReplyHandler = () => {
		setisReplyVisible((prev) => !prev);
	};

	const deleteComment = () => {
		if (props.commentId) {
			props.deleteHandler(props.id, props.commentId);
		} else {
			props.deleteHandler(props.id);
		}
	};

	return (
		<>
			<div className={styles.comment}>
				<div className={styles['comment__score']}>
					<div
						className={
							upScore
								? styles['comment__score-controls'] +
								  ' ' +
								  styles['comment__score-controls--active']
								: styles['comment__score-controls']
						}
						onClick={upScoreHandler}>
						<img src={IconPlus} alt='plus sign' />
					</div>
					<span className={styles['comment__score-result']}>{score}</span>
					<div
						className={
							downScore
								? styles['comment__score-controls'] +
								  ' ' +
								  styles['comment__score-controls--active']
								: styles['comment__score-controls']
						}
						onClick={downScoreHandler}>
						<img src={IconMinus} alt='minus sign' />
					</div>
				</div>
				<div className={styles['comment__content']}>
					<div className={styles['comment__header']}>
						<div className={styles['comment__content-user']}>
							<img
								className={styles['comment__content-user__image']}
								src={props.user.image.png}
								alt='user'
							/>
							<span className={styles['comment__content-user__name']}>
								{props.user.username}
							</span>
							{props.currentUser.username === props.user.username && (
								<span className={styles['comment__content-user__is-current']}>
									you
								</span>
							)}
							<span className={styles['comment__content-user__date']}>
								{props.createdAt}
							</span>
						</div>
						<div className={styles['comment__content-interactions']}>
							{props.currentUser.username !== props.user.username ? (
								<button
									className={
										styles['comment__content-interactions__item'] +
										' ' +
										styles['interactions__reply']
									}
									onClick={toggleReplyHandler}>
									<img src={IconReply} alt='reply icon' />
									Reply
								</button>
							) : (
								<>
									<button
										className={
											styles['comment__content-interactions__item'] +
											' ' +
											styles['interactions__delete']
										}
										onClick={deleteComment}>
										<img src={IconDelete} alt='delete icon' />
										Delete
									</button>
									<button
										className={
											styles['comment__content-interactions__item'] +
											' ' +
											styles['interactions__edit']
										}>
										<img src={IconEdit} alt='edit icon' />
										Edit
									</button>
								</>
							)}
						</div>
					</div>
					<div className={styles['comment__content-text']}>
						<p className={styles['comment__content-text__message']}>
							{props.replyingTo && (
								<>
									<span className={styles['comment__content-text__reply']}>
										@{props.replyingTo}
									</span>
									<span> </span>
								</>
							)}
							{props.content}
						</p>
					</div>
				</div>
			</div>
			{isReplyVisible && (
				<ReplyForm
					user={props.user}
					id={props.id}
					currentUser={props.currentUser}
					addNewReply={props.addNewReply}
					commentId={props.commentId}
				/>
			)}
		</>
	);
};

export default Comment;
