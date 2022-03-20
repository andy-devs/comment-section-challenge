import styles from './ReplyForm.module.css';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsActions } from '../../store/comments.slice';
import moment from 'moment';

const ReplyForm = ({ user, id, commentId, toggleReplyHandler }) => {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user);

	const calculateDate = () => {
		const date = moment().fromNow();
		return date;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		toggleReplyHandler();

		dispatch(
			commentsActions.addNewReply({
				content: inputValue,
				date,
				user,
				id,
				commentId,
				currentUser,
			})
		);

		setInputValue('');
	};
	const enterPressed = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			submitHandler(e);
		}
	};

	return (
		<div className={styles['reply-form']}>
			{Object.keys(currentUser).length && (
				<img
					src={currentUser.image.png}
					alt='current user avatar'
					className={styles['reply-form__avatar']}
				/>
			)}
			<form className={styles['reply-form__form']} onSubmit={submitHandler}>
				<Textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Add a reply...'
					onKeyDown={enterPressed}
				/>
				<Button>REPLY</Button>
			</form>
		</div>
	);
};

export default ReplyForm;
