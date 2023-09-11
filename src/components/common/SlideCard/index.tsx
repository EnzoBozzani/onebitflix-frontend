import styles from './styles.module.scss';
import { CourseType } from '@/src/services/courseService';

interface props {
    course: CourseType
}

export const SlideCard: React.FC<props> = ({ course }: props ) => {
    return (
        <>
            <div className={styles.slide}>
                <img 
                    src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`} 
                    alt={course.name} 
                    className={styles.slideImg} 
                />
                <p className={styles.slideTitle}>{course.name}</p>
                <p className={styles.slideDescription}>{course.synopsis}</p>
            </div>
        </>
    )
}