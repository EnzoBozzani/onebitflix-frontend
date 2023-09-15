import { HeaderGeneric } from '@/src/components/common/HeaderGeneric';
import styles from '@/styles/RegisterLogin.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';

const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric btnContent='Quero fazer login' btnUrl='/login' logoUrl='/'/>
            </main>
        </>
    );
};

export default Register;