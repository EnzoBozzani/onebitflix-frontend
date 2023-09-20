import styles from './styles.module.scss';
//@ts-ignore
import { Container, Form, Input } from 'reactstrap';
import Link from 'next/link';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

export const HeaderAuth: React.FC = () => {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/');
    }

    return (
        <>
            <Container className={styles.nav}>
                <Link href={'/home'}>
                    <img
                        src="/logoOnebitflix.svg"
                        alt="logoOnebitflix"
                        className={styles.imgLogoNav}
                    />
                </Link>
                <div className='d-flex align-items-center'>
                    <Form>
                        <Input
                            name='search'
                            type='search'
                            placeholder='Pesquisar'
                            className={styles.input}
                        />
                    </Form>
                    <img
                        src="/homeAuth/iconSearch.svg"
                        alt="lupaHeader"
                        className={styles.searchImg}
                    />
                    <p className={styles.userProfile} onClick={handleOpenModal}>AB</p>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    shouldCloseOnEsc={true}
                    className={styles.modal}
                    overlayClassName={styles.overlayModal}
                >
                    <Link href={'/profile'}>
                        <p className={styles.modalLink}>Meus Dados</p>
                    </Link>
                    <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
                </Modal>
            </Container>
        </>
    )
}