import styles from '@/styles/SlideCategory.module.scss';
import useSWR from "swr";
import { courseService } from "@/src/services/courseService";
import { SlideComponent } from "../..";
import { PageSpinner } from '../..';

export const NewestCategories: React.FC = () => {
    const { data, error } = useSWR("/newest", courseService.getNewestCourses);

    if (error) return error;
    if (!data) return <PageSpinner />;

    return (
        <>
            <p className={styles.titleCategory}>LANÇAMENTOS</p >
            <SlideComponent courses={data.data} />
        </>
    )
}