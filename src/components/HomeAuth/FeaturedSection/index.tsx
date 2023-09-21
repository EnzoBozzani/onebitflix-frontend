import styles from './styles.module.scss';
import useSWR from 'swr';
import { CourseType, courseService } from '@/src/services/courseService';
import { HeaderAuth } from '../..';
//@ts-ignore
import { Container, Button } from 'reactstrap';
import Link from 'next/link';

export const FeaturedSection: React.FC = () => {
    const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

    if (error) return error;
    if (!data) return <p style={{ color: 'white' }}>Carregando...</p>;

    return (
        <>
            {data.data?.map((course: CourseType) => (
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
                                url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '480px',
                    }}
                    key={course.id}
                >
                    <HeaderAuth />
                    <Container className='pt-4'>
                        <p className={styles.title}>{course.name}</p>
                        <p className={styles.description}>{course.synopsis}</p>
                        <Link href={`/courses/${course.id}`}>
                            <Button outline color='light' className={styles.button}>
                                ACESSE AGORA
                                <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
                            </Button>
                        </Link>
                    </Container>
                </div>
            )
            )[0]}
        </>
    )
}