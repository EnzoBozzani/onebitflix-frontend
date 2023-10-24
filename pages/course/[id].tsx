import { NextPage } from "next";
import styles from '@/styles/CoursePage.module.scss';
import Head from "next/head";
import { EpisodesList, Footer, HeaderAuth, PageSpinner } from "@/src/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CourseType, courseService } from "@/src/services/courseService";
//@ts-ignore
import { Container, Button } from 'reactstrap';

const CoursePage: NextPage = () => {
    const [course, setCourse] = useState<CourseType>();
    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const fetchCourse = async () => {
        if (typeof id !== 'string') return;
        const res = await courseService.getEpisodes(id);
        if (res.status === 200) {
            setCourse(res.data);
            setLiked(res.data.liked);
            setFavorited(res.data.favorited);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const handleLike = async () => {
        if (typeof id !== 'string') return;

        if (liked) {
            await courseService.removeLike(id);
            setLiked(false);
        } else {
            await courseService.like(id);
            setLiked(true);
        }
    }

    const handleFavorite = async () => {
        if (typeof id !== 'string') return;

        if (favorited) {
            await courseService.removeFavorites(id);
            setFavorited(false);
        } else {
            await courseService.addFavorite(id);
            setFavorited(true);
        }
    }

    if (course === undefined) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title>Onebitflix - {course?.name}</title>
                <link rel='shortcut icon' href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                        backgroundSize: `cover`,
                        backgroundPosition: 'center',
                        minHeight: '550px'
                    }}
                >
                    <HeaderAuth />
                </div>
                <Container className={styles.courseInfo}>
                    <p className={styles.courseTitle}>{course?.name}</p>
                    <p className={styles.courseDescription}>{course?.synopsis}</p>
                    <Button
                        outline
                        className={styles.courseBtn}
                        disabled={course?.episodes?.length === 0}
                    >
                        ASSISTIR AGORA!
                        <img
                            src="/buttonPlay.svg"
                            alt="buttonImg"
                            className={styles.btnImg}
                        />
                    </Button>
                    <div className={styles.interactions}>
                        {
                            liked ?
                                <img
                                    src='/course/iconLiked.svg'
                                    alt="likeImag"
                                    className={styles.interactionImg}
                                    onClick={handleLike}

                                /> : <img
                                    src='/course/iconLike.svg'
                                    alt="likeImag"
                                    className={styles.interactionImg}
                                    onClick={handleLike}

                                />
                        }
                        {
                            favorited ?
                                <img
                                    src='/course/iconFavorited.svg'
                                    alt="likeImag"
                                    className={styles.interactionImg}
                                    onClick={handleFavorite}
                                /> :
                                <img
                                    src='/course/iconAddFav.svg'
                                    alt="likeImag"
                                    className={styles.interactionImg}
                                    onClick={handleFavorite}
                                />
                        }
                    </div>
                </Container>
                <Container className={styles.episodeInfo}>
                    <p className={styles.episodeDivision}>EPISÓDIOS</p>
                    <p className={styles.episodeLength}>{course?.episodes?.length} episódios</p>
                    {course?.episodes?.length === 0 ?
                        (
                            <p>
                                <strong>Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;&#128518;</strong>
                            </p>
                        )
                        :
                        course?.episodes?.map((episode) => (
                            <>
                                <EpisodesList
                                    key={episode.id}
                                    episode={episode}
                                    course={course}
                                />
                            </>
                        ))}
                </Container>
                <Footer />
            </main>
        </>
    )
}

export default CoursePage;