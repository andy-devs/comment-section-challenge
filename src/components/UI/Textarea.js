import styles from './Textarea.module.css';

const Textarea = (props) => {
	return <textarea className={styles.textarea} {...props} />;
};

export default Textarea;
