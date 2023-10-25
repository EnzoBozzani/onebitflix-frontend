import { NextPage } from 'next';
import Head from 'next/head';
import {
    FeaturedSection,
    NewestCategories,
    FavoriteCategories,
    Footer,
    FeaturedCategory,
    ListCategories,
    PageSpinner
}
    from '@/src/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const HomeAuth: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) router.push('/login');
        else setLoading(false);
    }, []);

    if (loading) return <PageSpinner />

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