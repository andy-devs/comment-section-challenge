import styles from './ReplyForm.module.css';
import Button from '../UI/Button';
import { useState } from 'react';
import moment from 'moment';

const ReplyForm = (props) => {
	const [inputValue, setInputValue] = useState('');

	const calculateDate = () => {
		const date = moment().fromNow();
		return date;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		props.addNewReply(inputValue, date, props.user, props.id, props.commentId);

		setInputValue('');
	};

	return (
		<div className={styles['reply-form']}>
			{Object.keys(props.currentUser).length && (
				<img
					src={props.currentUser.image.png}
					alt='current user avatar'
					className={styles['reply-form__avatar']}
				/>
			)}
			<form className={styles['reply-form__form']} onSubmit={submitHandler}>
				<textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className={styles['reply-form__form-input']}
					placeholder='Add a reply...'
				/>
				<Button>REPLY</Button>
			</form>
		</div>
	);
};

export default ReplyForm;
