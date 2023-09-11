//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';



export const SlideComponent: React.FC = () => {
    return (
        <>
            <div>
                <Splide options={{
                    type: 'loop', 
                    perPage: 4, 
                    perMove: 1, 
                    pagination: false
                }}>
                    <SplideSlide></SplideSlide>
                </Splide>
            </div>
        </>
    )
};