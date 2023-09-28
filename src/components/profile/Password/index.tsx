import styles from '@/styles/Profile.module.scss';
//@ts-ignore
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useState, useEffect, FormEvent } from 'react';
import { profileService } from '@/src/services/profileService';
import { ToastComponent } from '../..';

export const PasswordForm: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [color, setColor] = useState('');
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        profileService.fetchCurrentUser().then((password) => {
            setCurrentPassword(password.currentPassword);
            setNewPassword(password.newPassword);
        });
    }, []);

    const handlePasswordUpdate = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setToastIsOpen(true);
            setErrorMessage('Senha e confirmação de senha diferentes!');
            setColor('bg-danger');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            return;
        }
        if (currentPassword === newPassword) {
            setToastIsOpen(true);
            setErrorMessage('Não coloque a nova senha igual a senha antiga!');
            setColor('bg-danger');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            return;
        }
        const resStatus = await profileService.updatePassword({ currentPassword, newPassword });

        if (resStatus === 204) {
            setToastIsOpen(true);
            setErrorMessage('Senha alterada com sucesso!');
            setColor('bg-success');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            return;
        }
        if (resStatus === 400) {
            setToastIsOpen(true);
            setErrorMessage('Senha atual incorreta!');
            setColor('bg-danger');
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            return;
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handlePasswordUpdate}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for='currentPassword' className={styles.label}>SENHA ATUAL</Label>
                        <Input
                            name='currentPassword'
                            id='currentPassword'
                            type='password'
                            placeholder='********'
                            required
                            minLength={6}
                            maxLength={12}
                            className={styles.input}
                            value={currentPassword}
                            onChange={(ev: any) => setCurrentPassword(ev.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for='newPassword' className={styles.label}>NOVA SENHA</Label>
                        <Input
                            name='newPassword'
                            id='newPassword'
                            type='password'
                            placeholder='********'
                            required
                            minLength={6}
                            maxLength={12}
                            className={styles.inputFlex}
                            value={newPassword}
                            onChange={(ev: any) => setNewPassword(ev.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='confirmNewPassword' className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                        <Input
                            name='confirmNewPassword'
                            id='confirmNewPassword'
                            type='password'
                            placeholder='********'
                            required
                            minLength={6}
                            maxLength={12}
                            className={styles.inputFlex}
                            value={confirmNewPassword}
                            onChange={(ev: any) => setConfirmNewPassword(ev.target.value)}
                        />
                    </FormGroup>
                </div>
                <Button type='submit' className={styles.formBtn} outline>
                    Salvar alterações
                </Button>
            </Form>
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}