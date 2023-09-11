import styles from './styles.module.scss';

export const SlideCard: React.FC = () => {
    return (
        <>
            <div className={styles.slide}>
                <img src="" alt="" className={styles.slideImg} />
                <p className={styles.slideTitle}></p>
                <p className={styles.slideDescription}></p>
            </div>
        </>
    )
}