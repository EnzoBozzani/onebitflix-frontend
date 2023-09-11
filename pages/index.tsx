import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth, PresentationSection, CardSection, SlidesSection } from "@/src/components";
import { GetStaticProps } from "next";
import { CourseType, courseService } from "@/src/services/courseService";
import { ReactNode } from "react";

interface IndexPageProps {
  children?: ReactNode, 
  courses: CourseType[]
}

const HomeNoAuth = ({ courses }: IndexPageProps ) => {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil." />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardSection/>
        <SlidesSection newestCourses={courses} />
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

