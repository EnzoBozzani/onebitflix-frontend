import styles from './styles.module.scss';
//@ts-ignore
import { Container, Form, Input } from 'reactstrap';
import Link from 'next/link';
import Modal from 'react-modal';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { profileService } from '@/src/services/profileService';

Modal.setAppElement('#__next');

export const HeaderAuth: React.FC = () => {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initials, setInitials] = useState("");
    const [searchName, setSearchName] = useState('');

    const handleSearch = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        router.push(`search?name=${searchName}`);
        setSearchName('');
    }

    const handleSearchClick = () => {
        router.push(`search?name=${searchName}`);
        setSearchName('');
    }

    useEffect(() => {
        profileService.fetchCurrentUser()
            .then((user) => {
                setInitials(`${user.firstName[0]}${user.lastName[0]}`)
            })
    }, []);

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
                    <Form onSubmit={handleSearch}>
                        <Input
                            name='search'
                            type='search'
                            placeholder='Pesquisar'
                            className={styles.input}
                            value={searchName}
                            onChange={(ev: any) => setSearchName(ev.currentTarget.value.toLowerCase())}
                        />
                    </Form>
                    <img
                        src="/homeAuth/iconSearch.svg"
                        alt="lupaHeader"
                        className={styles.searchImg}
                        onClick={handleSearchClick}
                    />
                    <p className={styles.userProfile} onClick={handleOpenModal}>{initials}</p>
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