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
		const timestamp = moment().format('YYYY-MM-DThh:mm:ss a');
		return timestamp;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		toggleReplyHandler();

		if (inputValue.trim().length === 0) {
			return;
		}

		dispatch(
			commentsActions.addNewReply({
				content: inputValue.trim(),
				createdAt: date,
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
