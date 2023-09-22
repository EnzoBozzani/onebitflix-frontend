import useSWR from "swr";
import { CategoryType, categoriesService } from "@/src/services/categoriesService";
import { ListCategoriesSlide } from "../ListCategoriesSlide";

export const ListCategories: React.FC = () => {
    const { data, error } = useSWR("/categories", categoriesService.getCategories);

    if (error) return error;
    if (!data) return <p style={{ color: 'white' }}>Carregando...</p>;
    return (
        <>
            {data.data.categories?.map((category: CategoryType) => (
                <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name} />
            ))}
        </>
    )
}