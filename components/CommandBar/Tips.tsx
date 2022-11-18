import styles from './Tips.module.css';

const Tips = () => {
    return (
        <div id={styles["tips-container"]}>
            {/* This should probably be a component with a `color` prop */}
            <span className={styles['label']}>Pro tip</span>
            <span className={styles['tips']}>
                Make sure to be specific in your prompt. The more detail you give, the better the results will be!
            </span>
            {/* This should probably be a component */}
            <span className={styles['helper-text']}>Hit <span className={styles['key']}>enter</span> to submit your prompt</span>
        </div>
    )
}

export default Tips;

const Key = () => {

}