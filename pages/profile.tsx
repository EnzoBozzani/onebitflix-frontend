import { NextPage } from "next";
import Head from "next/head";
import { UserForm, HeaderAuth, Footer, PasswordForm, PageSpinner } from "@/src/components";
//@ts-ignore
import { Container, Row, Col, Button } from 'reactstrap';
import styles from '@/styles/Profile.module.scss';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserInfo: NextPage = () => {
    const [form, setForm] = useState('userForm');
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) router.push('/login');
        else setLoading(false);
    }, []);

    if (loading) return <PageSpinner />;


    return (
        <>
            <Head>
                <title>Onebitflix - Meus dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className={styles.gridContainer}>
                    <p className={styles.title}>Minha conta</p>
                    <Row className='pt-3 pb-5'>
                        <Col md={4} className={styles.btnColumn} >
                            <Button
                                className={styles.renderForm}
                                onClick={() => setForm('userForm')}
                                style={{ color: form === 'userForm' ? '#ff0044' : '#fff' }}
                            >
                                DADOS PESSOAS
                            </Button>
                            <Button
                                className={styles.renderForm}
                                onClick={() => setForm('passwordForm')}
                                style={{ color: form === 'passwordForm' ? '#ff0044' : '#fff' }}
                            >
                                SENHA
                            </Button>
                        </Col>
                        <Col md>
                            {
                                form === 'userForm' ?
                                    (
                                        <UserForm />
                                    )
                                    :
                                    (
                                        <PasswordForm />
                                    )
                            }
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default UserInfo;