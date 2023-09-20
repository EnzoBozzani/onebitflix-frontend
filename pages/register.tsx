import { Footer, HeaderGeneric, ToastComponent } from '@/src/components';
import styles from '@/styles/RegisterLogin.module.scss';
import { NextPage } from 'next';
import Head from 'next/head';
//@ts-ignore
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap';
import { FormEvent, useEffect } from 'react';
import { authService } from '@/src/services/authService';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Register: NextPage = () => {
    const router = useRouter();
    const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    useEffect(() => {
        if (sessionStorage.getItem('onebitflix-token')) {
            router.push('/home');
        }
    }, []);

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const firstName = formData.get('firstName')!.toString();
        const lastName = formData.get('lastName')!.toString();
        const phone = formData.get('phone')!.toString();
        const birth = formData.get('birth')!.toString();
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();
        const confirmPassword = formData.get('confirmPassword')!.toString();
        const params = { firstName, lastName, phone, birth, email, password };

        if (confirmPassword !== password) {
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            setToastMessage('Senha e confirmação diferentes!');
            return;
        }

        const { data, status } = await authService.register(params);

        if (status === 201) {
            router.push('/login?registred=true');

        } else {
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            setToastMessage(data.message);
        }
    };

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
                    <Form className={styles.form} onSubmit={handleRegister}>
                        <p className='text-center'>
                            <strong>Faça a sua conta!</strong>
                        </p>
                        <FormGroup>
                            <Label for='firstName' className={styles.label}>NOME</Label>
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
                            <Label for='lastName' className={styles.label}>SOBRENOME</Label>
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
                            <Label for='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
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
                            <Label for='email' className={styles.label}>EMAIL</Label>
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
                            <Label for='birth' className={styles.label}>DATA DE NASCIMENTO</Label>
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
                            <Label for='password' className={styles.label}>SENHA</Label>
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
                            <Label for='confirmPassword' className={styles.label}>CONFIRME SUA SENHA</Label>
                            <Input
                                name='confirmPassword'
                                id='confirmPassword'
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
                <Footer />
            </main>
            <ToastComponent color='bg-danger' isOpen={toastIsOpen} message={toastMessage} />
        </>
    );
};

export default Register;