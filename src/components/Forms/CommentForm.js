import styles from './CommentForm.module.css';
import Button from '../UI/Button';
import { useState } from 'react';
import moment from 'moment';

const CommentForm = (props) => {
	const [inputValue, setInputValue] = useState('');

	const calculateDate = () => {
		const date = moment().fromNow();
		return date;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		props.addNewComment(inputValue, date);

		setInputValue('');
	};

	return (
		<div className={styles['comment-form']}>
			{Object.keys(props.currentUser).length && (
				<img
					src={props.currentUser.image.png}
					alt='current user avatar'
					className={styles['comment-form__avatar']}
				/>
			)}
			<form className={styles['comment-form__form']} onSubmit={submitHandler}>
				<textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className={styles['comment-form__form-input']}
					placeholder='Add a comment...'
				/>
				<Button>SEND</Button>
			</form>
		</div>
	);
};

export default CommentForm;