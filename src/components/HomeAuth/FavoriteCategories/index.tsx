import styles from '@/styles/SlideCategory.module.scss';
import { SlideComponent } from '../..';
import useSWR from 'swr';
import { courseService } from '@/src/services/courseService';
import { PageSpinner } from '../..';

export const FavoriteCategories: React.FC = () => {
    const { data, error } = useSWR("/favorites", courseService.getFavoriteCourses);

    if (error) return error;
    if (!data) return <PageSpinner />;

    return (
        <>
            <p className={styles.titleCategory}>MINHA LISTA</p>
            {
                data.data.courses.length > 1 ?
                    (
                        <SlideComponent courses={data.data.courses} />
                    )
                    :
                    (
                        <p className='text-center pt-3 h5'><strong>Você não tem nenhum curso na lista!</strong></p>
                    )
            }
        </>
    )
}