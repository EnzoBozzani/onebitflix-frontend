import styles from '@/styles/Search.module.scss';
import Head from 'next/head';
import { Footer, HeaderAuth, PageSpinner, SearchCard } from '@/src/components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CourseType, courseService } from '@/src/services/courseService';
//@ts-ignore
import { Container } from 'reactstrap';

const Search: NextPage = () => {
    const router = useRouter();
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);

    const searchCourses = async () => {
        if (typeof searchName === 'string') {
            const res = await courseService.getSearch(searchName);
            setSearchResult(res.data.courses);
        }
    }

    useEffect(() => {
        searchCourses();
    }, [searchName]);

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) router.push('/login');
        else setLoading(false);
    }, []);

    if (loading) return <PageSpinner />

    return (
        <>
            <Head>
                <title>OneBitFlix - {searchName}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <div className={styles.headerFooterBg}>
                    <HeaderAuth />
                </div>
                {searchResult.length >= 1 ?
                    (<div className={styles.searchContainer}>
                        <Container className='d-flex flex-wrap justify-content-center gap-5 py-4'>
                            {searchResult?.map((course) => (
                                <SearchCard course={course} key={course.id} />
                            ))}
                        </Container>
                    </div>)
                    :
                    <div className={styles.searchContainer}>
                        <p className={styles.noSearchResult}>Nenhum resultado encontrado.</p>
                    </div>

                }
                <div className={styles.headerFooterBg}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default Search;