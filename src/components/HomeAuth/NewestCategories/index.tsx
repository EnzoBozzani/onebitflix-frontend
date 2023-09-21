import styles from '@/styles/SlideCategory.module.scss';
import useSWR from "swr";
import { courseService } from "@/src/services/courseService";
import { SlideComponent } from "../..";

export const NewestCategories: React.FC = () => {
    const { data, error } = useSWR("/newest", courseService.getNewestCourses);

    if (error) return error;
    if (!data) return <p style={{ color: 'white' }}>Carregando...</p>;

    return (
        <>
            <p className={styles.titleCategory}>Lançamentos</p >
            <SlideComponent courses={data.data} />
        </>
    )
}