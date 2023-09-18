import styles from '@/styles/RegisterLogin.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderGeneric, Footer } from '@/src/components';
//@ts-ignore
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Login</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <HeaderGeneric
                    logoUrl='/'
                    btnUrl='/register'
                    btnContent='Quero fazer parte'
                />
                <Container className='py-5'>
                    <p className={styles.formTitle}>Bem vindo(a) de volta!</p>
                    <Form className={styles.form}>
                        <p className='text-center'><strong>Bem vindo(a) ao Onebitflix!</strong></p>
                        <FormGroup>
                            <Label
                                for='email'
                                className={styles.label}>EMAIL
                            </Label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Qual o seu email?'
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for='password'
                                className={styles.label}>SENHA
                            </Label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Qual a sua senha?'
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <Button outline className={styles.formBtn}>
                            Entrar
                        </Button>
                    </Form>
                </Container>
                <Footer />
            </main>
        </>
    )
}

export default Login;