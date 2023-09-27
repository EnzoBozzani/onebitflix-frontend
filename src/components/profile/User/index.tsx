import styles from '@/styles/Profile.module.scss';
//@ts-ignore
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FormEvent, useEffect, useState } from 'react';
import { profileService } from '@/src/services/profileService';
import { ToastComponent } from '../..';
import { useRouter } from 'next/router';

export const UserForm: React.FC = () => {
    const router = useRouter();
    const [color, setColor] = useState('');
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [initialEmail, setInitialEmail] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const date = new Date(createdAt);
    const month = date.toLocaleDateString("default", { month: "long" });

    useEffect(() => {
        profileService.fetchCurrentUser()
            .then((user) => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setPhone(user.phone);
                setEmail(user.email);
                setCreatedAt(user.createdAt);
                setInitialEmail(user.email);
            });
    }, []);

    const handleUserUpdate = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const res = await profileService.updateUser(
            { firstName, lastName, email, created_at: createdAt, phone }
        );

        if (res === 200) {
            setToastIsOpen(true);
            setColor('bg-success');
            setErrorMessage('Informações alteradas com sucesso!');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            if (initialEmail !== email) {
                sessionStorage.clear();
                router.push('/');
            }
        } else {
            setToastIsOpen(true);
            setColor('bg-danger');
            setErrorMessage('Você não pode mudar para esse email!');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handleUserUpdate}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>{`${firstName[0]}${lastName[0]}`}</p>
                    <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg} />
                    <p className={styles.memberTimeText}>Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
                </div>
                <hr />
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for='firstName' className={styles.label}>
                            NOME
                        </Label>
                        <Input
                            name='firstName'
                            type='text'
                            id='firstName'
                            placeholder='Qual o seu primeiro nome?'
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={firstName}
                            onChange={(ev: any) => setFirstName(ev.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName' className={styles.label}>
                            SOBRENOME
                        </Label>
                        <Input
                            name='lastName'
                            type='text'
                            id='lastName'
                            placeholder='Qual o seu sobrenome?'
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={lastName}
                            onChange={(ev: any) => setLastName(ev.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for='phone' className={styles.label} >
                            WHATSAPP/TELEGRAM
                        </Label>
                        <Input
                            name='phone'
                            type='tel'
                            id='phone'
                            placeholder='(xx) 9xxxx-xxxx'
                            required
                            maxLength={20}
                            className={styles.input}
                            value={phone}
                            onChange={(ev: any) => setPhone(ev.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email' className={styles.label}>
                            EMAIL
                        </Label>
                        <Input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Coloque o seu email'
                            required
                            maxLength={20}
                            className={styles.input}
                            value={email}
                            onChange={(ev: any) => setEmail(ev.target.value)}
                        />
                    </FormGroup>
                    <Button className={styles.formBtn} outline type='submit'>
                        Salvar alterações
                    </Button>
                </div>
            </Form>
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    );
};