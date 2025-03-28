import React from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faBell, faUser, faCreditCard, faPaperPlane} from '@fortawesome/free-solid-svg-icons';


const AdminLayout = () => {

    return (
        <S.Background>
            <S.Wrapper>
                <S.Header> 
                    <Link to={"/"}>Sehwan Todo</Link>
                </S.Header>
                <S.Main>
                    <Outlet />
                </S.Main>
                <S.Nav>
                    <NavLink to={"/todo"}>
                        <FontAwesomeIcon 
                            icon={faHouse}
                            className="icon"
                        />
                        <p>피드</p>
                    </NavLink>
                    <NavLink to={"/payment"}>
                        <FontAwesomeIcon icon={faCreditCard} className="icon"/>
                        <p>결제</p>
                    </NavLink>
                    <NavLink to={"/chat"}>
                        <FontAwesomeIcon icon={faPaperPlane} className="icon"/>
                        <p>채팅</p>
                    </NavLink>
                    <NavLink to={"/my"}>
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                        <p>My</p>
                    </NavLink>
                </S.Nav>
            </S.Wrapper>
        </S.Background>
    );
};

export default AdminLayout;