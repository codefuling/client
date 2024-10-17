import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faBell, faUser, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setPreviousUrl, setUser, setUserStatus } from '../../modules/user';

const Layout = () => {

    // 비로그인 회원이 My페이지 접근을 못하게 한다
    const location = useLocation();
    const dispatch = useDispatch();

    const path = location.pathname + location.search;
    console.log(path)

    // /my?login="true" 입력시 로그인할 수 있게 처리 눈으로만
    useEffect(() => {
        // My 페이지가 아닌 경우에만 이전 경로를 저장
        if (path !== "/my") {
            dispatch(setPreviousUrl(path));
        }
    }, [path, dispatch]);
    
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
                    <NavLink to={"/notice"}>
                        <FontAwesomeIcon icon={faBell} className="icon"/>
                        <p>알림</p>
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

export default Layout;