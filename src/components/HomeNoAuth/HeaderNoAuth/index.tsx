import Link from 'next/link';
import styles from './styles.module.scss';
//@ts-ignore
import { Container, Button } from 'reactstrap';

const HeaderNoAuth: React.FC = () => {
    return (
        <>
            <div className={styles.ctaSection}>
                <img
                    src="/homeNoAuth/logoCta.png"
                    alt="logo cta"
                    className={styles.imgCta}
                />
                <p>Se cadastre para ter acesso aos cursos</p>
                <img
                    src="/homeNoAuth/logoCta.png"
                    alt="logo cta"
                    className={styles.imgCta}
                />
            </div>
            <Container className={styles.nav}>
                <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav} />
                <div>
                    <Link href={'/login'}>
                        <Button outline color='primary' className={styles.navBtn}>
                            Entrar
                        </Button>
                    </Link>
                    <Link href={'/register'}>
                        <Button outline color='primary' className={styles.navBtn}>
                            Quero fazer parte
                        </Button>
                    </Link>
                </div>
            </Container>
        </>
    )
}

export default HeaderNoAuth;