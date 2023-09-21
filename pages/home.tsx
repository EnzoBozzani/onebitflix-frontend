import styles from '@/styles/Home.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';
import { FeaturedSection } from '@/src/components';
import { NewestCategories } from '@/src/components';


const HomeAuth: NextPage = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection />
                <NewestCategories />
            </main>
        </>
    );
};

export default HomeAuth;