import { EpisodeType } from '@/src/services/courseService';
import styles from './styles.module.scss';

interface props {
    episode: EpisodeType;
}

export const EpisodesList: React.FC<props> = ({ episode }: props) => {
    const handleSecondsToMin = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        function toString(num: number) {
            return num.toString().padStart(2, "0");
        }

        return `${toString(minutes)}:${toString(seconds)}`;
    }

    return (
        <>
            <div className={styles.episodeCard}>
                <div className={styles.episodeOrderTime}>
                    <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
                    <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
                </div>
                <div className={styles.episodeTitleDescription}>
                    <p className={styles.episodeTitle}>{episode.name}</p>
                    <p className={styles.episodeDescription}>{episode.synopsis}</p>
                </div>
            </div>
        </>
    )
}