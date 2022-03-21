import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import Button from './Button';

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal}>
			<p className={styles['modal__header']}>{props.header}</p>
			<p className={styles['modal__content']}>{props.content}</p>
			<div className={styles['modal__buttons']}>
				<Button className={styles['modal__button']} onClick={props.hideModal}>
					NO, CANCEL
				</Button>

				<Button
					className={styles['modal__button']}
					onClick={props.modalFunction}
					style={{ backgroundColor: props.buttonColor }}>
					{props.buttonText}
				</Button>
			</div>
		</div>
	);
};

const ModalBackdrop = (props) => {
	return (
		<div className={styles.backdrop} onClick={props.hideModal}>
			{props.children}
		</div>
	);
};

const Modal = (props) => {
	return (
		<>
			{createPortal(
				<ModalBackdrop {...props}>
					<ModalOverlay {...props} />
				</ModalBackdrop>,
				document.getElementById('overlays')
			)}
		</>
	);
};

export default Modal;
