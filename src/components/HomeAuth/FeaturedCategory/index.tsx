import useSWR from "swr";
import { courseService } from "@/src/services/courseService";
import styles from '@/styles/SlideCategory.module.scss';
import { SlideComponent } from "../..";

export const FeaturedCategory: React.FC = () => {
    const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

    if (error) return error;
    if (!data) return <p style={{ color: 'white' }}>Carregando...</p>;

    return (
        <>
            <p className={styles.titleCategory}>
                EM DESTAQUE
            </p>
            <SlideComponent courses={data.data} />
        </>
    )
}