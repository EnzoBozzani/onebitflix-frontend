import styles from '@/styles/Profile.module.scss';
//@ts-ignore
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export const PasswordForm: React.FC = () => {
    return (
        <>
            <Form className={styles.form}>
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
                        />
                    </FormGroup>
                </div>
                <Button type='submit' className={styles.formBtn} outline>
                    Salvar alterações
                </Button>
            </Form>
        </>
    )
}