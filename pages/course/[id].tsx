import { NextPage } from "next";
import styles from '@/styles/CoursePage.module.scss';
import Head from "next/head";
import { HeaderAuth } from "@/src/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CourseType, courseService } from "@/src/services/courseService";

const CoursePage: NextPage = () => {
    const [course, setCourse] = useState<CourseType>();
    const router = useRouter();
    const { id } = router.query;

    const fetchCourse = async () => {
        if (typeof id !== 'string') return;
        const res = await courseService.getEpisodes(id);
        if (res.data === 200) {
            setCourse(res);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    return (
        <>
            <Head>
                <title>Onebitflix - {course?.name}</title>
                <link rel='shortcut icon' href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderAuth />
                <p>{course?.name}</p>
            </main>
        </>
    )
}

export default CoursePage;