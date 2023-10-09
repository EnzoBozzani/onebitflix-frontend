import styles from '@/styles/Search.module.scss';
import Head from 'next/head';
import { HeaderAuth } from '@/src/components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CourseType, courseService } from '@/src/services/courseService';

const Search: NextPage = () => {
    const router = useRouter();
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<CourseType[]>([]);

    const searchCourses = async () => {
        if (typeof searchName === 'string') {
            const res = await courseService.getSearch(searchName);
            setSearchResult(res.data.courses);
        }
    }

    useEffect(() => {
        searchCourses();
    }, [searchName])

    return (
        <>
            <Head>
                <title>OneBitFlix - {searchName}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderAuth />
                {searchResult?.map((course: CourseType) => (
                    <div key={course.id}>
                        <p>{course.name}</p>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Search;