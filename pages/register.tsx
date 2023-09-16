import { Footer, HeaderGeneric } from '@/src/components';
import styles from '@/styles/RegisterLogin.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';
//@ts-ignore
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap';

const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://jsuites.net/v4/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric btnContent='Quero fazer login' btnUrl='/login' logoUrl='/' />
                <Container className='py-5'>
                    <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
                    <Form className={styles.form}>
                        <p className='text-center'>
                            <strong>Faça a sua conta!</strong>
                        </p>
                        <FormGroup>
                            <Label for='firstName' classname={styles.label}>NOME</Label>
                            <Input
                                name='firstName'
                                id='firstName'
                                type='text'
                                placeholder='Qual o seu nome?'
                                required
                                maxLength={20}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='lastName' classname={styles.label}>SOBRENOME</Label>
                            <Input
                                name='lastName'
                                id='lastName'
                                type='text'
                                placeholder='Qual o seu sobrenome?'
                                required
                                maxLength={20}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='phone' classname={styles.label}>WHATSAPP / TELEGRAM</Label>
                            <Input
                                name='phone'
                                id='phone'
                                type='tel'
                                placeholder='(xx) 9xxxx-xxxx'
                                data-mask='[-]+55 (00) 00000-0000'
                                required
                                maxLength={20}
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='email' classname={styles.label}>EMAIL</Label>
                            <Input
                                name='email'
                                id='email'
                                type='email'
                                placeholder='Digite o seu email'
                                required
                                maxLength={20}
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='birth' classname={styles.label}>DATA DE NASCIMENTO</Label>
                            <Input
                                name='birth'
                                id='birth'
                                type='date'
                                max='2022-12-31'
                                min='1930-01-01'
                                required
                                maxLength={20}
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='password' classname={styles.label}>SENHA</Label>
                            <Input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Digite a sua senha (Min: 6 | Max: 20)'
                                required
                                minLength={6}
                                maxLength={20}
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='password' classname={styles.label}>CONFIRME SUA SENHA</Label>
                            <Input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Confirme a sua senha'
                                required
                                minLength={6}
                                maxLength={20}
                                className={styles.input}
                            />
                        </FormGroup>
                        <Button type='submit' outline className={styles.formBtn}>
                            Cadastrar
                        </Button>
                    </Form>
                </Container>
                <Footer/>
            </main>
        </>
    );
};

export default Register;