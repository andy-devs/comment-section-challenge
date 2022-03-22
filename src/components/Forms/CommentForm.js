import styles from './CommentForm.module.css';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsActions } from '../../store/comments.slice.js';
import moment from 'moment';

const CommentForm = () => {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user);

	const calculateDate = () => {
		const timestamp = moment().format('YYYY-MM-DTh:mm:ss a');
		return timestamp;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		if (inputValue.trim().length === 0) {
			return;
		}

		dispatch(
			commentsActions.addNewComment({
				content: inputValue.trim(),
				createdAt: date,
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
		<div className={styles['comment-form']}>
			{Object.keys(currentUser).length && (
				<img
					src={currentUser.image.png}
					alt='current user avatar'
					className={styles['comment-form__avatar']}
				/>
			)}
			<form className={styles['comment-form__form']} onSubmit={submitHandler}>
				<Textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Add a comment...'
					onKeyDown={enterPressed}
				/>
				<Button>SEND</Button>
			</form>
		</div>
	);
};

export default CommentForm;
