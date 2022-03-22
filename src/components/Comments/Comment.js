import styles from './Comment.module.css';
import IconPlus from '../../assets/icon-plus.svg';
import IconMinus from '../../assets/icon-minus.svg';
import IconReply from '../../assets/icon-reply.svg';
import IconEdit from '../../assets/icon-edit.svg';
import IconDelete from '../../assets/icon-delete.svg';
import ReplyForm from '../Forms/ReplyForm';
import EditForm from '../Forms/EditForm';
import Modal from '../UI/Modal';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsActions } from '../../store/comments.slice';

const Comment = ({
	id,
	commentId,
	score: initialScore,
	user,
	createdAt,
	replyingTo,
	content,
}) => {
	const [score, setScore] = useState(initialScore);
	const [upScore, setUpScore] = useState(false);
	const [downScore, setDownScore] = useState(false);
	const [isReplyVisible, setIsReplyVisible] = useState(false);
	const [isEditVisible, setIsEditVisible] = useState(false);
	const [modalState, setModalState] = useState(false);

	const currentUser = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
		setIsReplyVisible((prev) => !prev);
	};

	const toggleEdit = () => {
		setIsEditVisible((prev) => !prev);
	};

	const showModal = () => {
		setModalState(true);
	};

	const hideModal = () => {
		setModalState(false);
	};

	const deleteComment = () => {
		if (commentId) {
			dispatch(commentsActions.deleteHandler({ id, commentId }));
		} else {
			dispatch(commentsActions.deleteHandler({ id }));
		}
	};

	return (
		<>
			{modalState && (
				<Modal
					header='Delete comment'
					content="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
					buttonText='YES, DELETE'
					buttonColor='hsl(358, 79%, 66%)'
					modalFunction={deleteComment}
					hideModal={hideModal}
				/>
			)}
			<div className={styles.comment}>
				<div className={styles['comment__score-mobile']}>
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
					<div className={styles['comment__content-interactions-mobile']}>
						{currentUser.username !== user.username ? (
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
									onClick={showModal}>
									<img src={IconDelete} alt='delete icon' />
									Delete
								</button>
								<button
									className={
										styles['comment__content-interactions__item'] +
										' ' +
										styles['interactions__edit']
									}
									onClick={toggleEdit}>
									<img src={IconEdit} alt='edit icon' />
									Edit
								</button>
							</>
						)}
					</div>
				</div>
				<div className={styles['comment__content']}>
					<div className={styles['comment__header']}>
						<div className={styles['comment__content-user']}>
							<img
								className={styles['comment__content-user__image']}
								src={user.image.png}
								alt='user'
							/>
							<span className={styles['comment__content-user__name']}>
								{user.username}
							</span>
							{currentUser.username === user.username && (
								<span className={styles['comment__content-user__is-current']}>
									you
								</span>
							)}
							<span className={styles['comment__content-user__date']}>
								{moment(createdAt, 'YYYY-MM-DTh:mm:ss a').fromNow()}
							</span>
						</div>
						<div className={styles['comment__content-interactions']}>
							{currentUser.username !== user.username ? (
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
										onClick={showModal}>
										<img src={IconDelete} alt='delete icon' />
										Delete
									</button>
									<button
										className={
											styles['comment__content-interactions__item'] +
											' ' +
											styles['interactions__edit']
										}
										onClick={toggleEdit}>
										<img src={IconEdit} alt='edit icon' />
										Edit
									</button>
								</>
							)}
						</div>
					</div>
					{!isEditVisible ? (
						<div className={styles['comment__content-text']}>
							<p className={styles['comment__content-text__message']}>
								{replyingTo && (
									<>
										<span className={styles['comment__content-text__reply']}>
											@{replyingTo}
										</span>
										<span> </span>
									</>
								)}
								{content}
							</p>
						</div>
					) : (
						<EditForm
							placeholder={content}
							id={id}
							commentId={commentId}
							toggleEdit={toggleEdit}
						/>
					)}
				</div>
			</div>
			{isReplyVisible && (
				<ReplyForm
					user={user}
					id={id}
					commentId={commentId}
					toggleReplyHandler={toggleReplyHandler}
				/>
			)}
		</>
	);
};

export default Comment;
