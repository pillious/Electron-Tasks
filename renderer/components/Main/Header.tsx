import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { signOut } from '../../store/auth-actions';
import { deleteList } from '../../store/data-actions';
import RenameListModalContent from '../Sidebar/RenameListModalContent';
import Dropdown from '../UI/Dropdown';
import Modal from '../UI/Modal';
import classes from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const modalRef = useRef(null);

    const [openModal, setOpenModal] = useState(null);
    const [closeModal, setCloseModal] = useState(null);

    useEffect(() => {
        setOpenModal(() => modalRef.current.open);
        setCloseModal(() => modalRef.current.close);
    }, [modalRef]);

    const profileImg = useAppSelector((state) => state.auth.profileImg);
    const activeListId = useAppSelector((state) => state.data.activeListId);
    const activeListTitle = useAppSelector((state) => {
        let title = '';

        if (state.auth.authenticated) {
            let activeListId = state.data.activeListId;
            let allLists = state.data.taskLists;
            let activeList = allLists.find((list) => list.id === activeListId);
            if (activeList !== undefined) {
                title = activeList.title;
            }
        }

        return title;
    });

    const clickHandler = () => {
        dispatch(signOut());
    };

    return (
        <>
            <section className={classes.header}>
                <div className={classes.active_list}>
                    <p>{activeListTitle}</p>
                    <Dropdown
                        toggleElem={
                            <Image
                                src='/menu_options.svg'
                                height={16}
                                width={16}
                                alt='menu options'
                            />
                        }
                        items={[
                            { text: 'Rename List', clickHandler: openModal },
                            {
                                text: 'Delete List',
                                clickHandler: () => {
                                    dispatch(deleteList(activeListId));
                                },
                            },
                        ]}
                    />
                </div>

                {/* TODO: add Sign out dropdown */}
                <button onClick={clickHandler} className={classes.profile_btn}>
                    <img src={profileImg} referrerPolicy='no-referrer' />
                </button>
            </section>
            <Modal ref={modalRef} width={400} title='Rename List'>
                <RenameListModalContent closeModal={closeModal} />
            </Modal>
        </>
    );
};

export default Header;
