import styles from './styles.module.scss';
import { SlideComponent } from '../..';
import { CourseType } from '@/src/services/courseService';
//@ts-ignore
import { Container, Button } from 'reactstrap';
import Link from 'next/link';

interface props {
    newestCourses: CourseType[]
};



export const SlidesSection: React.FC<props> = ({ newestCourses }: props) => {
    return (
        <>
            <Container>
                <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
                <SlideComponent courses={newestCourses} />
                <Link href={'/register'}>
                    <Button outline color='light' className={styles.slideSectionBtn}>
                        Se cadastre para acessar!
                    </Button>
                </Link>
            </Container>
        </>
    )
}