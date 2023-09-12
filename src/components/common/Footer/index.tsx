import styles from './styles.module.scss';
//@ts-ignore
import { Container } from 'reactstrap';

export const Footer: React.FC = () => {
    return (
        <>
            <Container className={styles.footer}>
                <img   
                    src="/logoOnebitcode.svg" 
                    alt="logoFooter"
                    className={styles.footerLogo} 
                />
                <a 
                    href="http://onebitcode.com" 
                    target='blank' 
                    className={styles.footerLink}
                >
                    ONEBITCODE.COM
                </a>
            </Container>
        </>
    )
}