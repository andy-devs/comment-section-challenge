import styles from './EditForm.module.css';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentsActions } from '../../store/comments.slice';
import moment from 'moment';

const EditForm = ({ id, commentId, toggleEdit, placeholder }) => {
	const [inputValue, setInputValue] = useState(placeholder);
	const dispatch = useDispatch();

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

		toggleEdit();
		dispatch(
			commentsActions.editHandler({
				content: inputValue.trim(),
				createdAt: date,
				id,
				commentId,
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
		<div className={styles['edit-form']}>
			<form className={styles['edit-form__form']} onSubmit={submitHandler}>
				<Textarea
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
