import { NextPage } from 'next';
import Head from 'next/head';
import {
    FeaturedSection,
    NewestCategories,
    FavoriteCategories,
    Footer,
    FeaturedCategory,
    ListCategories
}
    from '@/src/components';


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
                <FavoriteCategories />
                <FeaturedCategory />
                <ListCategories />
                <Footer />
            </main>
        </>
    );
};

export default HomeAuth;