import { commentsActions } from './comments.slice';

export const sendCommentsData = (comments) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await fetch(
				'https://react-comments-be83a-default-rtdb.europe-west1.firebasedatabase.app/comments.json',
				{
					method: 'PUT',
					body: JSON.stringify(comments),
				}
			);
			if (!response.ok) {
				throw new Error('Error occured');
			}
		};
		try {
			sendData();
		} catch (error) {
			alert(error.message);
		}
	};
};
export const fetchCommentsData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://react-comments-be83a-default-rtdb.europe-west1.firebasedatabase.app/comments.json'
			);
			if (!response.ok) {
				throw new Error('Error occured');
			}
			const data = await response.json();

			return data;
		};
		try {
			const comments = await fetchData();
			dispatch(commentsActions.replaceComments(comments));
		} catch (error) {
			alert(error.message);
		}
	};
};
