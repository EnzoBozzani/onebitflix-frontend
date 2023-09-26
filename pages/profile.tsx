import { NextPage } from "next";
import Head from "next/head";
import { UserForm, HeaderAuth, Footer } from "@/src/components";
//@ts-ignore
import { Container, Row, Col, Button } from 'reactstrap';
import styles from '@/styles/Profile.module.scss';

const UserInfo: NextPage = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Meus dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className='py-5'>
                    <p className={styles.title}>Minha conta</p>
                    <Row className='pt-3 pb-5'>
                        <Col md={4} className={styles.btnColumn} >
                            <Button className={styles.renderForm}>
                                DADOS PESSOAS
                            </Button>
                            <Button className={styles.renderForm}>
                                SENHA
                            </Button>
                        </Col>
                        <Col md>
                            <UserForm />
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