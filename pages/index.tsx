import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth, PresentationSection, CardSection, SlidesSection, Footer } from "@/src/components";
import { GetStaticProps } from "next";
import { CourseType, courseService } from "@/src/services/courseService";
import { ReactNode, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface IndexPageProps {
  children?: ReactNode,
  courses: CourseType[]
}

const HomeNoAuth = ({ courses }: IndexPageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil." />
      </Head>
      <main>
        <div className={styles.sectionBackground} data-aos='fade-zoom-in' data-aos-duration='1600'>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos='fade-right' data-aos-duration='1200'>
          <CardSection />
        </div>
        <div data-aos='fade-up' data-aos-duration='1350'>
          <SlidesSection newestCourses={courses} />
        </div>
        <Footer />
      </main>
    </>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      courses: res.data
    },
    revalidate: 3600 * 24
  }
}

export default HomeNoAuth;

