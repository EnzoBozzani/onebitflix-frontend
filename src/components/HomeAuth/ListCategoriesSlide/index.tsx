import useSWR from "swr";
import { categoriesService } from "@/src/services/categoriesService";
import { SlideComponent } from "../..";
import styles from '@/styles/SlideCategory.module.scss';
import { PageSpinner } from "../..";

interface props {
    categoryId: number,
    categoryName: string
}

export const ListCategoriesSlide: React.FC<props> = ({ categoryId, categoryName }: props) => {
    const { data, error } = useSWR(`categories/${categoryId}`, () => categoriesService.getCourses(categoryId));
    if (error) return error;
    if (!data) return <PageSpinner />;

    return (
        <>
            <p className={styles.titleCategory}>{categoryName}</p>
            <SlideComponent courses={data.data.courses} />
        </>
    )
}