import styles from './EditForm.module.css';
import Button from '../UI/Button';
import { useState } from 'react';
import moment from 'moment';

const EditForm = (props) => {
	const [inputValue, setInputValue] = useState(props.placeholder);

	const calculateDate = () => {
		const date = moment().fromNow();
		return date;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const date = calculateDate();

		console.log(props.id, props.commentId);

		props.toggleEdit();
		props.editHandler(inputValue, date, props.id, props.commentId);

		setInputValue('');
	};

	const enterPressed = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			submitHandler(e);
		}
	};

	return (
		<div className={styles['edit-form']}>
			<form className={styles['edit-form__form']} onSubmit={submitHandler}>
				<textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className={styles['edit-form__form-input']}
					placeholder='Edit a comment...'
					onKeyDown={enterPressed}
				/>
				<Button>UPDATE</Button>
			</form>
		</div>
	);
};

export default EditForm;
