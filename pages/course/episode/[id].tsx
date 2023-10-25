import { HeaderGeneric, PageSpinner } from '@/src/components';
import EpisodeService from '@/src/services/EpisodeService';
import { CourseType, courseService } from '@/src/services/courseService';
import styles from '@/styles/EpisodePlayer.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
//@ts-ignore
import { Container, Button } from 'reactstrap';

const EpisodePlayer: NextPage = () => {
    const router = useRouter();
    const [course, setCourse] = useState<CourseType>();
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const episodeOrder = parseFloat(router.query.id?.toString() || '');
    const episodeId = parseFloat(router.query.episodeid?.toString() || '')
    const courseId = router.query.courseid?.toString() || '';
    const [getEpisodeTime, setGetEpisodeTime] = useState(0);
    const [episodeTime, setEpisodeTime] = useState(0);

    const playerRef = useRef<ReactPlayer>(null);

    const handleGetEpisodeTime = async () => {
        const res = await EpisodeService.getWatchTime(episodeId);
        console.log(res);
        if (res.data !== null) setGetEpisodeTime(res.data.seconds);
    };

    const handleSetEpisodeTime = async () => {
        await EpisodeService.setWatchTime({ episodeId, seconds: Math.round(episodeTime) });
    };

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getEpisodeTime);
        setIsReady(true);
    }

    if (isReady) {
        setTimeout(() => {
            handleSetEpisodeTime();
        }, 1000 * 3);
    }

    useEffect(() => {
        handleGetEpisodeTime();
    }, [router]);

    const getCourse = async () => {
        if (typeof courseId !== 'string') return;
        const res = await courseService.getEpisodes(courseId);
        if (res.status === 200) setCourse(res.data);
    };

    const handleLastEpisode = () => {
        router.push(`/course/episode/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`)
    };

    const handleNextEpisode = () => {
        router.push(`/course/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`)
    };

    useEffect(() => {
        getCourse();
    }, [courseId]);

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) router.push('/login');
        else setLoading(false);
    }, []);

    if (course?.episodes === undefined) return <PageSpinner />

    if (episodeOrder + 1 < course?.episodes?.length) {
        if (Math.round(episodeTime) === course?.episodes[episodeOrder].secondsLong) {
            handleNextEpisode();
        }
    }


    if (loading) return <PageSpinner />;

    return (
        <>
            <Head>
                <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
                <link rel="shortcut icon" href="/favicon.svg" type='image/x-icon' />
            </Head>
            <main>
                <HeaderGeneric
                    logoUrl='/home'
                    btnContent={`Voltar para o curso`}
                    btnUrl={`/course/${courseId}`}
                />
                <Container className='d-flex flex-column align-items-center gap-3 pt-5'>
                    <p className={styles.episodeTitle}>
                        {course.episodes[episodeOrder].name}
                    </p>
                    {
                        typeof window === 'undefined' ? null : (
                            <ReactPlayer
                                className={styles.player}
                                url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`}
                                controls
                                ref={playerRef}
                                onStart={handlePlayerTime}
                                onProgress={(progress) => {
                                    setEpisodeTime(progress.playedSeconds)
                                }}
                            />
                        )
                    }
                    <div className={styles.episodeButtonDiv}>
                        <Button
                            className={styles.episodeButton}
                            disabled={episodeOrder === 0}
                            onClick={handleLastEpisode}
                        >
                            <img
                                src="/episode/iconArrowLeft.svg"
                                alt="setaEsquerda"
                                className={styles.arrowImg}
                            />
                        </Button>
                        <Button
                            className={styles.episodeButton}
                            disabled={episodeOrder + 1 === course.episodes.length}
                            onClick={handleNextEpisode}
                        >
                            <img
                                src="/episode/iconArrowRight.svg"
                                alt="setaDireita"
                                className={styles.arrowImg}
                            />
                        </Button>
                    </div>
                    <p className='text-center py-4'>
                        {course.episodes[episodeOrder].synopsis}
                    </p>
                </Container>
            </main>
        </>
    )
};

export default EpisodePlayer;