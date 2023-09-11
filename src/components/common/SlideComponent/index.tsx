//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { CourseType } from '@/src/services/courseService';
import { SlideCard } from '../SlideCard';

interface props {
    courses: CourseType[]
}



export const SlideComponent: React.FC<props> = ({ courses }: props) => {
    return (
        <>
            <div>
                <Splide options={{
                    type: 'loop', 
                    perPage: 4, 
                    perMove: 1, 
                    pagination: false
                }}>
                    {courses?.map((course) => (
                        <SplideSlide key={course.id}>
                            <SlideCard course={course}/>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
};