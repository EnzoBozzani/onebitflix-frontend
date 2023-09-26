import styles from '@/styles/Profile.module.scss';
//@ts-ignore
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export const UserForm: React.FC = () => {
    return (
        <>
            <Form className={styles.form}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>NT</p>
                    <p className={styles.userName}>NAME TESTE</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg} />
                    <p className={styles.memberTimeText}>Membro desde <br /> 20 de abril de 2020</p>
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
                            value={"Ficticio"}
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
                            value={"Ficticio"}
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
                            value={'+55 (21) 9999999'}
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
                            value={'teste@gamil.com'}
                        />
                    </FormGroup>
                    <Button className={styles.formBtn} outline type='submit'>
                        Salvar alterações
                    </Button>
                </div>
            </Form>
        </>
    );
};